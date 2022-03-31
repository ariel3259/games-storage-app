import Swal from "sweetalert2";

export default async function getGame(id, router){

    const response = await fetch("/api/games/get_game", {
        headers:{
            "Content-Type": "application/json",
            "access_token": `${localStorage.getItem("access_token")}`,
            "subject": `${localStorage.getItem("subject")}`,
            "id": id
        }
    });

    const data = await response.json();

    if(response.status >= 400)
        return Swal.fire("Error", data.message, "error");

    if(response.status === 401)
        return Swal.fire("Error", "You're not logged in", "error").then(router.push("/"));

    if(response.status >= 500)
        return router.push("/");
    return data;
}