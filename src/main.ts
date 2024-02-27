import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors({origin:"*"})
  await app.listen(process.env.PORT,()=>{
    console.log(`Server started Successfully at port: ${process.env.PORT}`);
    
  });
}
bootstrap();
