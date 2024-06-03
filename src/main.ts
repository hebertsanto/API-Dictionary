import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './exception/global';
import helmet from 'helmet';
import * as compression from 'compression';
import * as csurf from 'csurf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(compression());
  app.use(helmet());
  app.use(csurf());
  app.setGlobalPrefix('/api/v1');

  const config = new DocumentBuilder()
    .setTitle('Boilerplate nest js')
    .setDescription('Change as you want')
    .setVersion('0.1')
    .setContact(
      'Hebert santos',
      'https://www.hebertzin.com/',
      'hebertsantosdeveloper@gmail.com',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
}
bootstrap();
