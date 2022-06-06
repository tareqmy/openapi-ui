import React, {createContext, useState} from 'react';
import {SERVICE_DATA} from '../helpers/Constant';
import {ServiceList} from "../helpers/ServerList";

export const ServiceContext = createContext("ServiceContext");

const _services = localStorage.getItem(SERVICE_DATA);

const ServiceContextProvider = ({children}) => {

    const [services, setServices] = useState(_services ? JSON.parse(_services) : ServiceList);

    const updateServices = (index, url) => {

        let _services = services;
        _services[index].url = url;

        setServices([..._services]);
        localStorage.setItem(SERVICE_DATA, JSON.stringify(services));

    }


    return (
        <ServiceContext.Provider
            value={{
                services,
                updateServices
            }}
        >
            {children}
        </ServiceContext.Provider>
    );
}

export default ServiceContextProvider;