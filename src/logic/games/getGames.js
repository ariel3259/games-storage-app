import Swal from "sweetalert2";

const getGames = async (router, token, subject) => {
    
    const response = await fetch("http://localhost:3000/api/games/get_games",{
        headers: {
            "Content-Type": "application/json",
            "access_token": `${token || localStorage.getItem("access_token")}`,
            "subject": `${ subject || localStorage.getItem("subject")}`
        }
    });

    const data = await response.json();

    if(response.status >= 401){
        router.push("/");
    }
    
    return data;
}   

export default getGames;