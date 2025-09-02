# Namecrement

<p align="center">

![Tests](https://github.com/HichemTab-tech/Namecrement/workflows/Test/badge.svg) 
[![License](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/HichemTab-tech/Namecrement/blob/main/LICENSE)
[![NPM Version](https://img.shields.io/npm/v/namecrement.svg)](https://www.npmjs.com/package/namecrement)

</p>

**Smart and simple unique name generator.**  
If a name already exists, Namecrement automatically increments it,
like `"file"` → `"file (1)"`, `"file (2)"`, and so on.

---

## ✨ Features

- Automatically avoids naming collisions
- Smart incremental naming (`(1)`, `(2)`, etc.)
- Lightweight and dependency-free
- Works for filenames, labels, identifiers, and more

---

### 📦 Also Available

* PHP: [Namecrement-php](https://github.com/HichemTab-tech/Namecrement-php)
* Python: [Namecrement-py](https://github.com/HichemTab-tech/Namecrement-py)

## 📦 Installation

```bash
npm install namecrement
```

or

```bash
pnpm add namecrement
```

---

## 🚀 Usage

```javascript
import { namecrement } from 'namecrement';

// Example list of existing names
const existing = ['file', 'file (1)', 'file (2)'];

// Generate a unique name
const newName = namecrement('file', existing);

console.log(newName); // Output: "file (3)"
```

---

## 🧠 Advanced Usage

```ts
namecrement('file', ['file', 'file -1-', 'file -2-'], ' -%N%-');
// → 'file -3-'
```

You can customize how numbers are added by using the `%N%` placeholder in a `suffixFormat`:

| Format Example    | Output             |
|-------------------|--------------------|
| `" (%N%)"`        | `file (1)`         |
| `"-%N%"`          | `file-1`           |
| `"_v%N%"`         | `file_v1`          |
| `"<%N%>"`         | `file<1>`          |

---

### ✅ Type-Safe Format

> `suffixFormat` must include the `%N%` placeholder, or the function will throw an error.

This ensures that all generated names include the incremented number in the format you define.

```ts
namecrement('log', ['log', 'log_1'], '_%N%_'); // → log_2
```

---

## 📚 API

### `namecrement(baseName: string, existingNames: string[]): string`

| Parameter        | Type                  | Description                                               |
|------------------|-----------------------|-----------------------------------------------------------|
| `baseName`       | `string`              | The proposed name                                         |
| `existingNames`  | `string[]`            | The list of names to check against                        |
| `suffixFormat`   | `string`              | The format for the incremented name (optional)            |
| `startingNumber` | `number \| undefined` | The starting number for incrementing (default: undefined) |

Returns a **unique** name based on the proposed one.

---

## 🛠️ Examples

```javascript
namecrement('report', ['report', 'report (1)']); 
// → 'report (2)'

namecrement('image', ['photo', 'image', 'image (1)', 'image (2)']);
// → 'image (3)'

namecrement('new', []);
// → 'new'

namecrement('document', ['document', 'document -1-', 'document (2)'], ' -%N%-');
// → 'document -2-'

namecrement('file', [], ' (%N%)', 5);
// → 'file (5)'
```

---

## 📄 License

MIT License © 2025 Hichem Taboukouyout
