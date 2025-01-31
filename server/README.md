
# Gmail Webhook Server

A production-ready Express server for handling Gmail API push notifications.

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file using the example:
   ```bash
   cp .env.example .env
   ```
4. Generate a Google JWT key and update `.env`

## Configuration

The server uses the following environment variables:

- `PORT`: The port to listen on (default: 3000)
- `WEBHOOK_SECRET`: Secret for validating webhook requests
- `GOOGLE_JWT_KEY`: Google JWT key for verifying signatures

## Running the Server

```bash
npm start
```

## Testing

1. Use ngrok to expose the server to the internet:
   ```bash
   ngrok http 3000
   ```
2. Configure your Gmail API webhook with the ngrok URL:
   ```
   https://your-ngrok-url.ngrok.io/webhook
   ```

## Features

- Verification of Google webhook signatures
- Type-safe handling of notification payloads
- Logging of all events
- Error handling and monitoring
- Production-ready configuration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Create a Pull Request
