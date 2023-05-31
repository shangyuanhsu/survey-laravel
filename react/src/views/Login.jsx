import { Link } from "react-router-dom";
import { useState } from "react";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import axiosClient from '../fetch.js'

export default function Login() {
    const { setCurrentUser, setUserToken } = useStateContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({ __html: "" });

    const handleSubmit = (e) => {
        e.preventDefault();
        setError({ __html: "" });
        axiosClient
            .post("/login", {
                email,
                password,
            })
            .then(({ data }) => {
                setCurrentUser(data.user);
                setUserToken(data.token);
            })
            .catch((error) => {
                if (error.response) {
                    if (typeof error.response.data.error === "string") {
                        const finalErrors = error.response.data.error;
                        setError({ __html: finalErrors});
                    } else {
                        const finalErrors = Object.values(error.response.data.error).reduce(
                            (accum, next) => [...accum, ...next],[]
                        );
                        setError({ __html: finalErrors.join("<br>") });
                    }
                }
                console.error(error);
            });
    }

    return (
        <>
            <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign in to your account
            </h2>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                defaultValue={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"
                                placeholder="Email address"

                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-yellow-900 hover:text-yellow-600">
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                defaultValue={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    {error.__html && (
                        <div
                            className="bg-red-500 rounded py-2 px-3 text-white"
                            dangerouslySetInnerHTML={error}
                        ></div>
                    )}


                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-yellow-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign in
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Not a member?{' '}
                    <Link to="/signup" className="font-semibold leading-6 text-yellow-900 hover:text-yellow-600">
                        Signup your account
                    </Link>
                </p>
            </div>
        </>
    )
}
