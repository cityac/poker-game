import * as React from 'react';
import { NavLink } from 'react-router-dom';

import * as css from './BackButton.scss';

interface BackButtonProps {
  to: string,
}

const BackButton = (props: BackButtonProps) => (
  <NavLink className={css.BackButton} to={props.to}></NavLink>
);

export default BackButton;
