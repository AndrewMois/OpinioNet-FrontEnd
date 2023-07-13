'use client';

import React from 'react';
import {useState} from "react";
import TextArea from "../../components/TextArea";

function Add() {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle the form submission here
        console.log('Title:', title);
        console.log('Content:', content);
        // Reset the form fields
        setTitle('');
        setContent('');
    };

    return (
        <main className="mb-20">
            <div className="mx-auto border-b-2 border-black p-4">
                <h2 className="text-2xl font-bold mb-4">Add New Post</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block font-semibold mb-1">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            className="w-full border border-fuchsia-800 px-4 py-2 rounded-2xl box-shadow-black"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="content" className="block font-semibold mb-1">
                            Question
                        </label>
                        <TextArea setContent={setContent}/>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-fuchsia-800 font-bold hover:bg-fuchsia-600 text-white px-4 py-2 rounded box-shadow-black"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default Add;