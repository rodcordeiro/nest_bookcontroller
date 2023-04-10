import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';

import { BooksEntity } from '@/modules/books/entities/books.entity';
import { CreateBookDTO } from '@/modules/books/dto/create.dto';
import { UpdateBookDTO } from '@/modules/books/dto/update.dto';
import { UsersService } from '@/modules/users/services/users.service';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BooksEntity)
    private readonly booksRepository: Repository<BooksEntity>,
    private readonly usersService: UsersService,
  ) {}

  async list(ownerId: string) {
    return this.booksRepository.find({
      // loadRelationIds: true,
      where: {
        owner: { id: ownerId },
      },
    });
  }
  async view(options: FindOneOptions<BooksEntity>['where']) {
    try {
      return this.booksRepository.findOneOrFail({
        where: options,
      });
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }
  async create(data: CreateBookDTO) {
    const user = await this.usersService.findOne({ id: data.owner });
    const book = this.booksRepository.create({ ...data, owner: user });
    return await this.booksRepository.save(book);
  }
  async update(id: string, data: UpdateBookDTO) {
    const book = await this.booksRepository.findOneOrFail({ where: { id } });
    this.booksRepository.merge(book, data);
    return await this.booksRepository.save(book);
  }
  async delete(id: string) {
    await this.booksRepository.findOneOrFail({ where: { id } });
    await this.booksRepository.delete({ id });
  }
}
