import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BiasService } from './bias.service';
import { Bias } from './entities/bias.entity';
import { multerConfig } from 'src/config/multer.config';
import { FilesInterceptor } from '@nestjs/platform-express';
import { BiasRequest } from 'src/request/bias.request';

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
  @Post('/upload')
  @UseInterceptors(FilesInterceptor('files', 2, multerConfig('bias-images')))
  createBias(
    @UploadedFiles() files: Express.Multer.File[],
    @Body('title') title: string,
    @Body('description') description: string,
    @Req() req,
  ) {
    const userId = req.user.userId;
    const [beforeImage, afterImage] = files;
    const bias: BiasRequest = {
      title,
      description,
      userId,
      beforeImageUrl: beforeImage
        ? `/uploads/bias-images/${beforeImage.filename}`
        : null,
      afterImageUrl: afterImage
        ? `/uploads/bias-images/${afterImage.filename}`
        : null,
    };

    this.biasService.createBias(bias);
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
