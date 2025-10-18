import { Module, OnModuleInit } from '@nestjs/common';
import { Trade } from './trades/entities/trade.entity';
import { User } from './users/entities/user.entity';
import { Tag } from './tags/entities/tag.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RulesModule } from './rules/rule.module';
import { TradesModule } from './trades/trade.module';
import { ConfigModule } from '@nestjs/config';
import { Rule } from './rules/entities/rule.entity';
import { AuthModule } from './auth/auth.module';
import { SeederModule } from './seeder/seeder.module';
import { SeederService } from './seeder/seeder.service';
import { BiasModule } from './bias/bias.module';
import { Bias } from './bias/entities/bias.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: process.env.POSTGRES_PASSWORD,
      database: 'FxJournal',
      entities: [User, Trade, Tag, Rule, Bias],
      synchronize: true, // ⚠️ turn off in production
    }),
    AuthModule,
    RulesModule,
    TradesModule,
    SeederModule,
    BiasModule,
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly seederService: SeederService) {}

  async onModuleInit() {
    await this.seederService.seedMainAccount();
  }
}
