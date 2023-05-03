import React from "react";
import { DefaultLayout } from "layouts";
import "../styles/globals.scss";
import { getLibrary } from "helpers/getLibrary";
import { Web3ReactProvider } from "@web3-react/core";
import { appWithTranslation } from "next-i18next";
import nextI18NextConfig from "next-i18next.config";
import { ManageProvider } from "layouts/ManageProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App({ Component, pageProps }) {
  const Layout = Component.Layout || DefaultLayout;

  return (
    <>
      <Web3ReactProvider getLibrary={getLibrary}>
        <ManageProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ManageProvider>
      </Web3ReactProvider>
      <ToastContainer />
    </>
  );
}

export default appWithTranslation(App, nextI18NextConfig);
