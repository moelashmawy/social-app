import React from "react";
import { Formik, Form, Field } from "formik";
import { Grid, Button } from "@material-ui/core";
import { TextField } from "formik-material-ui";

interface ContactProps {}

const Contact: React.FC<ContactProps> = () => {
  return (
    <Formik
      initialValues={{
        userName: "",
        password: ""
      }}
      //validationSchema={validate}
      onSubmit={(values, { setSubmitting }) => {
        /* login({
              variables: {
                userName: values.userName,
                password: values.password
              }
            }); */
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
          Update
        </Button>
      </Form>
    </Formik>
  );
};

export default Contact;
