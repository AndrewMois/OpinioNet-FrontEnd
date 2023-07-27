'use client';
import Image from "next/image";
import {useEffect, useState} from "react";
import Posts from "@/components/Posts";
import PageWrapper from "@/components/PageWrapper";
import {useAuthContext} from "@/components/Authentication";
import {useRouter} from "next/navigation";

export default function Account() {
    const [email, setEmail] = useState('Getting email...');
    const [userData, setUserData] = useState({});
    const [newEmail, setNewEmail] = useState("");
    const [editEmail, setEditEmail] = useState(false);
    const {checkToken} = useAuthContext();
    const {push} = useRouter()

    //Function to fetch data for the specified user
    const fetchUser = async () => {
        const user_id = sessionStorage.getItem('user_id');
        const token = sessionStorage.getItem('token');

        if (user_id && token) {
            try {
                const res = await fetch(`https://opinio-net-api-794h.vercel.app/api/api/users/${user_id}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': 'Bearer ' + token,
                        }
                    });
                if (!res.ok) {
                    console.error('Error fetching data:', res.statusText);
                    return []; // Return valid array
                }
                return await res.json();
            } catch (error) {
                console.error('Error fetching data:', error);
                return [];
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
            const loggedIn = await checkToken();
            if (!loggedIn) {
                push('/login');
            } else {
                // If the user is logged in, fetch their data
                const userData = await fetchUser();
                setUserData(userData);
                setEmail(userData.email);
                console.log(userData);
            }
        };
        checkUserLoggedIn();
    }, [checkToken, push]);


    // Update the email state once the userData state is set
    useEffect(() => {
        setEmail(userData.email || 'Getting email...'); // Set default value if email is not available
    }, [userData]);


    const [editPassword, setEditPassword] = useState(false);

    const posts = [
        {
            id: 1,
            title: 'Post 1',
            content: 'This is the content of Post 1.',
            author: 'John Doe',
            date: '2023-07-10',
            likes: 0,
        },
    ];

    return (
        <PageWrapper>
            <main className="pb-20 h-screen">

                <div className="mx-auto border-b-2 border-black p-4">
                    <div className="flex items-center justify-center">
                        <Image src="images/user.svg" alt="user logo" height="128" width="128"/>
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
                    <div>
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
                </div>
                <div className="mx-auto p-4">
                    <h1 className="text-2xl font-bold my-4">Your posts</h1>
                    <Posts posts={posts}/>
                </div>
            </main>
        </PageWrapper>
    )
}