import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //  CORS
  app.enableCors({
    origin: 'http://example.com', // свій домен
    methods: 'GET,PUT,PATCH,POST,DELETE,',
    allowedHeaders: 'Content-Type, Accept',
    credentials: true,
  });
  // PIPE
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  // swagger
  const config = new DocumentBuilder()
    .setTitle('Lesson api')
    .setDescription('This api for lesson')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // start
  const configService = app.get(ConfigService);
  const port = configService.get('port');
  await app.listen(port);
}
bootstrap();
