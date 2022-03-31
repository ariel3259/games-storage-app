import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

export default async function register(user, router){

    //Incomplete data
    if(!user.name || !user.lastName || !user.dni || !user.email || !user.password)
        return Swal.fire("Error", "Incomplete data", "error");

    //Invalid email
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
        return Swal.fire("Error", "Invalid email", "error");
    

    //Do a post request
    const response = await fetch("/api/users/register", {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: user.name,
            lastName: user.lastName,
            dni: user.dni,
            email: user.email,
            password: user.password
        })
    });

    //getting json data
    const data = await response.json();

    //request error
    if(response.status >= 400)
        return Swal.fire("Error", data.message, "error");

    //Response
    Swal.fire("Congratulations", data.message, "success").then( () => router.push("/"));
}