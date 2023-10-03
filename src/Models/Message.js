/**
 * Represents a message in a chat application.
 *
 * @class
 */
export default class Message {
    /**
     * Create a new message.
     *
     * @constructor
     * @param {object} [params={}] - Parameters for initializing the message.
     * @param {string} [params.id=null] - The unique identifier for the message.
     * @param {string} [params.content=''] - The content of the message.
     * @param {number} [params.senderId=null] - The ID of the user who sent the message.
     * @param {number} [params.recipientId=null] - The ID of the user who will receive the message.
     * @param {number} [params.recipientType=null] - The type of the recipient (e.g., 'user', 'group').
     * @param {string} [params.timestamp=new Date().toISOString()] - The timestamp when the message was sent.
     * @param {boolean} [params.isEdited=false] - Indicates if the message was edited.
     * @param {boolean} [params.isDeleted=false] - Indicates if the message was deleted.
     * @param {string} [params.contentType='text'] - The type of content of the message (e.g., 'text', 'image', 'video').
     * @param {object} [params.metadata={}] - Additional metadata associated with the message.
     * @param {string} [params.groupId=null] - The ID of the group this message belongs to (if any).
     */
    constructor({
        id = null,
        content = '',
        senderId = null,
        recipientId = null,
        recipientType = null,
        timestamp = new Date().toISOString(),
        isEdited = false,
        isDeleted = false,
        contentType = 'text',
        metadata = {},
        groupId = null
    } = {}) {
        this.id = id;
        this.content = content;
        this.senderId = senderId;
        this.recipientId = recipientId;
        this.recipientType = recipientType;
        this.timestamp = timestamp;
        this.isEdited = isEdited;
        this.isDeleted = isDeleted;
        this.contentType = contentType;
        this.metadata = metadata;
        this.groupId = groupId;
    }

    // Convert the message object to a JSON string
    toJSON() {
        return JSON.stringify({
            id: this.id,
            content: this.content,
            senderId: this.senderId,
            recipientId: this.recipientId,
            recipientType: this.recipientType,
            timestamp: this.timestamp,
            isEdited: this.isEdited,
            isDeleted: this.isDeleted,
            contentType: this.contentType,
            metadata: this.metadata,
            groupId: this.groupId
        });
    }

    // Populate the message object from a JSON data
    fromJSON(data) {
        this.id = data.id;
        this.content = data.content;
        this.senderId = data.senderId;
        this.recipientId = data.recipientId;
        this.recipientType = data.recipientType;
        this.timestamp = data.timestamp;
        this.isEdited = data.isEdited;
        this.isDeleted = data.isDeleted;
        this.contentType = data.contentType;
        this.metadata = data.metadata;
        this.groupId = data.groupId;
    }
}