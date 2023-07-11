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

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className={inter.className + " "}>
        <Logo text="OpinioNet"/>
        <Navigation/>
        {children}
        </body>
        </html>
    )
}
