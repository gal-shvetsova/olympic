import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {requestReducer} from '../actions/requestActions'

const studentStore = (state = {table: [], selectedStudent: -1}, action) => {
    switch (action.type) {
        case 'STUDENT_SUCCESS':
            return {...state, ...action};
        case 'SELECT_STUDENT':
            return {...state, selectedStudent: action.id};
        case 'STUDENT_FAILURE' :
            alert("Error");
        default:
            return state
    }
};

const taskStore = (state = {table: [], olympiadID: location.pathname.replace('/task/', '')}, action) => {
    switch (action.type) {
        case 'TASK_SUCCESS':
            return {...state, table: action.table, olympiadID: location.pathname.replace('/task/', '')};
        case 'SELECT_TASK':
            return {...state, selectedTask: action.id};
        case 'TASK_FAILURE':
            alert("err");
        default:
            return state
    }
};

const olympiadStore = (state = {table: [], selectedOlympiad: -1}, action) => {
    switch (action.type) {
        case 'OLYMPIAD_SUCCESS':
            return {...state, ...action};
        case 'SELECT_OLYMPIAD':
            return {...state, selectedOlympiad: action.id};
        case 'OLYMPIAD_FAILURE':
            alert("err");
        default:
            return state
    }
};

const taskEditStore = (state = {table: {}, olympiadID: -1, show: false}, action) => {
    switch (action.type) {
        case 'GET_TASK_EDIT':
            return {...state, table: action.table, olympiadID: action.olympiadID, show: action.show};
        default:
            return state
    }
};

const studentEditStore = (state = {table: {}, action : "", show: false}, action) => {
    switch (action.type) {
        case 'GET_STUDENT_EDIT':
            return {...state, table: action.table, action : action.action, show: action.show};
        default:
            return state
    }
};

const olympiadEditStore = (state = {table: {}, show: false}, action) => {
    switch (action.type) {
        case 'GET_OLYMPIAD_EDIT':
            return {...state, table : action.table, show: action.show};
        default:
            return state
    }
};

const appStore = (state = {isLoggedIn : false, user : {}}) => {
    return {...state};
};

const rootReducer = combineReducers({
    studentStore, taskStore, studentEditStore, taskEditStore, olympiadEditStore, olympiadStore, routerReducer, appStore
});

export default rootReducer;
