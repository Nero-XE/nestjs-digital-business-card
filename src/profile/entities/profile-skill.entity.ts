import { Field, ObjectType } from '@nestjs/graphql';
import { SkillLevel } from '../../common/enums/skill-level-enum.js';

@ObjectType({ description: 'Сущность навыка' })
export class ProfileSkillEntity implements PrismaJson.ProfileSkill {
  @Field(() => String, { description: 'Название' })
  name: string;

  @Field(() => SkillLevel, { description: 'Уровень навыка' })
  level: SkillLevel;
}
