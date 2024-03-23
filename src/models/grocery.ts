import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Grocery {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  price: number

  @Column()
  totalStock: number

  @Column({
    default: false
  })
  outOfStock: boolean

  // addedBy
}