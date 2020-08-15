import React from "react";
import { TextField } from "formik-material-ui";
import Layout from "../components/Layout";
import { Formik, Form, Field } from "formik";
import { Button } from "@material-ui/core";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import ErrorMessage from "../components/ToastMessage";
import { initializeApollo } from "../lib/apollo";
import { useRouter } from "next/router";
import { LOGIN_MUTATION } from "../graphql/mutations";

// form validation useing Yup
const validate = () =>
  Yup.object({
    userName: Yup.string()
      .min(2, "Must be more than one character")
      .required("Username is required"),
    password: Yup.string()
      .min(8, "Must be more than 8 characters")
      .required("This field is required")
  });

export default function login() {
  const [login, { data, loading }] = useMutation(LOGIN_MUTATION);

  const handleRegisterSuccess = () => {
    if (data?.login?.ok) {
      useRouter().push("/");
      return <ErrorMessage message='Logged in successfully' case='success' />;
    }
  };

  return (
    <Layout>
      {loading && <div>logging in.....</div>}
      {data?.login?.error && <ErrorMessage message={data.login.error} case='error' />}

      {handleRegisterSuccess()}

      <Formik
        initialValues={{
          userName: "",
          password: ""
        }}
        validationSchema={validate}
        onSubmit={(values, { setSubmitting }) => {
          login({
            variables: {
              userName: values.userName,
              password: values.password
            }
          });
          setSubmitting(false);
        }}>
        <Form>
          <Field component={TextField} name='userName' label='User Name' required />
          <br />
          <Field
            component={TextField}
            name='password'
            type='password'
            label='Password'
            required
          />
          <br />

          <Button type='submit' variant='contained' color='secondary'>
            Log In
          </Button>
        </Form>
      </Formik>
    </Layout>
  );
}
