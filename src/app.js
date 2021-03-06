import React from "react";

import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router";
import { createStore } from "redux";
import { Provider as ReduxProvider } from "react-redux";

import personList from "./reducers/personList";
import Header from "./views/Header";
import SearchPage from "./views/SearchPage";
import PersonDetail from "./views/PersonDetail";
import HistoryPage from "./views/HistoryPage";

const store = createStore(personList);

const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: "https://api.graphcms.com/simple/v1/swapi"
  }),
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <ReduxProvider store={store}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <div className="App">
            <Header />
            <div className="Content">
              <Switch>
                <Route exact path="/" component={SearchPage} />
                <Route exact path="/person/:id" render={routeProps => <PersonDetail {...routeProps} client={apolloClient} />} />
                <Route exact path="/history" component={HistoryPage} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </ReduxProvider>
    </ApolloProvider>
  );
}

export { App };
