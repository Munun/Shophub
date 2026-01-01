const express = require('express');
const router = express.Router();
const pool = require('../db');
const { authenticateToken, isAdmin } = require('../middleware/auth');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Create Stripe checkout session
router.post('/create-checkout-session', authenticateToken, async (req, res) => {
  try {
    const { items, shipping_address } = req.body;
    const userId = req.user.userId;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    const productIds = items.map(item => item.product_id);
    const productsResult = await pool.query(
      'SELECT * FROM products WHERE id = ANY($1)',
      [productIds]
    );

    const products = productsResult.rows;
    const lineItems = [];
    let totalAmount = 0;

    for (const item of items) {
      const product = products.find(p => p.id === item.product_id);
      
      if (!product) {
        return res.status(404).json({ error: `Product ${item.product_id} not found` });
      }

      if (product.stock_quantity < item.quantity) {
        return res.status(400).json({ 
          error: `Insufficient stock for ${product.name}` 
        });
      }

      const itemTotal = parseFloat(product.price) * item.quantity;
      totalAmount += itemTotal;

      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
            description: product.description,
            images: product.image_url ? [product.image_url] : [],
          },
          unit_amount: Math.round(parseFloat(product.price) * 100),
        },
        quantity: item.quantity,
      });
    }

    const orderResult = await pool.query(
      `INSERT INTO orders (user_id, total_amount, status, shipping_address) 
       VALUES ($1, $2, 'pending', $3) RETURNING id`,
      [userId, totalAmount, shipping_address]
    );

    const orderId = orderResult.rows[0].id;

    for (const item of items) {
      const product = products.find(p => p.id === item.product_id);
      await pool.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) 
         VALUES ($1, $2, $3, $4)`,
        [orderId, item.product_id, item.quantity, product.price]
      );
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `http://localhost:5173/order-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:5173/checkout`,
      metadata: {
        orderId: orderId.toString(),
        userId: userId.toString(),
      },
    });

    res.json({ 
      sessionId: session.id,
      orderId: orderId,
      url: session.url
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

// Get user's orders
router.get('/my-orders', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    
    const result = await pool.query(
      `SELECT o.*, 
              json_agg(
                json_build_object(
                  'product_id', oi.product_id,
                  'product_name', p.name,
                  'quantity', oi.quantity,
                  'price', oi.price_at_purchase
                )
              ) as items
       FROM orders o
       LEFT JOIN order_items oi ON o.id = oi.order_id
       LEFT JOIN products p ON oi.product_id = p.id
       WHERE o.user_id = $1
       GROUP BY o.id
       ORDER BY o.created_at DESC`,
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

module.exports = router;
