import React, { FunctionComponent, useState, useEffect } from "react";
import { useDispatch,  useSelector } from "react-redux";
import { RootState } from 'store/rootReducer'
import { signup } from "store/slices/userSlice";
import { BeatLoader } from "react-spinners";
import { Input, Header, SubmitButton, Error } from "components/shared/shared";
const Login: FunctionComponent = () => {
  const dispatch = useDispatch();
  const databaseError = useSelector((state: RootState) => state.user.error)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [formValid, setFormValid] = useState(false);
  const handleLogin = async () => {
    try {
      setLoading(true);

      if (password1 !== password2 && username !== "")
        setError("passwords do not match");
      await dispatch(
        signup(
          {
            username,
            email,
          },
          password1
        )
      );
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    if (
      password1.length > 6 &&
      password1 !== password2 &&
      /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [password2, password1, setFormValid, email]);

  return (
    <>
      <Header>Create Account</Header>
      {error !== "" && <Error>{error}</Error>}
      {databaseError && <Error>{databaseError}</Error>}
      <Input
        placeholder={"Username"}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        placeholder={"Email"}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        placeholder={"Password"}
        type="password"
        value={password1}
        onChange={(e) => setPassword1(e.target.value)}
      />
      <Input
        placeholder={"confirm password"}
        type="password"
        value={password2}
        onChange={(e) => setPassword2(e.target.value)}
      />

      {loading ? (
        <BeatLoader />
      ) : (
        <SubmitButton disabled={formValid} onClick={handleLogin}>
          Sign Up
        </SubmitButton>
      )}
    </>
  );
};

export default Login;
