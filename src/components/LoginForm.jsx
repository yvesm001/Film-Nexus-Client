import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";

function LoginForm() {
  const [loginInfo, setLoginInfo] = useState({
    loginInfo: "",
    password: "",
  });

  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setLoginInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        login(loginInfo);
      }}
    >
      <label htmlFor="loginInfo">username / email</label>
      <input
        type="text"
        name="loginInfo"
        value={loginInfo.loginInfo}
        onChange={handleChange}
      />

      <label htmlFor="password">password</label>
      <input
        type="password"
        name="password"
        value={loginInfo.password}
        onChange={handleChange}
      />
      <button type="submit">login</button>
    </form>
  );
}

export default LoginForm;
