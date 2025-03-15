### Release 0.5.0

### Download Links

#### Windows

- [Windows Installer (.msi)](./windows/dev-task_0.5.0_x64_en-US.msi)
- [Windows Installer (.nsis)](./windows/dev-task_0.5.0_x64-setup.exe)

#### macOS

- [macOS Installer (.dmg)](./macos/dev-task_0.5.0_aarch64.dmg)

**For macOS Users:**

You can download the macOS installer above. If the installer is not yet available, you can build and run the app manually by following these steps:

### Instructions for macOS (Manual Build)

1. **Clone the Repository:**

   First, clone the repository to your local machine:

   ```bash
   git clone https://github.com/slickwit/dev-task.git
   cd dev-task
   ```

2. **Install Rust (if not already installed):**

   Check if `rustup` is installed:

   ```bash
   rustup --version
   ```

   If `rustup` is not installed, you can install it by running:

   ```bash
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   ```

3. **Run the App in Development Mode:**

   ```bash
   pnpm install
   pnpm tauri dev
   ```

---

If you want to automate the macOS build process, you can use GitHub Actions or another CI/CD tool to generate the `.dmg` or `.pkg` file. Let me know if you'd like help setting that up!
