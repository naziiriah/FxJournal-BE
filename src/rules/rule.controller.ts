import { Controller, Get } from '@nestjs/common';
import { Rule } from './entities/rule.entity';
import { RuleService } from './rule.service';
import * as crypto from 'crypto';

@Controller()
export class RuleController {
  constructor(private readonly ruleService: RuleService) {}

  @Get()
  getRule(id: crypto.UUID) {
    return this.ruleService.getRuleByID(id);
  }
}
