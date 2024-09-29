import { OfferGenerator } from './offer-generator.interface.js';
import { getRandomItem, getRandomItems, generateRandomValue } from '../../helpers/index.js';
import { MockServerData } from '../../types/index.js';
import dayjs from 'dayjs';
import { getRandomBoolean } from '../../helpers/common.js';

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

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(
    private readonly mockData: MockServerData,
  ) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const city = getRandomItem<string>(this.mockData.cities);
    const previewImage = getRandomItem<string>(this.mockData.previewImages);
    const images = getRandomItems(this.mockData.images).join(';');
    const isPremium = getRandomBoolean();
    const isFavorite = getRandomBoolean();
    const rating = generateRandomValue(OfferRatings.Min, OfferRatings.Max).toString();
    const houseType = getRandomItem<string>(this.mockData.housesTypes);
    const bedrooms = generateRandomValue(AvailablePlaceRooms.Min, AvailablePlaceRooms.Max).toString();
    const guests = generateRandomValue(PlaceGuestsAmount.Min, PlaceGuestsAmount.Max).toString();
    const price = generateRandomValue(PlaceRentPrices.Min, PlaceRentPrices.Max).toString();
    const goods = getRandomItems(this.mockData.goods).join(';');
    const username = getRandomItem(this.mockData.usernames);
    const email = getRandomItem(this.mockData.emails);
    const avatarUrl = getRandomItem(this.mockData.avatars);
    const password = getRandomItem(this.mockData.passwords);
    const userType = getRandomItem<string>(this.mockData.userTypes);
    const coordinates = getRandomItem(this.mockData.coordinates);
    const createdDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();

    return [
      title, description, createdDate, city,
      previewImage, images, isPremium,
      isFavorite, rating, houseType,
      bedrooms, guests, price,
      goods, username, email,
      avatarUrl, password, userType, coordinates
    ].join('\t');
  }
}
