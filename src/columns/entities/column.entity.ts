import { Entity, PrimaryGeneratedColumn, Column as ColumnType } from "typeorm";
@Entity()
export class Column {
    @PrimaryGeneratedColumn()
    _id: number

    @ColumnType()
    title: string

    @ColumnType('simple-array')
    taskIds: string []
}