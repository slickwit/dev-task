<div align="center">

# 🚧 Under Development

</div>

# DevTask~

**DevTask~** is a desktop application built with the Tauri framework, leveraging React, Shadcn, and Rust. It was created to help developers keep track of their notes and code snippets efficiently.

If you're tired of losing your important notes or code examples, **DevTask~** offers a simple, persistent solution. Unlike traditional note-taking apps, DevTask~ saves your content automatically and keeps it cached, so when you open the app again, your previous work is still there, ready for you to continue.

With **DevTask~**, you get:

- Seamless note-taking for your code snippets, ideas, and todos.
- Auto-caching feature, so you don't have to worry about losing content.
- A clean interface with powerful features to format and store your code.
- Built using modern technologies like Tauri, React, Shadcn, and Rust for a smooth and responsive experience.

### Pending Fixes & Features:

- [ ] **Markdown Parser:** Add markdown parsing when pasting text with markdown formatting.
- [ ] **Menu:** Finish the app's main menu.
- [ ] **Context Menu & Shortcuts:** Complete the context menu and implement all shortcut keys.
- [ ] **Splashscreen:** Add spashscreen.

### Future Features:

- [x] **Separate Todo List:** Move the todo list from the editor and add it to a separate, smaller window.
- [ ] **Export/Import:** Add functionality to export and import files.
- [x] **Multiple Themes:** Implement support for multiple themes.

**DevTask~** is perfect for developers who need a simple, yet powerful, solution for capturing, organizing, and retrieving notes and code without the worry of losing them.

Try **DevTask~** today and keep your coding notes safe and always within reach!

## [Download For Windows](./releases/download/v0.5.0)

### Run locally

1. **Clone the Repository:**

```bash
# First, clone the repository to your local machine:
git clone https://github.com/slickwit/dev-task.git
cd dev-task
```

2. **Install Rust (if not already installed):**

`rustup --version`

If `rustup` is not installed, you can install it by running:

```bash
  curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

Or install on official rust website [rustup.rs](https://rustup.rs/)

3. **Run the App in Development Mode:**

```bash
  pnpm install
  pnpm tauri dev
```
