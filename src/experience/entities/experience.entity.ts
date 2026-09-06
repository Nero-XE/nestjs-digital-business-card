import { Experience } from '@prisma/client';
import { BaseEntity } from '../../common/entities/base.entity.js';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({
  description: 'Сущность опыта работы',
})
export class ExperienceEntity extends BaseEntity implements Experience {
  @Field(() => ID, { description: 'ID профиля (UUID v4)' })
  profileId: string;

  @Field(() => String, { description: 'Название компании' })
  company: string;

  @Field(() => String, { description: 'Должность' })
  position: string;

  @Field(() => Date, { description: 'Дата начала работы' })
  startedAt: Date;

  @Field(() => Date, { description: 'Дата окончания работы', nullable: true })
  endedAt: Date | null;

  @Field(() => String, { description: 'Достижения', nullable: true })
  achievements: string | null;
}
