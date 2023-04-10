import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UsersEntity } from '@/modules/users/entities/users.entity';

@Entity({ name: 'gm_tb_books' })
export class BooksEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  author: string;
  @Column()
  releaseYear: number;

  @Column()
  favorited: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @ManyToOne(() => UsersEntity, user => user.books)
  @JoinColumn()
  owner: UsersEntity;

  // TODO
  /**
   * image
   * tags
   * totalPages
   * annotations
   */
}
