import { Form, Field, Formik } from "formik";
import React, { CSSProperties, Fragment, useContext } from "react";
import { Button, Spinner } from "react-bootstrap";
import * as Yup from "yup";
import { LinkContainer } from "react-router-bootstrap";
import { BaseStoreContext } from "../../stores/BaseStore";
import { observer } from "mobx-react-lite";

const loginPageStyle: CSSProperties = {
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -80%)",
  maxWidth: "530px",
  background: "#fff",
  padding: "30px",
  borderRadius: "10px",
  boxShadow: "0px 0px 10px 10px rgba(0,0,0,0.15)",
};

const labelStyle: CSSProperties = {
  float: "left",
};

export default observer(function RegisterForm() {
  const baseStore = useContext(BaseStoreContext);
  const { register } = baseStore.userStore;

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        error: null,
      }}
      onSubmit={(values, { setErrors }) =>
        // login(values).catch((error) => setErrors({ error }))
      }
      validationSchema={Yup.object({
        firstName: Yup.string().required("First name is required"),
        lastName: Yup.string().required("Last name is required"),
        email: Yup.string()
          .email("Email not valid")
          .required("Email is required"),
        password: Yup.string().required("Password is required"),
      })}
    >
      {({ handleSubmit, touched, isSubmitting, errors, isValid, dirty }) => (
        <Fragment>
          <div className="container">
            <div className="login-wrapper" style={loginPageStyle}>
              <h2>Inventory Management System</h2>
              <h3>Register Page</h3>
              <Form className="form-container">
                <div className="form-group">
                  <label style={labelStyle} htmlFor="firstName">
                    First name
                  </label>
                  <Field
                    type="text"
                    name="firstName"
                    className={"form-control"}
                    placeholder="First Name"
                  />
                  {touched.firstName && errors.firstName && (
                    <span className="help-block text-danger">
                      {errors.firstName}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label style={labelStyle} htmlFor="lastName">
                    Last name
                  </label>
                  <Field
                    type="text"
                    name="lastName"
                    className={"form-control"}
                    placeholder="Last Name"
                  />
                  {touched.lastName && errors.lastName && (
                    <span className="help-block text-danger">
                      {errors.lastName}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label style={labelStyle} htmlFor="email">
                    Email
                  </label>
                  <Field
                    type="text"
                    name="email"
                    className={"form-control"}
                    placeholder="Email"
                  />
                  {touched.email && errors.email && (
                    <span className="help-block text-danger">
                      {errors.email}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label style={labelStyle} htmlFor="password">
                    Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    className={"form-control"}
                    placeholder="Password"
                  />
                  {touched.password && errors.password && (
                    <span className="help-block text-danger">
                      {errors.password}
                    </span>
                  )}
                </div>
                {!isSubmitting && (
                  <Button
                    disabled={!dirty || !isValid}
                    variant="primary"
                    type="submit"
                  >
                    Register
                  </Button>
                )}
                {isSubmitting && (
                  <Button variant="primary" disabled>
                    <Spinner
                      as="span"
                      animation="grow"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    Register
                  </Button>
                )}
                <LinkContainer to="/login">
                  <Button className="ml-2" variant="danger">
                    Go back to login
                  </Button>
                </LinkContainer>
              </Form>
            </div>
          </div>
        </Fragment>
      )}
    </Formik>
  );
});
