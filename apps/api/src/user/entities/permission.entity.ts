import { Column, Entity, Index, ManyToMany, Unique } from 'typeorm';
import { Role } from './role.entity';
import { CustomBaseEntity } from 'src/common/entity/custom_base.entity';

/**
 * @example :
   * [
    {
        "id": 1,
        "resource": "user",
        "path": "/users",
        "description": "View all users",
        "method": "get",
        "isDefault": false,
        "createdAt": "2024-11-11T05:44:14.716297",
        "updatedAt": "2024-11-11T05:44:14.716297"
    },
    {
        "id": 2,
        "resource": "user",
        "path": "/users",
        "description": "Store new user",
        "method": "post",
        "isDefault": false,
        "createdAt": "2024-11-11T05:44:14.716297",
        "updatedAt": "2024-11-11T05:44:14.716297"
    },
    {
        "id": 3,
        "resource": "user",
        "path": "/users/:id",
        "description": "Update user by id",
        "method": "put",
        "isDefault": false,
        "createdAt": "2024-11-11T05:44:14.716297",
        "updatedAt": "2024-11-11T05:44:14.716297"
    },
    {
        "id": 4,
        "resource": "user",
        "path": "/users/:id",
        "description": "Get user by id",
        "method": "get",
        "isDefault": false,
        "createdAt": "2024-11-11T05:44:14.716297",
        "updatedAt": "2024-11-11T05:44:14.716297"
    },
    {
        "id": 5,
        "resource": "role",
        "path": "/roles",
        "description": "View all roles",
        "method": "get",
        "isDefault": false,
        "createdAt": "2024-11-11T05:44:14.716297",
        "updatedAt": "2024-11-11T05:44:14.716297"
    }
]
 */

@Entity({
  name: 'permission',
})
@Unique(['description'])
export class Permission extends CustomBaseEntity {
  @Column('varchar', { length: 100 })
  resource: string;

  @Column()
  @Index({
    unique: true,
  })
  description: string;

  @Column()
  path: string;

  @Column('varchar', {
    default: 'get',
    length: 20,
  })
  method: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToMany((type) => Role, (role) => role.permission)
  role: Role[];
}
