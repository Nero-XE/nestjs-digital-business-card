import { Module } from '@nestjs/common';
import { ProjectService } from './project.service.js';
import { ProjectResolver } from './project.resolver.js';

@Module({
  providers: [ProjectResolver, ProjectService],
  exports: [ProjectService],
})
export class ProjectModule {}
