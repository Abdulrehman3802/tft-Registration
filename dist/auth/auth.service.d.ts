import { HttpStatus } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailerService } from '@nestjs-modules/mailer';
export declare class AuthService {
    private readonly prismaService;
    private readonly mailService;
    constructor(prismaService: PrismaService, mailService: MailerService);
    register(createAuthDto: CreateAuthDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            std_id: number;
            name: string;
            email: string;
            phone: string;
            currently_wroking: boolean;
            graduation_year: number;
            is_active: boolean;
            date_created: Date;
            date_updated: Date;
        };
        error: boolean;
    }>;
    sendMail(to: string, subject: string, filename: string, name: string): Promise<void>;
}
