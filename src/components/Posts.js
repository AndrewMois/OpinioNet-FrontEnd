import React from 'react';
import Image from "next/image";

const Posts = () => {
    // Placeholder data for posts (to be replaced with data from a database)
    const posts = [
        {
            id: 1,
            title: 'Post 1',
            content: 'This is the content of Post 1.',
            author: 'John Doe',
            date: '2023-07-10',
            likes: 0,
        },
        {
            id: 2,
            title: 'Post 2',
            content: 'This is the content of Post 2.',
            author: 'Jane Smith',
            date: '2023-07-11',
            likes: 4
        },
        {
            id: 3,
            title: 'Post 3',
            content: 'This is the content of Post 3.',
            author: 'Bob Johnson',
            date: '2023-07-12',
            likes: 2
        },
        {
            id: 4,
            title: 'Post 4',
            content: 'This is the content of Post 4.',
            author: 'Mary Williams',
            date: '2023-07-13',
            likes: 8
        },
        {
            id: 5,
            title: 'Post 5',
            content: 'This is the content of Post 5.',
            author: 'James Jones',
            date: '2023-07-14',
            likes: 11
        },
        {
            id: 6,
            title: 'Post 6',
            content: 'This is the content of Post 6.',
            author: 'Patricia Brown',
            date: '2023-07-15',
            likes: 1
        }
    ];

    function HandleLike(postId) {
        // Placeholder function for liking a post (to be replaced with a database update)
        console.log(`Post ${postId} liked!`);
    }

    return (
        <div>
            <h1 className="text-2xl font-bold my-4">Feed</h1>
            {posts.map((post) => (
                <div
                    key={post.id}
                    className="bg-white rounded-2xl shadow-md p-4 mb-4  border-2 border-black"
                >
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
                        <div className="flex items-center justify-between gap-2">
                            <span>{post.likes}</span>
                            <button>
                                <Image src="/images/like.svg" alt="like" width={19} height={19}
                                       className="bg-fuchsia-800 h-min p-1 box-content rounded-lg"/>
                            </button>
                        </div>
                    </div>
                    <p className="text-gray-600 mb-2">{post.content}</p>
                    <div className="flex items-center text-gray-500">
                        <span className="mr-2">{post.author}</span>
                        <span>{post.date}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Posts;