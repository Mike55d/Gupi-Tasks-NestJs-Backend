import { Type, Transform } from "class-transformer";
import { ValidateNested, IsString, IsNotEmpty, IsDefined, IsNotEmptyObject, IsObject, IsNumber } from "class-validator";
class Task {
    @IsString()
    @IsNotEmpty()
    title: string;
    @IsString()
    @IsNotEmpty()
    content: string;
}
export class CreateTaskDto {
    @IsDefined()
    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => Task)
    task: Task
    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value.split('-')[1]))
    columnId: number;
}

export class DeleteTaskDto {
    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value.split('-')[1]))
    taskId: number;
    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value.split('-')[1]))
    columnId: number;
}
