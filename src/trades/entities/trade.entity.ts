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
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  symbol: string; // e.g., AAPL, BTC/USD

  @Column('float')
  entryPrice: number;

  @Column('float')
  exitPrice: number;

  @Column('float')
  quantity: number;

  @Column('float')
  profitLoss: number; // can be auto-calculated on save

  @Column({ nullable: true })
  strategy: string;

  @Column({ nullable: true, type: 'text' })
  notes: string;

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
