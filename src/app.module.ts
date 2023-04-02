import { Module  } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule  } from '@nestjs/config';
import {
  AuthModule,
  CategoryModule,
  CommentModule,
  PostModule,
  TagModule,
  UserModule
} from './modules'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV
        ? '.env.' + process.env.NODE_ENV
        : '.env.development',
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
    UserModule,
    CategoryModule,
    TagModule,
    PostModule,
    CommentModule,
    AuthModule,
  ],
})

export class AppModule {}
