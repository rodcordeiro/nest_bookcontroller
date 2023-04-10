import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  UseGuards,
  Res,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';

import { CreateUserDTO } from '@/modules/users/dto/create.dto';
import { UpdateUserDTO } from '@/modules/users/dto/update.dto';
import { UsersService } from '@/modules/users/services/users.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('user')
@Controller({
  version: '1',
  path: '/users',
})
export class UsersControllers {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async index() {
    return await this.usersService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async show(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Res() res: FastifyReply,
  ) {
    const user = await this.usersService.findOne({ id });
    return res
      .headers({
        'X-TOTAL-BOOKS': user.books.length,
        'X-TOTAL-ANOTATIONS': 0,
        'X-TOTAL-FAVORITED': 0,
      })
      .send(user);
  }

  @Post('/register')
  async register(@Body() body: CreateUserDTO) {
    return await this.usersService.store(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateUserDTO,
  ) {
    return await this.usersService.update(id, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.usersService.destroy(id);
  }
}
