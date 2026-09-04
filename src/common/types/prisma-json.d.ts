import { SkillLevel } from '../../generated/prisma/enums.ts';

declare global {
  namespace PrismaJson {
    type ProfileLink = {
      platform: string;
      url: string;
    };

    type ProfileSkill = {
      name: string;
      level: SkillLevel;
    };

    type ProjectLink = {
      name: string;
      url: string;
    };
  }
}
