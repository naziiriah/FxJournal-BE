import { Injectable } from '@nestjs/common';
import { Trade } from './entities/trade.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { TradeRequest } from 'src/request/trade.request';

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

  async createTrade(item: TradeRequest) {
    var tradeProperty = new Trade()

    tradeProperty.symbol = item.symbol;
    tradeProperty.entryPrice = item.entryPrice;
    tradeProperty.exitPrice = item.exitPrice;
    tradeProperty.quantity = item.quantity;
    tradeProperty.profitLoss = item.profitLoss;
    tradeProperty.strategy = item.strategy;
    tradeProperty.session = item.session;
    tradeProperty.dailyBias = item.dailyBias;
    tradeProperty.tradeDirection = item.tradeDirection;
    tradeProperty.result = item.result;
    tradeProperty.risk = item.risk;
    tradeProperty.reward = item.reward;
    tradeProperty.entryTimeframe = item.entryTimeframe;
    tradeProperty.entryStructure = item.entryStructure;
    tradeProperty.entrySetup = item.entrySetup;
    tradeProperty.notes = item.notes;
    tradeProperty.error = item.error;
    tradeProperty.errorReason = item.errorReason;
    tradeProperty.screenshotUrl = item.screenshotUrl;


    try{
      const tradeData = this.tradeRepository.create(tradeProperty)
       return await this.tradeRepository.save(tradeData);
    }catch(error){
      return 'failed'
    }
   
    
  }

  async getAllTrade(userID: UUID): Promise<Trade[]> {
    return await this.tradeRepository.findBy({
      user: { id: userID },
    });
  }
}
