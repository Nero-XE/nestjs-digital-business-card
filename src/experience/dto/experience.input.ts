import { Field, InputType } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import type { Experience } from '@prisma/client';

@InputType({
  description: 'Базовые входные данные для создания записи об опыте работы',
  isAbstract: true,
})
export class ExperienceInput implements Omit<
  Experience,
  'id' | 'profileId' | 'createdAt' | 'updatedAt'
> {
  @Field(() => String, { description: 'Название компании' })
  @IsString()
  @IsNotEmpty()
  company: string;

  @Field(() => String, { description: 'Должность' })
  @IsString()
  @IsNotEmpty()
  position: string;

  @Field(() => Date, { description: 'Дата начала работы' })
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  startedAt: Date;

  @Field(() => Date, { description: 'Дата окончания работы', nullable: true })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  endedAt: Date | null;

  @Field(() => String, { description: 'Достижения', nullable: true })
  @IsString()
  @IsOptional()
  achievements: string | null;
}
