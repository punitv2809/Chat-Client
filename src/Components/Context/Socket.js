import { io } from 'socket.io-client';

const URL = 'http://127.0.0.1:3000';

export const socket = io(
    URL, {
    auth: {
        register: {
            id: "651c64153e249ed2dcab1460",
            username: "punit_verma",
            displayName: "Punit Verma",
            email: "dummy_user@example.com",
            avatarUrl: "https://i.imgur.com/4QFb6wW.png",
            dateJoined: new Date("2023-01-01T00:00:00Z"),
            status: "online",
            isModerator: true,
            bio: "This is a dummy user for testing purposes."
        }
    }
});