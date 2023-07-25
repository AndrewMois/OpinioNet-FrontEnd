'use client';
import React, {useState} from 'react';
import Link from "next/link";
import {useForm} from "react-hook-form";
import FieldValidationError from "./fieldValidationError";
import ErrorMessage from "./errorMessage";

function LoginForm() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [serverErrors, setServerErrors] = useState(null);

    const onSubmit = (data, e) => {
        e.preventDefault();
        console.log(JSON.stringify(data));  //DELETE THIS LINE

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
                console.log(data); //DELETE THIS LINE
                if (data.errors) {
                    setServerErrors(data.errors);
                }
            })
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {serverErrors && <ErrorMessage errors={serverErrors}/>}

            <div className="mb-4">
                <label htmlFor="email" className="block mb-2">
                    Email:
                </label>
                <input type="email" id="email" name="email"
                       className="w-full border border-fuchsia-800 px-4 py-2 rounded-2xl box-shadow-black"
                       {...register(('email'), {required: true})}
                />
                {errors.email && errors.email.type === "required" && (
                    <FieldValidationError message="Email is required"/>)}
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

            <div className="flex justify-around">
                <button type="submit"
                        className="bg-fuchsia-800 font-bold hover:bg-fuchsia-600 text-white px-4 py-2 rounded box-shadow-black">
                    Login
                </button>
                <Link href="/register"
                      className="text-fuchsia-800 font-bold hover:text-fuchsia-600 px-4 py-2 rounded border-2 border-black box-shadow-black">
                    Register
                </Link>
            </div>
        </form>
    );
}

export default LoginForm;