import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsOptional, Max, Min } from 'class-validator';

@ArgsType()
export class PaginationArgs {
  @Field(() => Int, {
    description: 'Смещение от начала списка',
    defaultValue: 0,
    nullable: true,
  })
  @Min(0)
  @IsOptional()
  offset: number = 0;

  @Field(() => Int, {
    nullable: true,
    defaultValue: 10,
    description: 'Количество записей на страницу',
  })
  @Min(1)
  @Max(100)
  @IsOptional()
  limit: number = 10;
}
