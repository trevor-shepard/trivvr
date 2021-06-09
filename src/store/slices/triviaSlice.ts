import { createSlice, PayloadAction, Dispatch } from "@reduxjs/toolkit";

import { db, functions } from "utils/firebase";

import { TriviaState, Trivia } from "types/";

const initialState: TriviaState = {};

const trivias = createSlice({
  name: "trivias",
  initialState,
  reducers: {
    receiveTrivias(state, action: PayloadAction<TriviaState>) {
      return {
        ...state,
        ...action.payload,
      };
    },
    clearTrivia() {
      return {};
    },
  },
});

export const { receiveTrivias, clearTrivia } = trivias.actions;

export const createTrivia = async (
  name: string,
  rounds: number,
  wager: boolean,
  bonus: boolean,
  uid: string
) => {
  const response = await functions.httpsCallable("CreateTrivia")({
    name,
    rounds,
    wager,
    bonus,
    uid
  });

  return response.data.id;
};

export const subscribeToTrivia = async (
  dispatch: Dispatch<any>,
  id: string
) => {
  return await db
    .collection("trivia")
    .doc(id)
    .onSnapshot((snapshot) => {
      const trivia = snapshot.data() as Trivia;

      dispatch(receiveTrivias({ [trivia.id]: trivia }));
    });
};

export const subscribeToTrivias = async (
  dispatch: Dispatch<any>,
  uid: string
) => {
  return db
    .collection("trivia")
    .where('hosts', "array-contains", uid)
    .onSnapshot((querySnapshot) => {
      const trivias = {} as TriviaState;

      querySnapshot.forEach((doc) => {
        const trivia = doc.data() as Trivia;

        trivias[trivia.id] = trivia;
      });

      dispatch(receiveTrivias(trivias));
    });
};

export const removeQuestion = async (
  id: string,
  roundIndex: number,
  questionIndex: number
) => {
  const response = await functions.httpsCallable("RemoveQuestion")({
    id,
    roundIndex,
    questionIndex,
  });

  return response.data.id;
};

export default trivias.reducer;
