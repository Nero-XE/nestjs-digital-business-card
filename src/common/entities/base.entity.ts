import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({
  description: 'Базовая модель с необходимыми полями для наследования',
  isAbstract: true,
})
export abstract class BaseEntity {
  @Field(() => ID, { description: 'ID записи (UUID v4)' })
  id: string;

  @Field(() => Date, { description: 'Дата создания записи' })
  createdAt: Date;

  @Field(() => Date, { description: 'Дата редактирования записи' })
  updatedAt: Date;
}
