import "../styles/globals.css";
import type {AppProps} from "next/app";
import {Provider, createClient} from "urql";
import Nav from "../components/Nav";
import {StateContext} from "../lib/contex";
import {UserProvider} from "@auth0/nextjs-auth0";

const client = createClient({url: process.env.NEXT_PUBLIC_BACKEND_API!});

function MyApp({Component, pageProps}: AppProps) {
  return (
    <UserProvider>
      <StateContext>
        <Provider value={client}>
          <Nav />
          <Component {...pageProps} />
        </Provider>
      </StateContext>
    </UserProvider>
  );
}

export default MyApp;
