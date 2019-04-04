import * as React from 'react';
import CircularProgressbar from 'react-circular-progressbar';

import styled from 'styled-components';

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Img = styled.img`
  position: absolute;
  box-sizing: border-box;
  top: 1vh;
  left: 1.1vh;
  width: 8vh;
  height: 8vh;
  border: 2px solid #FFFFFF;
  border-radius: 50%;
`;

const Avatar = (props) => (
    <Div>
      <div style={{position: 'relative'}}>
        <CircularProgressbar
          percentage={props.percentage}
          styles={{
            path: { strokeWidth: props.percentage ? 4 : 0 },
          }}
        />
        <Img src={props.url}/>
      </div>
    </Div>
);

export default Avatar;