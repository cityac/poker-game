import * as React from 'react';
import CircularProgressbar from 'react-circular-progressbar';
// import './styles.css';

import styled from 'styled-components';

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Img = styled.img`
  position: absolute;
  top: 0.85vh;
  left: 0.75vh;
  width: 6vh;
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
)

export default Avatar;