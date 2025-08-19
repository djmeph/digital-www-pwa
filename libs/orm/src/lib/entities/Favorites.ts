import { Column, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Favorites {
  @PrimaryColumn()
  public id: number;

  @Column({ type: 'varchar' })
  public jsonStr: string;

  @UpdateDateColumn({ type: 'timestamp' })
  public version: Date;
}
