import { Controller, Post, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() order: CreateOrderDto) {
    const items = await this.orderService.create(order);

    return {
      total: items.length,
      items,
    };
  }
}
