import Posts from "@/components/Posts";
import PageWrapper from "@/components/PageWrapper";

async function GetPosts() {
    const res = await fetch('https://opinio-net-api-794h.vercel.app/api/api/microposts', {cache: 'no-store'});
    if (!res.ok) {
        throw new Error(res.statusText);
    }
    return res.json();
}

export default async function Home() {
    const posts = await GetPosts();


    return (
        <PageWrapper>
            <main className="px-4 pb-20 background-colour">
                <Posts posts={posts} pageTitle={"Feed"}/>
            </main>
        </PageWrapper>
    )
}
