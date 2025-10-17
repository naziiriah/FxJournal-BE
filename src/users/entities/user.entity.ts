import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { Trade } from '../../trades/entities/trade.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string; // Will be hashed in service layer

  @Column({ nullable: true })
  username: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Trade, (trade) => trade.user)
  trades: Trade[];
}
