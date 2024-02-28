import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
@Module({
  imports: [AuthModule,
    MailerModule.forRoot({
      transport: {
          host: 'smtp.gmail.com',
          port: 465,
          ignoreTLS: true,
          secure: true,
          auth: {
              user:"tfttrainings@gmail.com",
              pass: "fiti ifxa xppz xvjw"
          },
      },
      defaults: {
          from: '"TFT" <no-reply@gmail.com>',
      },
      preview: false,
      template: {
          dir: process.cwd() + '/template/',
          adapter: new HandlebarsAdapter(),
          options: {
              strict: true,
          },
      },
  }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
