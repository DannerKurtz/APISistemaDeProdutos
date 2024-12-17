export interface IUsers {
  id?: string;
  name: string;
  password: string;
  permissionId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUsersWithoutId extends Omit<IUsers, 'id'> {}
