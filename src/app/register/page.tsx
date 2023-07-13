import Link from "next/link";

export default function Register() {
    return (
        <main className="px-4 mb-20 h-screen">
            <div className="flex justify-center items-center h-5/6">
                <div className="bg-white rounded-2xl p-4 w-full my-auto border-2 border-black box-shadow-black">
                    <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
                    <form>
                        <div className="mb-4">
                            <label htmlFor="name" className="block mb-2">
                                Your name:
                            </label>
                            <input type="name" id="name"
                                   className="w-full border border-fuchsia-800 px-4 py-2 rounded-2xl box-shadow-black"/>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block mb-2">
                                Email:
                            </label>
                            <input type="email" id="email"
                                   className="w-full border border-fuchsia-800 px-4 py-2 rounded-2xl box-shadow-black"/>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block mb-2">
                                Password:
                            </label>
                            <input type="password" id="password"
                                   className="w-full border border-fuchsia-800 px-4 py-2 rounded-2xl box-shadow-black"/>
                        </div>
                        <div className="flex justify-around">
                            <button type="submit"
                                    className="bg-fuchsia-800 font-bold hover:bg-fuchsia-600 text-white px-4 py-2 rounded box-shadow-black">
                                Register
                            </button>
                            <Link href="/login"
                                  className="text-fuchsia-800 font-bold hover:text-fuchsia-600 px-4 py-2 rounded border-2 border-black box-shadow-black">
                                I have an account
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}