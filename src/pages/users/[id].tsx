import DefaultLayout from "@/components/DefaultLayout";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import useSWR, { Fetcher } from "swr";

type Inputs = {
  username: string;
  firstName: string;
  lastName: string;
};

type UserData = {
  success: boolean;
  data: {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
    __v: number;
  };
};

const fetcher: Fetcher<UserData, string> = (url: string) =>
  axios.get(url).then((res) => res.data);

export default function EditUser() {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useSWR(id ? `/api/users/${id}` : null, id ? fetcher : null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    values: {
      username: data?.data.username!,
      firstName: data?.data.firstName!,
      lastName: data?.data.lastName!,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await axios.put(`/api/users/${id!}`, data);
      router.push("/users");
    } catch (e) {}
  };

  return (
    <DefaultLayout>
      <Head>
        <title>Edit User | FirstCall</title>
      </Head>
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-half-desktop">
              <div className="card">
                <div className="card-header">
                  <p className="card-header-title">Edit User</p>
                </div>
                <div className="card-content">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="field">
                      <label className="label">Username</label>
                      <div className="control">
                        <input
                          type="text"
                          className="input"
                          readOnly
                          {...register("username")}
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">First Name *</label>
                      <div className="control">
                        <input
                          type="text"
                          className={`input ${
                            errors.firstName ? "is-danger" : ""
                          }`}
                          {...register("firstName", {
                            required: "this field is required",
                            minLength: { value: 3, message: "Min length is 3" },
                            maxLength: {
                              value: 55,
                              message: "Max length is 55",
                            },
                          })}
                        />
                      </div>
                      {errors.firstName && (
                        <span className="help is-danger">
                          {errors.firstName.message}
                        </span>
                      )}
                    </div>
                    <div className="field">
                      <label className="label">Last Name *</label>
                      <div className="control">
                        <input
                          type="text"
                          className={`input ${
                            errors.lastName ? "is-danger" : ""
                          }`}
                          {...register("lastName", {
                            required: "this field is required",
                            maxLength: {
                              value: 55,
                              message: "Max length is 55",
                            },
                          })}
                        />
                      </div>
                      {errors.lastName && (
                        <span className="help is-danger">
                          {errors.lastName.message}
                        </span>
                      )}
                    </div>
                    <div className="field is-grouped">
                      <div className="control">
                        <button className="button is-link">Update</button>
                      </div>
                      <div className="control">
                        <Link
                          href={"/users"}
                          className="button is-link is-light"
                        >
                          Cancel
                        </Link>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
