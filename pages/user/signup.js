import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import auth from "../../components/Hooks/firebase.init";
import { toast } from "react-hot-toast";
import Link from "next/link";
import SocialLogin from "../../components/Cards/SocialLogin";
import Head from "next/head";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const loginhandler = (e) => {
    const email = e.target.email.value;
    const password = e.target.password.value;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        if (user) {
          api
            .post("/api/members/new", { email: user.email, user })
            .then((res) => {
              if (res.status === 200) {
                router.push("/");
              }
            });
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        if (errorCode === "auth/wrong-password") {
          toast.error("Wrong Password");
        } else if (errorCode === "auth/email-already-in-use") {
          toast.error("Email Already In Use");
        } else {
          toast.error(errorCode);
        }
      });
  };
  return (
    <div>
      <Head>
        <title>Signup Page</title>
      </Head>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <h1 className="text-4xl font-bold text-primary">Code House</h1>
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Register your account
              </h1>
              <SocialLogin />
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={(e) => {
                  loginhandler(e);
                  e.preventDefault();
                }}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className={`w-full  btn btn-primary text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 ${
                    loading && "loading"
                  }`}
                >
                  Sign Up
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                 Alrady have an account yet?
                  <Link href={"/user/login"}>
                    <a className="font-medium text-primary hover:underline ">
                      Sign In
                    </a>
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signup;
