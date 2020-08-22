import React, { useState, useReducer } from "react";
import { Divider, Chip } from "@material-ui/core";
import { Formik, Form, Field, ErrorMessage as FormikError } from "formik";
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
    aboutMe: Yup.string().notRequired().min(2, "Must be more than one character")
  });

const AboutMe = ({ me }) => {
  // get the languaes state
  const [hobbies, setHobbies] = useState(me.hobbies);
  const [music, setMusic] = useState(me.music);
  const [books, setBooks] = useState(me.books);
  const [movies, setMovies] = useState(me.movies);
  const [tvShows, setTvShows] = useState(me.tvShows);

  // handle change the fields
  const [allValues, setAllValues] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      hobby: "",
      music: "",
      book: "",
      movie: "",
      tvShow: ""
    }
  );

  // handle each item change to be saved in its array
  const changeHandler = e => {
    setAllValues({ ...allValues, [e.target.name]: e.target.value });
  };

  // handle add new item
  const addNewItem = category => {
    switch (category) {
      case "hobbies":
        if (!allValues.hobby) return;
        setHobbies(oldArray => [...oldArray, allValues.hobby]);
        setAllValues({ hobby: "" });
        break;
      case "music":
        if (!allValues.music) return;
        setMusic(oldArray => [...oldArray, allValues.music]);
        setAllValues({ music: "" });
        break;
      case "books":
        if (!allValues.book) return;
        setBooks(oldArray => [...oldArray, allValues.book]);
        setAllValues({ book: "" });
        break;
      case "movies":
        if (!allValues.movie) return;
        setMovies(oldArray => [...oldArray, allValues.movie]);
        setAllValues({ movie: "" });
        break;
      case "tvShows":
        if (!allValues.tvShow) return;
        setTvShows(oldArray => [...oldArray, allValues.tvShow]);
        setAllValues({ tvShow: "" });
        break;
      default:
        break;
    }
  };

  // handle delete one item
  const handleDelete = (category: string, toDelte: string) => {
    switch (category) {
      case "hobbies":
        let newItems: [];
        newItems = hobbies.filter((item: string) => item != toDelte);
        setHobbies(newItems);
        break;
      case "music":
        newItems = music.filter((item: string) => item != toDelte);
        setMusic(newItems);
        break;
      case "books":
        newItems = books.filter((item: string) => item != toDelte);
        setBooks(newItems);
        break;
      case "movies":
        newItems = movies.filter((item: string) => item != toDelte);
        setMovies(newItems);
        break;
      case "tvShows":
        newItems = tvShows.filter((item: string) => item != toDelte);
        setTvShows(newItems);
        break;
      default:
        break;
    }
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
          aboutMe: me.aboutMe,
          hobby: allValues.hobby,
          music: allValues.music,
          book: allValues.book,
          movie: allValues.movie,
          tvShow: allValues.tvShow
        }}
        validationSchema={validate}
        onSubmit={(values, { setSubmitting }) => {
          updateProfile({
            variables: {
              aboutMe: values.aboutMe,
              hobbies: hobbies,
              music: music,
              books: books,
              movies: movies,
              tvShows: tvShows
            }
          });
          setSubmitting(false);
        }}>
        <Form>
          {/***************** about me *********************/}
          <Grid container>
            <Grid item sm={2}>
              About me
            </Grid>
            <Grid item sm={10}>
              <Field as='textarea' name='aboutMe' label='aboutMe' />
              <FormikError name='aboutMe' />
            </Grid>
          </Grid>

          <Divider variant='middle' />

          {/***************** hobbies ***************/}
          <Grid container>
            <Grid item sm={2}>
              Interests, Hobbies, etc.
            </Grid>
            <Grid item sm={6}>
              <Field
                value={allValues.hobby}
                onChange={e => changeHandler(e)}
                component={TextField}
                name='hobby'
                label='Interests, Hobbies, etc.'
              />
            </Grid>
            <Grid item sm={2}>
              <Button onClick={() => addNewItem("hobbies")} variant='outlined'>
                Add
              </Button>
            </Grid>

            {/***  hobbies List***/}
            <Grid container>
              {hobbies.length > 0 &&
                hobbies.map(hobby => (
                  <Chip
                    label={hobby}
                    onDelete={() => handleDelete("hobbies", hobby)}
                    color='primary'
                    variant='outlined'
                  />
                ))}
            </Grid>
          </Grid>

          <Divider />

          {/***************** Favorite Music ***************/}
          <Grid container>
            <Grid item sm={2}>
              Favorite Music
            </Grid>
            <Grid item sm={6}>
              <Field
                value={allValues.music}
                onChange={e => changeHandler(e)}
                component={TextField}
                name='music'
                label='Favorite Music'
              />
            </Grid>
            <Grid item sm={2}>
              <Button onClick={() => addNewItem("music")} variant='outlined'>
                Add
              </Button>
            </Grid>

            {/***  music List ***/}
            <Grid container>
              {music.length > 0 &&
                music.map(item => (
                  <Chip
                    label={item}
                    onDelete={() => handleDelete("music", item)}
                    color='primary'
                    variant='outlined'
                  />
                ))}
            </Grid>
          </Grid>

          <Divider />

          {/***************** Favorite books ***************/}
          <Grid container>
            <Grid item sm={2}>
              Favorite Books
            </Grid>
            <Grid item sm={6}>
              <Field
                value={allValues.book}
                onChange={e => changeHandler(e)}
                component={TextField}
                name='book'
                label='Favorite Books'
              />
            </Grid>
            <Grid item sm={2}>
              <Button onClick={() => addNewItem("books")} variant='outlined'>
                Add
              </Button>
            </Grid>

            {/***  book List ***/}
            <Grid container>
              {books.length > 0 &&
                books.map(item => (
                  <Chip
                    label={item}
                    onDelete={() => handleDelete("books", item)}
                    color='primary'
                    variant='outlined'
                  />
                ))}
            </Grid>
          </Grid>

          <Divider />

          {/***************** Favorite movies ***************/}
          <Grid container>
            <Grid item sm={2}>
              Favorite movies
            </Grid>
            <Grid item sm={6}>
              <Field
                value={allValues.movie}
                onChange={e => changeHandler(e)}
                component={TextField}
                name='movie'
                label='Favorite movies'
              />
            </Grid>
            <Grid item sm={2}>
              <Button onClick={() => addNewItem("movies")} variant='outlined'>
                Add
              </Button>
            </Grid>

            {/***  movie List ***/}
            <Grid container>
              {movies.length > 0 &&
                movies.map(item => (
                  <Chip
                    label={item}
                    onDelete={() => handleDelete("movies", item)}
                    color='primary'
                    variant='outlined'
                  />
                ))}
            </Grid>
          </Grid>

          <Divider />

          {/***************** Favorite TV shows ***************/}
          <Grid container>
            <Grid item sm={2}>
              Favorite TV shows
            </Grid>
            <Grid item sm={6}>
              <Field
                value={allValues.tvShow}
                onChange={e => changeHandler(e)}
                component={TextField}
                name='tvShow'
                label='Favorite TV shows'
              />
            </Grid>
            <Grid item sm={2}>
              <Button onClick={() => addNewItem("tvShows")} variant='outlined'>
                Add
              </Button>
            </Grid>

            {/***  tvShow List ***/}
            <Grid container>
              {tvShows.length > 0 &&
                tvShows.map(item => (
                  <Chip
                    label={item}
                    onDelete={() => handleDelete("tvShows", item)}
                    color='primary'
                    variant='outlined'
                  />
                ))}
            </Grid>
          </Grid>

          {/********** Submit buttom **********/}
          <Button type='submit' variant='outlined'>
            Save
          </Button>
        </Form>
      </Formik>
    </>
  );
};

export default AboutMe;
