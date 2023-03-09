import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ColumnsOrderDocument = HydratedDocument<ColumnsOrder>;

@Schema()
export class ColumnsOrder {
  @Prop()
  columnsOrder: string[];
}

export const ColumnsOrderSchema = SchemaFactory.createForClass(ColumnsOrder);