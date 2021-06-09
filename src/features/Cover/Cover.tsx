import React from "react";
import styled from "@emotion/styled";
import { LogoIcon } from "assets/icons";
import { LogoHeader } from "components/shared/shared";
import { useHistory } from "react-router";
function Cover() {
  const history = useHistory();

  return (
    <Container>
      <LogoHeader src={LogoIcon} />
      <button onClick={() => history.push("/login")}>login</button>
      <button onClick={() => history.push("/signup")}>New? Sign up</button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;

export default Cover;
