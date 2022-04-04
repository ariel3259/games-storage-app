import { TitleProvider } from "../context/TitleContext";
import Container from "../components/Container";
import TextField from "../components/TextField";
import UsersReducers, { initialState } from "../reducers/UsersReducers";
import { actionChangeEmail, actionChangePassword } from "../actions/UsersActions";
import { useReducer } from "react";
import Link from "next/link";
import { useRouter} from "next/router";
import auth from "../logic/auth/auth";

export default function Index() {

  //state
  const [user, dispatch] = useReducer(UsersReducers, initialState);
  const router = useRouter();

  //on Change states
  const onChangeEmail = (event) => dispatch(actionChangeEmail(event.target.value));
  const onChangePassword = (event) => dispatch(actionChangePassword(event.target.value));
  const onSubmitAuth = async (event) => {
    event.preventDefault();
    await auth(user, router);
  }

  return (
    <TitleProvider 
      value="Log in"
    >
      <Container>
        <form
          className="Container p-4"
          onSubmit={onSubmitAuth}
        >
          
          {/* Input Email */}
          <TextField 
            text="Email" 
            type="email" 
            value={user.email} 
            onChangeField={onChangeEmail}
          />

          {/* Input Password */}
          <TextField 
            text="Password" 
            type="password" 
            value={user.password} 
            onChangeField={onChangePassword}
          />

          <button 
            className="btn btn-primary btn-lg m-4" 
            type="submit"
            value="Submit"
          >
              Log in
          </button>

          <Link 
            href="/register" 
            passHref
          >
            <button 
              className="btn btn-secondary btn-lg m-4"
            >
                Register
            </button>
          </Link>

        </form>
      </Container>
    </TitleProvider>
  );
}


  

  
 