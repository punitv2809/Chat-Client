import React from 'react';
import socketIOClient from "socket.io-client";

const Register = () => {
    const ENDPOINT = "http://127.0.0.1:3000";
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const socket = socketIOClient(ENDPOINT, {
            auth: {
                register: {
                    id: "123456789",
                    username: "dummy_user",
                    displayName: "Dummy User",
                    email: "dummy_user@example.com",
                    avatarUrl: "https://i.imgur.com/4QFb6wW.png",
                    dateJoined: new Date("2023-01-01T00:00:00Z"),
                    status: "online",
                    isModerator: true,
                    bio: "This is a dummy user for testing purposes."
                }
            }
        })
    }
    return (
        <>
            <div className="w-screen h-[95vh] flex flex-col md:flex-row bg-white dark:bg-primary text-black dark:text-white">
                {/* Left side with image */}
                <div className="w-full md:w-1/2 flex justify-center items-center space-x-4 pb-6 md:pb-0">
                    <img src="https://media.giphy.com/media/3og0IMVPaqrnGfBnZm/giphy.gif" alt="Chat illustration" className="max-w-sm max-h-3/4 mx-2" />
                    <img src="https://media.giphy.com/media/l3vR2NcAVb9nhBoEE/giphy.gif" alt="Chat illustration" className="max-w-sm max-h-3/4 mx-2" />
                </div>

                {/* Right side with form */}
                <div className="w-full md:w-1/2 flex flex-col justify-center items-center space-y-6">
                    <h1 className="text-4xl font-bold mb-4 px-3">ChatterBox: Where Conversations Bloom!</h1>

                    <form className="w-3/4 bg-glass p-3 rounded-lg">
                        <div className="mb-4">
                            <label className="block mb-2">Username</label>
                            <input className="w-full p-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400" type="text" placeholder="Username" />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Email</label>
                            <input className="w-full p-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400" type="email" placeholder="Email Address" />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Password</label>
                            <input className="w-full p-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400" type="password" placeholder="Password" />
                        </div>
                        <div className="mb-4">
                            <button onClick={handleFormSubmit} className="bg-pink-500 text-white p-2 rounded-lg w-full hover:bg-pink-600">Join the Conversation</button>
                        </div>
                    </form>

                    <div className="text-center">
                        <p className="text-sm">Already tuned in?</p>
                        <a href="/login" className="text-pink-500 hover:underline">Log in and keep chatting!</a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;
