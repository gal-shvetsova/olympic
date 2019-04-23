

export const isAuthenticated = user => !!user;

export const isAllowed = (user, rights) =>
    rights.some(right => user.rights.includes(right));

export const hasRole = (user, roles) =>
    user.role === roles;

export const isRole = (role, needRoles) =>
    needRoles.indexOf(role) !== -1