import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { SharedModule } from '@/modules/shared.module';
import { DB_CONFIG } from '@/common/config/database.config';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(DB_CONFIG),
    ThrottlerModule.forRoot({
      ttl: 30,
      limit: 10,
    }),
    SharedModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
