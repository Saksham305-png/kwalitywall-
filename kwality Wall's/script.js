document.addEventListener('DOMContentLoaded', () => {
    const customizeButton = document.getElementById('customizeBtn');

    if (customizeButton) {
        customizeButton.addEventListener('click', (event) => {
            // Prevent the default form submission or link action
            event.preventDefault();

            // Simple alert to show functionality
            alert("Redirecting to the Custom Order Builder! (This would lead to a dedicated ordering page.)");

            // In a real application, you would change the URL here:
            // window.location.href = '/customize-order.html';
        });
    }

    // Optional: Add hover/click effect for navigation dropdowns (minimal example)
    const navDropdowns = document.querySelectorAll('.nav-dropdown');
    navDropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', (event) => {
            // For a fully functional dropdown, you'd toggle a submenu's visibility.
            // For this basic example, we'll just log it.
            console.log(`Dropdown clicked: ${event.target.textContent.trim().split(' ')[0]}`);
        });
    });
});