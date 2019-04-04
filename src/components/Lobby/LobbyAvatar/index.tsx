import * as React from 'react';
import CircularProgressbar from 'react-circular-progressbar';
// import './styles.css';

import styled from 'styled-components';

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  width: 150px;
  font-size: 3vmin;
`;

const Info = styled.div`
  margin-left: 10px;
`;

const Name = styled.div`
  font-weight: bold;
  color: black;
  font-size: 10px;
`;

const Money = styled.div`
  color: black;
  opacity: 0.4;
  font-size: 10px;
`;

const Img = styled.img`
  box-sizing: border-box;
  width: 6vh;
  border: 2px solid #FFFFFF;
  border-radius: 50%;
`;

const LobbyAvatar = (props) => (
    <Div>
      <Img src={props.url}/>
      <Info>
        <Name>mario007</Name>
        <Money>1,900</Money>
      </Info>
    </Div>
);

export default LobbyAvatar;