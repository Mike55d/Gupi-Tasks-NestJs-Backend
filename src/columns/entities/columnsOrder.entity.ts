import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
@Entity()
export class ColumnsOrder {
    @PrimaryGeneratedColumn()
    _id: number

    @Column('simple-array')
    orderColumns: number []
}