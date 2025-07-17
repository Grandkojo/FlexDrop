// this is the custom dropdown for the dropdown menu

class FlexDropdown {
    constructor(element) {
        this.element = element;
        this.select = this.element.querySelector('.flex-dropdown-select');
        this.options = this.element.querySelector('.flex-dropdown-options');
        this.init();
    }

    init() {
        // Calculate and set widths based on content
        if (this.select && this.options) {
            // Temporarily make options visible to calculate width
            this.options.style.display = 'block';
            this.options.style.visibility = 'hidden';
            this.options.style.position = 'absolute';
            this.options.style.top = '-9999px';
            
            // First, measure the premier text in the select area
            const premierElement = this.select.querySelector('.flex-dropdown-option.premier');
            let maxWidth = 0;
            
            if (premierElement) {
                const clone = premierElement.cloneNode(true);
                clone.style.position = 'absolute';
                clone.style.visibility = 'hidden';
                clone.style.width = 'auto';
                document.body.appendChild(clone);
                
                maxWidth = clone.offsetWidth;
                document.body.removeChild(clone);
            }
            
            // Then measure all option elements and find the maximum
            const optionElements = this.options.querySelectorAll('.flex-dropdown-option');
            
            optionElements.forEach(option => {
                // Clone the option to measure its natural width
                const clone = option.cloneNode(true);
                clone.style.position = 'absolute';
                clone.style.visibility = 'hidden';
                clone.style.width = 'auto';
                document.body.appendChild(clone);
                
                const optionWidth = clone.offsetWidth;
                if (optionWidth > maxWidth) {
                    maxWidth = optionWidth;
                }
                
                document.body.removeChild(clone);
            });
            
            const totalWidth = maxWidth + 50;
            
            this.select.style.width = `${totalWidth}px`;
            this.options.style.width = `${totalWidth}px`;
            
            this.options.style.display = 'none';
            this.options.style.visibility = 'visible';
            this.options.style.position = 'absolute';
            this.options.style.top = '100%';
            this.options.style.left = '0';
        }
        
        // Toggle the options list when the selection is clicked
        if (this.select && this.options) {
            this.select.addEventListener('click', (e) => {
                e.stopPropagation();
                const isVisible = this.options.style.display === 'block';
                this.options.style.display = isVisible ? 'none' : 'block';
            });
            
            // Prevent clicks on options from closing the dropdown
            this.options.addEventListener('click', (e) => {
                e.stopPropagation();
            });
            
            // Hide the options when clicking outside
            document.addEventListener('click', (e) => {
                // Only close if the click is outside the dropdown element
                if (!this.element.contains(e.target)) {
                    this.options.style.display = 'none';
                }
            });
        }
    }
}



window.FlexDropdown = FlexDropdown;