import Swal from "sweetalert2";

export default async function getGame(id, router, token, subject){

    const response = await fetch("http://localhost:3000/api/games/get_game", {
        headers:{
            "Content-Type": "application/json",
            "access_token": `${token}`,
            "subject": `${subject}`,
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