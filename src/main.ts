/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost',
      'http://127.0.0.1:5501',
      'http://localhost:3000', // ✅ Add for nextjs
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        return new HttpException(
          {
            status: false,
            message: errors.map((error) => ({
              field: error.property,
              message: error.constraints
                ? error.constraints[Object.keys(error.constraints)[0]]
                : '',
            })),
          },
          422,
        );
      },
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
