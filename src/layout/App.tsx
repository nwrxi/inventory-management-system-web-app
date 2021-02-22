import React, { Fragment } from "react";
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

const App: React.FC<RouteComponentProps> = ({ location }) => {
  return (
    // <div className="App">
    //   <LoginForm />
    // </div>

    <Fragment>
      {/* TODO: if user is logged then homepage if not then login page */}
      {/* <Route exact path="/" component={HomePage} /> */}
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
                {/* <Route exact path="/activities" component={ActivityDashboard} /> */}
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
