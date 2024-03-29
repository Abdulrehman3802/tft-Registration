import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports:[PrismaModule,MailerModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
