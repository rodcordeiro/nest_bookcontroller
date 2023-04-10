import { Injectable } from '@nestjs/common';
import { UsersService } from '@/modules/users/services/users.service';
import { compareSync } from 'bcrypt';
import { UsersEntity } from '@/modules/users/entities/users.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validate(email: string, password: string) {
    try {
      const user = await this.usersService.validate({ email });
      const validPassword = compareSync(password, user.password);

      if (!validPassword) return null;

      return user;
    } catch (err) {
      return null;
    }
  }
  async login(user: UsersEntity) {
    const payload = {
      sub: user.id,
      email: user.email,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
