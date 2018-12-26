import * as React from 'react';
import * as css from './Footer.scss';
import BackButton from '../../../components/Game/BackButton/BackButton';
import ChatButton from '../../../components/Game/ChatButton/ChatButton';

const Footer = (props) => (
    <div className={css.Footer}>
      <BackButton  to={props.backPath || '/auth'} />
      <ChatButton />
    </div>
  )

export default Footer;
