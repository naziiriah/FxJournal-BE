import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
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
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/trade-screenshots',
        filename: (req, file, cb) => {
          const uniqueName = `${uuid()}${extname(file.originalname)}`;
          cb(null, uniqueName);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
    }),
  )
  createTrade(
    trade: Trade,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateTradeDto,
  ) {
    const filePath = `/uploads/trades/${file.filename}`;
    trade = { ...trade, screenshotUrl: filePath };
    return {
      message: 'File uploaded successfully',
      path: filePath,
      uploadedBy: trade.user.id,
    };
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
