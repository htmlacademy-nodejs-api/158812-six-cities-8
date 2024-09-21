import {FileReader} from './file-reader.interface.js';
import {Cities, Goods, Offer, HousesTypes, UserTypes} from '../../types/index.js';
import EventEmitter from 'node:events';
import {createReadStream} from 'node:fs';

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
      uploadDate,
      city,
      previewImage,
      images,
      isPremium,
      isFavorite,
      rating,
      type,
      bedrooms,
      guests,
      price,
      goods,
      authorName,
      email,
      avatarUrl,
      password,
      userType,
      latitude,
      longitude
    ] = line.split('\t');

    return {
      title,
      description,
      uploadDate,
      city: city as Cities,
      previewImage,
      images: images.split(';'),
      isPremium: Boolean(isPremium),
      isFavorite: Boolean(isFavorite),
      rating: Number(rating),
      type: type as HousesTypes,
      bedrooms: Number(bedrooms),
      guests: Number(guests),
      price: Number(price),
      goods: goods.split(';') as Goods[],
      author: {
        name: authorName,
        email,
        avatarUrl,
        password,
        type: userType as UserTypes,
      },
      coordinates: {latitude: Number(latitude), longitude: Number(longitude)},
    };
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
