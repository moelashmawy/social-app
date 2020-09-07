import React, { useState } from "react";
import { Formik, Form } from "formik";
import { useMutation } from "@apollo/client";
import ErrorMessage from "./ToastMessage";
import { UPLOAD_PICTURES } from "../graphql/mutations";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import {
  Avatar,
  Button,
  createStyles,
  Grid,
  IconButton,
  makeStyles,
  Theme,
  Tooltip
} from "@material-ui/core";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1)
      }
    },
    input: {
      display: "none"
    }
  })
);

export default function UploadProfileImages(props) {
  const classes = useStyles();

  // the fileList images returned from the form
  const [imgs, setImgs] = useState([]);

  // the current images preview before upload
  const [preview, setPreview] = useState([]);

  // handle delete mutation
  const [upload, { data, loading, error }] = useMutation(UPLOAD_PICTURES);

  //handle on select preview
  const onDrop = e => {
    let filesToPreview: any[] = [];

    // to be able to preview images before uploading them
    // we will convert the files to object url
    for (let i = 0; i < e.target.files.length; i++) {
      filesToPreview.push(URL.createObjectURL(e.target.files[i]));
    }

    setPreview(preview.concat(filesToPreview));

    // convert the fileList to an array so it accepts array functions
    let fileArray = Array.from(imgs);
    let filesRecievedFromFrom = Array.from(e.target.files);

    setImgs(fileArray.concat(filesRecievedFromFrom));
  };

  //handle delete one from preview before upload
  const hanldeDeletePicFromPreview = index => {
    const previewsAfterDelete = preview.filter((p, ind) => ind !== index);

    setPreview(previewsAfterDelete);

    // convert the fileList to an array so it accepts array functions
    let fileArray = Array.from(imgs);

    const imgsAfterDelete = fileArray.filter((p, ind) => ind !== index);

    setImgs(imgsAfterDelete);
  };

  if (data?.uploadProfilePictures.ok) {
    useRouter().push(`/users/[userName]`, `/users/${props.user.userName}`, {
      shallow: true
    });
  }

  return (
    <>
      {data?.uploadProfilePictures.ok && (
        <ErrorMessage
          message={data.uploadProfilePictures.successMessage}
          case='success'
        />
      )}

      {data?.uploadProfilePictures.error && (
        <ErrorMessage message={data.uploadProfilePictures.error} case='error' />
      )}

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
            accept='image/*'
            className={classes.input}
            id='icon-button-file'
            type='file'
            required
            multiple
            name='productImage'
            onChange={e => {
              onDrop(e);
            }}
          />
          <Tooltip title='Choose photos'>
            <label htmlFor='icon-button-file'>
              <IconButton color='primary' aria-label='upload picture' component='span'>
                <PhotoCamera />
              </IconButton>
            </label>
          </Tooltip>

          {loading && (
            <Button variant='contained' color='primary'>
              <i className='fa fa-spinner fa-spin' />
            </Button>
          )}
          {!loading && (
            <Button
              variant='contained'
              color='primary'
              type='submit'
              onClick={() => {
                if (imgs.length < 1) {
                  return <ErrorMessage message='please select photos' case='error' />;
                }
                upload({ variables: { file: imgs } });
              }}>
              Upload
            </Button>
          )}
        </Form>
      </Formik>

      {preview.length > 0 &&
        preview.map((img, index) => (
          <Grid xs={4} container justify='center' className='each-item'>
            <div className='wrapper'>
              <Avatar variant='rounded' src={img} />
              <span
                className='delete-item'
                onClick={() => hanldeDeletePicFromPreview(index)}>
                <i className='fa fa-times' />
              </span>
            </div>
          </Grid>
        ))}
    </>
  );
}
