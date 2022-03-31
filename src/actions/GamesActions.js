
const GAMES_TYPES = {
    CHANGE_ID: "CHANGE_ID",
    CHANGE_NAME: "CHANGE_NAME",
    CHANGE_DESCRIPTION: "CHANGE_DESCRIPTION",
    CHANGE_YEAR_RELEASE: "CHANGE_YEAR_RELEASE",
    CHANGE_GENDER: "CHANGE_GENDER",
    CHANGE_BRAND: "CHANGE_BRAND",
    CHANGE_PRICE: "CHANGE_PRICE"
}

export const actionChangeId = (id) => ({
    type: GAMES_TYPES.CHANGE_ID,
    payload: id
});

export const actionChangeName = (name) => ({
    type: GAMES_TYPES.CHANGE_NAME,
    payload: name
});

export const actionChangeDescription = (description) => ({
    type: GAMES_TYPES.CHANGE_DESCRIPTION,
    payload: description
});

export const actionChangeYearRelease = (yearRelease) => ({
    type: GAMES_TYPES.CHANGE_YEAR_RELEASE,
    payload: yearRelease
});

export const actionChangeGender = (gender) => ({
    type: GAMES_TYPES.CHANGE_GENDER,
    payload: gender
});

export const actionChangeBrand = (brand) => ({
    type: GAMES_TYPES.CHANGE_BRAND,
    payload: brand
});

export const actionChangePrice = (price) => ({
    type: GAMES_TYPES.CHANGE_PRICE,
    payload: price
});