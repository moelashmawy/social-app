import React, { useState } from "react";
import { Divider, Chip } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import { Grid, Button } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import { useMutation } from "@apollo/client";
import { UPDATE_PROGILE_MUTATION } from "../../graphql/mutations";
import ErrorMessage from "../ToastMessage";
import Router from "next/router";

const Languages = ({ me }) => {
  // get the languaes state
  const [speakLanguages, setSpeakLanguages] = useState(me.speakLanguages);
  const [learnLanguages, setLearnLanguages] = useState(me.learnLanguages);

  const [speakLanguage, setSpeakLanguage] = useState("");
  const [learnLanguage, setLearnLanguage] = useState("");

  // handle add learn language
  const addSpeakLang = () => {
    if (!speakLanguage) return;
    setSpeakLanguages(oldArray => [...oldArray, speakLanguage]);
    setSpeakLanguage("");
  };

  // handle add learn language
  const addLearnLang = () => {
    if (!learnLanguage) return;
    setLearnLanguages(oldArray => [...oldArray, learnLanguage]);
    setLearnLanguage("");
  };

  // handle delete one lang
  const handleDelete = (langName: string, langGroup: []) => {
    const NewLangs = langGroup.filter(lang => lang != langName);
    if (langGroup == learnLanguages) {
      setLearnLanguages(NewLangs);
    } else setSpeakLanguages(NewLangs);
  };

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
          learnLang: "",
          speakLang: ""
        }}
        //validationSchema={validate}
        onSubmit={(values, { setSubmitting }) => {
          updateProfile({
            variables: {
              speakLanguages: speakLanguages,
              learnLanguages: learnLanguages
            }
          });
          setSubmitting(false);
        }}>
        {({ errors, touched, validateField }) => (
          <Form>
            {/* Languages I speak */}
            <Grid container>
              <Grid item sm={2}>
                Languages I speak
              </Grid>
              <Grid item sm={5}>
                <Field
                  value={speakLanguage}
                  onChange={e => setSpeakLanguage(e.target.value)}
                  component={TextField}
                  name='speakLang'
                  label='Languages i speak'
                />
                {errors.speakLang && touched.speakLang && <div>{errors.speakLang}</div>}
              </Grid>
            </Grid>

            <Button
              onClick={() => {
                addSpeakLang();
              }}>
              Add
            </Button>

            <div>
              {speakLanguages.length > 0 &&
                speakLanguages.map(lang => (
                  <Chip
                    label={lang}
                    onDelete={() => handleDelete(lang, speakLanguages)}
                    color='primary'
                    variant='outlined'
                  />
                ))}
            </div>

            <Divider />

            {/* Languages I speak */}
            <Grid container>
              <Grid item sm={2}>
                Languages I learn
              </Grid>
              <Grid item sm={5}>
                <Field
                  value={learnLanguage}
                  onChange={e => setLearnLanguage(e.target.value)}
                  component={TextField}
                  name='learnLang'
                  label='Languages i learn'
                />
              </Grid>
            </Grid>

            <Button
              onClick={() => {
                addLearnLang();
              }}>
              Add
            </Button>

            <div>
              {learnLanguages.length > 0 &&
                learnLanguages.map(lang => (
                  <Chip
                    label={lang}
                    onDelete={() => handleDelete(lang, learnLanguages)}
                    color='primary'
                    variant='outlined'
                  />
                ))}
            </div>

            <br />
            <Button type='submit' variant='outlined'>
              Save
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Languages;
