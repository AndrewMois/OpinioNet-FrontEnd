import React from 'react';
import LoginForm from "../../components/LoginForm";

function Login() {
 
    return (
        <main className="px-4 pb-20 h-screen">
            <div className="flex justify-center items-center h-5/6">
                <div className="bg-white rounded-2xl p-4 w-full my-auto border-2 border-black box-shadow-black">
                    <h2 className="text-2xl font-bold mb-4 text-center">Hey!</h2>
                    <LoginForm/>
                </div>
            </div>
        </main>
    );
}

export default Login;