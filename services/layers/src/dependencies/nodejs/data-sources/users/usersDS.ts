
export interface UsersDS {
  getUsers(): Promise<any>;
  getUserById(id: number): Promise<any>;
}

export class UsersDSImpl implements UsersDS {

  constructor() { }
  public async getUsers(): Promise<any> {
    throw new Error("Method not implemented.");
  }
  public async getUserById(id: number): Promise<any> {
    throw new Error("Method not implemented.");
  }

}
