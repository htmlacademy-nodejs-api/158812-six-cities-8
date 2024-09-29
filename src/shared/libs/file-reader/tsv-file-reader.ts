import { FileReader } from './file-reader.interface.js';
import { Cities, Goods, Offer, HousesTypes, Coordinates } from '../../types/index.js';
import EventEmitter from 'node:events';
import { createReadStream } from 'node:fs';
import { UserType } from '../../types/user-type.enum.js';

export class TSVFileReader extends EventEmitter implements FileReader {
  private CHUNK_SIZE = 16384; // 16KB

  constructor(
    private readonly filename: string,
  ) {
    super();
  }

  private parseLineToOffer(line: string): Offer {
    const [
      title,
      description,
      createdDate,
      city,
      previewImage,
      images,
      isPremium,
      isFavorite,
      rating,
      houseType,
      bedrooms,
      guests,
      price,
      goods,
      authorName,
      email,
      avatarUrl,
      password,
      coordinates,
      userTypes,
    ] = line.split('\t');

    return {
      title,
      description,
      createdDate,
      city: city as Cities,
      previewImage,
      images: this.parseCollection<string>(images),
      isPremium: this.parseBoolean(isPremium.toLowerCase()),
      isFavorite: this.parseBoolean(isFavorite.toLowerCase()),
      rating: this.parseNumber(rating),
      houseType: houseType as HousesTypes,
      bedrooms: this.parseNumber(bedrooms),
      guests: this.parseNumber(guests),
      price: this.parseNumber(price),
      goods: this.parseCollection<Goods>(goods),
      author: {
        name: authorName,
        email,
        avatarUrl,
        password,
        type: userTypes as UserType,
      },
      coordinates: this.parseCoordinates(coordinates),
    };
  }

  private parseCollection<T>(string: string, separator?: string): T[] {
    return string.split(separator || ';') as T[];
  }

  private parseCoordinates(string: string): Coordinates {
    const [ latitude, longitude ] = string.split(',');
    return {
      latitude: Number.parseFloat(latitude),
      longitude: Number.parseFloat(longitude)
    };
  }

  private parseNumber(string: string): number {
    return Number.parseInt(string, 10);
  }

  private parseBoolean(boolString: string): boolean {
    return (/true/).test(boolString);
  }

  public async read(): Promise<void> {
    const readStream = createReadStream(this.filename, {
      highWaterMark: this.CHUNK_SIZE,
      encoding: 'utf-8',
    });

    let remainingData = '';
    let nextLinePosition = -1;
    let importedRowCount = 0;

    for await (const chunk of readStream) {
      remainingData += chunk.toString();

      while ((nextLinePosition = remainingData.indexOf('\n')) >= 0) {
        const completeRow = remainingData.slice(0, nextLinePosition + 1);
        remainingData = remainingData.slice(++nextLinePosition);
        importedRowCount++;

        const parsedOffer = this.parseLineToOffer(completeRow);
        this.emit('line', parsedOffer);
      }
    }

    this.emit('end', importedRowCount);
  }
}
