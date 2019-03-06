import React from 'react';
import { shallow } from 'enzyme';

import Flop from './Flop';

const flop = shallow(<Flop />)
const initialState = {};

describe('Flop', () => {
  it('renders whithout crashing', () => {
    expect(flop).toMatchSnapshot();
  });
  
  it('initializes `state` with an empty object', () => {
    expect(flop.state()).toEqual(initialState);
  });
})

describe('when clicking `deal button`', () => {
  afterEach(() => {
    flop.setState({initialState});
  });

  it('updates the state', () => {
    // first deal
    flop.find('button.deal').simulate('click');
    let state = flop.state();
    expect(state.flop).toBeDefined();
    expect(state.turn).not.toBeDefined();
    expect(state.river).not.toBeDefined();
  
    // second deal
    flop.find('button').simulate('click');
    state = flop.state();
    expect(state.flop).toBeDefined();
    expect(state.turn).toBeDefined();
    expect(state.river).not.toBeDefined();
  
    // third deal
    flop.find('button').simulate('click');
    state = flop.state();
    expect(state.flop).toBeDefined();
    expect(state.turn).toBeDefined();
    expect(state.river).toBeDefined();
  });
});
