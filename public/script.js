// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-wf5vtI66GobLmGiQ_YdgYtHKgIin89U",
  authDomain: "flurssa.firebaseapp.com",
  projectId: "flurssa",
  storageBucket: "flurssa.firebasestorage.app",
  messagingSenderId: "309491253977",
  appId: "1:309491253977:web:d0c33997b92ee441de74c8"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const pricing = {
    Copper: {
        Bronze: 7,
        Silver: 14,
        Gold: 21,
        Platinum: 28,
        Emerald: 35,
        Diamond: 42,
        Champion: 49
    },
    Bronze: {
        Silver: 7,
        Gold: 14,
        Platinum: 21,
        Emerald: 28,
        Diamond: 35,
        Champion: 42
    },
    Silver: {
        Gold: 7,
        Platinum: 14,
        Emerald: 21,
        Diamond: 28,
        Champion: 35
    },
    Gold: {
        Platinum: 7,
        Emerald: 14,
        Diamond: 21,
        Champion: 28
    },
    Platinum: {
        Emerald: 7,
        Diamond: 14,
        Champion: 21
    },
    Emerald: {
        Diamond: 7,
        Champion: 14
    },
    Diamond: {
        Champion: 7
    }
};

// Predefined Stripe payment links
const stripeLinks = {
    7: 'https://buy.stripe.com/test_7_price_link', // Replace with actual £7 Stripe link
    14: 'https://buy.stripe.com/test_14_price_link', // Replace with actual £14 Stripe link
    21: 'https://buy.stripe.com/test_21_price_link', // Replace with actual £21 Stripe link
    28: 'https://buy.stripe.com/test_28_price_link', // Replace with actual £28 Stripe link
    35: 'https://buy.stripe.com/test_35_price_link', // Replace with actual £35 Stripe link
    42: 'https://buy.stripe.com/test_42_price_link', // Replace with actual £42 Stripe link
    49: 'https://buy.stripe.com/test_49_price_link' // Replace with actual £49 Stripe link
};

const rankOrder = ['Copper', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Emerald', 'Diamond', 'Champion'];

// Client-side rate limiting
const RATE_LIMIT_KEY = 'flurs_submit_limit';
const RATE_LIMIT_MAX = 10; // Max submissions per minute
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute in ms

function checkRateLimit() {
    const now = Date.now();
    const submissions = JSON.parse(localStorage.getItem(RATE_LIMIT_KEY) || '[]');
    const recentSubmissions = submissions.filter(timestamp => now - timestamp < RATE_LIMIT_WINDOW);
    
    if (recentSubmissions.length >= RATE_LIMIT_MAX) {
        return false;
    }
    
    recentSubmissions.push(now);
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(recentSubmissions));
    return true;
}

// UUID generation with fallback
function generateUUID() {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
        return crypto.randomUUID();
    }
    // Fallback for older browsers
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const rankFrom = document.getElementById('rankFrom');
    const rankTo = document.getElementById('rankTo');
    const form = document.getElementById('rankForm');
    const orderMessage = document.getElementById('orderMessage');

    // Update "Rank To" options based on "Rank From" selection
    rankFrom.addEventListener('change', () => {
        const fromValue = rankFrom.value;
        const fromIndex = rankOrder.indexOf(fromValue);
        
        // Reset "Rank To" options
        rankTo.innerHTML = '<option value="" disabled selected>Select your target rank</option>';
        
        // Populate valid "Rank To" options (higher ranks only)
        for (let i = fromIndex + 1; i < rankOrder.length; i++) {
            const option = document.createElement('option');
            option.value = rankOrder[i];
            option.textContent = rankOrder[i];
            rankTo.appendChild(option);
        }
    });

    // Handle form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const rankFromValue = rankFrom.value;
        const rankToValue = rankTo.value;

        if (!rankFromValue || !rankToValue) {
            orderMessage.style.display = 'block';
            orderMessage.innerHTML = 'Please select both ranks.';
            return;
        }

        // Calculate price
        const price = pricing[rankFromValue]?.[rankToValue];
        if (!price) {
            orderMessage.style.display = 'block';
            orderMessage.innerHTML = 'Invalid rank combination.';
            return;
        }

        // Check rate limit
        if (!checkRateLimit()) {
            orderMessage.style.display = 'block';
            orderMessage.innerHTML = 'Too many submissions. Please try again in a minute.';
            return;
        }

        // Generate unique order ID
        const orderId = generateUUID();

        // Get Stripe payment link
        const stripeLink = stripeLinks[price] || '#';

        // Save order to Firestore
        try {
            await db.collection('orders').doc(orderId).set({
                orderId,
                rankFrom: rankFromValue,
                rankTo: rankToValue,
                price,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });

            // Display order details and instructions
            orderMessage.style.display = 'block';
            orderMessage.innerHTML = `
                <strong>Your Order Details:</strong><br>
                Order Number: <strong>${orderId}</strong><br>
                Boosting from <strong>${rankFromValue}</strong> to <strong>${rankToValue}</strong><br>
                Price: <strong>£${price}</strong><br><br>
                Please join our <a href="https://discord.gg/your-discord-link" target="_blank" style="color: #ef4444;">Discord</a> and create a ticket in #buy. Copy and paste the following details into your ticket:<br><br>
                <pre style="background: rgba(255, 255, 255, 0.05); padding: 10px; border-radius: 8px;">
Order Number: ${orderId}
Current Rank: ${rankFromValue}
Desired Rank: ${rankToValue}
Price: £${price}
                </pre>
                Complete your payment to proceed: <a href="${stripeLink}" target="_blank" style="color: #ef4444;">Pay £${price} Now</a><br>
                Our staff will assist you shortly after payment confirmation.
            `;
        } catch (error) {
            console.error('Error saving order:', error);
            orderMessage.style.display = 'block';
            orderMessage.innerHTML = 'Error saving order. Please try again.';
        }
    });
});