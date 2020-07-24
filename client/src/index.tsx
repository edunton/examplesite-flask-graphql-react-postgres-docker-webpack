import * as React from "react";
import * as ReactDOM from "react-dom";

import {App} from './app/App'
import {MainContextProvider} from './context/MainContext'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'

import 'papercss/dist/paper.min.css'

declare const __GQL_ENDPOINT__ : string

const autoendpoint = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '') + '/graphql';

//resolve endpoint if one was given during build time (expand for possiblity of hosting on CDN)
const endpoint = __GQL_ENDPOINT__ ? __GQL_ENDPOINT__ : autoendpoint

const client = new ApolloClient({
    uri: endpoint,
    cache: new InMemoryCache()
  });

//check if not supported script went off
if(!(window as any).__custom_unsupported)
{
    //offer both state providers
    //using "MainContextProvider" instead of React Router for simplicity. 
    ReactDOM.render(
        <ApolloProvider client={client}>
            <MainContextProvider>
                <App/>
            </MainContextProvider>
        </ApolloProvider>,
        document.getElementById("root-app"),
    );
}