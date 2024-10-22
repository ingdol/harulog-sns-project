import { signup } from "./actios";

export default function SignUpPage() {
  return (
    <form>
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      <label htmlFor="nickname">nickname:</label>
      <input id="nickname" name="nickname" type="nickname" required />
      <button formAction={signup}>Sign up</button>
    </form>
  );
}
