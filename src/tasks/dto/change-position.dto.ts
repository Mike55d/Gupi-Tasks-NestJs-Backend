import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsArray } from "class-validator";

export class ChangeOrderDto {
    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value.split('-')[1]))
    columnId: number;
    @IsArray()
    @Transform(({ value }) => Array.isArray(value) ? value.map(id => parseInt(id.split('-')[1])) : null)
    newTaskIds: number[];
}

export class ChangeColumnDto {
    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value.split('-')[1]))
    columnId: number;
    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value.split('-')[1]))
    taskId: number;
    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value.split('-')[1]))
    columnIdDestiny: number;
    @IsNumber()
    @IsNotEmpty()
    indexDestiny: number;
}

