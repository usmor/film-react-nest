import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/order.dto';

describe('OrderController', () => {
  let controller: OrderController;
  let service: OrderService;
  const orderData: CreateOrderDto = {
    email: '123456@gmail.com',
    phone: '+79061234567',
    tickets: [
      {
        film: '1',
        session: '1',
        daytime: '2024-06-30T13:00:53.000Z',
        row: 5,
        seat: 10,
        price: 350,
      },
      {
        film: '1',
        session: '1',
        daytime: '2024-06-30T13:00:53.000Z',
        row: 5,
        seat: 9,
        price: 350,
      },
    ],
  };

  const createOrderResponse = {
    total: 2,
    items: [
      {
        film: '1',
        session: '1',
        daytime: '2024-06-30T13:00:53.000Z',
        row: 5,
        seat: 10,
        price: 350,
        id: '1111',
      },
      {
        film: '1',
        session: '1',
        daytime: '2024-06-30T13:00:53.000Z',
        row: 5,
        seat: 9,
        price: 350,
        id: '1112',
      },
    ],
  };

  const orderEmptyData: CreateOrderDto = {
    email: '123456@gmail.com',
    phone: '+79061234567',
    tickets: [],
  };

  const createEmptyOrderResponse = {
    total: 0,
    items: [],
  };

  const mockOrderService = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: mockOrderService,
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    service = module.get<OrderService>(OrderService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create an order and return items with total count', async () => {
      mockOrderService.create.mockResolvedValue(createOrderResponse.items);
      const result = await controller.create(orderData);

      expect(service.create).toHaveBeenCalledWith(orderData);
      expect(service.create).toHaveBeenCalledTimes(1);
      expect(result.total).toBe(2);
      expect(result.items).toHaveLength(2);
      result.items.forEach((item, index) => {
        expect(item.film).toBe(createOrderResponse.items[index].film);
        expect(item.session).toBe(createOrderResponse.items[index].session);
        expect(item.daytime).toBe(createOrderResponse.items[index].daytime);
        expect(item.row).toBe(createOrderResponse.items[index].row);
        expect(item.seat).toBe(createOrderResponse.items[index].seat);
        expect(item.price).toBe(createOrderResponse.items[index].price);
        expect(item).toHaveProperty('id');
      });
    });

    it('should handle empty ticket list', async () => {
      mockOrderService.create.mockResolvedValue(createEmptyOrderResponse.items);
      const result = await controller.create(orderEmptyData);

      expect(service.create).toHaveBeenCalledWith(orderEmptyData);
      expect(service.create).toHaveBeenCalledTimes(1);
      expect(result.total).toBe(0);
      expect(result.items).toHaveLength(0);
      expect(result).toEqual(createEmptyOrderResponse);
    });
  });
});
