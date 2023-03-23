import { Module, ValidationPipe  } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService  } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import {
  CategoryModule,
  CommentModule,
  PostModule,
  TagModule,
  UserModule,
} from './modules'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV ? '.env.' + process.env.NODE_ENV : '.env.development',
    }),
    TypeOrmModule.forRoot({
        retryDelay: 3000,
        autoLoadEntities: true,
        type: 'mysql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: ['./**/*entity{.ts,.js}'],
        synchronize: false,
        logging: true,
        logger: 'file',
    }),
    CategoryModule,
    CommentModule,
    PostModule,
    TagModule,
    UserModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    }
  ],
})
export class AppModule {}
