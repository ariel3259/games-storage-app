import Swal from "sweetalert2";

export default async function deleteGame(id, router){

    if(!id)
        return Swal.fire("Error", "Incomplete data", "error");

    const response = await fetch("/api/games/delete_game", {
        method: "delete",
        headers: {
            "Content-Type": "application/json",
            "access_token": `${localStorage.getItem("access_token")}`,
            "subject": `${localStorage.getItem("subject")}`,
            "id": id
        }
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
    
    router.push("/games");
}