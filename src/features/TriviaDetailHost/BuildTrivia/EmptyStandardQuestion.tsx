import React from "react";
import { AddIcon } from "assets/icons";

function FilledStandardQuestionRow({
  index,
  handleAdd,
}: {
  index: number;
  handleAdd: () => void;
}) {
  return (
    <tr>
      <span>{index}</span> <span>Empty</span>{" "}
      <img onClick={handleAdd} src={AddIcon} alt={'add icon'} />
    </tr>
  );
}

export default FilledStandardQuestionRow;
