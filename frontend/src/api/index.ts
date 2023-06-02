import { Image } from '../types/Image';

export abstract class Api {
  public static async fetchImages(): Promise<Image[]> {
    const response = await fetch('http://localhost:3000/images', {});
    return await response.json();
  }
}
