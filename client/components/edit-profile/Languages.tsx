import React, { useState } from "react";
import {
  TextareaAutosize,
  Divider,
  MenuItem,
  InputLabel,
  FormControl,
  Chip
} from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import { Grid, Button } from "@material-ui/core";
import { TextField, Select } from "formik-material-ui";

const Languages = ({ me }) => {
  // get the languaes state
  const [speakLanguages, setSpeakLanguages] = useState(me.speakLanguages);
  const [learnLanguages, setLearnLanguages] = useState(me.learnLanguages);

  const [speakLanguage, setSpeakLanguage] = useState("");
  const [learnLanguage, setLearnLanguage] = useState("");

  // handle add learn language
  const addSpeakLang = () => {
    setSpeakLanguages(oldArray => [...oldArray, speakLanguage]);
    setSpeakLanguage("");
  };

  // handle add learn language
  const addLearnLang = () => {
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
              name='speak-lang'
              label='Languages i speak'
            />
          </Grid>
        </Grid>

        <Button onClick={addSpeakLang}>Add</Button>

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
              name='learn-lang'
              label='Languages i learn'
            />
          </Grid>
        </Grid>

        <Button onClick={addLearnLang}>Add</Button>

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
        <Button variant='outlined'>Save</Button>
      </Form>
    </Formik>
  );
};

export default Languages;
