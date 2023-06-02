import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { Image } from './entities/image.entity';
import { mockPhotos } from './mockData';

// a hack for crud operations
// data will persist until server reboot
let photos = [...mockPhotos];

@Injectable()
export class ImagesService {
  create(createImageDto: CreateImageDto): Image {
    const newPhoto = new Image(createImageDto);

    photos = [...photos, newPhoto];

    return newPhoto;
  }

  findAll(): Image[] {
    return photos;
  }

  findOne(id: number): Image {
    return photos.find((item) => item.id === id) || null;
  }

  update(id: number, updateImageDto: UpdateImageDto): Image {
    const tempPhotos = [...photos];
    const index = tempPhotos.findIndex((item) => item.id === id);

    Object.keys(updateImageDto).forEach((key) => {
      tempPhotos[index][key] = updateImageDto[key];
    });

    tempPhotos[index].updated = new Date();

    photos = [...tempPhotos];

    return photos[index];
  }

  remove(id: number): Image[] {
    const tempPhotos = [...photos];
    const index = tempPhotos.findIndex((item) => item.id === id);

    tempPhotos.splice(index, 1);

    photos = [...tempPhotos];

    return photos;
  }
}
