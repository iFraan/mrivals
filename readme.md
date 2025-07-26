<div align="center">
    <h1>🦸‍♂️ mrivals</h1>
    <p>
        <a href="https://www.codefactor.io/repository/github/ifraan/mrivals"><img src="https://www.codefactor.io/repository/github/ifraan/mrivals/badge" alt="CodeFactor" /></a>
        <a href="https://www.npmjs.com/package/mrivals"><img src="https://badgen.net/npm/v/mrivals?color=blue" alt="NPM-Version"/></a>
        <a href="https://www.npmjs.com/package/mrivals"><img src="https://badgen.net/npm/dt/mrivals?color=blue" alt="NPM-Downloads"/></a>
        <a href="https://github.com/iFraan/mrivals"><img src="https://badgen.net/github/stars/iFraan/mrivals?color=yellow" alt="Github Stars"/></a>
        <a href="https://github.com/iFraan/mrivals/issues"><img src="https://badgen.net/github/open-issues/iFraan/mrivals?color=green" alt="Issues"/></a>
    </p>
    <h3>📊 A wrapper/scraper for <strong>Marvel Rivals</strong> stats</h3>
    <p><em>Powered by TRNetwork - No API keys required!</em></p>
</div>

---

## 🚀 Installation

> **Note:** This module supports multiple fetching strategies for maximum compatibility across different environments.

### 💻 Install the package

```bash
npm install mrivals
```

---

## 📖 Usage

> **Important:** You must call `API.fetchUser` before using any other method.

### 🔧 Fetching Strategies

This module can use multiple strategies to fetch data: **fetch**, **curl**, and **flaresolverr**

#### 🌐 Browser Environments
- Default **fetch** should work fine
- Can use **flaresolverr** if available for enhanced reliability

#### 🖥️ Server Environments
- Try **fetch** first _(Node.js v16+)_
- Switch to **curl** if fetch fails
- **flaresolverr** is recommended _(default Docker image works great)_

### ⚙️ Configuration Options

| Option          | Type    | Description                          | Default     |
|-----------------|---------|--------------------------------------|-------------|
| `useCurl`       | boolean | Whether to use curl instead of fetch | `false`     |
| `flaresolverrUrl` | string | The URL of the flaresolverr instance | `undefined` |

```javascript
await API.fetchUser(username, {
  flaresolverrUrl: 'https://some.flaresolverr.domain:8191', // Use flaresolverr instance
  useCurl: true, // Use curl instead of fetch (omitted when flaresolverrUrl is provided)
});
```

### 🆔 Username Format

Simply use your username: `username` (no need for #tag format)

### 🔧 Available Methods

| Method       | Description                           |
|--------------|---------------------------------------|
| `info()`     | Returns user and MMR information      |
| `overview()` | Returns overview stats                |
| `heroes()`   | Returns hero-specific stats           |
| `roles()`    | Returns role-specific stats           |
| `peakRank()` | Returns peak rank information         |
| `raw()`      | Returns raw response data             |

---

## 💡 Example Usage

> Feel free to use my username for testing: `ifraan`

```javascript
const { API } = require('mrivals');

async function getPlayerStats() {
    try {
        // Fetch user data
        const user = await API.fetchUser('ifraan');
        
        // Get basic user info
        console.log('👤 User Info:', user.info());
        /*
        Output: User and MMR information
        */
        
        // Get overview stats
        console.log('📊 Overview:', user.overview());
        /*
        Output: General gameplay statistics
        */
        
        // Get hero stats
        console.log('🦸‍♂️ Heroes:', user.heroes());
        /*
        Output: Hero-specific performance data
        */
        
        // Get role stats
        console.log('🎭 Roles:', user.roles());
        /*
        Output: Role-based statistics
        */
        
        // Get peak rank
        console.log('🏆 Peak Rank:', user.peakRank());
        /*
        Output: Highest achieved rank
        */
        
        // Get raw data
        console.log('📋 Raw Data:', user.raw());
        /*
        Output: Complete unprocessed response
        */
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        // Example: "We could not find the player [player]."
    }
}

// Run the example
getPlayerStats();
```

---

## 📄 License & Disclaimer

This project is created for **educational purposes only** and is not affiliated with NetEase Games or Marvel Rivals.

If you want to use Marvel Rivals data in a production/commercial environment, please contact the team at [TRNetwork](https://tracker.gg/).

---

<div align="center">
    <p>Made with ❤️ by <a href="https://github.com/iFraan">iFraan</a></p>
    <p><em>Assemble your stats! 🚀</em></p>
</div>
