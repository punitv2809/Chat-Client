import { io } from 'socket.io-client';

const URL = 'http://127.0.0.1:3000';

export const socket = io(
    URL, {
    auth: {
        register: {
            id: "123456789",
            username: "punit verma",
            displayName: "Dummy User",
            email: "dummy_user@example.com",
            avatarUrl: "https://i.imgur.com/4QFb6wW.png",
            dateJoined: new Date("2023-01-01T00:00:00Z"),
            status: "online",
            isModerator: true,
            bio: "This is a dummy user for testing purposes."
        }
    }
});