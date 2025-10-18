import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TradeService } from './trades.service';
import { Trade } from './entities/trade.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('/trade')
export class TradeController {
  constructor(private readonly tradeService: TradeService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get(':tradeGUID')
  getTrade(@Param() params: any) {
    // @Req() request: Request
    return this.tradeService.getTradeByID(params.tradeGUID);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':userGUID')
  getAllUserTrade(@Param() params: any) {
    // @Req() request: Request
    return this.tradeService.getTradeByID(params.userGUID);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  createTrade(trade: Trade): Promise<string> {
    return this.tradeService.addTrade(trade);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':tradeGUID')
  deleteTrade(@Param() params: any): Promise<string> {
    return this.tradeService.deleteRecord(params.tradeGUID);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put()
  updateTradeRecord(trade: Trade) {
    return this.tradeService.updateTrade(trade);
  }
}
