# webhook_trigger_chrome_ext
Simple starting point of an extension to figure a webhook.

Simple Webhook Trigger Extension
A minimal Chrome extension to trigger webhooks with a single click. Designed for developers who need a quick way to fire webhook requests during testing or automation workflows.
Show Image
Features

Easy webhook URL configuration
One-click webhook triggering
Automatic timestamp payload
Status notifications for successful/failed requests
Persistent storage of your webhook URL

Installation
From Source (Development)

Clone this repository or download the source code
git clone https://github.com/THartyMBA/simple-webhook-trigger.git

Open Chrome and navigate to chrome://extensions/
Enable "Developer mode" by toggling the switch in the top right corner
Click "Load unpacked" and select the extension directory
The extension icon should appear in your Chrome toolbar

Usage

Click the extension icon in your toolbar to open the popup
Enter your webhook URL in the input field
Click "Save URL" to store your webhook URL
Click "Trigger Webhook" to send a POST request to your webhook

The extension will send a simple JSON payload with a timestamp:
json{
  "triggered_at": "2025-04-24T12:34:56.789Z"
}
Customization
This extension is deliberately minimal to serve as a starting point. Here are some ways you could extend it:

Add custom payload templates
Include current page data in the webhook request
Add authentication headers for secure webhooks
Create presets for multiple webhook URLs
Add options for different HTTP methods (GET, PUT, DELETE)

Contributing
Contributions are welcome! This project is meant to be a simple, open-source tool that anyone can build upon.

Fork the repository
Create your feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add some amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request

License
Distributed under the MIT License. See LICENSE for more information.
Acknowledgments

Created as an open-source tool for developers
Inspired by the need for simple webhook testing tools
Perfect for use with no-code platforms that accept webhook triggers


Made with ❤️ by Dr. Tom, DBA
