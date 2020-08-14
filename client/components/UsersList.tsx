import { useQuery, useMutation } from "@apollo/client";
import Link from "next/link";
import ErrorMessage from "./ToastMessage";
import Button from "@material-ui/core/Button";
import { useState } from "react";
import { MUTATION_DELETE_USER } from "../graphql/mutations";
import { ALL_USERS_QUERY } from "../graphql/queries";

export default function UsersList() {
  const { loading, data } = useQuery(ALL_USERS_QUERY);

  const { users } = data.users;

  let [deleteUserMutation, { data: mutation_data, loading: l }] = useMutation(
    MUTATION_DELETE_USER
  );

  return (
    <>
      {data?.users?.error && <div>{data.users.error}</div>}
      {loading && <div>Loading.....</div>}
      {mutation_data?.deleteUser?.ok && (
        <ErrorMessage message='Deleted Successfully' case='success' />
      )}
      {mutation_data?.deleteUser?.error && (
        <ErrorMessage message={mutation_data.deleteUser.error} case='error' />
      )}
      <ul>
        {data?.users?.users &&
          users.map(user => (
            <li key={user.id}>
              <Link href={"/users/[id]"} as={`/users/${user.id}`}>
                <a>{user.userName}</a>
              </Link>
              <div>{user.userName}</div>
              <div>{user.email}</div>
              <div>{user.firstName}</div>
              <div>{user.lastName}</div>
              <div>{user.createdAt}</div>
              <Button
                variant='contained'
                color='primary'
                onClick={() => {
                  deleteUserMutation({ variables: { id: user.id } });
                }}>
                Delete
              </Button>
            </li>
          ))}
      </ul>
    </>
  );
}
