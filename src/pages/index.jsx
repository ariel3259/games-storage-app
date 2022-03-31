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
  const onChangeEmail = (e) => dispatch(actionChangeEmail(e.target.value));
  const onChangePassword = (e) => dispatch(actionChangePassword(e.target.value));
  const onClickAuth = async () => await auth(user, router);  

  return (
    <TitleProvider 
      value="Log in"
    >
      <Container>
        <div 
          className="container  p-4"
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
            onClick={onClickAuth}
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
          
        </div>
      </Container>
    </TitleProvider>
  );
}
