import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BiasService } from './bias.service';
import { Bias } from './entities/bias.entity';

@Controller('/Bias')
export class BiasController {
  constructor(private readonly biasService: BiasService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get(':biasGUID')
  getBias(@Param() params: any) {
    // @Req() request: Request
    return this.biasService.viewBias(params.biasGUID);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':userGUID')
  getAllUserBias(@Param() params: any) {
    // @Req() request: Request
    return this.biasService.viewAllBias(params.userGUID);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  createBias(bias: Bias): Promise<string> {
    return this.biasService.createBias(bias);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':biasGuid')
  deleteBias(@Param() params: any): Promise<string> {
    return this.biasService.deleteBias(params.biasGUID);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put()
  updateBiasRecord(bias: Bias) {
    return this.biasService.updateBias(bias);
  }
}
