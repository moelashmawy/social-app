import React from "react";
import { TextField, Select } from "formik-material-ui";
import { Formik, Form, Field } from "formik";
import {
  Button,
  Grid,
  MenuItem,
  InputLabel,
  FormControl,
  Divider
} from "@material-ui/core";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import ErrorMessage from "../../components/ToastMessage";
import { useRouter } from "next/router";

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

export default function General({ me }) {
  //const [login, { data, loading }] = useMutation(LOGIN_MUTATION);

  /* const handleRegisterSuccess = () => {
    if (data?.login?.ok) {
      useRouter().replace("/homePage");

      return <ErrorMessage message='Logged in successfully' case='success' />;
    }
  }; */

  return (
    <>
      {/* {loading && <div>logging in.....</div>}
      {data?.login?.error && <ErrorMessage message={data.login.error} case='error' />}

      {handleRegisterSuccess()} */}

      <Formik
        initialValues={{
          firstName: me.firstName,
          lastName: me.lastName,
          birthday: me.birthday,
          gender: me.gender,
          country: me.country,
          education: me.education,
          job: me.job,
          relationship: me.relationship
        }}
        validationSchema={validate}
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
          {/* first name */}
          <Grid container>
            <Grid item sm={2}>
              First Name
            </Grid>
            <Grid item sm={10}>
              <Field component={TextField} name='firstName' label='First Name' required />
            </Grid>
          </Grid>

          <Divider />

          {/* last name */}
          <Grid container>
            <Grid item sm={2}>
              Last Name
            </Grid>
            <Grid item sm={10}>
              <Field component={TextField} name='lastName' label='Last Name' required />
            </Grid>
          </Grid>

          <Divider />

          {/* Birthday */}
          <Grid container>
            <Grid item sm={2}>
              Birthday
            </Grid>
            <Grid item sm={10}>
              <Field type='date' name='birthday' label='Birthday' required />
            </Grid>
          </Grid>

          <Divider />

          {/* Gender */}
          <Grid container>
            <Grid item sm={2}>
              Gender
            </Grid>
            <Grid item sm={10}>
              <FormControl>
                <InputLabel>Select</InputLabel>
                <Field component={Select} name='gender' required>
                  <MenuItem value='male'>Male</MenuItem>
                  <MenuItem value='female'>Female</MenuItem>
                </Field>
              </FormControl>
            </Grid>
          </Grid>

          <Divider />

          {/* Country */}
          <Grid container>
            <Grid item sm={2}>
              Country
            </Grid>
            <Grid item sm={10}>
              <Field component={Select} name='country' required>
                <MenuItem value='egypt'>Egypt</MenuItem>
                <MenuItem value='United States'>USA</MenuItem>
                <MenuItem value='germany'>Germany</MenuItem>
              </Field>
            </Grid>
          </Grid>

          <Divider />

          {/* Education */}
          <Grid container>
            <Grid item sm={2}>
              Education
            </Grid>
            <Grid item sm={10}>
              <Field
                labelId='demo-simple-select-autowidth-label'
                component={Select}
                name='education'
                required>
                <MenuItem value='not-specified'>Not Specified</MenuItem>
                <MenuItem value='high-school'>High School</MenuItem>
                <MenuItem value='some-college'>Some College</MenuItem>
                <MenuItem value="Bachelor's Degree">Bachelor's Degree</MenuItem>
                <MenuItem value='Graduate Degree'>Graduate Degree</MenuItem>
              </Field>
            </Grid>
          </Grid>

          <Divider />

          {/*  Occupation or Job  */}
          <Grid container>
            <Grid item sm={2}>
              Occupation or Job
            </Grid>
            <Grid item sm={10}>
              <Field
                component={TextField}
                name='job'
                label=' Occupation or Job'
                required
              />
            </Grid>
          </Grid>

          <Divider />

          {/* Relationship status */}
          <Grid container>
            <Grid item sm={2}>
              Relationship status
            </Grid>
            <Grid item sm={10}>
              <Field component={Select} name='relationship' required>
                <MenuItem value='not-specified'>Not Specified</MenuItem>
                <MenuItem value='single'>Single</MenuItem>
                <MenuItem value='in-relationship'>In a relationship</MenuItem>
                <MenuItem value='married'>Married</MenuItem>
                <MenuItem value='its-complicated'>It's Complicated</MenuItem>
              </Field>
            </Grid>
          </Grid>

          <Divider />

          {/* Submit buttom */}
          <Button type='submit' variant='contained' color='secondary'>
            Update
          </Button>
        </Form>
      </Formik>
    </>
  );
}
