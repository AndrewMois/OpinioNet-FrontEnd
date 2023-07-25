'use client';
import React, {useState} from 'react';
import Link from "next/link";
import ErrorMessage from "./errorMessage";
import {useForm} from "react-hook-form";
import FieldValidationError from "./fieldValidationError";

function RegisterForm() {
    const [serverErrors, setServerErrors] = useState(null);
    const {register, watch, handleSubmit, formState: {errors}} = useForm();

    const watchPassword = watch("password"); // Watch the value of the 'password' field
    const validatePasswordConfirmation = (value) => {
        if (value !== watchPassword) {
            return "The passwords do not match";
        }
        return true;
    };
    const onSubmit = (data, e) => {
        e.preventDefault();

        fetch("https://opinio-net-api-794h.vercel.app/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": 'application/json',
            },
            body: JSON.stringify({
                name: data.name,
                email: data.email,
                password: data.password,
                password_confirmation: data.password_confirmation,
            }),
        }).then((res) => res.json())
            .then((data) => {
                if (data.errors) {
                    setServerErrors(data.errors);
                }
            })
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {serverErrors && <ErrorMessage errors={serverErrors}/>}
            <div className="mb-4">
                <label htmlFor="name" className="block mb-2">
                    Your name:
                </label>
                <input type="name" id="name" name="name"
                       className="w-full border border-fuchsia-800 px-4 py-2 rounded-2xl box-shadow-black"
                       {...register("name", {required: true})}
                />
                {errors.name && errors.name.type === "required" && (
                    <FieldValidationError message="Name is required"/>
                )}
            </div>

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
                <input type="password" id="password" name='password'
                       className="w-full border border-fuchsia-800 px-4 py-2 rounded-2xl box-shadow-black"
                       {...register("password", {required: true})}
                />
                {errors.password && errors.password.type === "required" && (
                    <FieldValidationError message="Password is required"/>
                )}
            </div>

            <div className="mb-4">
                <label htmlFor="password_confirmation" className="block mb-2">
                    Confirm password:
                </label>
                <input type="password" id="password_confirmation" name="password_confirmation"
                       className="w-full border border-fuchsia-800 px-4 py-2 rounded-2xl box-shadow-black"
                       {...register('password_confirmation', {
                           required: 'Password confirmation is required',
                           validate: validatePasswordConfirmation
                       })}
                />
                {errors.password_confirmation && (
                    <FieldValidationError message={errors.password_confirmation.message}/>
                )}
            </div>

            <div className="flex justify-around">
                <button type="submit"
                        className="bg-fuchsia-800 font-bold hover:bg-fuchsia-600 text-white px-4 py-2 rounded box-shadow-black">
                    Register
                </button>
                <Link href="/login"
                      className="text-fuchsia-800 font-bold hover:text-fuchsia-600 px-4 py-2 rounded border-2 border-black box-shadow-black">
                    I have an account
                </Link>
            </div>
        </form>
    );
}

export default RegisterForm;