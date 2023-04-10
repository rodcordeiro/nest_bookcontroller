import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { hashSync } from 'bcrypt';
import { BooksEntity } from '@/modules/books/entities/books.entity';

@Entity({ name: 'gm_tb_users' })
export class UsersEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  password: string;
  @Column()
  email: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @OneToMany(() => BooksEntity, book => book.owner)
  @JoinColumn()
  books: BooksEntity[];

  @BeforeInsert()
  hash() {
    this.password = hashSync(this.password, 10);
  }
}
