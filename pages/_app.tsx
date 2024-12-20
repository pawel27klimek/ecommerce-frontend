import "../styles/globals.css";
import type {AppProps} from "next/app";
import {Provider, createClient} from "urql";
import Nav from "../components/Nav";
import {StateContext} from "../lib/contex";
import {UserProvider} from "@auth0/nextjs-auth0";
import {Toaster} from "react-hot-toast";

const client = createClient({url: process.env.NEXT_PUBLIC_BACKEND_API!});

function MyApp({Component, pageProps}: AppProps) {
  return (
    <UserProvider>
      <StateContext>
        <Provider value={client}>
          <Toaster />
          <Nav />
          <Component {...pageProps} />
        </Provider>
      </StateContext>
    </UserProvider>
  );
}

export default MyApp;
