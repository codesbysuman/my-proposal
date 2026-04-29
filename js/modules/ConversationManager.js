/**
 * Manages conversation state and responses
 * Handles the dialogue flow for the app
 */
export class ConversationManager {
    constructor() {
        this.conversationIndex = 0;
        this.messages = [
            {
                title: "Will you be my girlfriend? 💕",
                noText: "No"
            },
            {
                title: "Are you sure? 🥺",
                noText: "Still no"
            },
            {
                title: "Pretty please? 😢",
                noText: "Nope"
            },
            {
                title: "I'm begging you... 😭",
                noText: "Not today"
            },
            {
                title: "Just give me a chance! 💔",
                noText: "Maybe later"
            },
            {
                title: "You're breaking my heart! 😩",
                noText: "Hard pass"
            },
            {
                title: "One more chance? Please? 🙏",
                noText: "Nah"
            },
            {
                title: "Is it something I said? 😞",
                noText: "Run away!"
            }
        ];
    }

    /**
     * Get current message based on conversation index
     */
    getCurrentMessage() {
        const index = Math.min(this.conversationIndex, this.messages.length - 1);
        return this.messages[index];
    }

    /**
     * Move to next message
     */
    nextMessage() {
        if (this.conversationIndex < this.messages.length - 1) {
            this.conversationIndex++;
        }
    }

    /**
     * Get total number of "No" clicks
     */
    getClickCount() {
        return this.conversationIndex;
    }

    /**
     * Check if at end of conversation
     */
    isAtEnd() {
        return this.conversationIndex >= this.messages.length - 1;
    }

    /**
     * Reset conversation
     */
    reset() {
        this.conversationIndex = 0;
    }
}
