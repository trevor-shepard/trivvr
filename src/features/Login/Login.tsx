import React, { FunctionComponent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from 'store/rootReducer'
import { login } from "store/slices/userSlice";
import { Input, Header, SubmitButton } from "components/shared/shared";
const Login: FunctionComponent = () => {
  const dispatch = useDispatch();
  const error = useSelector((state: RootState) => state.user.error)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
      dispatch(login(email.toLocaleLowerCase(), password));
  };
  return (
    <>
      <Header>Welcome Friend</Header>
      {error && error}
      <Input
        placeholder={"Email"}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder={"Password"}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <SubmitButton onClick={handleLogin}>Login</SubmitButton>
    </>
  );
};

export default Login;
