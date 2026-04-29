/**
 * Manages UI updates and visual changes
 * Handles DOM manipulation and styling
 */
export class UIManager {
    constructor() {
        this.titleElement = document.getElementById('title');
        this.yesBtnElement = document.getElementById('yesBtn');
        this.noBtnElement = document.getElementById('noBtn');
        this.successMessageElement = document.getElementById('successMessage');
    }

    /**
     * Update title text
     */
    updateTitle(text) {
        this.titleElement.textContent = text;
        this.animateElement(this.titleElement);
    }

    /**
     * Update No button text
     */
    updateNoButtonText(text) {
        this.noBtnElement.textContent = text;
        this.animateElement(this.noBtnElement);
    }

    /**
     * Update Yes button size (scale)
     */
    updateYesButtonSize(scale) {
        this.yesBtnElement.style.transform = `scale(${Math.min(scale, 2.5)})`;
        this.yesBtnElement.style.fontSize = `${1.1 * scale}rem`;
    }

    /**
     * Update No button size (scale)
     */
    updateNoButtonSize(scale) {
        this.noBtnElement.style.transform = `scale(${scale})`;
        this.noBtnElement.style.fontSize = `${1.1 * scale}rem`;
    }

    /**
     * Show success message
     */
    showSuccess() {
        const card = document.querySelector('.card');
        const buttonsContainer = document.querySelector('.buttons-container');
        
        buttonsContainer.classList.add('hidden');
        this.successMessageElement.classList.remove('hidden');
        
        this.animateElement(card);
    }

    /**
     * Animate element with pulse effect
     */
    animateElement(element) {
        element.style.animation = 'none';
        
        // Trigger reflow to restart animation
        void element.offsetWidth;
        
        element.style.animation = 'titlePulse 0.5s ease-in-out';
    }
}
