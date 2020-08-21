import React from "react";
import { Formik, Form, Field } from "formik";
import { Grid, Button } from "@material-ui/core";
import * as Yup from "yup";
import { TextField } from "formik-material-ui";
import { useMutation } from "@apollo/client";
import { UPDATE_PROGILE_MUTATION } from "../../graphql/mutations";
import ErrorMessage from "../ToastMessage";
import Router from "next/router";

// form validation using Yup
const validate = () =>
  Yup.object({
    skype: Yup.string().notRequired().min(2, "Must be more than one character"),
    instagram: Yup.string().notRequired().min(2, "Must be more than one character"),
    snapchat: Yup.string().notRequired().min(2, "Must be more than one character"),
    facebook: Yup.string().notRequired().min(2, "Must be more than one character"),
    website: Yup.string().notRequired().min(2, "Must be more than one character")
  });

const Contact = ({ me }) => {
  let { contactInfo } = me;

  // handle the update profile mutation
  const [updateProfile, { data, loading }] = useMutation(UPDATE_PROGILE_MUTATION);

  // show error or success message
  const handleSuccessError = () => {
    if (data?.updateProfileInfo.ok) {
      Router.push(`/users/${me.userName}`);
      return (
        <ErrorMessage message={data?.updateProfileInfo.successMessage} case='success' />
      );
    }
    if (data?.updateProfileInfo.error) {
      return <ErrorMessage message={data?.updateProfileInfo.error} case='error' />;
    }
  };

  return (
    <>
      {handleSuccessError()}
      <Formik
        initialValues={{
          skype: contactInfo.skype,
          instagram: contactInfo.instagram,
          snapchat: contactInfo.snapchat,
          facebook: contactInfo.facebook,
          website: contactInfo.website
        }}
        validationSchema={validate}
        onSubmit={(values, { setSubmitting }) => {
          let socialMedia = {
            skype: values.skype,
            instagram: values.instagram,
            snapchat: values.snapchat,
            facebook: values.facebook,
            website: values.website
          };

          updateProfile({
            variables: {
              contactInfo: socialMedia
            }
          });
          setSubmitting(false);
        }}>
        <Form>
          {/* Skype */}
          <Grid container>
            <Grid item sm={2}>
              Skype
            </Grid>
            <Grid item sm={10}>
              <Field component={TextField} name='skype' label='Skype' />
            </Grid>
          </Grid>

          {/* Instagram */}
          <Grid container>
            <Grid item sm={2}>
              Instagram
            </Grid>
            <Grid item sm={10}>
              <Field component={TextField} name='instagram' label='Instagram' />
            </Grid>
          </Grid>

          {/* Snapchat */}
          <Grid container>
            <Grid item sm={2}>
              Snapchat
            </Grid>
            <Grid item sm={10}>
              <Field component={TextField} name='snapchat' label='Snapchat' />
            </Grid>
          </Grid>

          {/* Facebook */}
          <Grid container>
            <Grid item sm={2}>
              Facebook
            </Grid>
            <Grid item sm={10}>
              <Field component={TextField} name='facebook' label='Facebook' />
            </Grid>
          </Grid>

          {/* Website */}
          <Grid container>
            <Grid item sm={2}>
              Website
            </Grid>
            <Grid item sm={10}>
              <Field component={TextField} name='website' label='Website' />
            </Grid>
          </Grid>

          {/* Submit buttom */}
          <Button type='submit' variant='contained' color='secondary'>
            Save
          </Button>
        </Form>
      </Formik>
    </>
  );
};

export default Contact;
