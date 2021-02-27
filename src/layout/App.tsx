import React, { Fragment, useContext, useEffect } from "react";
import "./App.css";
import LoginForm from "../features/user/LoginForm";
import {
  Route,
  RouteComponentProps,
  Switch,
  withRouter,
} from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Container } from "react-bootstrap";
import RegisterForm from "../features/user/RegisterForm";
import InventoryPage from "../features/user/Inventory/InventoryPage";
import { BaseStoreContext } from "../stores/BaseStore";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  const baseStore = useContext(BaseStoreContext);
  const { getUser, user } = baseStore.userStore;

  useEffect(() => {
    if (window.localStorage.getItem("token")) {
      getUser();
    }
  }, [getUser]);

  if (!user) {
    return (
      <Fragment>
        <Route exact path="/" component={LoginForm} />
        <Route
          path={"/(.+)"}
          render={() => (
            <Fragment>
              <Container style={{ marginTop: "7em" }}>
                <Switch>
                  <Route path="/login" component={LoginForm} />
                  <Route path="/register" component={RegisterForm} />
                  <Route component={LoginForm} />
                </Switch>
              </Container>
            </Fragment>
          )}
        />
      </Fragment>
    );
  }

  return (
    <Fragment>
      {/* TODO: if user is logged then homepage if not then login page */}
      <Route exact path="/" component={LoginForm} />
      {/* When we hit route with / and anything else this route will match */}
      <Route
        path={"/(.+)"}
        render={() => (
          <Fragment>
            {/* <NavBar /> */}
            <Container style={{ marginTop: "7em" }}>
              {/* Only one route can be displayed at once in Switch component */}
              <Switch>
                {/* <ActivityDashboard /> */}
                {/* Without exact when we go to /activities for react
         both www.something.com/ and .com/activities match so bot will be rendered */}
                <Route exact path="/inventory" component={InventoryPage} />
                {/* :id is a route parameter */}
                {/* <Route path="/activities/:id" component={ActivityDetails} /> */}
                {/* <Route
                  //Whenever key changes we will re-initialise this component
                  key={location.key}
                  path={["/createActivity", "/manage/:id"]}
                  component={ActivityForm}
                /> */}
                <Route path="/login" component={LoginForm} />
                <Route path="/register" component={RegisterForm} />
                {/* If route can't be found we will be redirected here */}
                {/* <Route component={NotFound} /> */}
              </Switch>
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default withRouter(observer(App));
