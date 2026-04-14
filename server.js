// ============================================
// Lutu App - Stripe Payment Server
// ============================================
// This server handles:
// 1. Creating Stripe Customers
// 2. Creating PaymentIntents for donations
// 3. Providing ephemeral keys for the mobile SDK
//
// Deploy this to Railway, Render, Heroku, or any Node.js host.
// ============================================

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();

// IMPORTANT: The webhook endpoint needs the raw body for Stripe signature
// verification, so we must NOT apply express.json() globally.
// Instead, apply it selectively to non-webhook routes.
app.use((req, res, next) => {
  if (req.originalUrl === '/webhook') {
    next();
  } else {
    express.json()(req, res, next);
  }
});
app.use(cors());

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'Lutu Stripe Server' });
});

// ============================================
// Privacy Policy & Terms of Use (HTML page)
// ============================================
// Serves the privacy policy at /privacy
// Use this URL in App Store Connect: https://your-domain.up.railway.app/privacy
// ============================================
app.get('/privacy', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lutu - Privacy Policy &amp; Terms of Use</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.7; color: #1d1d1f; background: #fff; padding: 20px; max-width: 800px; margin: 0 auto; }
    h1 { font-size: 2em; text-align: center; margin: 40px 0 5px; }
    h2 { font-size: 1.5em; margin: 35px 0 15px; padding-bottom: 5px; border-bottom: 1px solid #e0e0e0; }
    h3 { font-size: 1.15em; margin: 25px 0 10px; }
    p { margin: 10px 0; }
    .subtitle { text-align: center; font-size: 1.1em; font-weight: 600; color: #555; margin-bottom: 30px; }
    .meta { text-align: center; color: #888; font-size: 0.9em; margin: 5px 0; }
    .intro { font-style: italic; color: #444; margin: 25px 0; padding: 15px; background: #f9f9f9; border-radius: 8px; }
    ul { margin: 10px 0 10px 25px; }
    li { margin: 6px 0; }
    .footer { text-align: center; margin: 40px 0 20px; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #888; font-size: 0.85em; }
    strong { font-weight: 600; }
    @media (max-width: 600px) { body { padding: 15px; } h1 { font-size: 1.5em; } h2 { font-size: 1.25em; } }
  </style>
</head>
<body>
  <h1>LUTU</h1>
  <p class="subtitle">Privacy Policy &amp; Terms of Use</p>
  <p class="meta">Effective Date: April 11, 2026</p>
  <p class="meta">Published by: Lutu App</p>
  <p class="meta">Contact: Lutuapp@gmail.com</p>

  <p class="intro">This document constitutes the complete Privacy Policy and Terms of Use governing the Lutu mobile application (&ldquo;App&rdquo;), an Albanian Catholic prayer and liturgical application available on Apple iOS. By downloading, installing, or using the App, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy and these Terms of Use.</p>

  <h2>PART ONE: PRIVACY POLICY</h2>

  <h2>1. Introduction and Scope</h2>
  <p>Lutu App (&ldquo;Developer,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates the Lutu mobile application (the &ldquo;App&rdquo;), an Albanian Catholic prayer and liturgical platform that provides daily readings, prayers, rosary guides, stations of the cross, Bible content, liturgical calendar information, hymns, catechism resources, sacrament guides, martyrs&rsquo; biographies, and related religious content in the Albanian language.</p>
  <p>This Privacy Policy describes how we collect, use, store, and protect information obtained from users (&ldquo;you&rdquo; or &ldquo;your&rdquo;) of the App. This Policy applies solely to information collected through the App and does not apply to any information collected through other means.</p>
  <p>The App is designed to function primarily as an offline tool and collects the minimum data necessary. We do not require user accounts, passwords, or registration of any kind.</p>

  <h2>2. Information We Collect</h2>

  <h3>2.1 Information You Voluntarily Provide</h3>
  <p>The App offers an optional &ldquo;Prayer Request&rdquo; feature and an optional financial assistance request feature. If you choose to use these features, you may voluntarily provide your name (optional), prayer category, prayer message, or details of a financial assistance request.</p>

  <h3>2.2 Automatic Data Collection</h3>
  <p>The App does not automatically collect any personal information, device identifiers, IP addresses, location data, usage analytics, crash reports, or any other data from your device. No data is collected automatically during any use of the App.</p>

  <h3>2.3 Information Stored Locally on Your Device</h3>
  <p>The following data is stored locally on your device and is never transmitted to us:</p>
  <ul>
    <li>Text highlights (stored in an encrypted file protected by iOS file-level encryption);</li>
    <li>Bookmarks (stored using iOS UserDefaults);</li>
    <li>Memorial entries (stored in an encrypted file);</li>
    <li>App preferences and settings.</li>
  </ul>

  <h3>2.4 Information We Do Not Collect</h3>
  <p>We do not collect location data, contacts, calendar data, health data, advertising identifiers, or any tracking information. We do not use cookies, web beacons, analytics platforms, or crash reporting tools.</p>

  <h3>2.5 Donation and Payment Information</h3>
  <p>Donations are processed exclusively by Stripe, Inc., a PCI DSS Level 1 certified payment processor. We never receive, store, or have access to your full payment card details. Donation amount and currency are sent to our backend solely to create a payment intent with Stripe.</p>
  <p>Stripe&rsquo;s privacy policy: <a href="https://stripe.com/privacy">https://stripe.com/privacy</a>. Apple Pay transactions are governed by <a href="https://www.apple.com/legal/privacy">Apple&rsquo;s privacy policy</a>.</p>

  <h3>2.6 Camera and Microphone Access (Administrator Only)</h3>
  <p>The App includes functionality that enables authenticated App administrators to provide live Catholic podcast broadcasts and church event streaming. This feature requires camera and microphone access on the administrator&rsquo;s device only.</p>
  <ul>
    <li>The camera and microphone functionality exists exclusively for authenticated administrators. Regular users cannot activate, access, or use these features under any circumstances and cannot be recorded, viewed, monitored, photographed, or surveilled through the App.</li>
    <li>Apple&rsquo;s iOS platform requires uniform permission disclosure to all users; the Developer has no ability to request permissions selectively. Accordingly, every user receives the same permission prompt.</li>
    <li>Administrator access is protected by a PIN-protected admin panel. Without successful PIN authentication, the camera and microphone remain inaccessible.</li>
    <li>No audio, video, image, or biometric data of any regular user is ever captured, stored, processed, or transmitted through the App.</li>
  </ul>

  <h3>2.7 Financial Assistance Requests</h3>
  <p>Information submitted through the financial assistance feature is transmitted privately by email to the Lutu administration and is not shared publicly or with other users.</p>

  <h2>3. How We Use Your Information</h2>
  <p>We use voluntarily submitted prayer requests solely to review and pray for the submitted intentions. Donation information is used solely to process your voluntary contribution. Financial assistance requests are used solely to review and respond to your request. Camera and microphone data is used exclusively by authenticated administrators for live podcast and church event streaming. We do not use your information for advertising, marketing, profiling, or any commercial purpose.</p>

  <h2>4. Data Storage and Security</h2>
  <p>Local data is protected by iOS security mechanisms. Prayer requests and financial assistance requests are transmitted over HTTPS. We implement reasonable safeguards but cannot guarantee absolute security.</p>

  <h2>5. Data Sharing and Third Parties</h2>
  <p>Prayer requests are processed through <a href="https://policies.google.com/privacy">Google Apps Script</a>. Donations are processed by <a href="https://stripe.com/privacy">Stripe, Inc.</a> We do not sell, rent, or transfer your personal information to any third party.</p>

  <h2>6. Data Retention and Deletion</h2>
  <p>Data stored locally remains on your device until you delete it or uninstall the App. You may request deletion of prayer request or financial assistance data by contacting Lutuapp@gmail.com. We will process deletion requests within 30 days.</p>

  <h2>7. Children&rsquo;s Privacy</h2>
  <p>The App is not directed to children under 13. We do not knowingly collect personal information from children under 13. The prayer request and financial assistance features should not be used by children without parental consent.</p>

  <h2>8. Your Rights</h2>
  <p>You may request access to, correction of, or deletion of your voluntarily submitted information by contacting Lutuapp@gmail.com. We will respond within 30 days.</p>

  <h2>9. Changes to This Policy</h2>
  <p>We may update this Privacy Policy. Changes are effective as of the &ldquo;Last Updated&rdquo; date above. Continued use of the App constitutes acceptance of the revised Policy.</p>

  <h2>PART TWO: TERMS OF USE</h2>

  <h2>10. Acceptance of Terms</h2>
  <p>By downloading, installing, or using the App, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use. These Terms constitute a legally binding agreement between you and Lutu App.</p>

  <h2>11. Description of Service</h2>
  <p>The Lutu App provides religious content for devotional and educational purposes only. It is not a substitute for participation in the sacramental life of the Catholic Church or for professional pastoral, medical, legal, or financial advice.</p>

  <h2>12. User Conduct</h2>
  <p>You agree to use the App solely for lawful purposes. You shall not submit abusive, harassing, or unlawful content, attempt unauthorized access to any portion of the App, use automated means to access the App, or reverse-engineer, decompile, or disassemble any part of the App.</p>

  <h2>13. Intellectual Property</h2>
  <p>All content and materials in the App are owned by or licensed to Lutu App and are protected by applicable intellectual property laws. You are granted a limited, non-exclusive, revocable license to use the App for personal, non-commercial devotional purposes.</p>

  <h2>14. Disclaimer of Warranties</h2>
  <p><strong>THE APP IS PROVIDED ON AN &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; BASIS WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED.</strong> Lutu App disclaims all warranties, including but not limited to warranties of accuracy, completeness, merchantability, fitness for a particular purpose, and non-infringement. Lutu App makes no representation that the religious content is theologically accurate or complete and is not an official publication of the Catholic Church.</p>

  <h2>15. Limitation of Liability</h2>
  <p><strong>TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL LUTU APP, ITS OWNERS, OFFICERS, OR SERVICE PROVIDERS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF OR INABILITY TO USE THE APP, INCLUDING BUT NOT LIMITED TO ANY SPIRITUAL, EMOTIONAL, OR FINANCIAL HARM.</strong></p>
  <p>In no event shall Lutu App&rsquo;s total liability to you exceed the amount paid by you for the App, which is zero dollars ($0.00).</p>

  <h3>15.1 Broadcasting and Content Responsibility</h3>
  <p>Any user granted administrator access is solely responsible for all content they record, broadcast, or stream through the App. Lutu App does not monitor, review, or endorse any such content and disclaims all liability arising from it.</p>

  <h3>15.2 Financial Assistance</h3>
  <p>Submission of a financial assistance request creates no obligation or guarantee that assistance will be provided. Lutu App reserves sole discretion to approve or deny any such request.</p>

  <h2>16. Indemnification</h2>
  <p>You agree to indemnify, defend, and hold harmless Lutu App, its owners, officers, and service providers from any claims, damages, losses, liabilities, and expenses (including reasonable attorneys&rsquo; fees) arising from your use of the App, your violation of these Terms, or any content you submit or broadcast through the App.</p>

  <h2>17. Governing Law and Dispute Resolution</h2>
  <p>These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of laws principles.</p>
  <p>Any dispute, claim, or controversy arising out of or relating to these Terms or your use of the App shall be resolved through final and binding arbitration. The arbitration shall be conducted by a single arbitrator selected by Lutu App in its sole discretion, in accordance with the rules the arbitrator deems appropriate. The arbitration may be held in any location within the State of California chosen by Lutu App. The arbitrator&rsquo;s decision shall be final, binding, and non-appealable. Each party shall bear its own costs and expenses.</p>
  <p><strong>You agree that any arbitration or legal proceeding shall be conducted on an individual basis only and not as a class, consolidated, or representative action. You expressly waive any right to participate in a class action lawsuit or class-wide arbitration.</strong></p>

  <h2>18. Miscellaneous</h2>
  <p>If any provision of these Terms is held invalid or unenforceable, the remaining provisions shall remain in full force and effect. These Terms constitute the entire agreement between you and Lutu App regarding the App. Lutu App may update these Terms at any time; continued use of the App after changes constitutes acceptance of the new Terms. Any questions regarding these Terms may be directed to <a href="mailto:Lutuapp@gmail.com">Lutuapp@gmail.com</a>.</p>

  <div class="footer">
    <p>&copy; 2025&ndash;2026 Lutu App. All rights reserved.</p>
  </div>
</body>
</html>`);
});

// ============================================
// POST /create-payment-intent
// ============================================
// Creates a PaymentIntent for the donation amount.
// The iOS app calls this to get the clientSecret needed
// by Stripe PaymentSheet.
//
// Body: { amount: 500 }  (amount in CENTS, e.g., $5.00 = 500)
// Returns: { clientSecret, ephemeralKey, customerId, publishableKey }
// ============================================
app.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency = 'usd' } = req.body;

    if (!amount || amount < 50) {
      return res.status(400).json({
        error: 'Amount must be at least 50 cents ($0.50)'
      });
    }

    // Create or reuse a Stripe Customer
    // In production, you'd store this customer ID per user
    const customer = await stripe.customers.create({
      metadata: { app: 'lutu', type: 'donation' }
    });

    // Create an ephemeral key for the customer
    // The iOS SDK needs this to save payment methods
    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: '2024-06-20' }
    );

    // Create the PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount),
      currency: currency,
      customer: customer.id,
      description: 'Donacion për Lutu App',
      metadata: {
        app: 'lutu',
        type: 'donation'
      },
      // Enable these payment methods:
      automatic_payment_methods: {
        enabled: true,
      },
    });

    console.log(`PaymentIntent created: ${paymentIntent.id} for $${(amount / 100).toFixed(2)}`);

    res.json({
      clientSecret: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customerId: customer.id,
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });

  } catch (error) {
    console.error('Error creating payment intent:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// POST /create-checkout-session (Alternative: web checkout)
// ============================================
// Creates a Stripe Checkout Session for web-based payments
// This is a fallback/alternative that supports all payment methods
// including PayPal when configured in Stripe Dashboard.
// ============================================
app.post('/create-checkout-session', async (req, res) => {
  try {
    const { amount, currency = 'usd' } = req.body;

    if (!amount || amount < 50) {
      return res.status(400).json({
        error: 'Amount must be at least 50 cents ($0.50)'
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: currency,
          product_data: {
            name: 'Donacion për Lutu',
            description: 'Mbështetni aplikacionin katolik shqiptar Lutu',
          },
          unit_amount: Math.round(amount),
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'https://lutu-app.com/donation-success',
      cancel_url: 'https://lutu-app.com/donation-cancel',
      metadata: {
        app: 'lutu',
        type: 'donation'
      },
    });

    res.json({ url: session.url, sessionId: session.id });

  } catch (error) {
    console.error('Error creating checkout session:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// Stripe Webhook (optional but recommended for production)
// ============================================
app.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];

  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    );

    switch (event.type) {
      case 'payment_intent.succeeded':
        console.log('Payment succeeded:', event.data.object.id);
        break;
      case 'payment_intent.payment_failed':
        console.log('Payment failed:', event.data.object.id);
        break;
      default:
        console.log(`Unhandled event: ${event.type}`);
    }

    res.json({ received: true });
  } catch (err) {
    console.error('Webhook error:', err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
});

// Start server
const PORT = process.env.PORT || 4242;
app.listen(PORT, () => {
  console.log(`\n🙏 Lutu Stripe Server running on port ${PORT}`);
  console.log(`   Health check: http://localhost:${PORT}/`);
  console.log(`   Create payment: POST http://localhost:${PORT}/create-payment-intent\n`);
});
