import React, {useState, useEffect} from "react";
import Image from "next/image";
import InfiniteLoading from "./InfiniteLoading";
import Link from "next/link";
import Votes from "./Votes/Votes";
import Button from "./Votes/Button";
import {motion} from "framer-motion";


const Posts = ({posts, setErrors, setLoading, setPosts}) => {

    const user_id = typeof window !== 'undefined' ? sessionStorage.getItem('user_id') : null;
    const token = typeof window !== 'undefined' ? sessionStorage.getItem('token') : null;

    // Initialize the likes state with the likes data from the `posts` prop.
    // We need it to change likes number faster
    const [likes, setLikes] = useState(() => {
        const likesObj = {};
        posts.forEach((post) => {
            likesObj[post.id] = {
                likes_count: post.likes_count,
                likes: post.likes,
                loading: false, // Initialize the loading state to false
                isLiked: null,
            };
        });
        return likesObj;
    });

    //Initialize the votes state. This runs only once when loading or reloading browser.
    const [votes, setVotes] = useState(() => {
        const voteObj = {};
        posts.forEach((post) => {
            voteObj[post.id] = {
                agree_count: post.agree_count,
                not_sure_count: post.not_sure_count,
                disagree_count: post.disagree_count,
                loading: false,
                isVoted: false,
            };
            // Check if the current user has voted for this post
            const currentUserVote = post.votes.find((vote) => parseInt(vote.pivot.user_id) === parseInt(user_id));
            if (currentUserVote) {
                voteObj[post.id].isVoted = true; // Set isVoted to true if the user has voted
            }
        });
        return voteObj;
    })


    async function handleLike(postId) {

        if (!user_id || !token) {
            setErrors({"message": "Please, log in to like a post"});
            window.scrollTo({top: 0, behavior: 'smooth'});
            return;
        }

        try {
            // Check if the post is already liked by the user
            likes[postId].isLiked = likes[postId].likes.some((like) => parseInt(like.id) === parseInt(user_id));


            // Set the loading state to true while fetching likes
            setLikes((prevLikes) => ({
                ...prevLikes,
                [postId]: {
                    ...prevLikes[postId],
                    loading: true,
                },
            }));

            if (likes[postId].isLiked) {
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
                        likes: prevLikes[postId].likes.filter((like) => parseInt(like.id) !== parseInt(user_id)),
                        likes_count: prevLikes[postId].likes_count - 1,
                        isLiked: false,
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
                            isLiked: true,
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

    //To switch button to graph and update graph contents by updating votes state  
    const updateVotesState = (micropost_id, status) => {
        setVotes((prevVotes) => ({
            ...prevVotes,
            [micropost_id]: {
                ...prevVotes[micropost_id],
                isVoted: true,
            },
        }));

        if (status === 'Agree') {
            setVotes((prevVotes) => ({
                ...prevVotes,
                [micropost_id]: {
                    ...prevVotes[micropost_id],
                    agree_count: prevVotes[micropost_id].agree_count + 1,
                },
            }));
        } else if (status === 'Not Sure') {
            setVotes((prevVotes) => ({
                ...prevVotes,
                [micropost_id]: {
                    ...prevVotes[micropost_id],
                    not_sure_count: prevVotes[micropost_id].not_sure_count + 1,
                },
            }));
        } else if (status === 'Disagree') {
            setVotes((prevVotes) => ({
                ...prevVotes,
                [micropost_id]: {
                    ...prevVotes[micropost_id],
                    disagree_count: prevVotes[micropost_id].disagree_count + 1,
                },
            }));
        }

        // console.log(votes);//The updated votes state may not be reflected immediately; React state is updated asynchronously, so there is no guarantee that console.log(votes) will show the latest votes state.
    };


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

        //Update the votes state whenever the posts prop changes (on InfiniteScroll load)
        const voteObj = {};
        posts.forEach((post) => {
            voteObj[post.id] = {
                agree_count: post.agree_count,
                not_sure_count: post.not_sure_count,
                disagree_count: post.disagree_count,
                loading: false,
                isVoted: false,

            };
            const currentUserVote = post.votes.find((vote) => parseInt(vote.pivot.user_id) === parseInt(user_id));
            if (currentUserVote) {
                voteObj[post.id].isVoted = true; // Set isVoted to true if the user has voted
            }
        })
        setVotes(voteObj);
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
                                (<span
                                    className="animate-pulse font-bold text-gray-500">{likes[post.id]?.likes_count}</span>) :
                                (<span className="font-bold">{likes[post.id]?.likes_count}</span>)}
                            <motion.div whileTap={{scale: 0.8}} className={"flex items-center justify-center"}>
                                <button disabled={likes[post.id]?.loading} onClick={() => handleLike(post.id)}
                                        className="disabled:cursor-not-allowed">
                                    <Image src="/images/like.svg" alt="like" width={19} height={19}
                                           className="bg-fuchsia-800 h-min p-1 box-content rounded-lg"/>
                                </button>
                            </motion.div>
                        </div>
                    </div>

                    <p className="text-gray-600 mb-2 whitespace-pre-line">{post.content}</p>
                    {votes[post.id]?.isVoted === true ? (
                        <Votes
                            agree_count={votes[post.id]?.agree_count}
                            not_sure_count={votes[post.id]?.not_sure_count}
                            disagree_count={votes[post.id]?.disagree_count}
                            user_id={user_id}
                            token={token}
                        />
                    ) : <Button user_id={user_id}
                                token={token} micropost_id={post.id} updateVotesState={updateVotesState}
                                setErrors={setErrors}
                    />}


                    <div
                        className="flex justify-between text-gray-500 border-t pt-2 border-black opacity-90 items-center">

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
                            <motion.div whileTap={{scale: 0.8}} className={"flex items-center justify-center"}>
                                <button onClick={() => handleDelete(post.id)}>
                                    <Image src="/images/rubbish.svg" alt="like" width={19} height={19}
                                           className="bg-red-700 h-min p-1 box-content rounded-lg"/>
                                </button>
                            </motion.div>
                        )}

                    </div>
                </div>
            ))}
        </>
    );
};


export default React.memo(Posts);
