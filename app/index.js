import './process.js';
import { counter, mouse } from './reducers/index.js';
import { html, innerHTML } from '//unpkg.com/diffhtml?module';
import { createStore, combineReducers } from '//unpkg.com/redux?module';

const { main, __REDUX_DEVTOOLS_EXTENSION__ } = window;

const {
  getState,
  dispatch,
  subscribe,
} = createStore(
  combineReducers({ counter, mouse }),
  __REDUX_DEVTOOLS_EXTENSION__ && __REDUX_DEVTOOLS_EXTENSION__(),
);

const increment = () => dispatch({ type: 'INCREMENT' });
const decrement = () => dispatch({ type: 'DECREMENT' });
const updateMouse = ({ x, y }) => dispatch({ type: 'UPDATE', x, y });

function render() {
  const state = getState();

  innerHTML(main, html`
    <h1>Hello world</h1>
    <h3>${String(state.counter)}</h3>

    <button onClick=${increment}>Increment</button>
    <button onClick=${decrement}>Decrement</button>

    <p>
      <strong>${state.mouse.x}</strong>
      <strong>${state.mouse.y}</strong>
    </p>
  `);
}

// Initial render.
render();

// Update whenever the store changes.
subscribe(render);

// Update the mouse coordinates relative to the viewport.
window.onmousemove = ev => updateMouse({ x: ev.clientX, y: ev.clientY });
