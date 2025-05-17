#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import nodemailer from "nodemailer";
// Create MCP server instance
const server = new McpServer({
    name: "email-sender",
    version: "1.0.0",
    capabilities: {
        resources: {},
        tools: {},
    },
});
// Tool: send-email
server.tool("send-email", "Send an email with custom content", {
    to: z.string().email().describe("Recipient email address"),
    subject: z.string().min(1).describe("Subject of the email"),
    body: z.string().min(1).describe("Body content of the email"),
}, async ({ to, subject, body }) => {
    try {
        // SMTP configuration (hardcoded)
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "rohitdutt04@gmail.com", // Replace with your email
                pass: "sxdn tpza pezu vnch", // Replace with your app-specific password
            },
        });
        const info = await transporter.sendMail({
            from: `\"Email Sender Tool\" rohitdutt04@gmail.com`,
            to,
            subject,
            text: body,
        });
        return {
            content: [
                {
                    type: "text",
                    text: `Email sent successfully to ${to}. Message ID: ${info.messageId}`,
                },
            ],
        };
    }
    catch (error) {
        console.error("Email send error:", error);
        return {
            content: [
                {
                    type: "text",
                    text: `Failed to send email: ${error.message}`,
                },
            ],
        };
    }
});
// Start the MCP server
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Email Sender MCP Server running on stdio");
}
main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});
