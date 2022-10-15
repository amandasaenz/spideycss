import React from 'react';
import { Theme } from '../themes/Themes';
import icons from '../images/icons.svg';

interface IconProps extends Theme {
  id: string;
  color?: string;
}

export const i = [
  'account',
  'account-add',
  'account-square',
  'account-square-add',
  'back',
  'battery',
  'bell-alert',
  'bell',
  'bolt',
  'bookmark',
  'bubble-typing',
  'bubble',
  'burger',
  'calendar',
  'camera',
  'card-add',
  'card-delete',
  'card-sub',
  'card-check',
  'card',
  'chain',
  'chat',
  'clock',
  'close',
  'code',
  'coffee',
  'copy',
  'current-location',
  'down',
  'download',
  'edit',
  'email',
  'error',
  'exit',
  'folder-add',
  'folder-delete',
  'folder',
  'heart',
  'house',
  'image',
  'left',
  'location',
  'map',
  'message',
  'meter',
  'microphone',
  'minus',
  'move',
  'music',
  'next',
  'open',
  'paste',
  'phone',
  'plus',
  'read',
  'refresh',
  'replay',
  'right',
  'search',
  'settings',
  'share',
  'shuffle',
  'smile',
  'star',
  'stars',
  'trash',
  'up',
  'video',
  'wifi',
  'windows',
  'zoom-in',
  'zoom-out',
];

const Icon: React.FC<IconProps> = ({ id, ...props }) => {
  return (
    <svg {...props} width='24px' height='24px'>
      <use
        xlinkHref={`${icons}#${id}`}
        fill={props.color ? props.color : props.theme?.accent}
      />
    </svg>
  );
};

export default Icon;
