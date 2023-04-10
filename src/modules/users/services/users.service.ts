import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';

import { UsersEntity } from '@/modules/users/entities/users.entity';
import { CreateUserDTO } from '@/modules/users/dto/create.dto';
import { UpdateUserDTO } from '@/modules/users/dto/update.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}

  async findAll() {
    return await this.usersRepository.find({
      select: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
    });
  }
  async findOne(options: FindOneOptions<UsersEntity>['where']) {
    try {
      return await this.usersRepository.findOneOrFail({
        select: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
        where: options,
        relations: {
          books: true,
        },
      });
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }
  async validate(options: FindOneOptions<UsersEntity>['where']) {
    try {
      return await this.usersRepository.findOneOrFail({
        where: options,
      });
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  async store(data: CreateUserDTO) {
    const user = this.usersRepository.create(data);
    return await this.usersRepository.save(user);
  }
  async update(id: string, data: UpdateUserDTO) {
    const user = await this.usersRepository.findOneOrFail({ where: { id } });
    this.usersRepository.merge(user, data);
    return await this.usersRepository.save(user);
  }
  async destroy(id: string) {
    await this.usersRepository.findOneOrFail({ where: { id } });
    await this.usersRepository.delete({ id });
  }
}
