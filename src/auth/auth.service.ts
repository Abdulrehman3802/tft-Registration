import { ConflictException, HttpStatus, Injectable, InternalServerErrorException, NotImplementedException } from '@nestjs/common';
import { CreateAuthDto, CreateUserModelDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailerService } from '@nestjs-modules/mailer';
import { escape } from 'querystring';
@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService:PrismaService,
    private readonly mailService:MailerService
    ){}
  async register(createAuthDto: CreateAuthDto) {
    try{
      const existUser = await this.prismaService.students.findFirst({where:{email:createAuthDto.email}})
      if(existUser){
        throw new ConflictException("Registration Failed!, Account Already Exist")
      }
      const model:CreateUserModelDto = {
        name:createAuthDto.name,
        email:createAuthDto.email,    
        phone:createAuthDto.phone,    
        currently_wroking:createAuthDto.currently_wroking,      
        graduation_year:createAuthDto.graduation_year,    
        is_active:true,    
        date_created: new Date(),    
        date_updated:new Date()
      }

      const user = await this.prismaService.students.create({
        data:model
      })
      await this.sendMail(user.email,"Registration for Free Session on TFT", 'index',user.name)
      if(!user){
        throw new NotImplementedException("Registration Failed!")
      }
      const response = {
        statusCode: HttpStatus.OK,
        message: "You have been Registered to TFT Trainigs Successfully",
        data: user,
        error: false
    }
    return response
    }catch(error){
      if(error instanceof ConflictException){
        throw error;
      }else{
      throw new InternalServerErrorException("Registration Failed! Please try again later...");
      }
    }
  }

  async sendMail(to: string, subject: string, filename: string,name:string) {
    try {
        await this.mailService.sendMail({
            to: to,
            from: process.env.MAIL_USER_ID,
            subject: subject,
            template: filename,
            context: {
                name: name || " "
            }
        });
        console.log(`Email Sent to ${to}`);
    } catch (error) {
        console.log("Error Occurred while sending mail", error);
    }
}

}
