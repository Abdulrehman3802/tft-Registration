import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(createAuthDto: CreateAuthDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
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
}
