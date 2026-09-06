import { registerEnumType } from '@nestjs/graphql';
import { SkillLevel } from '@prisma/client';

registerEnumType(SkillLevel, {
  name: 'SkillLevel',
  description: 'Уровень навыка',
  valuesMap: {
    BASE: { description: 'Базовый' },
    MID: { description: 'Средний' },
    PRO: { description: 'Продвинутый' }
  },
});

export { SkillLevel };
