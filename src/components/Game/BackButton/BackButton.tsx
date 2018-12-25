import * as React from 'react';
import { NavLink } from 'react-router-dom';

import * as css from './BackButton.scss';

const BackButton = () => (
    <NavLink className={css.BackButton} to='/real-money'></NavLink>
);

export default BackButton;
