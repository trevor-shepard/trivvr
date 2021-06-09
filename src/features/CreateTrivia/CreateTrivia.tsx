import React, { useState } from "react";
import { createTrivia } from "store/slices/triviaSlice";
import { useSelector } from "react-redux"
import { RootState} from "store/rootReducer"
import { useHistory } from "react-router";

import { Header, Input } from "components/shared/shared";
function CreateTrivia() {
  const history = useHistory();
  const uid = useSelector((state: RootState) => state.user.uid as string)
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [rounds, setRounds] = useState(0);
  const [bonus, setBonus] = useState(false);
  const [music, setMusic] = useState(false);
  const [wager, setWager] = useState(false);

  const handleCreate = async () => {
    setLoading(true);
    if (name === "") {
      setLoading(false);
      return setError("name cannot be blank");
    }
    if (rounds === 0) {
      setLoading(false);
      return setError("must include at least 1 round");
    }
    try {
      
      const id = await createTrivia(name, rounds, wager, bonus, uid);
      setLoading(false);
      history.push(`host-trivia/${id}`);
    } catch (error) {
      setLoading(false);
      return setError(error.message);
    }
  };
  return (
    <>
      <Header>Create Trivia</Header>
      {error !== "" && <h5>{error}</h5>}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCreate();
        }}
      >
        <Input
          placeholder={"Name"}
          type="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder={"Rounds"}
          type="number"
          value={rounds}
          onChange={(e) => setRounds(parseInt(e.target.value))}
        />
        <div>
          <label htmlFor="bonus-checkbox">bonus?</label>
          <Input
            id={"bonus-checkbox"}
            placeholder={"Bonus"}
            type="checkbox"
            checked={bonus}
            onChange={(e) => setBonus(!bonus)}
          />
        </div>
        <div>
          <label htmlFor="bonus-checkbox">music?</label>
          <Input
            id={"music-checkbox"}
            placeholder={"Music"}
            type="checkbox"
            checked={music}
            onChange={(e) => setMusic(!music)}
          />
        </div>
        <div>
          <label htmlFor="wager-checkbox">wager?</label>
          <Input
            id={"wager-checkbox"}
            placeholder={"Wager"}
            type="checkbox"
            checked={wager}
            onChange={(e) => setWager(!wager)}
          />
        </div>
        {loading ? (
          <span>loading</span>
        ) : (
          <>
            <button onClick={history.goBack}>back</button>
            <button type="submit">create</button>
          </>
        )}
      </form>
    </>
  );
}

export default CreateTrivia;
