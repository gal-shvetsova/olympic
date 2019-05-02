export function selectOlympiad(id) {
    return {
        type: 'SELECT_OLYMPIAD',
        id
    }
}

export function getStateOlympiad(id) {
    return {
        type: 'GET_STATE_OLYMPIAD',
        id
    }
}

export function getOlympiadEdit(table, show) {
    return {
        type: 'GET_OLYMPIAD_EDIT',
        table,
        show
    }
}

export function olympiadSuccess(table) {
    return {
        type: 'OLYMPIAD_SUCCESS',
        ...table
    }
}

export function olympiadFailure(table) {
    return {
        type: 'OLYMPIAD_FAILURE',
        ...table
    }
}

export function selectStudent(id) {
    return {
        type: 'SELECT_STUDENT',
        id
    }
}

export function getStudentEdit(table, action, show) {
    return {
        type: 'GET_STUDENT_EDIT',
        table,
        action,
        show
    }
}

export function studentSuccess(table) {
    return {
        type: 'STUDENT_SUCCESS',
        ...table
    }
}

export function studentFailure(table) {
    return {
        type: 'STUDENT_FAILURE',
        ...table
    }
}

export function selectTask(id) {
    return {
        type: 'SELECT_TASK',
        id
    }
}

export function getTaskEdit(table, olympiadID, show) {
    return {
        type: 'GET_TASK_EDIT',
        table,
        olympiadID,
        show
    }
}


export function taskSuccess(table) {
    return {
        type: 'TASK_SUCCESS',
        ...table,
        olympiadID
    }
}

export function taskFailure(table) {
    return {
        type: 'TASK_FAILURE',
        ...table
    }
}


export function loginSuccess(data) {
    return {
        type: 'LOGIN_SUCCESS',
        ...data,
    }
}

export function loginFailure(data) {
    return {
        type: 'LOGIN_FAILURE',
        ...data
    }
}

export function solutionSuccess(data) {
    return {
        type: 'SOLUTION_SUCCESS',
        ...data,
    }
}

export function solutionFailure(data) {
    return {
        type: 'SOLUTION_FAILURE',
        ...data
    }
}

export function appUpdate(data) {
    return {
        type: 'APP_UPDATE',
        ...data
    }
}

export function selectTaskToSolve(id) {
    return {
        type: 'SELECT_TASK_TO_SOLVE',
        id
    }
}

export function queueSuccess(data) {
    return {
        type: 'QUEUE_SUCCESS',
        ...data,
    }
}

export function queueFailure(data) {
    return {
        type: 'QUEUE_FAILURE',
        ...data
    }
}

