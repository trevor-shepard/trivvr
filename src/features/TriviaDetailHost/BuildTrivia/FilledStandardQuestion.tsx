import React from "react";
import { StandardQuestion } from "types";
import { RemoveIcon } from "assets/icons";

function FilledStandardQuestionRow({
  index,
  question,
  handleRemove,
}: {
  question: StandardQuestion;
  index: number;
  handleRemove: () => void;
}) {
  return (
    <tr>
      <span>{index}</span> <span>{question}</span>{" "}
      <img onClick={handleRemove} src={RemoveIcon} alt={'remove icon'} />
    </tr>
  );
}

export default FilledStandardQuestionRow;
