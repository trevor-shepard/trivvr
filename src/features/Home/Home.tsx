import React from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store/rootReducer";
import { User } from "types";
import { Header } from "components/shared/shared";
import {logout} from "store/slices/userSlice";
function Home() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { username } = useSelector((state: RootState) => state.user) as User;

  return (
    <>
      <Header>{username}</Header> <span onClick={()=> dispatch(logout())}>logout</span>
      <span>
        <button onClick={() => history.push("/create-trivia")}>create</button>
        <button>question bank</button>
        <button>host</button>
        <button>past games</button>
      </span>
    </>
  );
}

export default Home;
