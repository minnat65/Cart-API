import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Grocery } from "./grocery";

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Grocery, { eager: true, cascade: ["update"] })
  @JoinTable()
  items: Grocery[]
}