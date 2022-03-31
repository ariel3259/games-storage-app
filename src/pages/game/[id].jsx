import React, {useEffect, useReducer, useState} from "react";
import Container from "../../components/Container";
import { TitleProvider } from "../../context/TitleContext";
import { useRouter } from "next/router";
import getGame from "../../logic/games/getGame";
import { GamesReducers, initialState } from "../../reducers/GamesReducers";
import {actionChangeName, actionChangeDescription, actionChangeYearRelease, actionChangeGender, actionChangeBrand, actionChangePrice, actionChangeId} from "../../actions/GamesActions";
import TextField from "../../components/TextField";
import updateGame from "../../logic/games/updateGame";
import deleteGame from "../../logic/games/deleteGame";

const Game = () => {

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

    useEffect(() => {

        (async () => {
            const gameFromBackSide = await getGame(id, router); 
            dispatch(actionChangeId(gameFromBackSide.id))
            dispatch(actionChangeName(gameFromBackSide.name));
            dispatch(actionChangeDescription(gameFromBackSide.description));
            dispatch(actionChangeYearRelease(gameFromBackSide.year_release));
            dispatch(actionChangeGender(gameFromBackSide.gender));
            dispatch(actionChangeBrand(gameFromBackSide.brand));
            dispatch(actionChangePrice(gameFromBackSide.price));
        })();

    }, [id, dispatch, router]);

    return(
        <TitleProvider
            value="Game"
        >   
            <Container>

                {/* Name */}
                <TextField 
                    text="Name:"
                    type="text"
                    value={game.name}
                    onChangeField={onChangeName}
                />
                
                {/* Description */}
                <TextField 
                    text="Description:"
                    type="text"
                    value={game.description}
                    onChangeField={onChangeDescription}
                />
                
                {/* Year Release */}
                <TextField 
                    text="Year Release:"
                    type="date"
                    value={game.yearRelease}
                    onChangeField={onChangeYearRelease}
                />

                {/* Gender */}
                <TextField 
                    text="Gender:"
                    type="text"
                    value={game.gender}
                    onChangeField={onChangeGender}
                />

                {/* Brand */}
                <TextField 
                    text="Brand:"
                    type="text"
                    value={game.brand}
                    onChangeField={onChangeBrand}
                />

                {/* Price */}
                <TextField 
                    text={`Price: $${game.price}`}
                    type="number"
                    value={0}
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