import * as React from 'react';
import styled from 'styled-components';

import * as css from './Chat.scss';
import {cn} from '~/utils';

const onClick = (value?) => { 
}

const Chat = (props) => {
  return (
    <div className={cn(props.className, css.Container)}>
      <button className={css.CloseButton} onClick={() => props.hide()}></button>
      <div className={css.Chat}>
        <div className={css.Emoji_Container}>
          <div className={css.Emoji_Container_Scroll}>
            <button className={cn(css.Button, css.Emoji, css.Emoji_1)} onClick={() => onClick()}></button>
            <button className={cn(css.Button, css.Emoji, css.Emoji_2)} onClick={() => onClick()}></button>
            <button className={cn(css.Button, css.Emoji, css.Emoji_3)} onClick={() => onClick()}></button>
            <button className={cn(css.Button, css.Emoji, css.Emoji_4)} onClick={() => onClick()}></button>
            <button className={cn(css.Button, css.Emoji, css.Emoji_1)} onClick={() => onClick()}></button>
            <button className={cn(css.Button, css.Emoji, css.Emoji_2)} onClick={() => onClick()}></button>
            <button className={cn(css.Button, css.Emoji, css.Emoji_3)} onClick={() => onClick()}></button>
            <button className={cn(css.Button, css.Emoji, css.Emoji_4)} onClick={() => onClick()}></button>
            <button className={cn(css.Button, css.Emoji, css.Emoji_1)} onClick={() => onClick()}></button>
            <button className={cn(css.Button, css.Emoji, css.Emoji_2)} onClick={() => onClick()}></button>
            <button className={cn(css.Button, css.Emoji, css.Emoji_3)} onClick={() => onClick()}></button>
            <button className={cn(css.Button, css.Emoji, css.Emoji_4)} onClick={() => onClick()}></button>
          </div>
        </div>
        
        <div className={css.TextButton_Container}>
          <button className={cn(css.Button, css.Text)} onClick={() => onClick()}>Good luck!</button>
          <button className={cn(css.Button, css.Text)} onClick={() => onClick()}>Well played!</button>
          <button className={cn(css.Button, css.Text)} onClick={() => onClick()}>Wow!</button>
        </div>
        <div className={css.TextButton_Container}>
          <button className={cn(css.Button, css.Text)} onClick={() => onClick()}>Damn it!</button>
          <button className={cn(css.Button, css.Text)} onClick={() => onClick()}>Good game!</button>
          <button className={cn(css.Button, css.Text)} onClick={() => onClick()}>Oops</button>
        </div>

      </div>
    </div>
  )
}

export default Chat;