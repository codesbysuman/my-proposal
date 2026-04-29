/**
 * Controls button interactions and positioning
 * Handles yes/no button logic
 */
export class ButtonController {
    constructor(conversationManager, uiManager) {
        this.conversationManager = conversationManager;
        this.uiManager = uiManager;
        this.yesBtnScale = 1;
        this.noClickCount = 0;
    }

    setupEventListeners() {
        const yesBtn = document.getElementById('yesBtn');
        const noBtn = document.getElementById('noBtn');

        yesBtn.addEventListener('click', () => this.handleYesClick());
        noBtn.addEventListener('mouseenter', () => this.handleNoHover(noBtn));
        noBtn.addEventListener('touchstart', (e) => this.handleNoTouchStart(e, noBtn));
        
        // Additional safety for mobile
        noBtn.addEventListener('click', (e) => this.handleNoClick(e, noBtn));
    }

    /**
     * Handle Yes button click
     */
    handleYesClick() {
        this.uiManager.showSuccess();
    }

    /**
     * Handle No button hover (desktop)
     */
    handleNoHover(noBtn) {
        const rect = noBtn.getBoundingClientRect();
        const newPosition = this.calculateNewPosition(rect);
        this.moveButtonTo(noBtn, newPosition);
        this.updateConversation();
    }

    /**
     * Handle No button touch start (mobile)
     */
    handleNoTouchStart(e, noBtn) {
        e.preventDefault();
        const rect = noBtn.getBoundingClientRect();
        const newPosition = this.calculateNewPosition(rect);
        this.moveButtonTo(noBtn, newPosition);
        this.updateConversation();
    }

    /**
     * Handle No button click (fallback)
     */
    handleNoClick(e, noBtn) {
        // If button moved, prevent click
        if (this.noClickCount > 0) {
            e.preventDefault();
            return;
        }
    }

    /**
     * Calculate new button position away from current position
     */
    calculateNewPosition(currentRect) {
        const containerRect = document.querySelector('.buttons-container').getBoundingClientRect();
        const padding = 20;
        
        let newX, newY;
        
        // Generate random position within container
        do {
            newX = Math.random() * (containerRect.width - currentRect.width - padding * 2) + padding;
            newY = Math.random() * (containerRect.height - currentRect.height - padding * 2) + padding;
        } while (
            // Ensure new position is significantly different from current
            Math.abs(newX - (currentRect.left - containerRect.left)) < 60 ||
            Math.abs(newY - (currentRect.top - containerRect.top)) < 60
        );

        return { x: newX, y: newY };
    }

    /**
     * Move button to new position
     */
    moveButtonTo(noBtn, position) {
        noBtn.style.left = `${position.x}px`;
        noBtn.style.top = `${position.y}px`;
        
        // Increase difficulty - scale up yes button, shrink no button
        this.yesBtnScale += 0.15;
        this.noClickCount++;
        this.uiManager.updateYesButtonSize(this.yesBtnScale);
        this.uiManager.updateNoButtonSize(Math.max(0.6, 1 - this.noClickCount * 0.05));
    }

    /**
     * Update conversation message
     */
    updateConversation() {
        this.conversationManager.nextMessage();
        const message = this.conversationManager.getCurrentMessage();
        this.uiManager.updateTitle(message.title);
        this.uiManager.updateNoButtonText(message.noText);
    }
          }
