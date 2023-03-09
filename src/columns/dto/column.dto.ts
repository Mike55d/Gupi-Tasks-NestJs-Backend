import { Transform } from "class-transformer";
import { IsString, IsNotEmpty, IsNumber, IsArray } from "class-validator";

export class CreateColumnDto {
    @IsString()
    @IsNotEmpty()
    title: string;
}