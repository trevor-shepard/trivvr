import React, { useState } from "react";
import { useHistory } from "react-router";
import { Trivia, BonusQuestion, StandardQuestion, MusicQuestion } from "types/";
import EmptyStandardQuestion from "./EmptyStandardQuestion";
import FilledStandardQuestion from "./FilledStandardQuestion";

interface Props {
  trivia: Trivia;
}

function BuildTrivia({ trivia: { name, rounds, id } }: Props) {
  const [round, setRound] = useState(0);
  const { questions, type } = rounds[round];
  const history = useHistory();
  return (
    <>
      <h1>{name}</h1>
      <h3>Round {round + 1}</h3>
      <table>
        {questions.map(
          (
            question: BonusQuestion | StandardQuestion | MusicQuestion | null,
            index: number
          ) => {
            switch (type) {
              case "standard":
                return question === null ? (
                  <EmptyStandardQuestion
                    index={index}
                    handleAdd={() =>
                      history.push(`/add-question/${id}/${round}/${index}`)
                    }
                  />
                ) : (
                  <FilledStandardQuestion
                    // @ts-ignore
                    question={question}
                    index={index}
                    handleRemove={() => {}}
                  />
                );

              default:
                return  <EmptyStandardQuestion
                index={index}
                handleAdd={() =>
                  history.push(`/add-question/${id}/${round}/${index}`)
                }
              />
            }
          }
        )}
      </table>
    </>
  );
}

export default BuildTrivia;
