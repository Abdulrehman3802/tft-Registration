import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateAuthDto {
    @IsNotEmpty()
    @IsString()
    name:string
    @IsEmail()
    @IsNotEmpty()
    email:string
    @IsString()
    @IsNotEmpty()
    phone:string
    @IsBoolean()
    @IsNotEmpty()
    currently_wroking:boolean
    @IsNumber()
    @IsNotEmpty()
    graduation_year:number
}


export class CreateUserModelDto {
    name:string
    email:string
    phone:string
    currently_wroking:boolean
    graduation_year:number
    is_active:boolean
    date_created:Date
    date_updated:Date
}