import React, { Fragment, useContext, useEffect } from "react";
import "./App.css";
import LoginForm from "../features/user/LoginForm";
import {
  Redirect,
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
import NavBar from "./navigation/NavBar";
import Loading from "./Loading";
import AddItemModal from "../features/items/AddItemModal";
import { isMobile } from "react-device-detect";
import AccountPage from "../features/user/AccountPage";
import PublicAccountPage from "../features/user/PublicAccountPage";
import NotFound from "./NotFound";
import ServerError from "./ServerError";
import ItemPage from "../features/items/ItemPage";
import EditItemModal from "../features/items/EditItemModal";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  const baseStore = useContext(BaseStoreContext);
  const { getCurrentUser, user, logout } = baseStore.userStore;
  const { setLoading, loading } = baseStore.commonStore;

  useEffect(() => {
    setLoading(true);
    if (window.localStorage.getItem("token")) {
      getCurrentUser().finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [getCurrentUser, setLoading]);

  //TODO: make something better
  if (isMobile) {
    return <Fragment>Use our app to use our website on mobile</Fragment>;
  }

  if (loading) {
    return <Loading />;
  }

  if (!user || !window.localStorage.getItem("token")) {
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
                  <Route exact path="/ServerError" component={ServerError} />
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
      <AddItemModal />
      <EditItemModal />
      <Route exact path="/">
        <Redirect to="/inventory" />
      </Route>
      {/* When we hit route with / and anything else this route will match */}
      <Route
        path={"/(.+)"}
        render={() => (
          <Fragment>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              {/* Only one route can be displayed at once in Switch component */}
              <Switch>
                {/* <ActivityDashboard /> */}
                {/* Without exact when we go to /activities for react
         both www.something.com/ and .com/activities match so both will be rendered */}
                {user.isAdmin && user.isAdmin === "True" && (
                  <Route exact path="/register" component={RegisterForm} />
                )}
                <Route
                  exact
                  key={location.key}
                  path="/inventory/:searchData?"
                  component={InventoryPage}
                />
                {/* :id is a route parameter */}
                {/* <Route path="/account/:id" component={AccountPage} /> */}
                {/* <Route
                  //Whenever key changes we will re-initialise this component
                  key={location.key}
                  path={["/createActivity", "/manage/:id"]}
                  component={ActivityForm}
                /> */}
                <Route
                  exact
                  path="/item/:id"
                  component={(props: { match: { params: { id: string } } }) => (
                    <ItemPage id={props.match.params.id} />
                  )}
                />
                <Route
                  exact
                  path="/account/:id"
                  component={(props: { match: { params: { id: string } } }) => (
                    <PublicAccountPage id={props.match.params.id} />
                  )}
                />
                <Route exact path="/account" component={AccountPage} />
                {/* <Route path="/login" component={LoginForm} />
                <Route path="/register" component={RegisterForm} /> */}
                {/* If route can't be found we will be redirected here */}
                <Route exact path="/ServerError" component={ServerError} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default withRouter(observer(App));
