import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

export default async function auth(user, redirect){

    //Incomplete data
    if(!user.email || !user.password)
        return Swal.fire("Error", "Incomplete data", "error");

    //Invalid email
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(user.email))
        return Swal.fire("Error", "Invalid email", "error");

    //Do a post request
    const response = await fetch("/api/users/auth", {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: user.email,
            password: user.password
        })
    });

    //Getting json data
    const data = await response.json();

    //Fail doing a request
    if(response.status >= 400)
        return Swal.fire("Error", data.message, "error");

    //storages authentification data
    localStorage.setItem("subject", data.subject);
    localStorage.setItem("access_token", data.access_token);

    //Response
    Swal.fire("Success", data.message, "success").then(() => redirect.push("/games"));
}   
