// src/seeder/seeder.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';

@Injectable()
export class SeederService {
  private readonly logger = new Logger(SeederService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async seedMainAccount() {
    const email = 'nazirabubakar7@gmail.com';
    const username = 'main-account';
    const password = 'adinoyi7';

    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      this.logger.log('✅ Main account already exists.');
      return;
    }

    const hashed = await bcrypt.hash(password, 10);
    const mainUser = this.userRepository.create({
      email,
      username,
      password: hashed,
    });

    try {
      await this.userRepository.save(mainUser);
      this.logger.log('🌱 Main account seeded successfully.');
    } catch (error) {
      this.logger.log('🌱 Main account failed seeding.');
    }
  }
}
