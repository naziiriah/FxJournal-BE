import { Injectable } from '@nestjs/common';
import { Trade } from './entities/trade.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';

@Injectable()
export class TradeService {
  constructor(
    @InjectRepository(Trade)
    private readonly tradeRepository: Repository<Trade>,
  ) {}

  async getTradeByID(tradeID: UUID): Promise<Trade | null> {
    return await this.tradeRepository.findOneBy({
      id: tradeID,
    });
  }

  async updateTrade(item: Trade): Promise<string> {
    try {
      await this.tradeRepository.save(item);
      return 'Updated';
    } catch (error) {
      return error;
    }
  }

  async deleteRecord(tradeId: UUID): Promise<string> {
    await this.tradeRepository.delete({
      id: tradeId,
    });
    return 'This trade has been removed';
  }

  async addTrade(item: Trade): Promise<string> {
    await this.tradeRepository.save(item);
    return 'This trade has been added to the Record';
  }

  async getAllTrade(userID: UUID): Promise<Trade[]> {
    return await this.tradeRepository.findBy({
      user: { id: userID },
    });
  }
}
