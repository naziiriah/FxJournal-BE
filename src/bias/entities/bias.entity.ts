import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Bias {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: false })
  currencyPair: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  beforeImageUrl: string;

  @Column({ nullable: true })
  afterImageUrl: string;

  @ManyToOne(() => User, (user) => user.trades, { onDelete: 'CASCADE' })
  user: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
