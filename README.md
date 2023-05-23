# [Logoing](https://logoing.savandbros.com)

[![npm](https://img.shields.io/npm/v/logoing)](https://www.npmjs.com/package/logoing)

Give your logo a fancy loading effect.

## Demo

Go to https://logoing.savandbros.com for demo.

## Installation

```bash
npm install logoing
```

## Usage

Your SCSS file:

```scss
@import "~logoing/src/logoing.scss";

@include logging-vertical-split(
  "loading", // Wrapper class name
  128px, // Logo size (square)
  2rem, // Animation movement
  1s, // Animation duration
  "https://picsum.photos/128/128", // Logo source
);
```

Your HTML file:

```html
<div class="loading">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>
```

## Built With

- [Node.js](https://nodejs.org/)
- [SASS](https://sass-lang.com/)
- [JetBrains](https://www.jetbrains.com/)
- [WebStorm](https://www.jetbrains.com/webstorm/)

## About

Made with 💖 by [Savand Bros](https://savandbros.com) &copy; 2023.
