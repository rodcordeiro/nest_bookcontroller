import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  UseGuards,
  Param,
  ParseUUIDPipe,
  Req,
  Res,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { ApiTags } from '@nestjs/swagger';
import { IAuthenticatedUser } from '@/common/interfaces/authenticated.interface';

import { CreateBookDTO } from '@/modules/books/dto/create.dto';
import { UpdateBookDTO } from '@/modules/books/dto/update.dto';
import { BooksService } from '@/modules/books/services/books.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@ApiTags('books')
@Controller({
  version: '1',
  path: '/books',
})
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async list(@Req() req: IAuthenticatedUser, @Res() res: FastifyReply) {
    const books = await this.booksService.list(req.user.id);
    return res.header('X-TOTAL-BOOKS', books.length).send(books);
  }

  @Get(':id')
  async view(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.booksService.view({ id });
  }

  @Post()
  async create(@Body() body: CreateBookDTO) {
    return this.booksService.create(body);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post(':id/favorite')
  async favorite(@Param('id', new ParseUUIDPipe()) id: string) {
    return id; //favorite
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post(':id/unfavorite')
  async unfavorite(@Param('id', new ParseUUIDPipe()) id: string) {
    return id; // unfavorite
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateBookDTO,
  ) {
    return this.booksService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.booksService.delete(id);
  }
}
