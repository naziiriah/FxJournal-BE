import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreateTradeDto } from './dto/create-trade.dto';
import { extname } from 'path';
import { AuthGuard } from '@nestjs/passport';
import { TradeService } from './trades.service';
import { Trade } from './entities/trade.entity';
import { multerConfig } from 'src/config/multer.config';
import { TradeRequest } from 'src/request/trade.request';

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
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', multerConfig('trade-images')))
  createTrade(
    @UploadedFile() file: Express.Multer.File,
    @Req() req,
  ) {

    const tradeReq: TradeRequest = {
      symbol: req.symbol,
      entryPrice: req.entryPrice,
      exitPrice: req.exitPrice,
      quantity: req.qunatity,
      profitLoss: req.profitLoss,
      strategy: req.strategy,
      session: req.session,
      dailyBias: req.dailyBias,
      tradeDirection: req.tradeDirection,
      result: req.Result,
      risk: req.risk,
      reward: req.reward,
      entryTimeframe: req.entryTimeframe,
      entryStructure: req.entryStructure,
      entrySetup: req.entrySetup,
      notes: req.notes,
      error: req.error,
      errorReason: req.errorReason,
      screenshotUrl:  `/uploads/trades-images/${file.filename}`,
    }
    
    this.tradeService.createTrade(tradeReq)
   
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
function uuid() {
  throw new Error('Function not implemented.');
}
