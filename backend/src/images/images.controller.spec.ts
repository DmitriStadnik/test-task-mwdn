import { Test, TestingModule } from '@nestjs/testing';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { Image } from './entities/image.entity';
import { mockPhotos } from './mockData';
import { UpdateImageDto } from './dto/update-image.dto';
import { CreateImageDto } from './dto/create-image.dto';

describe('ImagesController', () => {
  let controller: ImagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImagesController],
      providers: [ImagesService],
    }).compile();

    controller = module.get<ImagesController>(ImagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('Should return array of Image entities', () => {
      expect(controller.findAll()).toBeInstanceOf(Array<Image>);
    });
  });

  describe('findOne', () => {
    const testId = mockPhotos[0].id;
    const testNotExistingId = 'test_not_existing_id';

    it('Should return Image entity', () => {
      expect(controller.findOne(`${testId}`)).toMatchObject<Image>({
        ...mockPhotos[0],
      });
    });

    it('Should return null if not found', () => {
      expect(controller.findOne(testNotExistingId)).toBeNull();
    });
  });

  describe('update', () => {
    const testId = mockPhotos[0].id;

    const updateDTO: UpdateImageDto = {
      title: 'test_update',
    };

    it('Should return updated Image entity', () => {
      expect(controller.update(`${testId}`, updateDTO)).toEqual<Image>(
        expect.objectContaining({
          title: 'test_update',
        }),
      );
    });

    it('Should contain update date in updated field', () => {
      expect(controller.update(`${testId}`, updateDTO)).toEqual<Image>(
        expect.not.objectContaining({
          updated: null,
        }),
      );
    });
  });

  describe('create', () => {
    const createDTO: CreateImageDto = {
      title: 'test_create',
      albumId: 1,
      url: 'https://via.placeholder.com/600/771796',
      thumbnailUrl: 'https://via.placeholder.com/150/771796',
    };

    it('Should return created Image entity', () => {
      expect(controller.create(createDTO)).toBeInstanceOf(Image);
    });

    it('Should not contain update date in updated field', () => {
      expect(controller.create(createDTO)).toEqual<Image>(
        expect.objectContaining({
          updated: null,
        }),
      );
    });
  });

  describe('remove', () => {
    const testObj = { ...mockPhotos[0] };
    const testId = testObj.id;

    it('Should return array without deleted entity', () => {
      expect(controller.remove(`${testId}`)).toEqual<Image[]>(
        expect.not.arrayContaining([testObj]),
      );
    });
  });
});
