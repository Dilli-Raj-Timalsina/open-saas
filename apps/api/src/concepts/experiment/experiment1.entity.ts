import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'experiment1' })
export class Experiment1 {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column({
    unique: true,
  })
  email: string;
}
