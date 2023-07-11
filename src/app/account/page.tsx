'use client';
import Image from "next/image";
import {useState} from "react";

export default function Account() {
    const [email, setEmail] = useState('john.doe@example.com');
    const [newEmail, setNewEmail] = useState(email);
    const [editEmail, setEditEmail] = useState(false);

    const handleEmailChange = () => {
        if (newEmail.trim() !== '') {
            setEmail(newEmail);
            setEditEmail(false);
        }
    };

    const [newPassword, setNewPassword] = useState('')
    const [editPassword, setEditPassword] = useState(false);

    return (
        <main className="mb-20 h-screen">

            <div className="mx-auto border-b-2 border-black p-4">
                <div className="flex items-center justify-center">
                    <Image src="images/user.svg" alt="user logo" height="128" width="128"/>
                </div>
                <h2 className="text-2xl font-bold text-center mt-4 mb-2">John Doe</h2>

                {/*Email inputs*/}
                <div className="mb-4">
                    <label className="block font-semibold mb-1">Email:</label>
                    <input
                        type="text"
                        className="w-full border border-fuchsia-800 px-4 py-2 rounded-2xl box-shadow-black"
                        placeholder={email}
                        value={newEmail}
                        onClick={() => setEditEmail(true)}
                        onChange={(e) => setNewEmail(e.target.value)}
                    />
                    {editEmail && (
                        <div className='mt-2'>
                            <button
                                className="bg-fuchsia-800 font-bold hover:bg-fuchsia-600 text-white px-4 py-2 rounded-2xl box-shadow-black border-2 border-black"
                                onClick={handleEmailChange}>
                                Save
                            </button>
                            <button
                                className="bg-white font-bold hover:bg-fuchsia-600 text-black border-2 border-black px-4 py-2 rounded-2xl box-shadow-black ml-2"
                                onClick={() => setEditEmail(false)}>
                                Cancel
                            </button>
                        </div>
                    )}

                </div>
                {/*Password inputs*/}
                <div>
                    <label className="block font-semibold mb-1">Change Password:</label>
                    <input type="password"
                           className="w-full border border-fuchsia-800 px-4 py-2 rounded-2xl box-shadow-black"
                           placeholder="Enter new password"
                           onClick={() => setEditPassword(true)}/>
                    {editPassword && (
                        <div className='mt-2'>
                            <button
                                className="bg-fuchsia-800 font-bold hover:bg-fuchsia-600 text-white px-4 py-2 rounded-2xl box-shadow-black border-2 border-black"
                                onClick={handleEmailChange}>
                                Save
                            </button>
                            <button
                                className="bg-white font-bold hover:bg-fuchsia-600 text-black border-2 border-black px-4 py-2 rounded-2xl box-shadow-black ml-2"
                                onClick={() => setEditPassword(false)}>
                                Cancel
                            </button>
                        </div>
                    )}
                </div>
            </div>

        </main>
    )
}