import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';

import { BooksController } from './controllers/books.controller';
import { BooksEntity } from './entities/books.entity';
import { BooksService } from './services/books.service';

@Module({
  imports: [TypeOrmModule.forFeature([BooksEntity]), UsersModule],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
