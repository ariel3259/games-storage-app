import { createContext } from "react";

const TitleContext = createContext("");

export const TitleProvider = TitleContext.Provider;
export const TitleConsumer = TitleContext.Consumer;

export default TitleContext;