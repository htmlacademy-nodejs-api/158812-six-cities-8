import { OfferGenerator } from './offer-generator.interface.js';
import { getRandomItem, getRandomItems, generateRandomValue } from '../../helpers/index.js';
import { MockServerData } from '../../types/index.js';

enum OfferRatings {
  Min = 1,
  Max = 5,
}

enum AvailablePlaceRooms {
  Min = 1,
  Max = 8,
}

enum PlaceGuestsAmount {
  Min = 1,
  Max = 10,
}

enum PlaceRentPrices {
  Min = 100,
  Max = 100000,
}

export class TSVOfferGenerator implements OfferGenerator {
  constructor(
    private readonly mockData: MockServerData,
  ) {}

  public generate(): string {
    const title = getRandomItem(this.mockData.titles);
    const description = getRandomItem(this.mockData.descriptions);
    const date = new Date().toISOString();
    const city = getRandomItem(this.mockData.cities);
    const previewImage = getRandomItem(this.mockData.previewImages);
    const images = getRandomItems(this.mockData.images).join(';');
    const isPremium = Boolean(generateRandomValue(0, 1));
    const isFavorite = Boolean(generateRandomValue(0, 1));
    const rating = generateRandomValue(OfferRatings.Min, OfferRatings.Max);
    const houseType = getRandomItem(this.mockData.housesTypes);
    const roomsAmount = generateRandomValue(AvailablePlaceRooms.Min, AvailablePlaceRooms.Max);
    const guestsAmount = generateRandomValue(PlaceGuestsAmount.Min, PlaceGuestsAmount.Max);
    const price = generateRandomValue(PlaceRentPrices.Min, PlaceRentPrices.Max);
    const goods = getRandomItems(this.mockData.goods).join(';');
    const username = getRandomItem(this.mockData.usernames);
    const email = getRandomItem(this.mockData.emails);
    const avatar = getRandomItem(this.mockData.avatars);
    const password = getRandomItem(this.mockData.passwords);
    const userType = getRandomItem(this.mockData.userTypes);
    const latitude = getRandomItem(this.mockData.coordinates);
    const longitude = getRandomItem(this.mockData.coordinates);

    return [
      title, description, date, city,
      previewImage, images, isPremium,
      isFavorite, rating, houseType,
      roomsAmount, guestsAmount, price,
      goods, username, email,
      avatar, password, userType, latitude,
      longitude
    ].join('\t');
  }
}
