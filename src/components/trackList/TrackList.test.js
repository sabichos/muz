import React from 'react';
import ReactDOM from 'react-dom';
import TrackList from './TrackList';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TrackList />, div);
  ReactDOM.unmountComponentAtNode(div);
});
