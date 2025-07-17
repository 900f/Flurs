const express = require('express');
const { MongoClient } = require('mongodb');
const Stripe = require('stripe');
const rateLimit = require('express-rate-limit');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const mongoUri = process.env.MONGO_URI;

app.use(express.json());
app.use(express.static('public')); // Serve static files from 'public' directory

// Rate limiting: 10 requests per minute per IP
const createOrderLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 10, // Limit to 10 requests per IP
    message: {
        error: 'Too many requests. Please try again in a minute.'
    }
});

// Connect to MongoDB
let db;
MongoClient.connect(mongoUri, { useUnifiedTopology: true })
    .then(client => {
        db = client.db('flurs');
        console.log('Connected to MongoDB');
    })
    .catch(err => console.error('MongoDB connection error:', err));

app.post('/api/create-order', createOrderLimiter, async (req, res) => {
    const { rankFrom, rankTo, price } = req.body;

    // Validate input
    const validRanks = ['Copper', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Emerald', 'Diamond', 'Champion'];
    if (!validRanks.includes(rankFrom) || !validRanks.includes(rankTo)) {
        return res.status(400).json({ error: 'Invalid rank selection.' });
    }
    if (!price || isNaN(price) || ![7, 14, 21, 28, 35, 42, 49].includes(price)) {
        return res.status(400).json({ error: 'Invalid price.' });
    }

    try {
        // Generate unique order ID
        const orderId = uuidv4();

        // Create Stripe payment link
        const paymentLink = await stripe.paymentLinks.create({
            line_items: [
                {
                    price_data: {
                        currency: 'gbp',
                        product_data: {
                            name: `R6 Boosting: ${rankFrom} to ${rankTo}`
                        },
                        unit_amount: price * 100 // Convert to pence
                    },
                    quantity: 1
                }
            ],
            after_completion: {
                type: 'redirect',
                redirect: {
                    url: 'https://yourwebsite.com/thank-you' // Replace with your thank-you page
                }
            }
        });

        // Store order in MongoDB
        await db.collection('orders').insertOne({
            orderId,
            rankFrom,
            rankTo,
            price,
            timestamp: new Date().toISOString()
        });

        res.json({ orderId, stripeUrl: paymentLink.url });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Failed to create order.' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});