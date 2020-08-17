import React, { useState } from "react";
import { TextField } from "formik-material-ui";
import Layout from "../components/Layout";
import { Formik, Form, Field } from "formik";
import { Button } from "@material-ui/core";
import * as Yup from "yup";
import { gql, useMutation } from "@apollo/client";
import ErrorMessage from "../components/ToastMessage";
import Router from "next/router";
import { REGISTER_MUTATION, UPLOAD_PICTURES } from "../graphql/mutations";

export default function DropZoneField() {
  const [imgs, setImgs] = useState(null);

  const [upload, { data, loading, error }] = useMutation(UPLOAD_PICTURES, {
    onError(err) {
      console.log(err);
    }
  });

  /* if (data) {
    console.log(data);
  }

  if (error) {
    console.log(error);
  } */
  return (
    <>
      <Formik
        initialValues={{
          userName: "",
          email: "",
          password: "",
          verifyPassword: "",
          firstName: "",
          lastName: ""
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
        }}>
        <Form>
          <input
            required
            multiple
            className='custom custom-file mb-2'
            type='file'
            name='productImage'
            onChange={e => {
              console.log(e.target.files);

              setImgs(e.target.files);
            }}
          />
          <button
            type='submit'
            onClick={() => {
              upload({ variables: { file: imgs } });
            }}>
            Upload
          </button>
        </Form>
      </Formik>
    </>
  );
}
