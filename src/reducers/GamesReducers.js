export const initialState = {
    id: 0,
    name: "",
    description: "",
    yearRelease: "",
    gender: "",
    brand: "",
    price: 0
}

export function GamesReducers(state, {type, payload}){

    const onChangeStates = {
        CHANGE_ID: {...state, id: payload},
        CHANGE_NAME: {...state, name: payload},
        CHANGE_DESCRIPTION: {...state, description: payload},
        CHANGE_YEAR_RELEASE: {...state, yearRelease: payload},
        CHANGE_GENDER: {...state, gender: payload},
        CHANGE_BRAND: {...state, brand: payload},
        CHANGE_PRICE: {...state, price: payload}
    }; 

    return onChangeStates[type] || state;
}