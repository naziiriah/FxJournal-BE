import { Injectable } from '@nestjs/common';
import { Trade } from './entities/trade.entity';
import { Int32 } from 'typeorm';

@Injectable()
export class TradeService {
    
  getTrade(id:Int32) {
    
  }
  updateTrade(item:Trade): string {
    return "Updated"
  }

  deleteRecord(id: Int32): string{
    return "This trade has been removed"
  }

  addTrade(item: Trade): string {
    return "This trade has been added to the Record"
  }

  getAllTrade(userID: Int32){

  }
  
}
