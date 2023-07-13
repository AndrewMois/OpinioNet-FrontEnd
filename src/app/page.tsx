import Posts from "@/components/Posts";
import Votes from "@/components/Votes/Votes";
import PageWrapper from "@/components/PageWrapper";


export default function Home() {
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

    return (
        <PageWrapper>
            <main className="px-4 mb-20">
                <Posts posts={posts} title={"Feed"}/>
                <Votes/>
            </main>
        </PageWrapper>
    )
}
