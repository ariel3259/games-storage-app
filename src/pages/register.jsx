import Container from "../components/Container";
import { TitleProvider } from "../context/TitleContext";
import TextField from "../components/TextField";
import UsersReducers, {initialState} from "../reducers/UsersReducers";
import { useReducer } from "react";
import { 
    actionChangeName,
    actionChangeLastName,
    actionChangeDni,
    actionChangeEmail,
    actionChangePassword
 } from "../actions/UsersActions";
import Link from "next/link";
import register from "../logic/register/register";
import {useRouter} from "next/router";

const Register = () => {

    //state
    const [user, dispatch] = useReducer(UsersReducers, initialState);
    const router = useRouter();

    //on change states
    const onChangeName = (e) => dispatch(actionChangeName(e.target.value));
    const onChangeLastName = (e) => dispatch(actionChangeLastName(e.target.value));
    const onChangeDni = (e) => dispatch(actionChangeDni(e.target.value));
    const onChangeEmail  = (e) => dispatch(actionChangeEmail(e.target.value));
    const onChangePassword = (e) => dispatch(actionChangePassword(e.target.value));
    const onSubmitRegister = async (event) => {
        event.preventDefault();
        await register(user, router);
    }

    return(
        <TitleProvider 
            value="Register"
        >
            <Container>
                <form
                    className="container p-4"
                    onSubmit={onSubmitRegister}
                >
                    {/* Name */}
                    <TextField 
                        text="Name:" 
                        type="text" 
                        value={user.name} 
                        onChangeField={onChangeName}
                    />

                    {/* Last name */}
                    <TextField 
                        text="Last Name:" 
                        type="text" 
                        value={user.lastName} 
                        onChangeField={onChangeLastName}
                    />

                    {/* Dni */}
                    <TextField 
                        text="Dni:" 
                        type="text" 
                        value={user.dni} 
                        onChangeField={onChangeDni}
                    />

                    {/* Email */}
                    <TextField 
                        text="Email:" 
                        type="email" 
                        value={user.email} 
                        onChangeField={onChangeEmail}
                    />

                    {/* Password */}
                    <TextField 
                        text="Password:"
                        type="password" 
                        value={user.password} 
                        onChangeField={onChangePassword}
                    />

                    <input 
                        type="submit"
                        value="Register"
                        className="btn btn-primary btn-lg m-4"
                    />
                    <Link 
                        href="/" 
                        passHref
                    >
                        <button 
                            className="btn btn-secondary btn-lg m-4"
                        >
                            Cancel
                        </button>
                    </Link>

                </form>
            </Container>
        </TitleProvider>
    );
}

export default Register;