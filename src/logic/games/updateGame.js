import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

export default async function updateGame(game, router){
    
    if(!game.name || !game.description || !game.yearRelease || !game.gender || !game.brand || !game.price || !game.id)
        return Swal.fire("Error", "Incomplete data", "error");
    
    const response = await fetch("/api/games/update_game", {
        method: "put",
        headers:{
            "Content-Type": "application/json",
            "access_token": `${localStorage.getItem("access_token")}`,
            "subject": `${localStorage.getItem("subject")}`
        },
        body: JSON.stringify(game)
    });

    const data = await response.json();

    if(response.status === 400)
        return Swal.fire("Error", data.message, "error");

    if(response.status === 401)
        return Swal.fire("Error", "You're not logged in", "error").then(router.push("/"));

    if(response.status >= 500)
        return router.push("/");

    Swal.fire({
        title: "Success",
        text: data.message,
        icon: "success",
        showConfirmButton: false,
        timer: 1200
    });

}