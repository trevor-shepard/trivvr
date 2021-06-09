import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/rootReducer";
import { useParams, useHistory } from "react-router-dom";
import BuildTrivia from "./BuildTrivia/BuildTrivia";

function HostTrivia() {
  const history = useHistory();
  const params = useParams<{ id: string }>();
  const { id } = params;
  if (!id) history.goBack();

  const trivia = useSelector((state: RootState) => state.trivias[id]);

  if (!trivia || trivia === undefined) {
    return <div>
      <h3>loading</h3>
    </div>
  }

  const { rounds, started } = trivia;

  const getStatus = () => {
    if (started) return "started";

    for (const round of rounds) {
      for (const question of round.questions) {
        if (question === null) return "incomplete";
      }
    }

    return "complete";
  }

  const getScreen = () => {
    switch (getStatus()) {
      case "incomplete":
        return <BuildTrivia trivia={trivia} />;

      default:
        break;
    }
  };

  return <>{getScreen()}</>;
}

export default HostTrivia;
