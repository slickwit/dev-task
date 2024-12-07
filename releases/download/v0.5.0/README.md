### Release 0.5.0

### Download Links Windows

- [Windows Installer (.msi)](https://github.com/slickwit/dev-task/releases/download/v0.5.0/dev-task_0.1.0_x64_en-US.msi)
- [Windows Installer (.nsis)](https://github.com/slickwit/dev-task/releases/download/v0.5.0/dev-task_0.1.0_x64-setup.exe)

**For macOS Users:**

Unfortunately, I currently don't have access to a macOS device to generate a macOS installer. However, you can still build and run the app yourself by following these steps:

### Instructions for macOS (Manual Build)

1. **Clone the Repository:**

   First, clone the repository to your local machine:

   ```bash
   git clone https://github.com/slickwit/dev-task.git
   cd dev-task
   ```

2. **Install Rust (if not already installed):**
   rustup --version
   If `rustup` is not installed, you can install it by running:

```bash
  curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

3. **Run the App in Development Mode:**

```bash
  pnpm install
  pnpm tauri dev
```
