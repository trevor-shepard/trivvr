import { createSlice, PayloadAction, Dispatch } from "@reduxjs/toolkit";

import { AppThunk } from "..";

import firebase, { auth, db } from "utils/firebase";

import { UserState, User, UserWithoutId, UserUpdate } from "types/";

const initialState: UserState = {
  email: null,
  uid: null,
  error: null
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    receiveUser(state, action: PayloadAction<User>) {
      return {
        ...action.payload,
        error: null,
      };
    },
    clear() {
      return {
        email: null,
        uid: null,
        error: null
      };
    },
    updateUser(state, action: PayloadAction<UserUpdate>) {
      return {
        ...state,
        ...action.payload,
        error: null
      };
    },
    receiveUserError(state, action: PayloadAction<string>) {
      return {
        ...state,
        error: action.payload
      }
    }
  },
});

export const { receiveUser, updateUser, clear, receiveUserError } = user.actions;

export default user.reducer;

export const login = (email: string, password: string): AppThunk => async (
  dispatch
) => {
  try {
    const uid = await auth
      .signInWithEmailAndPassword(email, password)
      .then((resp) => {
        if (resp === null || resp.user === null) {
          throw new Error("user not found");
        } else {
          return resp.user.uid;
        }
      });
    const user = (await db
      .collection("users")
      .doc(uid)
      .get()
      .then((doc) => doc.data())) as User;

    dispatch(receiveUser(user));
  } catch (error) {
    dispatch(receiveUserError(error.message))
  }
};

export const signup = (
  userInfo: UserWithoutId,
  password: string
): AppThunk => async (dispatch) => {
  try {
    const uid = await auth
      .createUserWithEmailAndPassword(userInfo.email, password)
      .then((resp) => {
        if (resp === null || resp.user === null) {
          throw new Error("user not found");
        } else {
          return resp.user.uid;
        }
      });
    const user = {
      ...userInfo,
      uid,
      trivias: []
    }
    await db
      .collection("users")
      .doc(uid)
      .set(user);
    dispatch(
      receiveUser(user)
    );
  } catch (error) {
    
    dispatch(receiveUserError(error.message))

  }
};

export const addUserPhoto = (photo: string): AppThunk => async (
  dispatch,
  getState
) => {
  const { user } = getState();

  const uid = user.uid as string;
  await db.collection("users").doc(uid).update({
    photo,
  });

  dispatch(updateUser({ photo }));
};

export const logout = (): AppThunk => async (dispatch) => {
  firebase.auth().signOut();
  dispatch(clear());
};

export const subscribeToUser = async (
  dispatch: Dispatch<any>,
  uid: string
) => {
  if (!uid) return
  return  db
    .collection("users")
    .doc(uid)
    .onSnapshot((snapshot) => {
      const user = snapshot.data() as User
      console.log('userupdated', user)
      dispatch(receiveUser(user))
    })
}