import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux';
import { store } from '../store';
import Withauth from "@/lib/Withouth/Withauth";
import SimpleCookiePreference from "@/components/share/Cookie";
import React, { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [cookieaccepted, setCookieaccepted] = React.useState(false);

  useEffect(()=>{
    if(localStorage.getItem('cookieAccepted')){
      setCookieaccepted(true)
    }
  },[])
  return (
    <>
      <Provider store={store}>
        <Withauth>
          <ChakraProvider>
            <div style={{ minHeight: "100vh", position: "relative", paddingBottom: "80px" }}>
              <Component {...pageProps} />
             {
                !cookieaccepted && <SimpleCookiePreference style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 9999 }} /> 
             }
            </div>
          </ChakraProvider>
        </Withauth>
      </Provider>
    </>
  );
}