import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Tag } from '../../tags/entities/tag.entity';

@Entity()
export class Trade {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  symbol: string; // e.g., AAPL, BTC/USD

  @Column('float')
  entryPrice: number;

  @Column('float')
  exitPrice: number;

  @Column('float')
  quantity: number;

  @Column('float')
  profitLoss: number;

  @Column({ nullable: true })
  strategy: string;

  @Column({ nullable: true })
  session: string;

  @Column({ nullable: true })
  dailyBias: string;

  @Column({ nullable: false })
  tradeDirection: 'Buy' | 'Sell';

  @Column('boolean')
  Result: boolean;

  @Column({ nullable: true, type: 'text' })
  risk: string;

  @Column({ nullable: true, type: 'text' })
  reward: string;

  @Column({ nullable: true, type: 'text' })
  entryTimeframe: string;

  @Column({ nullable: true, type: 'text' })
  entryStructure: string;

  @Column({ nullable: true, type: 'text' })
  entrySetup: string;

  @Column({ nullable: true, type: 'text' })
  notes: string;

  @Column('boolean')
  error: boolean;

  @Column({ nullable: true, type: 'text' })
  errorReason: string;

  @Column({ nullable: true })
  screenshotUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.trades, { onDelete: 'CASCADE' })
  user: User;

  @ManyToMany(() => Tag, (tag) => tag.trades, { cascade: true })
  @JoinTable()
  tags: Tag[];
}
