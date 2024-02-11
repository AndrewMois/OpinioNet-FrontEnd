'use client';

import React, {useEffect, useState} from "react";
import Posts from "../../../components/Posts";
import PageWrapper from "../../../components/PageWrapper";
import {useAuthContext} from "../../../components/Authentication";
import {useRouter} from "next/navigation";
import ErrorMessage from "../../../components/ErrorMessage";
import {GridLoader} from "react-spinners";
import Avatar from "boring-avatars";
import InfiniteLoading from "../../../components/InfiniteLoading";

export default function UserPage({params}) {
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [errors, setErrors] = useState(null);
    const {checkToken} = useAuthContext();
    const {push} = useRouter()

    //Function to fetch data for the specified user
    const fetchUser = async () => {
        setLoading(true);
        const user_id = params.id;
        const token = sessionStorage.getItem('token');

        if (user_id && token) {
            try {
                // const res = await fetch(`https://opinio-net-api-794h.vercel.app/api/api/users/${user_id}`,
                const res = await fetch(`http://35.183.51.223/api/users/${user_id}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': 'Bearer ' + token,
                        }
                    });
                if (!res.ok) {
                    setErrors({"message": "Error fetching data: " + res.statusText})
                    return []; // Return valid array
                }
                return await res.json();
            } catch (error) {
                setErrors({"message": "Error fetching data: " + error});
                return [];
            } finally {
                setLoading(false);
            }
        }
    };

    // Function to fetch posts of the current user
    const fetchPosts = async () => {
        setLoading(true);
        const user_id = params.id;
        const token = sessionStorage.getItem('token');
        try {
            // const res = await fetch(`https://opinio-net-api-794h.vercel.app/api/api/users/${user_id}/microposts`, {
            const res = await fetch(`http://localhost/api/users/${user_id}/microposts`, {
                cache: 'no-store',
                headers: {
                    'Authorization': 'Bearer ' + token,
                }
            });
            if (!res.ok) {
                setErrors({"message": "Error fetching user's posts: " + res.statusText})
                return []; // Return valid array
            }
            return await res.json();
        } catch (error) {
            setErrors({"message": "Error fetching posts: " + error})
            return [];
        } finally {
            setLoading(false);
        }
    };

    // Check if the token exists in storage on app load
    useEffect(() => {
        const checkUserLoggedIn = async () => {
            setLoading(true)
            const loggedIn = await checkToken();
            if (!loggedIn) {
                setLoading(false)
                push('/login');
            } else {
                // If the user is logged in, fetch their data
                const userData = await fetchUser();
                setUserData(userData);

                const fetchUserPosts = async () => {
                    const fetchedPosts = await fetchPosts();
                    setPosts(fetchedPosts.data);
                };

                await fetchUserPosts();
                setLoading(false)
            }
        };
        checkUserLoggedIn();
    }, [checkToken, push]);


    return (
        <PageWrapper>
            <main className={`pb-20 ${posts.length <= 2 ? "h-screen" : ""}`}>

                <div className="mx-auto border-b-2 border-black p-4">
                    {errors && <ErrorMessage errors={errors}/>}
                    <div className="flex items-center justify-center">
                        <Avatar size={128} name={userData.name} variant="beam"
                                colors={["#2b0749", "#86198f", "#FF005B", "#FF7D10", "#FFB238"]}/>
                    </div>
                    <h2 className="text-2xl font-bold text-center mt-4 mb-2">{userData.name ? userData.name : "Loading..."}</h2>
                </div>
                <div className="mx-auto p-4">
                    <h1 className="text-2xl font-bold my-4">{userData.name === undefined ? "Posts" : userData.name + "'s posts"}</h1>
                    {loading ? <InfiniteLoading/> :
                        <Posts posts={posts} setErrors={setErrors} setLoading={setLoading} setPosts={setPosts}/>
                    }
                </div>
                {loading && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                        <GridLoader color="#86198f" size={20}/>
                    </div>
                )}
            </main>
        </PageWrapper>
    )
}