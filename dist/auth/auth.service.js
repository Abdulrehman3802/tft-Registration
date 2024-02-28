"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const mailer_1 = require("@nestjs-modules/mailer");
let AuthService = class AuthService {
    constructor(prismaService, mailService) {
        this.prismaService = prismaService;
        this.mailService = mailService;
    }
    async register(createAuthDto) {
        try {
            const existUser = await this.prismaService.students.findFirst({ where: { email: createAuthDto.email } });
            if (existUser) {
                throw new common_1.ConflictException("Registration Failed!, Account Already Exist");
            }
            const model = {
                name: createAuthDto.name,
                email: createAuthDto.email,
                phone: createAuthDto.phone,
                currently_wroking: createAuthDto.currently_wroking,
                graduation_year: createAuthDto.graduation_year,
                is_active: true,
                date_created: new Date(),
                date_updated: new Date()
            };
            const user = await this.prismaService.students.create({
                data: model
            });
            await this.sendMail(user.email, "Free Trial For TFT", 'index', user.name);
            if (!user) {
                throw new common_1.NotImplementedException("Registration Failed!");
            }
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "You have been Registered to TFT Trainigs Successfully",
                data: user,
                error: false
            };
            return response;
        }
        catch (error) {
            if (error instanceof common_1.ConflictException) {
                throw error;
            }
            else {
                throw new common_1.InternalServerErrorException("Registration Failed! Please try again later...");
            }
        }
    }
    async sendMail(to, subject, filename, name) {
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
        }
        catch (error) {
            console.log("Error Occurred while sending mail", error);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        mailer_1.MailerService])
], AuthService);
//# sourceMappingURL=auth.service.js.map