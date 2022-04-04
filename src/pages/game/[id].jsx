import React, {useReducer} from "react";
import Container from "../../components/Container";
import { TitleProvider } from "../../context/TitleContext";
import { useRouter } from "next/router";
import getGame from "../../logic/games/getGame";
import { GamesReducers, initialState } from "../../reducers/GamesReducers";
import {actionChangeName, actionChangeDescription, actionChangeYearRelease, actionChangeGender, actionChangeBrand, actionChangePrice, actionChangeId} from "../../actions/GamesActions";
import TextField from "../../components/TextField";
import updateGame from "../../logic/games/updateGame";
import deleteGame from "../../logic/games/deleteGame";

const Game = ({ defaultValue }) => {

    const [game, dispatch] = useReducer(GamesReducers, initialState);
    const router = useRouter();
    const { id } = router.query;

    //on Change State
    
    const onChangeName = (e) => dispatch(actionChangeName(e.target.value));
    const onChangeDescription = (e) => dispatch(actionChangeDescription(e.target.value));
    const onChangeYearRelease = (e) => dispatch(actionChangeYearRelease(e.target.value));
    const onChangeGender = (e) => dispatch(actionChangeGender(e.target.value));
    const onChangeBrand = (e) => dispatch(actionChangeBrand(e.target.value));
    const onChangePrice = (e) => dispatch(actionChangePrice(e.target.value));
    const onClickUpdate = async () => await updateGame(game, router);
    const onClickDelete = async () => await deleteGame(id, router);


    return(
        <TitleProvider
            value="Game"
        >   
            <Container>

                {/* Name */}
                <TextField 
                    text="Name:"
                    type="text"
                    value={defaultValue.name}
                    onChangeField={onChangeName}
                />
                
                {/* Description */}
                <TextField 
                    text="Description:"
                    type="text"
                    value={defaultValue.description}
                    onChangeField={onChangeDescription}
                />
                
                {/* Year Release */}
                <TextField 
                    text="Year Release:"
                    type="date"
                    value={defaultValue.yearRelease}
                    onChangeField={onChangeYearRelease}
                />

                {/* Gender */}
                <TextField 
                    text="Gender:"
                    type="text"
                    value={defaultValue.gender}
                    onChangeField={onChangeGender}
                />

                {/* Brand */}
                <TextField 
                    text="Brand:"
                    type="text"
                    value={defaultValue.brand}
                    onChangeField={onChangeBrand}
                />

                {/* Price */}
                <TextField 
                    text={`Price: $${defaultValue.price}`}
                    type="number"
                    value={defaultValue.price}
                    onChangeField={onChangePrice}
                />
                
                <button 
                    className="btn btn-primary btn-lg m-5"
                    onClick={onClickUpdate}
                >
                    Update
                </button>

                <button 
                    className="btn btn-danger btn-lg m-5"
                    onClick={onClickDelete}
                >
                    Delete
                </button>

            </Container>
        </TitleProvider>
    )

}

export default Game;

export async function getServerSideProps(context){

    const store = require("store2");

    const { key, id } = context.query;

    console.log(key);
    console.log(id);

    const token = store(key);

    const subject = key.replace("access_token_", "");

    const data = await getGame(id, null, token, subject);

    return {
        props: {
            defaultValue: data
        }
    }
}