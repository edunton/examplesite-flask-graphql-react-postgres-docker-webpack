import * as React from "react";
import * as ReactDOM from "react-dom";

import {App} from './app/App'
import {MainContextProvider} from './context/MainContext'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'

import 'papercss/dist/paper.min.css'

declare const __GQL_ENDPOINT__ : string

const autoendpoint = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '') + '/graphql';

const endpoint = __GQL_ENDPOINT__ ? __GQL_ENDPOINT__ : autoendpoint

const client = new ApolloClient({
    uri: endpoint,
    cache: new InMemoryCache()
  });

if(!(window as any).__custom_unsupported)
{
    ReactDOM.render(
        <ApolloProvider client={client}>
            <MainContextProvider>
                <App/>
            </MainContextProvider>
        </ApolloProvider>,
        document.getElementById("root-app"),
    );
}