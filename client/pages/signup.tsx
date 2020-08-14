import React, { useState } from "react";
import { TextField } from "formik-material-ui";
import Layout from "../components/Layout";
import { Formik, Form, Field } from "formik";
import { Button } from "@material-ui/core";
import * as Yup from "yup";
import { gql, useMutation } from "@apollo/client";
import ErrorMessage from "../components/ToastMessage";
import Router from "next/router";
import { REGISTER_MUTATION } from "../graphql/mutations";

// form validation useing Yup
const validate = () =>
  Yup.object({
    userName: Yup.string()
      .min(2, "Must be more than one character")
      .required("Username is required"),
    password: Yup.string()
      .min(8, "Must be more than 8 characters")
      .required("This field is required"),
    verifyPassword: Yup.string()
      .min(8, "Must be more than 8 characters")
      .required("This field is required"),
    firstName: Yup.string()
      .min(2, "Must be more than one character")
      .required("This field is required"),
    lastName: Yup.string()
      .min(2, "Must be more than one character")
      .required("This field is required"),
    email: Yup.string()
      .email("Please enter a vaild email")
      .required("This field is required")
  });

export default function signup() {
  const [register, { data, loading, error }] = useMutation(REGISTER_MUTATION, {
    onError(error) {
      //console.log(error);
    }
  });

  const handleRegisterSuccess = () => {
    try {
      if (data?.signUp?.ok) {
        Router.push("/");
        return <ErrorMessage message='Registered Succefully' case='success' />;
      }
    } catch (e) {
      throw e;
    }
  };

  return (
    <Layout>
      {data?.signUp?.error && <ErrorMessage message={data.signUp.error} case='error' />}

      {handleRegisterSuccess()}

      <Formik
        initialValues={{
          userName: "",
          email: "",
          password: "",
          verifyPassword: "",
          firstName: "",
          lastName: ""
        }}
        validationSchema={validate}
        onSubmit={(values, { setSubmitting }) => {
          register({
            variables: {
              userName: values.userName,
              email: values.email,
              password: values.password,
              verifyPassword: values.verifyPassword,
              firstName: values.firstName,
              lastName: values.lastName
            }
          });
          setSubmitting(false);
        }}>
        <Form>
          <Field component={TextField} name='userName' label='User Name' required />
          <br />
          <Field component={TextField} name='email' type='email' label='Email' required />
          <br />
          <Field
            component={TextField}
            name='password'
            type='password'
            label='Password'
            required
          />
          <br />
          <Field
            component={TextField}
            name='verifyPassword'
            type='password'
            label='Verify Password'
            required
          />
          <br />
          <Field component={TextField} name='firstName' label='First Name' required />
          <br />
          <Field component={TextField} name='lastName' label='Last Name' required />
          <br />
          <Button type='submit' variant='contained' color='secondary'>
            sign Up
          </Button>
        </Form>
      </Formik>
    </Layout>
  );
}
