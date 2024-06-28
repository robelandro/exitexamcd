# Telegram Userbot AI Agent

Welcome to the Telegram Userbot AI Agent project! This project was initially designed to count down the hours until exit exams and send fun messages every hour to a Telegram group. However, based on user feedback, it has been transformed into a personal AI agent bot powered by Gemini API. The bot now answers questions and fixes grammar through specific commands.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The Telegram Userbot AI Agent is a chatbot that uses the Gemini API AI to provide answers to questions and fix grammatical errors. By integrating with Telegram through the `grams.js` library, this project offers a simple and interactive way to engage with an AI assistant directly in your chat.

## Features

- **AI-Powered Responses**: Ask any question using the `.ask` command and get answers from the AI.
- **Grammar Correction**: Improve your text by using the `.gr` command for grammar fixes.
- **Group Notifications**: Originally designed to send periodic messages to a group, this feature is still available but optional.
- **Customizable**: Adjust settings such as reminder intervals and message formats through configuration.

## Setup and Installation

### Prerequisites

- Node.js (v12 or higher)
- npm (v6 or higher)
- A Telegram account and bot token
- Gemini API key

### Installation Steps

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/robelandro/telegram-userbot-ai-agent.git
    cd telegram-userbot-ai-agent
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Configure Environment Variables**:
    Create a `.env` file in the root directory and add the following variables:
    ```plaintext
    API_ID=13392332
    API_HASH=f6fb720e3f470b30a73560381b24b1cc
    STRING_SESSION=""
    GEMINI_API_KEY=your_gemini_api_key
    GEMINI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent
    ```

4. **Run the Application**:
    ```bash
    npm start
    ```

## Usage

Once the bot is running, you can interact with it by typing commands in your Telegram chat. 

### Commands

- **Ask a Question**: 
    ```plaintext
    .ask <your question>
    ```
- **Fix Grammar**: 
    ```plaintext
    .gr <text to be fixed>
    ```

For sending periodic messages related to exit exams, the code is still available. You can find it [here](https://github.com/robelandro/telegram-userbot-ai-agent/blob/main/src/utils/msg_schedule.ts).

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

Feel free to reach out if you have any questions or need further assistance. Enjoy interacting with your AI agent and make the most of its capabilities!
