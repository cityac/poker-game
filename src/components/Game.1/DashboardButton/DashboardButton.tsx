import * as React from 'react';
import { NavLink } from 'react-router-dom';

import * as css from './DashboardButton.scss';

const DashboardButton = () => (
    <NavLink className={css.DashboardButton} to="/dashboard"></NavLink>
);

export default DashboardButton;
