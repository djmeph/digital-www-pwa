import { Column, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Favorites {
  @PrimaryColumn()
  public id: number;

  @Column({ type: 'varchar' })
  public jsonStr: number;

  @UpdateDateColumn({ type: 'timestamp' })
  public version: Date;
}
