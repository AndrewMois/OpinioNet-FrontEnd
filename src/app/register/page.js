import RegisterForm from "../../components/RegisterForm";

export default function Register() {

    return (
        <main className="px-4 pb-20 h-screen">
            <div className="flex justify-center items-center h-5/6">
                <div className="bg-white rounded-2xl p-4 w-full my-auto border-2 border-black box-shadow-black">
                    <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
                    <RegisterForm/>
                </div>
            </div>
        </main>
    )
}