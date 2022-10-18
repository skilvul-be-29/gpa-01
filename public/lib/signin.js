import { getUsers } from "./getUsers.js";

export async function signin(email, password) {
  const users = await getUsers();
  console.log(users);
  const user = users.find((user) => user.email === email);
  if (!user) {
    return "Invalid email or password";
  }
  if (user.password !== password) {
    return "Invalid email or password";
  }
  return user;
}
