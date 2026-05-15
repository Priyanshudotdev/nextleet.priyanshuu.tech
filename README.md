# 🚀 LeetSync - Chrome Extension

A powerful Chrome extension that automatically syncs your LeetCode solutions to GitHub. Get your code submissions to GitHub without leaving LeetCode!

## 📋 Features

- **Automatic GitHub Integration**: Sync LeetCode solutions directly to your GitHub repository
- **Multiple Language Support**: Supports all LeetCode programming languages (Python, JavaScript, Java, C++, etc.)
- **Chrome Extension**: Seamless integration with Chrome browser
- **Secure Authentication**: Uses GitHub OAuth tokens for secure authentication
- **React UI**: Modern, responsive popup interface using React and Tailwind CSS
- **TypeScript**: Fully typed codebase for better development experience

## 🛠️ Tech Stack

- **React 19**: UI framework
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Styling framework
- **Chrome Extension API**: Browser integration
- **GitHub API**: Repository management

## 📁 Project Structure

```
src/
├── background/          # Chrome extension background service worker
│   └── index.ts        # Handles GitHub API requests
├── content/            # Content scripts for LeetCode page injection
│   └── index.ts        # Captures submission data
├── popup/              # Extension popup UI
│   └── popup.tsx       # React component for user interface
├── shared/             # Shared utilities
│   ├── github.ts       # GitHub API integration
│   └── storage.ts      # Chrome storage management
├── main.tsx            # Main React entry point
└── App.css             # Application styles
public/
└── manifest.json       # Chrome extension manifest
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or pnpm
- Chrome browser

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd projectXc
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Build the extension**
   ```bash
   pnpm build
   ```

4. **Load extension in Chrome**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" (top right)
   - Click "Load unpacked" and select the `build/` folder

### Development

Start the development server with hot reload:
```bash
pnpm dev
```

Run linter:
```bash
pnpm lint
```

Build for production:
```bash
pnpm build
```

## 📖 How It Works

1. **Content Script**: Monitors LeetCode solution submissions
2. **Background Worker**: Communicates with GitHub API
3. **Popup UI**: User authentication and configuration interface
4. **Storage**: Saves user tokens and preferences locally

## 🔧 Configuration

### GitHub Token
- Go to GitHub Settings → Developer settings → Personal access tokens
- Create a new token with `repo` scope
- Add the token in the extension popup

### Repository Setup
- Create a `solutions/` folder in your GitHub repository
- Solutions will be organized by problem name and language

## 📝 Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build extension for production
- `pnpm lint` - Run ESLint
- `pnpm preview` - Preview production build

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## 📄 License

This project is open source and available under the MIT License.

## 🎯 Roadmap

- [ ] Support for LeetCode premium features
- [ ] Batch sync for multiple submissions
- [ ] Repository auto-creation
- [ ] Sync history tracking
- [ ] Custom folder structure options
