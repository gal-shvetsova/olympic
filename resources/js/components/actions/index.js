export function getOlympiad(olympiads) {
    return {
        type: 'GET_OLYMPIAD',
        ...olympiads
    }
}

export function selectOlympiad(id){
    return {
        type: 'SELECT_OLYMPIAD',
        id
    }
}

export function getOlympiadEdit(olympiad, show){
    return {
        type: 'GET_OLYMPIAD_EDIT',
        olympiad,
        show
    }
}

export function getUser(users) {
    return {
        type: 'GET_USER',
        ...users
    }
}

export function selectUser(id){
    return {
        type: 'SELECT_USER',
        id
    }
}

export function getUserEdit(user, show){
    return {
        type: 'GET_USER_EDIT',
        user,
        show
    }
}

export function selectTask(id){
    return {
        type: 'SELECT_TASK',
        id
    }
}

export function getTaskEdit(task, olympiadID, show){
    return {
        type: 'GET_TASK_EDIT',
        task, 
        olympiadID,
        show 
    }
}

export function getTask(tasks, olympiadID) {
    return {
        type: 'GET_TASK',
        ...tasks,
        olympiadID
    }
}

export function getConformity(conformity) {
    return {
        type: 'GET_CONFORMITY',
        conformity
    }
}
