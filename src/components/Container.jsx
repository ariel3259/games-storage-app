import Head from "next/head";
import Navigation from "./Navigation";
import { useContext } from "react";
import TitleContext from "../context/TitleContext";

const Container = ({ children }) => {

    const title = useContext(TitleContext);

    return(
        <div>
            <Head>
                <title>
                    {title}
                </title>
            </Head>
            <Navigation />
            <div 
                className="container md-4"
            >
                <h1 
                    className="mt-4"
                >
                    {title}
                </h1>
                {children}
            </div>
        </div>
    )
}

export default Container