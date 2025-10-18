import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateBiasDto {
  @IsString()
  currencyPair: string;

  @IsOptional()
  @IsString()
  Reason?: string;

  @IsString()
  predictionscreenshotUrl: string;

  @IsString()
  endscreenshotUrl: string;
}
