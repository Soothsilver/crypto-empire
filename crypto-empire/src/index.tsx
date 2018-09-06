///<reference path="../public/contextmenu/context.js"/>
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();

context.init({
    fadeSpeed: 100,
    filter: function ($obj : any){},
    above: 'auto',
    preventDoubleContext: true,
    compress: false
});
