# Odin-Calculator

Final project of the **Foundation** course from [The Odin Project](https://www.theodinproject.com/).

A simple web-based calculator built with vanilla JavaScript, HTML, and CSS.

You can try it in [Live Preview](https://jdy7149.github.io/odin-calculator).


## Features

* **Digit input**: 0 – 9
* **Operators**: Addition (`+`), Subtraction (`-`), Multiplication (`*`), Division (`/`)
* **Decimal point (`.`)** for floating‑point numbers
* **AC (All Clear)** button to reset the display
* **Backspace** button to remove the last character
* **Digit limit**: Up to 15 digits

## Dependencies / API Used

| Library                                               | Purpose                                                                                                                                     |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| [`decimal.js`](https://mikemcl.github.io/decimal.js/) | Provides arbitrary‑precision decimal arithmetic, ensuring accurate results (e.g., `0.1 + 0.2 = 0.3`) without typical floating‑point errors. |

### Getting `decimal.js`

Via CDN (quickest):

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/decimal.js/10.4.3/decimal.min.js"></script>
```

Via npm (for bundled setups):

```bash
npm install decimal.js
```

Then import in your script or bundler:

```js
import Decimal from 'decimal.js';
```