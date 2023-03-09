import { Exclude } from "class-transformer";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    _id: number

    @Column()
    title: string

    @Column()
    @Exclude()
    content: string
}