import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateTradeDto {
  @IsString()
  symbol: string;

  @IsNumber()
  entryPrice: number;

  @IsNumber()
  exitPrice: number;

  @IsNumber()
  lotsize: number;

  @IsOptional()
  @IsString()
  strategy?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsString()
  screenshotUrl?: string;
}
