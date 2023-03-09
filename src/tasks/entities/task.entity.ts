import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    _id: number

    @Column()
    title: string

    @Column()
    content: string
}