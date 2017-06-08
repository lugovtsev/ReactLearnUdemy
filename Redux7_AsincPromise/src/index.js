import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import promise from 'redux-promise-middleware';
import axios from 'axios';

const initalState = {
  sendingRequest: false,
  requestRecieved: false,
  user: {
    name: '',
    email: '',
    gender: '',
    pic: ''
  },
  status: '',
  statusClass: ''
}

// REDUCER
function userReducer(state=initalState, action) {
  const user = {
    name: '',
    email: '',
    gender: '',
    pic: ''
  };

  switch (action.type) {
    case 'FETCH_USER_PENDING':
      return {...state, sendingRequest: true, status: 'Pending...', statusClass: 'pending'}
      break;
    case 'FETCH_USER_FULFILLED':
      user.name = `${action.payload.data.results[0].name.first} ${action.payload.data.results[0].name.last}`
      user.email = action.payload.data.results[0].email;
      user.gender = action.payload.data.results[0].gender;
      user.pic = action.payload.data.results[0].picture.large;
      return {...state, sendingRequest: false, user, status: 'User Recieved', statusClass: 'success'}
    break;
    case 'FETCH_USER_REJECTED':
    return {...state, sendingRequest: false, status: `${action.payload.message}`, statusClass: 'error'}
    default:
      return state
  }
}

// STORE
const store = createStore(userReducer, applyMiddleware(logger(), promise()));
const nameEl = document.getElementById('name');
const emailEl = document.getElementById('email');
const genderEl = document.getElementById('gender');
const statusEl = document.getElementById('status');
const picEl = document.getElementById('pic');

function render() {
  const state = store.getState()
  nameEl.innerHTML = state.user.name;
  emailEl.innerHTML = state.user.email;
  genderEl.innerHTML = state.user.gender;
  picEl.setAttribute('src',state.user.pic);
  statusEl.innerHTML = state.status;
  statusEl.className = state.statusClass;
}

render()
store.subscribe(render)

// ACTIONS
document.getElementById('getUser')
  .addEventListener('click', function () {
    store.dispatch({
      type : 'FETCH_USER',
      payload: axios.get("https://randomuser.me/api/")
    })
  })
