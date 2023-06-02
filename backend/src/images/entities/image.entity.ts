import { CreateImageDto } from '../dto/create-image.dto';
import { mockPhotos } from '../mockData';
export class Image {
  constructor({ albumId, title, url, thumbnailUrl }: CreateImageDto) {
    this.albumId = albumId;
    this.id = mockPhotos.length + 100;
    this.title = title;
    this.url = url;
    this.thumbnailUrl = thumbnailUrl;
    this.created = new Date();
  }
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  created: Date;
  updated: Date = null;
}
