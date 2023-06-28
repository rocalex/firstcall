import DefaultLayout from "@/components/DefaultLayout";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  username: string;
  firstName: string;
  lastName: string;
};

export default function AddUser() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await axios.post("/api/users", data);
      router.push("/users");
    } catch (e: any) {
      if (e.response?.data) {
        alert(JSON.stringify(e.response.data.errors, null, 2))
      }
    }
  };

  return (
    <DefaultLayout>
      <Head>
        <title>Add User | FirstCall</title>
      </Head>
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-half-desktop">
              <div className="card">
                <div className="card-header">
                  <p className="card-header-title">Add User</p>
                </div>
                <div className="card-content">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="field">
                      <label className="label">Username *</label>
                      <div className="control">
                        <input
                          type="text"
                          className={`input ${
                            errors.username ? "is-danger" : ""
                          }`}
                          {...register("username", {
                            required: "this field is required",
                            minLength: { message: "Min length is 3", value: 3 },
                            maxLength: {
                              value: 40,
                              message: "Max length is 40",
                            },
                          })}
                        />
                      </div>
                      {errors.username && (
                        <span className="help is-danger">
                          {errors.username.message}
                        </span>
                      )}
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
                            // minLength: { value: 3, message: "Min length is 3" },
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
                        <button className="button is-link">Add</button>
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
