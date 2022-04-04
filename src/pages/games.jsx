import { TitleProvider } from "../context/TitleContext";
import Container from "../components/Container";
import { useState, useReducer } from "react";
import getGames from "../logic/games/getGames";
import {actionChangeName, actionChangeDescription, actionChangeYearRelease, actionChangeGender, actionChangeBrand, actionChangePrice} from "../actions/GamesActions";
import { initialState, GamesReducers } from "../reducers/GamesReducers";
import Link from "next/link";
import ModalImp from "../components/ModalImp";
import TextField from "../components/TextField";
import saveGame from "../logic/games/saveGame";
import { useRouter } from "next/router";


const Games = ({ data }) => {
    
    //states
    const [games, setGames] = useState(data) ;
    const [show, setShow] = useState(false);
    const [game, dispatch] = useReducer(GamesReducers, initialState);
    const router = useRouter();

    const { key } = router.query;

    //onChange
    const onChangeGame = async () => setGames(await getGames(router));
    const onChangeShow = () => setShow(!show);
    const onChangeName = (e) => dispatch(actionChangeName(e.target.value));
    const onChangeDescription = (e) => dispatch(actionChangeDescription(e.target.value));
    const onChangeYearRelease = (e) => dispatch(actionChangeYearRelease(e.target.value))
    const onChangeGender = (e) => dispatch(actionChangeGender(e.target.value));
    const onChangeBrand = (e) => dispatch(actionChangeBrand(e.target.value));
    const onChangePrice = (e) => dispatch(actionChangePrice(e.target.value));
    const onSubmitSave = async (event) => {
        event.preventDefault();
        await saveGame(game, onChangeGame, router);
    }


    const listGames = games?.map(game => {
        return (
            <Link 
                key={game.id}
                href={`/game/${game.id}?key=${key}`}
                passHref
            >
                <div 
                    className="card col-md-5 m-2"
                    style={{width: "18rem", height: "6rem"}}
                >
                    <div 
                        className="card-body justify-self-center"
                    >
                        <h3>{game.name}</h3>
                    </div>
                </div>
            </Link>
        )
    });


    return(
        <TitleProvider
            value="Games"
        >
            <Container>
                <button 
                    className="btn btn-primary"
                    onClick={onChangeShow}
                >
                    Add Game
                </button>
                <div 
                    className="row"
                >
                    {listGames}
                </div>
                <ModalImp 
                    show={show}
                    HandleClose={onChangeShow}
                    body={
                        <>
                            <form
                                onSubmit={onSubmitSave}
                            >
                                    {/* Name */}
                            <TextField 
                                text="Name: "
                                type="text"
                                value={game.name}
                                onChangeField={onChangeName}
                            />

                            {/* Description */}
                            <TextField 
                                text="Description: "
                                type="text"
                                value={game.description}
                                onChangeField={onChangeDescription}
                            />

                            {/* Year Release */}
                            <TextField 
                                text="Year Release: "
                                type="date"
                                value={game.yearRelease}
                                onChangeField={onChangeYearRelease}
                            />

                            {/* Gender */}
                            <TextField 
                                text="Gender: "
                                type="text"
                                value={game.gender}
                                onChangeField={onChangeGender}
                            />

                            {/* Brand */}
                            <TextField 
                                text="Brand: "
                                type="text"
                                value={game.brand}
                                onChangeField={onChangeBrand}
                            />

                            {/* Price */}
                            <TextField 
                                text="Price: "
                                type="number"
                                value={game.price}
                                onChangeField={onChangePrice}
                            />
                            
                            <input 
                                type="submit"
                                className="btn btn-primary btn-lg"
                                value="Save game"
                            />

                            </form>
                        </>
                    }
                />
            </Container>
        </TitleProvider>
    )
}

export default Games;

export async function getServerSideProps(context){

    console.log("this is server side");

    const store = require("store2");

    const { key } = context.query;

    const token = store(key);

    const subject = key.replace("access_token_", "");

    const data = await getGames(null, token, subject);

    return {
        props: {
            data
        }
    };
}