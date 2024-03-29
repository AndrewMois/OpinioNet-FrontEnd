'use client';

import React, { useEffect } from 'react';
import TextArea from "../../components/TextArea";
import { useRouter } from 'next/navigation';
import PageWrapper from "../../components/PageWrapper";
import { useForm } from "react-hook-form";
import { GridLoader } from "react-spinners";
import { useAuthContext } from "../../components/Authentication";
import DOMPurify from 'dompurify';



function Add() {

    const { push } = useRouter();
    const [posting, setPosting] = React.useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { checkToken } = useAuthContext();

    // Check if the token exists in storage on page load
    useEffect(() => {
        const checkUserLoggedIn = async () => {
            const loggedIn = await checkToken();
            if (!loggedIn) {
                push('/login');
            }
        };
        checkUserLoggedIn();
    }, [checkToken, push]);

    const onSubmit = async (data, e) => {
        e.preventDefault();
        setPosting(true);

        const user_id = sessionStorage.getItem('user_id');

        // Handle the form submission
        try {
            // const response = await fetch("https://opinio-net-api-794h.vercel.app/api/api/microposts", {
            // const response = await fetch("http://localhost/api/microposts", {
            const response = await fetch("http://35.183.51.223/api/microposts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + sessionStorage.getItem('token'),
                },
                body: JSON.stringify({
                    title: DOMPurify.sanitize(data.title),
                    content: DOMPurify.sanitize(data.content),
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
        } finally {
            setPosting(false);
        }
    };

    return (
        <PageWrapper>
            <main className="pb-20 h-screen px-4 mt-4">
                <div className="bg-white rounded-2xl box-shadow-black p-4 mb-4  border-2 border-black">
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
                                {...register("title", { required: true, maxLength: 30 })}
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
                            <TextArea registerFunc={register} />
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
                    {posting && (
                        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                            <GridLoader color="#86198f" size={20} />
                        </div>
                    )}
                </div>
            </main>
        </PageWrapper>
    );
}

export default Add;