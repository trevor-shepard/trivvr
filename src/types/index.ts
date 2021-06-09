// USER TYPES
export interface User {
  username: string;
  uid: string;
  email: string;
  photo?: string;
}

export interface UserUpdate {
  username?: string;
  photo?: string;
}

export interface UserState {
  username?: string;
  uid?: string | null;
  email?: string | null;
  photo?: string | null;
  trivias?: string[] | null;
  error: string | null;
}

export interface UserWithoutId {
  email: string;
  username: string;
}

// TRIVIA TYPES
export interface TriviaState {
  [id: string]: Trivia;
}

export interface Trivia {
  id: string;
  name: string;
  rounds: (StandardRound | MusicRound | BonusRound)[];
  wager: boolean;
  teams: { [name: string]: Team };
  started: boolean;
  hosts: string[]
}

export interface IncompleteTrivia {
  id: string;
  name: string | null;
  rounds: (StandardRound | MusicRound | BonusRound | IncompleteBonusRound | IncompleteMusicRound | IncompleteStandardRound)[];
  wager: boolean;
  teams: { [name: string]: Team };
  started: false;
}

export interface StandardRound {
  type: "standard";
  questions: StandardQuestion[];
}

export interface IncompleteStandardRound {
  type: "standard";
  questions: (StandardQuestion | null)[];
}

export interface Question {
  id: string;
  type: "standard" | "music" | "bonus" | "incomplete";
}

export interface StandardQuestion extends Question {
  type: "standard";
  question: string;
  answer: string;
  genre: string[];
}

export interface IncompleteMusicRound {
  type: "music";
  questions: (MusicQuestion | null)[];
}

export interface MusicRound extends Question {
  type: "music";
  questions: MusicQuestion[];
}

export interface MusicQuestion extends Question {
  type: "music";
  id: string;
  artist: string;
  title: string;
}

export interface BonusRound {
  type: "bonus";
  question: string;
  questions: BonusQuestion[];
}

export interface IncompleteBonusRound {
  type: "bonus";
  question: string | null;
  questions: (BonusQuestion | null)[];
}

export interface BonusQuestion {
  type: "bonus";
  answer: string;
  imageURL: string;
}

// TEAM TYPES
export interface Team {
  name: string;
  rounds: TeamAnswers[];
  // TODO string length r chars
  inviteCode: string;
  wagers: number[];
}

export type TeamAnswers = (string | null)[];
