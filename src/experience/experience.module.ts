import { Global, Module } from '@nestjs/common';
import { ExperienceService } from './experience.service.js';
import { ExperienceResolver } from './experience.resolver.js';

@Module({
  providers: [ExperienceResolver, ExperienceService],
  exports: [ExperienceService],
})
export class ExperienceModule {}
