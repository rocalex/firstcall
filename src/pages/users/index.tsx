import DefaultLayout from "@/components/DefaultLayout";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR, { Fetcher } from "swr";

type User = {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
};

type UserData = {
  success: boolean;
  data: User[];
};

const fetcher: Fetcher<UserData, string> = (url: string) =>
  axios.get(url).then((res) => res.data);

export default function Users() {
  const router = useRouter();
  const { data, mutate } = useSWR("/api/users", fetcher);

  const deleteUser = async (_id: string) => {
    if (confirm("Are you sure to delete the user")) {
      try {
        await axios.delete(`/api/users/${_id}`);
        router.push("/users");
      } catch (e) {
        alert("Failed to delete the user");
      }

      await mutate();
    }
  };

  return (
    <DefaultLayout>
      <Head>
        <title>User Management | FirstCall</title>
      </Head>
      <section className="section">
        <div className="container">
          <div className="field">
            <Link href={"/users/add"} className="button is-link is-light">
              Add User
            </Link>
          </div>
          {data && (
            <div className="box">
              <div className="table-container">
                <table className="table is-fullwidth">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Username</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.data.map((user) => (
                      <tr key={user._id}>
                        <td>{user._id}</td>
                        <td>{user.username}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>
                          <div className="field is-grouped">
                            <div className="control">
                              <Link
                                href={`/users/${user._id}`}
                                className="button is-success is-small"
                              >
                                Edit
                              </Link>
                            </div>
                            <div className="control">
                              <button
                                className="button is-danger is-small"
                                onClick={() => deleteUser(user._id)}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>
    </DefaultLayout>
  );
}
