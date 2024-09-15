import {FileReader} from './file-reader.interface.js';
import {readFileSync} from 'node:fs';
import {Cities, Goods, Offer, HousesTypes, UserTypes} from '../../types/index.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string,
  ) {
  }

  public read(): void {
    try {
      this.rawData = readFileSync(this.filename, 'utf-8');
    } catch (error: unknown) {
      console.error(`Can't read file from path ${this.filename}.`);

      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(([
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
        longitude]) =>
        ({
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
        })
      );
  }
}
