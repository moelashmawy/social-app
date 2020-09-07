import { useMutation } from "@apollo/client";
import Link from "next/link";
import ErrorMessage from "./ToastMessage";
import Button from "@material-ui/core/Button";
import { MUTATION_DELETE_USER } from "../graphql/mutations";

export default function UsersList(props) {
  const { users, error, ok } = props.users;

  let [deleteUserMutation, { data: mutation_data, loading: l }] = useMutation(
    MUTATION_DELETE_USER
  );

  return (
    <>
      {error && <div>{error}</div>}
      {mutation_data?.deleteUser?.ok && (
        <ErrorMessage message='Deleted Successfully' case='success' />
      )}
      {mutation_data?.deleteUser?.error && (
        <ErrorMessage message={mutation_data.deleteUser.error} case='error' />
      )}
      <ul>
        {users &&
          users.map(user => (
            <li key={user.id}>
              <Link href={"/users/[userName]"} as={`/users/${user.userName}`}>
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
