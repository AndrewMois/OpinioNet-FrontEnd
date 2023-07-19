'use client';

import React from 'react';
import TextArea from "../../components/TextArea";
import {useRouter} from 'next/navigation';
import PageWrapper from "../../components/PageWrapper";
import {useForm} from "react-hook-form";

function Add() {


    const {push} = useRouter();
    const {register, handleSubmit, formState: {errors}} = useForm();

    const onSubmit = async (data, e) => {
        e.preventDefault();

        // Replace 'YOUR_USER_ID' with the actual user_id from application's session or authentication data
        const user_id = '3';

        // Handle the form submission
        try {
            const response = await fetch("https://opinio-net-api-794h.vercel.app/api/api/microposts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: data.title,
                    content: data.content,
                    user_id: user_id,
                }),
            });

            if (response.ok) {
                // Post was successfully created, do something
                console.log("Post created successfully");
                push("/"); // Redirect to the home page after successful post
            } else {
                console.error("Failed to create post");
            }
        } catch (error) {
            console.error("An error occurred while posting:", error);
        }
    };

    return (
        <PageWrapper>
            <main className="pb-20 ">
                <div className="mx-auto border-b-2 border-black p-4">
                    <h2 className="text-2xl font-bold mb-4">Ask new question</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <label htmlFor="title" className="block font-semibold mb-1">
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                className="w-full border border-fuchsia-800 px-4 py-2 rounded-2xl box-shadow-black"

                                onChange={(e) => setTitle(e.target.value)}
                                {...register("title", {required: true, maxLength: 30})}
                            />
                            {errors.title && errors.title.type === "required" && (
                                <p id="outlined_error_help" className="mt-2 ml-4 text-xs text-red-600">
                                    <span className="font-bold">Please, write a title! </span></p>
                            )}
                            {errors.title && errors.title.type === "maxLength" && (
                                <p id="outlined_error_help" className="mt-2 ml-4 text-xs text-red-600">
                                    <span className="font-bold">Please, stick to 30 letters! </span></p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="content" className="block font-semibold mb-1">
                                Question
                            </label>
                            <TextArea registerFunc={register}/>
                            {errors.content && errors.content.type === "required" && (
                                <p id="outlined_error_help" className="mt-2 ml-4 text-xs text-red-600">
                                    <span className="font-bold">Please, write something! </span></p>
                            )}
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-fuchsia-800 font-bold hover:bg-fuchsia-600 text-white px-4 py-2 rounded box-shadow-black"
                            >
                                Post
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </PageWrapper>
    );
}

export default Add;