'use client';
import React, {useState} from 'react';
import Link from "next/link";
import {useForm} from "react-hook-form";
import FieldValidationError from "./fieldValidationError";
import ErrorMessage from "./ErrorMessage";
import {useRouter} from 'next/navigation';
import {useAuthContext} from "./Authentication";
import {GridLoader} from "react-spinners";
import {motion} from "framer-motion";

function LoginForm() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [serverErrors, setServerErrors] = useState(null);
    const [loading, setLoading] = useState(false);
    const {setLoggedIn} = useAuthContext();
    const {push} = useRouter();

    const onSubmit = (data, e) => {
        e.preventDefault();
        setLoading(true);

        fetch("https://opinio-net-api-794h.vercel.app/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": 'application/json',
            },
            credentials: "include",
            body: JSON.stringify({
                email: data.email,
                password: data.password,
            }),
        }).then((res) => res.json())
            .then((data) => {
                if (data.errors) {
                    setServerErrors(data.errors);
                    setLoggedIn(false);
                } else if (data.token && data.user_id) {
                    // Login Successful
                    sessionStorage.setItem('user_id', JSON.stringify(data.user_id));
                    sessionStorage.setItem('token', data.token);
                    setLoggedIn(true);
                    push("/account")
                } else {
                    setServerErrors({"message": "A little group of mischievous elves have caused some shenanigans! 🧝‍️"});
                    setLoggedIn(false);
                }
            }).catch(() => {
            setServerErrors({"message": "A little group of mischievous elves have caused some shenanigans! 🧝‍️"})
            setLoggedIn(false);
        }).finally(() => {
            setLoading(false);
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {serverErrors && <ErrorMessage errors={serverErrors}/>}

            <div className="mb-4">
                <label htmlFor="email" className="block mb-2">
                    Email:
                </label>
                <input type="text" id="email" name="email"
                       className="w-full border border-fuchsia-800 px-4 py-2 rounded-2xl box-shadow-black"
                       {...register('email', {
                           required: 'Email is required',
                           pattern: {
                               value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                               message: 'Invalid email format'
                           }
                       })}
                />
                {errors.email && <FieldValidationError message={errors.email.message}/>}
            </div>


            <div className="mb-4">
                <label htmlFor="password" className="block mb-2">
                    Password:
                </label>
                <input type="password" id="password"
                       className="w-full border border-fuchsia-800 px-4 py-2 rounded-2xl box-shadow-black"
                       {...register(('password'), {required: true})}
                />
                {errors.password && errors.password.type === "required" && (
                    <FieldValidationError message="Password is required"/>)}
            </div>

            <div className="flex justify-around items-center">
                <motion.div whileTap={{scale: 0.9}}>
                    <button
                        type="submit"
                        className="bg-fuchsia-800 font-bold hover:bg-fuchsia-700 text-white px-4 py-2 border-2 border-black rounded box-shadow-black flex items-center"
                    >
                        Login
                    </button>
                </motion.div>
                <motion.div whileTap={{scale: 0.9}}>
                    <Link
                        href="/register"
                        className="text-fuchsia-800 font-bold hover:text-fuchsia-600 px-4 py-2 rounded border-2 border-black box-shadow-black flex items-center"
                    >
                        Register
                    </Link>
                </motion.div>
            </div>

            {loading && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                    <GridLoader color="#86198f" size={20}/>
                </div>
            )}
        </form>
    );
}

export default LoginForm;