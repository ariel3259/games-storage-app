const USERS_TYPES = {
    CHANGE_NAME: "CHANGE_NAME",
    CHANGE_LAST_NAME: "CHANGE_LAST_NAME",
    CHANGE_DNI: "CHANGE_DNI",
    CHANGE_EMAIL: "CHANGE_EMAIL",
    CHANGE_PASSWORD: "CHANGE_PASSWORD"
};

export const actionChangeName = (name) => ({
    type: USERS_TYPES.CHANGE_NAME,
    payload: name
});

export const actionChangeLastName = (lastName) => ({
    type: USERS_TYPES.CHANGE_LAST_NAME,
    payload: lastName
});

export const actionChangeDni = (dni) => ({
    type: USERS_TYPES.CHANGE_DNI,
    payload: dni
});

export const actionChangeEmail = (email) => ({
    type: USERS_TYPES.CHANGE_EMAIL,
    payload: email
});

export const actionChangePassword = (password) => ({
    type: USERS_TYPES.CHANGE_PASSWORD,
    payload: password
});