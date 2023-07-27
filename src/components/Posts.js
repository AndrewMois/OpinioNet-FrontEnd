import React from 'react';
import Image from "next/image";


const Posts = ({posts}) => {

    function handleLike(postId) {
        // Placeholder function for liking a post (to be replaced with a database update)
        console.log(`Post ${postId} liked!`);
    }

    if (posts.length === 0) {
        return (
            <div className="bg-white rounded-2xl box-shadow-black p-4 mb-4  border-2 border-black">
                <h2 className="text-lg font-semibold mb-2">No posts yet</h2>
                <p className="text-gray-600 mb-2">Be curious, go ask some questions!</p>
            </div>
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
                            <span>{post.likes}</span>
                            <button>
                                <Image src="/images/like.svg" alt="like" width={19} height={19}
                                       className="bg-fuchsia-800 h-min p-1 box-content rounded-lg"
                                       onClick={() => handleLike(post.id)}/>
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