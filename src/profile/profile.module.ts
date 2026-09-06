import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service.js';
import { ProfileResolver } from './profile.resolver.js';
import { ExperienceModule } from '../experience/experience.module.js';
import { ProjectModule } from '../project/project.module.js';

@Module({
  imports: [ExperienceModule, ProjectModule],
  providers: [ProfileResolver, ProfileService],
})
export class ProfileModule {}
