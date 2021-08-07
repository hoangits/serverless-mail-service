
import { UsersDS } from "data-sources/users/usersDS";

export interface UsersRepo {
  getUsers(): Promise<any>;
  getUserById(id: number): Promise<any>;
}

export class UsersRepoImpl implements UsersRepo {
  constructor(private readonly usersDb: UsersDS) { }
  public async getUsers(): Promise<any> {
    return this.usersDb.getUsers();
  }
  public async getUserById(id: number): Promise<any> {
    return this.usersDb.getUserById(id);
  }

}
