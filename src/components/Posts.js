import React, { useState, useEffect } from "react";
import Image from "next/image";
import InfiniteLoading from "./InfiniteLoading";


const Posts = ({ posts }) => {
    //state to manage num of the likes and user status
    const [likes, setLikes] = useState({});

    const fetchLikes = async () => {
        try {
            const likePromises = posts.map((post) => fetch(`https://opinio-net-api-794h.vercel.app/api/api/microposts/${post.id}/likes`));
            const likeResponses = await Promise.all(likePromises);
            const likeDataArray = await Promise.all(likeResponses.map((res) => res.json()));
            const likesObj = likeDataArray.reduce((acc, likeData, index) => {
                acc[posts[index].id] = {
                    likes_count: likeData.likes_count,
                    likes: likeData.likes
                };
                return acc;
            }, {});

            setLikes(likesObj);
            // console.log(likes);
        } catch (error) {
            console.error('Error fetching likes:', error);
        }
    };

    //Implement retrieving num of the likes and user info who put the like when Posts are changed
    useEffect(() => {
        fetchLikes();
    }, [posts]);

    async function handleLike(postId) {

        const user_id = sessionStorage.getItem('user_id');
        const token = sessionStorage.getItem('token');
        if (user_id && token) {

            try {
                // Placeholder function for liking a post (to be replaced with a database update)
                console.log(`Post ${postId} liked!`);
                if (likes[postId]?.likes.find((like) => like.user_id == user_id)) {

                    await fetch(`https://opinio-net-api-794h.vercel.app/api/api/microposts/${postId}/likes?user_id=${user_id}`,
                        {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${token}`,
                            },
                        });

                    // Remove the user's like from the state
                    // setLikes((prevLikes) => ({
                    //     ...prevLikes,
                    //     [postId]: {
                    //         likes: prevLikes[postId].likes.filter((like) => like.user_id !== user_id),
                    //         likes_count: prevLikes[postId].likes_count - 1,
                    //     },
                    // }));
                    fetchLikes();
                } else {

                    const res = await fetch(`https://opinio-net-api-794h.vercel.app/api/api/microposts/${postId}/likes`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "Accept": "application/json",
                            },
                            body: JSON.stringify({

                                "user_id": user_id,
                            }),
                        });
                    // Add the user's like to the state
                    // const newLike = await res.json();
                    // setLikes((prevLikes) => ({
                    //     ...prevLikes,
                    //     [postId]: {
                    //         likes: [...prevLikes[postId].likes, newLike],
                    //         likes_count: prevLikes[postId].likes_count + 1,
                    //     },
                    // }));

                    if (!res.ok) {
                        console.error('Error liking post:', res.statusText);
                        console.log(user_id);

                        return [];
                    }
                    fetchLikes();
                }


            } catch (error) {
                console.error('Error liking post:', error);
            }
        }

    }

    if (posts.length === 0) {
        return (
            <InfiniteLoading />
        )
    }

    return (
        <>
            {posts.map((post) => (
                <div
                    key={post.id}
                    className="bg-white rounded-2xl box-shadow-black p-4 mb-4  border-2 border-black"
                >
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
                        <div className="flex items-center justify-between gap-2">
                            <span>{likes[post.id]?.likes_count || 0}</span>
                            <button>
                                <Image src="/images/like.svg" alt="like" width={19} height={19}
                                    className="bg-fuchsia-800 h-min p-1 box-content rounded-lg"
                                    onClick={() => handleLike(post.id)} />
                            </button>
                        </div>
                    </div>
                    <p className="text-gray-600 mb-2">{post.content}</p>
                    <div className="flex items-center text-gray-500">
                        <span className="mr-2">{post.user_name}</span>
                        <span>{new Date(post.created_at).toLocaleString(undefined, {
                            hour: 'numeric',
                            minute: 'numeric',
                            day: 'numeric',
                            month: 'short',
                            hour12: false,
                        })}</span>
                    </div>
                </div>
            ))}
        </>
    );
};

export default React.memo(Posts);