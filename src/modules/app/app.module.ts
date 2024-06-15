import { Module } from '@nestjs/common';

import { UserModule } from 'src/modules/users/user.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import configurations from '../../configurations';
import { User } from '../users/models/user.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configurations],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        port: configService.get('db_port'),
        host: configService.get('db_host'),
        username: configService.get('db_user'),
        password: configService.get('db_password'),
        database: configService.get('db_name'),
        synchronize: true,
        autoLoadModels: true,
        models: [User],
      }),
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
