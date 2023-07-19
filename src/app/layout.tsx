import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import Navigation from "@/components/Navigation";
import Logo from "@/components/Logo";


const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'OpinioNet',
    description: 'Just ask it!',
}

export default function RootLayout({children,}: {
    children: React.ReactNode
}) {
    return (

        <html lang="en">
        <body className={inter.className + " md:border-black md:border-x-4 max-w-screen-md mx-auto"}>
        <header className="relative z-50">
            <Logo text="OpinioNet"/>
            <Navigation/>
        </header>
        {children}
        </body>
        </html>
    )
}
