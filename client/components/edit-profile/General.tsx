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
import Router, { useRouter } from "next/router";
import { UPDATE_PROGILE_MUTATION } from "../../graphql/mutations";

// form validation using Yup
const validate = () =>
  Yup.object({
    firstName: Yup.string().min(2, "Must be more than one character"),
    lastName: Yup.string().min(2, "Must be more than one character"),
    birthday: Yup.string().min(2, "Must be more than one character"),
    gender: Yup.string().min(2, "Must be more than one character"),
    country: Yup.string().min(2, "Must be more than one character"),
    city: Yup.string().min(2, "Must be more than one character"),
    education: Yup.string().min(2, "Must be more than one character"),
    job: Yup.string().min(2, "Must be more than one character"),
    relationship: Yup.string().min(2, "Must be more than one character")
  });

export default function General({ me }) {
  // handle the update profile mutation
  const [updateProfile, { data, loading }] = useMutation(UPDATE_PROGILE_MUTATION);

  // show error or success message
  const handleSuccessError = () => {
    if (data?.updateProfileInfo.ok) {
      useRouter().push(`/users/${me.userName}`);
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
          firstName: me.firstName ? me.firstName : "",
          lastName: me.lastName ? me.lastName : "",
          birthday: me.birthday ? me.birthday : "",
          gender: me.gender ? me.gender : "",
          country: me.country ? me.country : "",
          city: me.city ? me.city : "",
          education: me.education ? me.education : "",
          job: me.job ? me.job : "",
          relationship: me.relationship ? me.relationship : ""
        }}
        validationSchema={validate}
        onSubmit={(values, { setSubmitting }) => {
          updateProfile({
            variables: {
              firstName: values.firstName,
              lastName: values.lastName,
              birthday: values.birthday,
              gender: values.gender,
              country: values.country,
              city: values.city,
              education: values.education,
              job: values.job,
              relationship: values.relationship
            }
          });
          setSubmitting(false);
        }}>
        <Form>
          {/* first name */}
          <Grid container>
            <Grid item sm={2}>
              First Name
            </Grid>
            <Grid item sm={10}>
              <Field component={TextField} name='firstName' label='First Name' />
            </Grid>
          </Grid>

          <Divider />

          {/* last name */}
          <Grid container>
            <Grid item sm={2}>
              Last Name
            </Grid>
            <Grid item sm={10}>
              <Field component={TextField} name='lastName' label='Last Name' />
            </Grid>
          </Grid>

          <Divider />

          {/* Birthday */}
          <Grid container>
            <Grid item sm={2}>
              Birthday
            </Grid>
            <Grid item sm={10}>
              <Field type='date' name='birthday' label='Birthday' />
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
                <Field component={Select} name='gender'>
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
              <Field component={Select} name='country'>
                <MenuItem value='egypt'>Egypt</MenuItem>
                <MenuItem value='United States'>USA</MenuItem>
                <MenuItem value='germany'>Germany</MenuItem>
              </Field>
            </Grid>
          </Grid>

          {/* City */}
          <Grid container>
            <Grid item sm={2}>
              City
            </Grid>
            <Grid item sm={10}>
              <Field component={Select} name='city'>
                <MenuItem value='come City'>come City</MenuItem>
                <MenuItem value='come City1'>come City1</MenuItem>
                <MenuItem value='come City2'>come City2</MenuItem>
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
                name='education'>
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
              <Field component={TextField} name='job' label=' Occupation or Job' />
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
            Save
          </Button>
        </Form>
      </Formik>
    </>
  );
}
