import { Entity, Column, Index, OneToOne, JoinColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Role } from './role.entity';
import { CustomBaseEntity } from 'src/common/entity/custom_base.entity';

// sessions and refresh_token should be stored in redis cache
@Entity({ name: 'user' })
export class User extends CustomBaseEntity {
  @Index()
  @Column({ nullable: false })
  firstname: string;

  @Index()
  @Column({ nullable: true })
  lastname: string;

  @Index()
  @Column({ nullable: true })
  username: string;

  @Index('idx_email_lowercase_unique', { unique: true })
  @Column({ unique: true, nullable: false })
  email: string;

  @Column()
  @Exclude({
    toPlainOnly: true,
  })
  password: string;

  @Column({ default: false })
  google: boolean;

  @Column({ nullable: true })
  forgot_password_otp: string | undefined;

  @Column({ nullable: true })
  forgot_password_expiry: Date | undefined;

  @Column({ nullable: true })
  email_verification_otp: string | undefined;

  @Column({ nullable: true })
  email_verification_expiry: Date | undefined;

  @Column({ default: true })
  is_active: boolean;

  @Column({ nullable: true })
  picture: string | undefined;

  @Column({ nullable: true })
  contact: string | undefined;

  @OneToOne(() => Role)
  @JoinColumn()
  role: Role;

  @Column()
  role_id: number;
}
