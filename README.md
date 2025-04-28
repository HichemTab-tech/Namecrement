# Namecrement

<p align="center">

![Tests](https://github.com/HichemTab-tech/Namecrement/workflows/Test/badge.svg) 
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/HichemTab-tech/Namecrement/releases) [![License](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/HichemTab-tech/Namecrement/blob/main/LICENSE)
![npm](https://img.shields.io/npm/v/namecrement)
![license](https://img.shields.io/npm/l/namecrement)
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

## 📚 API

### `namecrement(baseName: string, existingNames: string[]): string`

| Parameter       | Type       | Description                        |
|-----------------|------------|------------------------------------|
| `baseName`      | `string`   | The proposed name                  |
| `existingNames` | `string[]` | The list of names to check against |

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
```

---

## 📄 License

MIT License © 2025 Hichem Taboukouyout