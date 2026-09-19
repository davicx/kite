import React from 'react';

/** Simple text/CSS icons — swap this map when a real icon set is added. */
const ICONS = {
  home: '⌂',
  dashboard: '▣',
  newChat: '＋',
  todo: '☑',
  team: '◎',
  connections: '⬡',
  project: '◫',
  recent: '↺',
};

function MenuIcon({ name }) {
  return (
    <span className="menu-item-icon" aria-hidden="true">
      {ICONS[name] || '·'}
    </span>
  );
}

export default MenuIcon;
