import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { FilmDto } from './dto/films.dto';

describe('FilmsController', () => {
  let controller: FilmsController;
  let service: FilmsService;
  const mockFilms: FilmDto[] = [
    {
      id: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
      rating: 2.9,
      director: 'Итан Райт',
      tags: ['Документальный'],
      image: '/bg1s.jpg',
      cover: '/bg1c.jpg',
      title: 'Архитекторы общества',
      about:
        'Документальный фильм, исследующий влияние искусственного интеллекта на общество.',
      description:
        'Документальный фильм Итана Райта исследует влияние технологий на современное общество, уделяя особое внимание роли искусственного интеллекта в формировании нашего будущего.',
      schedule: [
        {
          id: '5beec101-acbb-4158-adc6-d855716b44a8',
          daytime: '2024-06-28T11:00:53.000Z',
          hall: 1,
          rows: 5,
          seats: 10,
          price: 350,
          taken: [],
        },
        {
          id: '0cf8b68c-fcf2-4c0a-97ba-45990231fa0e',
          daytime: '2024-06-29T14:00:53.000Z',
          hall: 2,
          rows: 5,
          seats: 10,
          price: 350,
          taken: ['5:1', '5:2', '5:3', '5:4', '3:6', '3:7', '3:8'],
        },
        {
          id: 'b105ad4b-ecd2-4556-abaf-9a95403dc01c',
          daytime: '2024-06-30T13:00:53.000Z',
          hall: 1,
          rows: 5,
          seats: 10,
          price: 350,
          taken: ['4:4', '4:3'],
        },
      ],
    },
    {
      id: '0e33c7f6-27a7-4aa0-8e61-65d7e5effabc',
      rating: 4.9,
      director: 'Ваня Пупкин',
      tags: ['Драма'],
      image: '/bg2s.jpg',
      cover: '/bg2c.jpg',
      title: 'Пам-пам-пам',
      about:
        'Драма с элементами комедии.',
      description:
        'Фильм о жизни и бла-бла-бла. Будете плакать и смеяться.',
      schedule: [
        {
          id: '5beec101-acbb-4158-adc6-d855716b4123',
          daytime: '2024-06-23T11:00:53.000Z',
          hall: 1,
          rows: 5,
          seats: 10,
          price: 350,
          taken: [],
        },
        {
          id: '0cf8b68c-fcf2-4c0a-97ba-45990231f000',
          daytime: '2024-04-29T14:00:53.000Z',
          hall: 2,
          rows: 5,
          seats: 10,
          price: 350,
          taken: ['1:1', '1:2'],
        },
        {
          id: 'b105ad4b-ecd2-4556-abaf-9a95403dc01n',
          daytime: '2024-06-02T13:00:53.000Z',
          hall: 1,
          rows: 5,
          seats: 10,
          price: 350,
          taken: [],
        },
      ],
    },
  ];
  const mockFilm = mockFilms[0];
  const mockFilmId = mockFilm.id;

  const mockFilmsService = {
    findAll: jest.fn().mockResolvedValue(mockFilms),
    findById: jest.fn().mockResolvedValue(mockFilm),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        {
        provide: FilmsService,
        useValue: mockFilmsService,
      },
      ]
    })
      .compile();

    controller = module.get<FilmsController>(FilmsController);
    service = module.get<FilmsService>(FilmsService);
  });

  describe('getFilms', () => {
    it('should return a list of films with total count', async () => {
      const result = await controller.findAll();

      expect(result).toEqual({
        total: 2,
        items: mockFilms,
      });
      
      expect(service.findAll).toHaveBeenCalledTimes(1);
      expect(result.total).toBe(2);
      expect(result.items).toHaveLength(2);
    });
  })

  describe('getSchedule', () => {
    it('should return schedule for specific film', async () => {
      const result = await controller.getSchedule(mockFilmId);

      expect(result).toEqual({
        total: 3,
        items: mockFilm.schedule,
      });

      expect(service.findById).toHaveBeenCalledTimes(1);
      expect(result.total).toBe(3);
    })
  })
});
