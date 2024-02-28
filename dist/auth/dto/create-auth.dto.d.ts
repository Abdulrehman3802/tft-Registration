export declare class CreateAuthDto {
    name: string;
    email: string;
    phone: string;
    currently_wroking: boolean;
    graduation_year: number;
}
export declare class CreateUserModelDto {
    name: string;
    email: string;
    phone: string;
    currently_wroking: boolean;
    graduation_year: number;
    is_active: boolean;
    date_created: Date;
    date_updated: Date;
}
