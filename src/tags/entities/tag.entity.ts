import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Trade } from '../../trades/entities/trade.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string; // e.g., 'Breakout', 'Swing', 'Scalp'

  @ManyToMany(() => Trade, (trade) => trade.tags)
  trades: Trade[];
}
