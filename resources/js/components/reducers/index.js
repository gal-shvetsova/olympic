import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';



const userStore = (state={users : [], selectedUser : -1}, action) => {
  switch (action.type) {
    case 'GET_USER':
      return {...state, ...action}
    case 'SELECT_USER':
      return {...state, selectedUser : action.id}
    default: return state
  }
}

const taskStore = (state={tasks : [], olympiadID : location.pathname.replace('/task/', '')}, action) => {
  switch (action.type) {
    case 'GET_TASK': 
      return {...state, tasks : action.tasks, olympiadID : location.pathname.replace('/task/', '')}
    case 'SELECT_TASK':
      return {...state, selectedTask : action.id}
    default: return state
  }
}

const olympiadStore = (state={olympiads : [], selectedOlympiad : -1}, action) => {
  switch (action.type) {
    case 'GET_OLYMPIAD':
      return {...state, ...action}
    case 'SELECT_OLYMPIAD':
      return {...state, selectedOlympiad : action.id}
    default: return state
  }
}

const taskEditStore = (state={task : {}, olympiadID : -1, show : false}, action) => {
  switch (action.type) {
    case 'GET_TASK_EDIT':
      return {...state, task : action.task, olympiadID : action.olympiadID, show : action.show}
    default: return state
  }
}

const userEditStore = (state={user : {}, show : false}, action) => {
    switch (action.type) {
      case 'GET_USER_EDIT':
        return {...state, user : action.user, show : action.show}
      default: return state
    }
}

const olympiadEditStore = (state={olympiad : {}, show : false}, action) => {
  switch (action.type) {
    case 'GET_OLYMPIAD_EDIT':
      return {...state, olympiad : action.olympiad, show : action.show}
    default: return state
  }
}

const mainTableStore = (state={conformity : []}, action) => {
    switch (action.type) {
      case 'GET_CONFORMITY':
        return {...state, conformity : action.conformity}
      default: return state
    }
}
const rootReducer = combineReducers({
    userStore, taskStore, userEditStore, taskEditStore, mainTableStore, olympiadEditStore, olympiadStore, routerReducer
});

export default rootReducer;
