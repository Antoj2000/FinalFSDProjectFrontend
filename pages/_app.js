import "../styles/globals.css";
import Layout from "../components/layout/Layout";
import { GlobalContextProvider } from "./store/globalContext";
import Login from "../components/new/Login";

function MyApp({ Component, pageProps }) {
  return (
    <GlobalContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Login />
    </GlobalContextProvider>
  );
}

export default MyApp;
