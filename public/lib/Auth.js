import { createUser } from "./createUser.js";
import { getUsers } from "./getUsers.js";

export class Auth {
  constructor() {
    if (this instanceof Auth) {
      throw Error("A static class cannot be instantiated.");
    }
  }

  static async signIn(username, password) {
    const users = await getUsers();
    const user = users.find((u) => u.username === username);
    if (!user || user.password !== password) {
      return false;
    }
    localStorage.setItem("currentUser", JSON.stringify(user));
    return true;
  }

  static signOut() {
    localStorage.removeItem("currentUser");
  }

  static async signUp(username, password) {
    const users = await getUsers();
    const userExists = users.find((u) => u.username === username);
    if (userExists) {
      return false;
    }
    await createUser(username, password);
    return true;
  }

  /**
   * @returns {{id: number, username: string, avatar: string} | null}
   */
  static get currentUser() {
    return JSON.parse(localStorage.getItem("currentUser"));
  }
}
