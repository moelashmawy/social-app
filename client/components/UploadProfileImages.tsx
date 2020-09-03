import React, { useState } from "react";
import { Formik, Form } from "formik";
import { useMutation } from "@apollo/client";
import ErrorMessage from "./ToastMessage";
import { UPLOAD_PICTURES } from "../graphql/mutations";
import { useRouter } from "next/router";
import { date } from "yup";

export default function UploadProfileImages() {
  const [imgs, setImgs] = useState(null);

  const [upload, { data, loading, error }] = useMutation(UPLOAD_PICTURES, {
    onError(err) {
      console.log(err);
    }
  });

  const router = useRouter();

  return (
    <>
      {data?.uploadProfilePictures.ok && (
        <ErrorMessage
          message={data.uploadProfilePictures.successMessage}
          case='success'
        />
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
            required
            multiple
            className='custom custom-file mb-2'
            type='file'
            name='productImage'
            onChange={e => {
              setImgs(e.target.files);
            }}
          />
          {loading && <button>Uploading...</button>}
          {!loading && (
            <button
              type='submit'
              onClick={() => {
                upload({ variables: { file: imgs } });
              }}>
              Upload
            </button>
          )}
        </Form>
      </Formik>
    </>
  );
}
