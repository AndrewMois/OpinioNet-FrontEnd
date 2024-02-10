'use client';

import React, {useEffect, useState} from "react";
import Posts from "@/components/Posts";
import PageWrapper from "@/components/PageWrapper";
import {useAuthContext} from "@/components/Authentication";
import {useRouter} from "next/navigation";
import {motion} from "framer-motion";
import ErrorMessage from "../../components/ErrorMessage";
import {GridLoader} from "react-spinners";
import Avatar from "boring-avatars";
import InfiniteLoading from "../../components/InfiniteLoading";

export default function Account() {
    const [email, setEmail] = useState('Getting email...');
    const [userData, setUserData] = useState({});
    const [newEmail, setNewEmail] = useState("");
    const [editEmail, setEditEmail] = useState(false);
    const [editPassword, setEditPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [errors, setErrors] = useState(null);
    const {checkToken} = useAuthContext();
    const {push} = useRouter()

    //Function to fetch data for the specified user
    const fetchUser = async () => {
        setLoading(true);
        const user_id = sessionStorage.getItem('user_id');
        const token = sessionStorage.getItem('token');

        if (user_id && token) {
            try {
                // const res = await fetch(`https://opinio-net-api-794h.vercel.app/api/api/users/${user_id}`,
                const res = await fetch(`http://localhost/api/users/${user_id}`,
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

    const handleEmailChange = () => {
        if (newEmail.trim() !== '') {
            setEmail(newEmail);
            setEditEmail(false);
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
                setEmail(userData.email);
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


    // Update the email state once the userData state is set
    useEffect(() => {
        setEmail(userData.email || 'Getting email...'); // Set default value if email is not available
    }, [userData]);

    async function handleLogout() {
        const token = sessionStorage.getItem('token');
        if (!token) {
            push('/login');
        } else {
            // Logout successful
            sessionStorage.removeItem('user_id');
            sessionStorage.removeItem('token');
            push('/login');
        }

        // Commented out because the logout endpoint is not working
        // try {
        //     const res = await fetch("https://opinio-net-api-794h.vercel.app/api/logout",
        //         {
        //             method: "POST",
        //             headers: {
        //                 "Content-Type": "application/json",
        //                 'Authorization': `Bearer ${token}`,
        //             },
        //             body: JSON.stringify({token: token, user_id: sessionStorage.getItem('user_id')}),
        //         }
        //     );
        //
        //     if (res.ok) {
        //         // Logout successful
        //         sessionStorage.removeItem('user_id');
        //         sessionStorage.removeItem('token');
        //         push('/login');
        //     } else {
        //         // Logout failed
        //         setErrors({"message": "Failed to log out"})
        //     }
        // } catch {
        //     setErrors({"message": "An error occurred while logging out"})
        // }
    }

    // Function to fetch posts of the current user
    const fetchPosts = async () => {
        setLoading(true);
        const user_id = sessionStorage.getItem('user_id');
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
                setErrors({"message": "Error fetching your posts: " + res.statusText})
                setLoading(false);
                return []; // Return valid array
            }
            return await res.json();
        } catch (error) {
            setErrors({"message": "Error fetching your posts: " + error})
            return [];
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageWrapper>
            <main className={`pb-20 ${posts.length <= 1 ? "h-screen" : ""}`}>

                <div className="mx-auto border-b-2 border-black p-4">
                    {errors && <ErrorMessage errors={errors}/>}
                    <div className="flex items-center justify-center">
                        {/*<Image src="images/user.svg" alt="user logo" height="128" width="128"/>*/}
                        <Avatar size={128} name={userData.name} variant="beam"
                                colors={["#2b0749", "#86198f", "#FF005B", "#FF7D10", "#FFB238"]}/>
                    </div>
                    <h2 className="text-2xl font-bold text-center mt-4 mb-2">{userData.name ? userData.name : "Loading..."}</h2>

                    {/*Email inputs*/}
                    <div className="mb-4">
                        <label className="block font-semibold mb-1">Email:</label>
                        <input
                            type="text"
                            className="w-full border border-fuchsia-800 px-4 py-2 rounded-2xl box-shadow-black"
                            placeholder={email}
                            value={newEmail}
                            onClick={() => setEditEmail(true)}
                            onChange={(e) => setNewEmail(e.target.value)}
                        />
                        {editEmail && (
                            <div className='mt-2'>
                                <button
                                    className="bg-fuchsia-800 font-bold hover:bg-fuchsia-600 text-white px-4 py-2 rounded-2xl box-shadow-black border-2 border-black"
                                    onClick={handleEmailChange}>
                                    Save
                                </button>
                                <button
                                    className="bg-white font-bold hover:bg-fuchsia-600 text-black border-2 border-black px-4 py-2 rounded-2xl box-shadow-black ml-2"
                                    onClick={() => setEditEmail(false)}>
                                    Cancel
                                </button>
                            </div>
                        )}

                    </div>
                    {/*Password inputs*/}
                    <div className="mb-4">
                        <label className="block font-semibold mb-1">Change Password:</label>
                        <input type="password"
                               className="w-full border border-fuchsia-800 px-4 py-2 rounded-2xl box-shadow-black"
                               placeholder="Enter new password"
                               onClick={() => setEditPassword(true)}/>
                        {editPassword && (
                            <div className='mt-2'>
                                <button
                                    className="bg-fuchsia-800 font-bold hover:bg-fuchsia-600 text-white px-4 py-2 rounded-2xl box-shadow-black border-2 border-black"
                                    onClick={handleEmailChange}>
                                    Save
                                </button>
                                <button
                                    className="bg-white font-bold hover:bg-fuchsia-600 text-black border-2 border-black px-4 py-2 rounded-2xl box-shadow-black ml-2"
                                    onClick={() => setEditPassword(false)}>
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>
                    <motion.div whileTap={{scale: 0.9}}>
                        <button
                            className="mx-auto block bg-fuchsia-800 font-bold hover:bg-fuchsia-700 text-white px-4 py-2 border-2 border-black rounded-2xl box-shadow-black"
                            onClick={handleLogout}>
                            Log out
                        </button>
                    </motion.div>
                </div>
                <div className="mx-auto p-4">
                    <h1 className="text-2xl font-bold my-4">Your posts</h1>
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
