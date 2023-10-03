/**
 * Represents a user in a chat application.
 *
 * @class
 */
export default class User {
    /**
     * Create a new user.
     *
     * @constructor
     * @param {object} [params={}] - Parameters for initializing the user.
     * @param {string} [params.id=null] - The unique identifier for the user.
     * @param {string} [params.username=''] - The username of the user.
     * @param {string} [params.displayName=''] - The display name of the user.
     * @param {string} [params.email=''] - The email address of the user.
     * @param {string} [params.avatarUrl=null] - The URL to the user's avatar.
     * @param {Date} [params.dateJoined=null] - The date when the user joined the chat.
     * @param {string} [params.status='offline'] - The status of the user (e.g., 'online', 'offline', 'away').
     * @param {boolean} [params.isModerator=false] - Indicates if the user has moderator privileges.
     * @param {string} [params.bio=''] - A short bio or description about the user.
     * @param {string} [params.password=''] - A user password (hash).
     */
    constructor({
        id = null,
        username = '',
        displayName = '',
        email = '',
        avatarUrl = null,
        dateJoined = new Date(),
        status = 'offline',
        isModerator = false,
        bio = '',
        password = ''
    } = {}) {
        this.id = id;
        this.username = username;
        this.displayName = displayName;
        this.email = email;
        this.avatarUrl = avatarUrl;
        this.dateJoined = dateJoined;
        this.status = status;
        this.isModerator = isModerator;
        this.bio = bio;
        this.password = password;
    }

    // Convert the user object to a JSON string
    toJSON() {
        return JSON.stringify({
            id: this.id,
            username: this.username,
            displayName: this.displayName,
            email: this.email,
            avatarUrl: this.avatarUrl,
            dateJoined: this.dateJoined,
            status: this.status,
            isModerator: this.isModerator,
            bio: this.bio,
            password: this.password
        });
    }

    // Populate the user object from a JSON data
    fromJSON(data) {
        this.id = data.id;
        this.username = data.username;
        this.displayName = data.displayName;
        this.email = data.email;
        this.avatarUrl = data.avatarUrl;
        this.dateJoined = new Date(data.dateJoined);
        this.status = data.status;
        this.isModerator = data.isModerator;
        this.bio = data.bio;
        this.password = data.password;

    }
}