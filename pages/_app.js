import '../styles/globals.css';
import { Navbar } from "../components/navbar";
import Router from "next/router";
import { useState, useEffect } from "react";
import { Loading } from '../components/loading';

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);
  return (
    <>
      <Navbar />
      {loading ? <Loading/>: <Component {...pageProps} />}
    </>
  );
}