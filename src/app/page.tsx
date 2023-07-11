import Posts from "@/components/Posts";
import Votes from "@/components/Votes/Votes";


export default function Home() {
    return (
        <main className="px-4 mb-20">
            <Posts/>
            <Votes/>
        </main>
    )
}
