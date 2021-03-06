import React from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.css';
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import "./index.css";
import App from "./App";

import { ThemeSwitcherProvider } from "react-css-theme-switcher";

const themes = {
  dark: `${process.env.PUBLIC_URL}/dark-theme.css`,
  light: `${process.env.PUBLIC_URL}/light-theme.css`,
};

const prevTheme = window.localStorage.getItem("theme");

let subgraphUri = "http://localhost:8000/subgraphs/name/rkalis/radicalize-art"

const client = new ApolloClient({
  uri: subgraphUri,
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <ThemeSwitcherProvider themeMap={themes} defaultTheme={prevTheme ? prevTheme : "light"}>
      <App subgraphUri={subgraphUri}/>
    </ThemeSwitcherProvider>
  </ApolloProvider>,
  document.getElementById("root"),
);
