import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/order.dto';
import { randomUUID } from 'node:crypto';
import { FilmsRepository } from '../films/repositories/films.repository.interface';

@Injectable()
export class OrderService {
  constructor(
    @Inject('FilmsRepository')
    private readonly filmsRepository: FilmsRepository,
  ) {}

  async create(order: CreateOrderDto) {
    if (!order.tickets.length) {
      throw new BadRequestException('Order is empty');
    }

    const finalOrder = [];

    const filmIds = [...new Set(order.tickets.map((ticket) => ticket.film))];
    const films = await this.filmsRepository.findByIds(filmIds);

    if (films.length !== filmIds.length) {
      throw new BadRequestException('One or more films not found');
    }

    const filmsMap = new Map(films.map((film) => [film.id, film]));

    for (const ticket of order.tickets) {
      const film = filmsMap.get(ticket.film);
      if (!film) {
        throw new BadRequestException(`Film ${ticket.film} not found`);
      }

      const session = film.schedule.find((s) => s.id === ticket.session);
      if (!session) {
        throw new BadRequestException(
          `Session ${ticket.session} not found for film ${ticket.film}`,
        );
      }

      const seatId = `${ticket.row}:${ticket.seat}`;
      if (session.taken.includes(seatId)) {
        throw new BadRequestException(`Seat ${seatId} is already taken`);
      }

      session.taken.push(seatId);

      finalOrder.push({
        ...ticket,
        id: randomUUID(),
      });
    }

    for (const film of films) {
      await this.filmsRepository.update(film.id, {
        schedule: film.schedule,
      });
    }

    return finalOrder;
  }
}
