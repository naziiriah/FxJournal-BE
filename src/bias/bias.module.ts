import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { Bias } from './entities/bias.entity';
import { BiasController } from './bias.controller';
import { BiasService } from './bias.service';

@Module({
  imports: [TypeOrmModule.forFeature([Bias])],
  controllers: [BiasController],
  providers: [BiasService],
})
export class BiasModule {}
