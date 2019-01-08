import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { shallow } from 'enzyme';

const app = shallow(<App />);

it('renders without crashing', () => {
  expect(app).toMatchSnapshot();
  
  // const div = document.createElement('div');
  // ReactDOM.render(<App />, div);
  // ReactDOM.unmountComponentAtNode(div);
});
