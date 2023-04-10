import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const DB_CONFIG: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/modules/*/entities/*.entity.js'],
  autoLoadEntities: true,
  synchronize: process.env.NODE_ENV === 'development',
};

export { DB_CONFIG };
