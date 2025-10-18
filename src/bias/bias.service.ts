// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Bias } from './entities/bias.entity';
import { UUID } from 'crypto';

@Injectable()
export class BiasService {
  constructor(
    @InjectRepository(Bias)
    private readonly biasRepo: Repository<Bias>,
  ) {}

  async viewAllBias(userID: UUID) {
    return await this.biasRepo.findBy({
      user: { id: userID },
    });
  }

  async viewBias(biasID: UUID) {
    return await this.biasRepo.findOneBy({
      id: biasID,
    });
  }

  async createBias(bias: Bias): Promise<string> {
    try {
      this.biasRepo.create(bias);
      return 'bias created succesfully';
    } catch (error) {
      return 'failed';
    }
  }

  async updateBias(bias: Bias): Promise<string> {
    try {
      this.biasRepo.save(bias);
      return 'bias updated succesfully';
    } catch (error) {
      return 'failed';
    }
  }

  async deleteBias(biasID: UUID): Promise<string> {
    try {
      this.biasRepo.delete({ id: biasID });
      return 'bias deleted';
    } catch (error) {
      return 'failed';
    }
  }
}
