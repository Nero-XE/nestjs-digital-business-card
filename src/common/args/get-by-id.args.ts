import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@ArgsType()
export class GetByIdArgs {
  @Field(() => ID, { description: 'ID записи (UUID v4)' })
  @IsUUID('4')
  id!: string;
}
