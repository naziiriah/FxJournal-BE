import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { Rule } from './entities/rule.entity';

@Injectable()
export class RuleService {
  constructor(
    @InjectRepository(Rule)
    private readonly ruleRepository: Repository<Rule>,
  ) {}

  async getRuleByID(ruleID: UUID): Promise<Rule | null> {
    return await this.ruleRepository.findOneBy({
      id: ruleID,
    });
  }

  async updateRule(rule: Rule): Promise<string> {
    try {
      await this.ruleRepository.save(rule);
      return 'Updated';
    } catch (error) {
      return 'error';
    }
  }

  async deleteRule(ruleID: UUID): Promise<string> {
    await this.ruleRepository.delete({
      id: ruleID,
    });
    return 'This rule has been removed';
  }

  async addRule(rule: Rule): Promise<string> {
    await this.ruleRepository.save(rule);
    return 'This rule has been added to the Record';
  }

  async getAllUsersRule(userID: UUID): Promise<Rule[]> {
    return await this.ruleRepository.findBy({
      user: { id: userID },
    });
  }
}
