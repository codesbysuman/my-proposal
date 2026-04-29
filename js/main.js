import { ConversationManager } from './modules/ConversationManager.js';
import { ButtonController } from './modules/ButtonController.js';
import { UIManager } from './modules/UIManager.js';

class App {
    constructor() {
        this.conversationManager = new ConversationManager();
        this.uiManager = new UIManager();
        this.buttonController = new ButtonController(
            this.conversationManager,
            this.uiManager
        );
        this.init();
    }

    init() {
        this.buttonController.setupEventListeners();
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new App();
});
