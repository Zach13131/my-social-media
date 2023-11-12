import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";

@Entity({ name: "friends" })
export class Friend {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Column({ nullable: false })
  userId: string;

  @ManyToOne(() => User, (user) => user.friends)
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToOne(() => User, (user) => user.friendOf)
  @JoinColumn({ name: "friendId" })
  friend: User;

  @Column({ nullable: false })
  friendId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
