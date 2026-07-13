<div align="center">

<img src="./WNLproject-logo.png" alt="WNL Banner" width="100%" stroke="none">

[![License: MIT](https://img.shields.io/badge/License-MIT-00f3ff.svg?style=flat-square)](./LICENSE)
[![Core](https://img.shields.io/badge/Powered%20By-SSR%20Forge%20TS-orange.svg?style=flat-square)](https://github.com/david9sargsian9s/SSR-forge-TS)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue.svg?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![JavaScript](https://img.shields.io/badge/Language-JavaScript-yellow.svg?style=flat-square&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Node.js](https://img.shields.io/badge/Runtime-Node.js-green.svg?style=flat-square&logo=node.js)](https://nodejs.org/)

<p align="center">
  <b>WNL-project — The Central Umbrella Core Node</b>
</p>

---

</div>

## 📌 Overview

**WNL-project** functions as the master umbrella infrastructure and central hub ecosystem for a suite of specialized web applications, tools, and developer assets (including WLite, VFS Cloud Sync, and Webit frameworks).

Built entirely upon the high-performance **ssr-forge-TS** boilerplate, this project architecture enforces type-safe server-side rendering, centralized routing, unified database pipelines, and secure user profile session controllers across the entire digital asset spectrum.

### Key Architecture Highlights

* **Zonated Infrastructure:** One centralized engine managing routing, privacy regulations, and compliance profiles for all sub-brands.
* **Robust Core Backend:** Engineered on a classic, scalable Express MVC design pattern with strict decoupling between database streams and core operational modules.
* **Next-Gen Speed:** Server-side rendered static assets optimized for speed, terminal grid calculations, and responsive DOM lifecycle paints.

---

## 🛠️ Local Sandbox Deployment

Follow these sequential steps to clone and spin up the architecture framework on your local machine.

### Prerequisites

* **Node.js** (Version 18.x LTS or higher recommended)
* **npm** (Version 9.x or higher)
* **MongoDB Instance** (Local environment connection string or a cloud-hosted MongoDB Atlas cluster)

### Installation Sequence

1. Clone the master branch repository and enter the workspace root folder:

```bash
git clone https://github.com/david9sargsian9s/wnl-project.git
cd wnl-project
```

## 🚀 Installation

Synchronize and pull all system node module bundles:

```bash
npm install
```

Configure your node environment variables. Create a `.env` file in the project root directory using the following template:

```env
ATLAS_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/wnl_database
PORT=4500
JWT_ACCESS_SECRET=your_cryptographic_access_hex_string
JWT_REFRESH_SECRET=your_cryptographic_refresh_hex_string
```

Launch the local development server with hot-reloading enabled:

```bash
npm run dev
```

---

## ⚖️ License

Distributed under the **MIT License**.

WNL is completely free to use, modify, distribute, and integrate into commercial systems.

See the **LICENSE** file for more details.