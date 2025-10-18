import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Trade } from '../../trades/entities/trade.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Bias {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  currencyPair: string;

  @Column({ nullable: false })
  Reason: string;

  @Column({ nullable: true })
  PredictionscreenshotUrl: string;

  @Column({ nullable: true })
  EndscreenshotUrl: string;

  @ManyToOne(() => User, (user) => user.trades, { onDelete: 'CASCADE' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
