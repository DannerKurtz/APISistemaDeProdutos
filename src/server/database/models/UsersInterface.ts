// Export the user interface
export interface IUsers {
  id?: string;
  name: string;
  password?: string;
  permissionId?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

// Export the user interface, but without the ID
export interface IUsersWithoutId extends Omit<IUsers, 'id'> {}
