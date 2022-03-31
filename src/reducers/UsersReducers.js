
export const initialState = {
    name: "",
    lastName: "",
    dni: "",
    email: "",
    password: ""
};

const UsersReducers = (state, { type, payload }) => {

    const onChangeStates = {
        CHANGE_NAME: {...state, name: payload},
        CHANGE_LAST_NAME: {...state, lastName: payload},
        CHANGE_DNI: {...state, dni: payload},
        CHANGE_EMAIL: {...state, email: payload},
        CHANGE_PASSWORD: {...state, password: payload}
    }

    return onChangeStates[type] || state;

}

export default UsersReducers;