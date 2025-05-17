# MCP Email Sender

A Model Context Protocol (MCP) compatible email sender tool that allows you to send emails using SMTP (Gmail).

## Features

- Send email notifications with custom content
- Uses secure SMTP for email delivery
- Built with TypeScript and MCP SDK

## Prerequisites

- Node.js (v14 or higher)
- npm
- Gmail account with app-specific password

## Installation

```bash
npm install @vision_123/mcp-email-sender
```

## Usage

You can use this tool in your MCP configuration as follows:

```json
{
  "email-sender": {
    "command": "npx",
    "args": [
      "-y",
      "@vision_123/mcp-email-sender"
    ],
    "env": {
      "USER": "your.email@gmail.com",
      "PASS": "your-app-specific-password"
    }
  }
}
```

### Environment Variables

- `USER`: Your Gmail email address
- `PASS`: Your Gmail app-specific password (Generate this from your Google Account settings)

### Tool Commands

The tool provides the following command:

- `send-email`: Send an email with custom content
  - Parameters:
    - `to`: Recipient email address
    - `subject`: Subject of the email
    - `body`: Body content of the email

## Development

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Build the project:
```bash
npm run build
```

## Available Tools

### send-email

Sends an email with custom content.

Parameters:
- `to`: Recipient email address
- `subject`: Subject of the email
- `body`: Body content of the email

## License

ISC 