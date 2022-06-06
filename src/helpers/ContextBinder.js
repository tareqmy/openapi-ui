import AuthContextProvider from "../contexts/AuthContextProvider";
import App from "../App";
import ServiceContextProvider from "../contexts/ServiceContextProvider";

const contextProviders = [
    AuthContextProvider,
    ServiceContextProvider,
]

export const getAppWithContextProviders = () => {

    let result = <App/>
    contextProviders.forEach(Provider => result = <Provider>{result}</Provider>);

    return result;
}