import Swal from "sweetalert2";

const getGames = async (router) => {
    
    const response = await fetch("/api/games/get_games",{
        headers: {
            "Content-Type": "application/json",
            "access_token": `${localStorage.getItem("access_token")}`,
            "subject": `${localStorage.getItem("subject")}`
        }
    });

    const data = await response.json();

    if(response.status >= 401){
        router.push("/");
    }
    
    return data;
}   

export default getGames;