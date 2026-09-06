import { BaseEntity } from '../../common/entities/base.entity.js';
import { Profile } from '@prisma/client';
import { Field, ObjectType } from '@nestjs/graphql';
import { ProfileLinkEntity } from './profile-link.entity.js';
import { ProfileSkillEntity } from './profile-skill.entity.js';
import { ExperienceEntity } from '../../experience/entities/experience.entity.js';
import { ProjectEntity } from '../../project/entities/project.entity.js';

@ObjectType({ description: 'Сущность профиля' })
export class ProfileEntity extends BaseEntity implements Profile {
  @Field(() => String, { description: 'ФИО' })
  fullName: string;

  @Field(() => String, { description: 'Описание', nullable: true })
  description: string | null;

  @Field(() => [ProfileLinkEntity], {
    description: 'Ссылки на профессиональные ресурсы',
  })
  links: ProfileLinkEntity[];

  @Field(() => [ProfileSkillEntity], {
    description: 'Список навыков с указанием уровня',
  })
  skills: ProfileSkillEntity[];

  @Field(() => [ExperienceEntity], {
    description: 'Опыт работы, связанный с профилем',
  })
  experiences?: ExperienceEntity[];

  @Field(() => [ProjectEntity], {
    description: 'Проекты, связанные с профилем',
  })
  projects?: ProjectEntity[]
}
