'use client';
import Posts from "@/components/Posts";
import PageWrapper from "@/components/PageWrapper";
import InfiniteScroll from 'react-infinite-scroll-component';
import React, { useState, useEffect } from "react";
import Loading from "./loading";
import InfiniteLoading from "../components/InfiniteLoading";
import ErrorMessage from "../components/ErrorMessage";

export default function Home() {
    // const posts = await GetPosts();
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState(null);

    // Function to fetch data for the specified page
    const fetchData = async (page) => {
        try {
            const res = await fetch(`https://opinio-net-api-794h.vercel.app/api/api/microposts?page=${page}`, {
                cache: 'no-store',
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
    };

    // Function to load more data when scrolling
    const loadMorePosts = async () => {
        const nextPage = page + 1;
        const newRes = await fetchData(nextPage);
        const newPosts = newRes.data;

        setPosts((post) => [...post, ...newPosts]);
        setPage(nextPage);
        if (newRes.next_page_url === null) {
            setHasMore(false); // No more data to load
        }
    };

    useEffect(() => {
        // Load initial data on component mount
        fetchData(page)
            .then(initialData => {
                setPosts(initialData.data);
                setLoading(false);
            });
    }, []);

    return (
        <PageWrapper>
            <main className="px-4 pb-20 background-colour">
                {loading ? <Loading /> : (
                    <InfiniteScroll next={loadMorePosts} hasMore={hasMore} loader={<InfiniteLoading />}
                        dataLength={posts.length}>
                        <h1 className="text-2xl font-bold my-4">Feed</h1>
                        {errors && <ErrorMessage errors={errors} />}
                        <Posts posts={posts} setLoading={setLoading} setErrors={setErrors} setPosts={setPosts} />
                    </InfiniteScroll>)}
            </main>
        </PageWrapper>
    )
}
