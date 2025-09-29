document.addEventListener('DOMContentLoaded', function() {
    const steps = document.querySelectorAll('.step');
    const stepContents = document.querySelectorAll('.step-content');
    const nextButtons = document.querySelectorAll('.next-step');
    const prevButtons = document.querySelectorAll('.prev-step');
    const options = document.querySelectorAll('.option');
    const completeOrderBtn = document.getElementById('complete-order');

    const selectedFlavor = document.getElementById('selected-flavor');
    const selectedToppings = document.getElementById('selected-toppings');
    const selectedContainer = document.getElementById('selected-container');
    const orderTotal = document.getElementById('order-total');

    let orderData = { flavor: null, toppings: [], container: null, total: 0 };

    const USD_TO_INR = 83; // Conversion rate

    // Navigation
    nextButtons.forEach(btn => btn.addEventListener('click', () => navigateToStep(btn.dataset.next)));
    prevButtons.forEach(btn => btn.addEventListener('click', () => navigateToStep(btn.dataset.prev)));

    function navigateToStep(stepNumber) {
        steps.forEach(step => step.classList.toggle('active', step.dataset.step === stepNumber));
        stepContents.forEach(content => content.classList.toggle('active', content.id === `step-${stepNumber}`));
    }

    // Option selection
    options.forEach(option => {
        option.addEventListener('click', function() {
            const step1Active = document.getElementById('step-1').classList.contains('active');
            const step2Active = document.getElementById('step-2').classList.contains('active');
            const step3Active = document.getElementById('step-3').classList.contains('active');

            if (step1Active) {
                document.querySelectorAll('.flavor-options .option').forEach(f => f !== this && f.classList.remove('selected'));
                this.classList.toggle('selected');
                orderData.flavor = this.classList.contains('selected') 
                    ? { 
                        name: this.querySelector('div:nth-child(2)').textContent, 
                        priceUSD: parseFloat(this.dataset.price),
                        priceINR: parseFloat(this.dataset.price) * USD_TO_INR
                      } 
                    : null;
            } else if (step2Active) {
                this.classList.toggle('selected');
                const toppingName = this.querySelector('div:nth-child(2)').textContent;
                const toppingPriceUSD = parseFloat(this.dataset.price);
                if (this.classList.contains('selected')) {
                    orderData.toppings.push({ 
                        name: toppingName, 
                        priceUSD: toppingPriceUSD,
                        priceINR: toppingPriceUSD * USD_TO_INR
                    });
                } else {
                    orderData.toppings = orderData.toppings.filter(t => t.name !== toppingName);
                }
            } else if (step3Active) {
                document.querySelectorAll('.container-options .option').forEach(c => c !== this && c.classList.remove('selected'));
                this.classList.toggle('selected');
                orderData.container = this.classList.contains('selected') 
                    ? { 
                        name: this.querySelector('div:nth-child(2)').textContent, 
                        priceUSD: parseFloat(this.dataset.price),
                        priceINR: parseFloat(this.dataset.price) * USD_TO_INR
                      } 
                    : null;
            }

            updateOrderSummary();
        });
    });

    // Complete Order
    completeOrderBtn.addEventListener('click', () => {
        if (!orderData.flavor) { alert('Please select a flavor'); navigateToStep('1'); return; }
        if (!orderData.container) { alert('Please select a container'); navigateToStep('3'); return; }
        alert('Thank you! Your customized ice cream will be ready soon.');
    });

    function updateOrderSummary() {
        selectedFlavor.textContent = orderData.flavor ? `${orderData.flavor.name} (₹${orderData.flavor.priceINR.toFixed(2)})` : '-';
        selectedToppings.textContent = orderData.toppings.length > 0 
            ? orderData.toppings.map(t => `${t.name} (₹${t.priceINR.toFixed(2)})`).join(', ') 
            : '-';
        selectedContainer.textContent = orderData.container ? `${orderData.container.name} (₹${orderData.container.priceINR.toFixed(2)})` : '-';

        let totalINR = (orderData.flavor?.priceINR || 0) 
            + orderData.toppings.reduce((sum, t) => sum + t.priceINR, 0) 
            + (orderData.container?.priceINR || 0);

        orderData.total = totalINR;
        orderTotal.textContent = `₹${totalINR.toFixed(2)}`;
    }

    // Function to show "Coming Soon" alert
    function showComingSoonAlert(event) {
        event.preventDefault(); // Prevent default link behavior (e.g., navigating to #)
        alert('Coming Soon!');
    }

    // Add event listeners to the navigation links in the header
    const topNavLinks = document.querySelectorAll('.top-nav .nav-links a');
    topNavLinks.forEach(link => {
        link.addEventListener('click', showComingSoonAlert);
    });

    // Add event listeners to the navigation links in the footer
    const footerLinks = document.querySelectorAll('.footer-links a');
    footerLinks.forEach(link => {
        link.addEventListener('click', showComingSoonAlert);
    });
});