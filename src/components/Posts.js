import React, {useState, useEffect} from "react";
import Image from "next/image";
import InfiniteLoading from "./InfiniteLoading";
import Link from "next/link";


const Posts = ({posts, setErrors, setLoading, setPosts}) => {

    // Initialize the likes state with the likes data from the `posts` prop.
    // We need it to change likes number faster
    const [likes, setLikes] = useState(() => {
        const likesObj = {};
        posts.forEach((post) => {
            likesObj[post.id] = {
                likes_count: post.likes_count,
                likes: post.likes,
                loading: false, // Initialize the loading state to false
            };
        });
        return likesObj;
    });

    const user_id = typeof window !== 'undefined' ? sessionStorage.getItem('user_id') : null;
    const token = typeof window !== 'undefined' ? sessionStorage.getItem('token') : null;

    async function handleLike(postId) {
        if (!user_id || !token) {
            // User is not logged in, handle as you see fit (e.g., show login popup)
            return;
        }

        try {
            // Check if the post is already liked by the user
            const isLiked = likes[postId]?.likes.some((like) => like.id === parseInt(user_id));

            // Set the loading state to true while fetching likes
            setLikes((prevLikes) => ({
                ...prevLikes,
                [postId]: {
                    ...prevLikes[postId],
                    loading: true,
                },
            }));

            if (isLiked) {
                // If already liked, unlike the post
                await fetch(`https://opinio-net-api-794h.vercel.app/api/api/microposts/${postId}/likes?user_id=${user_id}`,
                    {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                    });

                // Remove the user's like from the state
                setLikes((prevLikes) => ({
                    ...prevLikes,
                    [postId]: {
                        ...prevLikes[postId],
                        likes: prevLikes[postId].likes.filter((like) => like.id !== parseInt(user_id)),
                        likes_count: prevLikes[postId].likes_count - 1,
                    },
                }));
            } else {
                // If not liked, like the post
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

                if (res.ok) {
                    // Add the user's like to the state
                    const newLike = await res.json();
                    setLikes((prevLikes) => ({
                        ...prevLikes,
                        [postId]: {
                            likes: prevLikes[postId]?.likes ? [...prevLikes[postId].likes, newLike] : [newLike],
                            likes_count: prevLikes[postId]?.likes_count ? prevLikes[postId].likes_count + 1 : 1,
                        },
                    }));
                } else {
                    setErrors({"message": "Failed to like post"})
                }
            }
        } catch (error) {
            setErrors({"message": "Failed to like post"})
        } finally {
            // Set the loading state to false while fetching likes
            setLikes((prevLikes) => ({
                ...prevLikes,
                [postId]: {
                    ...prevLikes[postId],
                    loading: false,
                },
            }));
        }
    }

    async function handleDelete(postId) {
        setLoading(true);
        try {
            const res = await fetch(`https://opinio-net-api-794h.vercel.app/api/api/microposts/${postId}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                });
            if (!res.ok) {
                setErrors({"message": "Failed to delete post"})
            } else {
                setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
                return await res.json();
            }
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }

    // Update the likes state whenever the posts prop changes (on InfiniteScroll load)
    useEffect(() => {
        const likesObj = {};
        posts.forEach((post) => {
            likesObj[post.id] = {
                likes_count: post.likes_count,
                likes: post.likes,
            };
        });
        setLikes(likesObj);
    }, [posts]);

    if (posts.length === 0) {
        return (
            <InfiniteLoading/>
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
                            {likes[post.id]?.loading ?
                                (<div className="w-6 h-6 bg-gray-300 rounded animate-pulse"></div>) :
                                (<span>{likes[post.id]?.likes_count}</span>)}
                            <button>
                                <Image src="/images/like.svg" alt="like" width={19} height={19}
                                       className="bg-fuchsia-800 h-min p-1 box-content rounded-lg"
                                       onClick={() => handleLike(post.id)}/>
                            </button>
                        </div>
                    </div>
                    <p className="text-gray-600 mb-2">{post.content}</p>
                    <div className="flex justify-between text-gray-500 border-t pt-2 border-black opacity-90">
                        <div>
                            <Link href={`account/${post.user_id}`} className="mr-2 text-fuchsia-900 font-bold">
                                {post.user_name}
                            </Link>
                            <span>{new Date(post.created_at).toLocaleString(undefined, {
                                hour: 'numeric',
                                minute: 'numeric',
                                day: 'numeric',
                                month: 'short',
                                hour12: false,
                            })}</span>
                        </div>
                        {user_id && parseInt(user_id) === post.user_id && (
                            <button onClick={() => handleDelete(post.id)}>
                                <Image src="/images/rubbish.svg" alt="like" width={19} height={19}
                                       className="bg-red-700 h-min p-1 box-content rounded-lg"/>
                            </button>
                        )}

                    </div>
                </div>
            ))}
        </>
    );
};


export default React.memo(Posts);