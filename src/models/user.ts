import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Order } from './order';
import { Cart } from './cart';
import { UserRole } from '../interface/grocery';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    nullable: false
  })
  name: string

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  userRole: UserRole

  @OneToMany(() => Order, (order) => order.user)
  // @JoinColumn()
  orders: Order[]

  @OneToOne(() => Cart)
  @JoinColumn()
  cart: Cart
}