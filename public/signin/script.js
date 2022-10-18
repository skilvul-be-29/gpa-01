import { signin } from "../lib/signin.js";

const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = e.target.email.value.trim();
  const password = e.target.password.value.trim();

  const res = await signin(email, password);
  if (!res) {
    return alert("Invalid email or password");
  }
});
