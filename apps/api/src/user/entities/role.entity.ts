import { Column, Entity, Index, JoinTable, ManyToMany } from 'typeorm';
import { Permission } from './permission.entity';
import { CustomBaseEntity } from 'src/common/entity/custom_base.entity';
/**
  @example :

[
    {
        "id": 1,
        "name": "superuser",
        "description": "superuser of the system",
        "createdAt": "2024-11-11T05:44:14.720722",
        "updatedAt": "2024-11-11T05:44:14.720722"
    },
    {
        "id": 2,
        "name": "normal",
        "description": "normal user of the system",
        "createdAt": "2024-11-11T05:44:14.720722",
        "updatedAt": "2024-11-11T05:44:14.720722"
    }
]
 */

@Entity({
  name: 'role',
})
export class Role extends CustomBaseEntity {
  @Column('varchar', { length: 100 })
  @Index({
    unique: true,
  })
  name: string;

  @Column('text')
  description: string;

  @ManyToMany(() => Permission, (permission) => permission.role)
  @JoinTable({
    name: 'role_permission',
    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'permission_id',
      referencedColumnName: 'id',
    },
  })
  permission: Permission[];
}
