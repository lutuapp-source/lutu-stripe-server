# Deploy Lutu Stripe Server to Railway

Your Railway project is already set up with:
- Project: compassionate-charm
- Service: abundant-blessing
- Domain: https://abundant-blessing-production-f145.up.railway.app
- Environment variables: STRIPE_SECRET_KEY, STRIPE_PUBLISHABLE_KEY, PORT

## Quick Deploy (3 steps)

Open Terminal on your Mac and run these commands:

### Step 1: Install the Railway CLI
```
npm install -g @railway/cli
```

### Step 2: Navigate to the server folder and log in
```
cd ~/Desktop/Lutu\ App\ Work/lutu-stripe-server
railway login
```
This will open a browser window - log in with your Google account (lutuapp@gmail.com).

### Step 3: Link to your project and deploy
```
railway link
```
Select the project "compassionate-charm" and service "abundant-blessing", then:
```
railway up
```

That's it! Your server will be live at:
https://abundant-blessing-production-f145.up.railway.app

## Verify it works
Visit https://abundant-blessing-production-f145.up.railway.app in your browser.
You should see: `{"status":"ok","service":"Lutu Stripe Server"}`
