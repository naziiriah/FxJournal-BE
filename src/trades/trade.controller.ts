import { Controller, Get } from '@nestjs/common';
import { TradeService } from './trades.service';
import { Trade } from './entities/trade.entity';
import { Int32 } from 'typeorm';

@Controller()
export class TradeController {
  constructor(private readonly tradeService: TradeService) {}

  @Get()
  getTrade(id:Int32) {
    // return this.tradeService.getTrade();
  }
}
