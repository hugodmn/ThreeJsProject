# 3D Speech-Driven Animation Web App

This web application demonstrates the integration of 3D animations driven by real-time speech synthesis, using a custom transformer model for text generation. The project combines advanced WebGL rendering (via THREE.js) and the Web Speech API for a unique interactive experience.

![App Screenshot](images/screen.png)

The text-to-speech system is based on a custom transformer model, trained with various tokenization strategies to adapt to different speech patterns.

## Model Parameters

This transformer model has been trained from scratch directly on a dialogue dataset. 

| Parameter | Value |
|:--|:--|
| **Number of Transformer Blocks** | 6 |
| **Number of Attention Heads** | 6 |
| **Embedding Size** | 384 |
| **Tokenizer** | BPE |
| **Context Length** | 256 |

The context length and other detailed configurations vary depending on the tokenizer used. For a comprehensive overview of the model's architecture, training process, and detailed parameters, please visit our [GitHub repository](https://github.com/yourusername/your-repository-name). Note that this model hasn't been pretrained. 

## Features

- **Dynamic 3D Models**: Interactive 3D models that respond to the synthesized speech.
- **Real-Time Speech Synthesis**: Text-to-speech conversion with customizable voices.
- **Speech-Driven Animations**: Model animations are driven by speech synthesis in real-time.
- **Browser Compatibility Information**: Details on supported web browsers.
- **Interactive UI**: User-friendly interface for engaging with the application.

## Browser Compatibility for Text-to-Speech

This project requires a browser that supports HTML5 and WebGL:

- **Google Chrome**: Supported with some limitations.
- **Mozilla Firefox**: Fully supported.
- **Apple Safari**: Fully supported.

## Usage

Access the web application through a compatible browser. The application is available [here](hugodmn.github.io/ThreeJsProject/).


## Acknowledgments

- [THREE.js](https://threejs.org/)
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
- Inspiration from Andrej Karpathy's [video on transformer models](https://www.youtube.com/watch?v=kCc8FmEb1nY&t=1s).
