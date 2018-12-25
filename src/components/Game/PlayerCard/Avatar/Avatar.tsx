import * as React from 'react';

import styled from 'styled-components';

const Div = styled.div`
  display: flex;
  align-self: stretch;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Img = styled.img`
  width: 6vh;
  border-radius: 50%;
  
`;// border: 1px solid #ddd; 

const Avatar = (props) => (
  <Div>
    <Img src={props.url}/>
  </Div>
)

export default Avatar;