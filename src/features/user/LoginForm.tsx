import { FormikProps, Form, Field, withFormik } from "formik";
import React, { CSSProperties, Fragment } from "react";
import { Button, Spinner } from "react-bootstrap";
import * as Yup from "yup";

// Shape of form values
interface FormValues {
  email: string;
  password: string;
}

interface OtherProps {}

// Aside: You may see InjectedFormikProps<OtherProps, FormValues> instead of what comes below in older code.. InjectedFormikProps was artifact of when Formik only exported a HoC. It is also less flexible as it MUST wrap all props (it passes them through).
const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting, isValid, dirty } = props;

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

  return (
    <Fragment>
      <div className="container">
        <div className="login-wrapper" style={loginPageStyle}>
          <h2>Inventory Management System</h2>
          <h3>Login Page</h3>
          <Form className="form-container">
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
                <span className="help-block text-danger">{errors.email}</span>
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
                Login
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
                Login
              </Button>
            )}
          </Form>
        </div>
      </div>
    </Fragment>
  );
};

// The type of props MyForm receives
interface MyFormProps {
  initialEmail?: string;
}

// Wrap our form with the withFormik HoC
const LoginForm = withFormik<MyFormProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: (props) => {
    return {
      email: props.initialEmail || "",
      password: "",
    };
  },

  validationSchema: Yup.object().shape({
    email: Yup.string().email("Email not valid").required("Email is required"),
    password: Yup.string().required("Password is required"),
  }),

  handleSubmit: (values) => {
    console.log(values);
  },
})(InnerForm);

export default LoginForm;
