import { useContext } from "react";
import TitleContext from "../context/TitleContext";
import { useRouter } from "next/router";
import Link from "next/link";

const Navigation = () => {

    const title = useContext(TitleContext);
    const router = useRouter();

    const onClickLogOut = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("subject");
        router.push("/");
    }

    const isLoged = title === "Log in" || title === "Register" ? 
    <a></a>: 
    
      <li 
        className="nav-item"
      >
        <a 
          className="nav-link" 
          onClick={onClickLogOut}
          style={{cursor: "pointer"}}
        >
          Log out
        </a>
      </li>;

    const showGamesPage = title === "Game" ?
    <Link 
        href={`/games?key=${localStorage.getItem("serverTokenKey")}`}
        passHref
      >
        <li 
          className="nav-item"
        >
          <a 
            className="nav-link"
            style={{cursor: "pointer"}}
          >
            Games
          </a>
        </li>
      </Link>: 
      <a></a>;

    return(
<nav 
  className="navbar navbar-expand-lg navbar-dark bg-dark"
  >
  <div 
    className="container-fluid"
    >
    <a 
      className="navbar-brand"
      >
      {title}
    </a>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span 
        className="navbar-toggler-icon" 
      />
    </button>
    <div 
      className="collapse navbar-collapse" 
      id="navbarNav"
    >
      <ul 
        className="navbar-nav"
      >
        {showGamesPage}
        {isLoged}
      </ul>
    </div>
  </div>
</nav>
    );
}

export default Navigation;