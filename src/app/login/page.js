import React from 'react';
import LoginForm from "../../components/LoginForm";

function Login() {

    return (
        <main className="px-4 pb-20 h-screen">
            <div className="flex justify-center items-center h-5/6">
                <div className="bg-white rounded-2xl p-4 w-full my-auto border-2 border-black box-shadow-black">
                    <h2 className="text-2xl font-bold mb-1 text-center">Greetings!</h2>
                    <h3 className="text-sm mb-4 text-center">Please log in to express yourself</h3>
                    <LoginForm/>
                </div>
            </div>
        </main>
    );
}

export default Login;