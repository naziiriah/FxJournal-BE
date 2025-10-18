import { Module } from '@nestjs/common';
import { TradeController } from './trade.controller';
import { TradeService } from './trades.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { Trade } from './entities/trade.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Trade])],
  controllers: [TradeController],
  providers: [TradeService],
})
export class TradesModule {}
