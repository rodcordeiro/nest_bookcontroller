import { Module } from '@nestjs/common';

import { UsersModule } from '@/modules/users/users.module';
import { BooksModule } from '@/modules/books/books.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { HealthModule } from '@/modules/health/health.module';

@Module({
  imports: [UsersModule, BooksModule, AuthModule, HealthModule],
  controllers: [],
  providers: [],
})
export class SharedModule {}
