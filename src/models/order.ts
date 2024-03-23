import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany, JoinColumn, JoinTable, ManyToOne } from "typeorm";
import { Grocery } from "./grocery";
import { User } from "./user";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  totalPrice: number

  @Column()
  OrderDate: string

  @ManyToOne(() => User, (user) => user.orders)
  user: User

  @ManyToMany(() => Grocery)
  @JoinTable()
  items: Grocery[]
}