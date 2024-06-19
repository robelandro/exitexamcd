# Exit Exam Counter

Welcome to the Exit Exam Counter project! This is a fun and educational project designed to help students keep track of the remaining time until their exit exams. The project leverages the Gemini API AI for generating fun and engaging messages and uses the Telegram User API Wrapper `grams.js` to send these messages to a Telegram group.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The Exit Exam Counter is a chatbot that helps students keep track of the remaining time until their exit exams. It uses the Gemini API AI to generate fun and engaging countdown messages. By integrating with Telegram through the `grams.js` library, this project provides a simple and interactive way to receive updates in a Telegram group.

## Features

- **Countdown Messages**: Receive fun and engaging messages about the remaining time until your exams.
- **Group Notifications**: Get notified in a Telegram group, keeping all members informed.
- **AI-Generated Text**: Enjoy creative and entertaining messages powered by Gemini API AI.

## Setup and Installation

### Prerequisites

- Node.js (v12 or higher)
- npm (v6 or higher)
- A Telegram account and bot token
- Gemini API key

### Installation Steps

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/robelandro/exitexamcd.git
    cd exitexamcd
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Configure Environment Variables**:
    Create a `.env` file in the root directory and add the following variables:
    ```plaintext
    TELEGRAM_BOT_TOKEN=your_telegram_bot_token
    GEMINI_API_KEY=your_gemini_api_key
    ```

4. **Run the Application**:
    ```bash
    npm start
    ```

## Usage

Once the bot is running, it will automatically send countdown messages to the specified Telegram group. You can configure the schedule and message content as needed. 

## Configuration

The bot can be customized by modifying the configuration file `config.js`. You can adjust settings such as reminder intervals, message formats, and more.

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug reports, please create an issue or submit a pull request. Follow the steps below to contribute:

1. **Fork the Repository**
2. **Create a New Branch**: `git checkout -b feature/your-feature-name`
3. **Commit Your Changes**: `git commit -m 'Add some feature'`
4. **Push to the Branch**: `git push origin feature/your-feature-name`
5. **Open a Pull Request**

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to reach out if you have any questions or need further assistance. Enjoy the countdown to your exams and good luck!
