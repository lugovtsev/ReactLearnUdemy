import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

// REDUCER
function counterReducer(state={ count: 0 }, action) {

  var nextState = {
    count: state.count
  }
  switch (action.type) {
    case 'ADD':
      nextState.count = state.count + 1
      return nextState
      break;
    case 'MINUS':
      nextState.count = state.count - 1
      return nextState
      break;
    case 'RESET':
      nextState.count = 0
      return nextState
      break;
    default:
      return state
  }
}

/*
const logger = store => next => action => {
  console.log('dispathcing', action);
  let result = next(action);
  console.log('next state', store.getState());
  return result;
}*/

// const logger = function(store) {
//   return function(next) {
//     return function(action) {
//       console.log('dispathcing',action);
//       let result = next(action);
//       return result;
//     }
//   }
// }
//
// const error = store => next => action => {
//   console.log('new action', action);
//   action = 'blah';
//   try {
//     next(action);
//   } catch (e) {
//     console.log('error', e);
//   }
// }

// STORE
const store = createStore(counterReducer, applyMiddleware(logger));
const counterEl = document.getElementById('counter');

function render() {
  const state = store.getState()
  counterEl.innerHTML = state.count.toString();
}


render()
store.subscribe(render)

// ACTIONS
document.getElementById('add')
  .addEventListener('click', () => {
    store.dispatch({ type: 'ADD' })
  })
document.getElementById('minus')
  .addEventListener('click', () => {
    store.dispatch({ type: 'MINUS' })
  })
document.getElementById('reset')
  .addEventListener('click', () => {
    store.dispatch({ type: 'RESET' })
  })
