# MoodHaven Journal (Community Edition)

[![Build Status](https://img.shields.io/github/actions/workflow/status/kenlacroix/MoodHavenJournal/ci.yml?branch=main)](https://github.com/kenlacroix/MoodHavenJournal/actions)  
[![License: MPL-2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](LICENSE)  
[![Made with .NET](https://img.shields.io/badge/Made%20with-.NET%208-blueviolet)](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)  
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-orange.svg)](https://github.com/kenlacroix/MoodHavenJournal/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)  
[![Subscribe to MoodHaven Journal](https://img.shields.io/badge/Subscribe%20to-MoodHaven%20Journal-brightgreen)](https://moodhaven.substack.com/subscribe)

**MoodHaven Journal Community Edition** is a privacy-first gratitude and mood tracking app built with .NET 8 WinForms.  
All entries are stored in an **AES-256-encrypted** local database, with no required internet connection or cloud dependency.

This open-source edition is ideal for users who value secure, offline-first journaling and developers who want to build on a privacy-respecting foundation.

---

## Table of Contents

- [Overview](#overview)  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Getting Started](#getting-started)  
- [Project Structure](#project-structure)  
- [Documentation](#documentation)  
- [Contributing](#contributing)  
- [Community & Contact](#community--contact)  
- [License](#license)  
- [Authors & Acknowledgements](#authors--acknowledgements)  

---

## Overview

MoodHaven Journal lets you record timestamped gratitude entries and store them securely in a local, encrypted store (default: `%AppData%\MoodHaven`).  
MaterialSkin.2 provides a clean, modern light/dark theme for distraction-free journaling.

### UI Mock-up _(Work in Progress)_

> **Note:** This image is a concept render; final visuals may differ.

![MoodHaven UI Mock-up](/Docs/Assets/MoodBloom_UI_Mockup.png)

---

## Features

* **First-Run Wizard** - create profile, master password, and local storage path  
* **AES-256 Encryption** - secure key derivation (PBKDF2) and integrity via HMAC  
* **Journal UI** - simple interface for writing gratitude entries  
* **Preferences Panel** - change file paths, rotate password, toggle themes, export or wipe journal  
* **Logging & Crash Capture** - NLog-powered diagnostics and crash reporting (saved locally)  
* **Accessibility & Localization Ready** - keyboard navigation and translation infrastructure  

---

## Tech Stack

| Layer     | Details                                                     |
|-----------|-------------------------------------------------------------|
| Language  | VB.NET (no `.Designer` files; UI built in code)             |
| Framework | .NET 8.0 (Windows)                                           |
| UI        | MaterialSkin.2                                              |
| Encryption| AES-256-CBC + HMAC (via `EncryptionService`)                |
| Storage   | Encrypted JSON (via `FileStorageService`)                   |
| Logging   | NLog                                                        |
| Testing   | xUnit / MSTest (`MoodHaven.Tests`)                          |
| CI/CD     | GitHub Actions (`dotnet build`, `dotnet test`)              |

---

## Getting Started

### Prerequisites

- Windows 10 or later  
- Visual Studio 2022 or newer with the **.NET 8 SDK**  
- Git CLI or GitHub Desktop

### Build Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/kenlacroix/MoodHavenJournal-Community.git
   cd MoodHavenJournal-Community
   ```

2. Open the solution file `MoodHavenJournal-Community.sln` in Visual Studio.

3. Restore NuGet packages:
   - In Visual Studio, go to **Tools** > **NuGet Package Manager** > **Manage NuGet Packages for Solution...**
   - Click **Restore** to install missing packages.

4. Build the solution:
   - Press **Ctrl+Shift+B** or navigate to **Build** > **Build Solution**.

5. Run the application:
   - Press **F5** to start debugging or **Ctrl+F5** to run without debugging.

---

## Project Structure

| Folder              | Purpose                                |
|---------------------|----------------------------------------|
| `/Core`             | Core services (Encryption, Storage)    |
| `/UI`               | MaterialSkin-based interface            |
| `/Tests`            | Unit and integration tests             |
| `/Docs`             | Docs and UI mockups                    |
| `/Resources`        | Embedded assets                        |

---

## Documentation

More documentation can be found in the `/docs` folder and on our [Substack newsletter](https://moodhaven.substack.com/).

Planned:
- User Onboarding Guide  
- Password Reset / Recovery  
- Advanced Preferences  
- Developer Architecture Overview  

---

## Contributing

We welcome community contributions!

Start with these beginner-friendly issues:  
[Good First Issues](https://github.com/kenlacroix/MoodHavenJournal/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)

See [CONTRIBUTING.md](CONTRIBUTING.md) for setup instructions, code style, and tips for submitting pull requests.

---

## Community & Contact

- **Newsletter**: [Subscribe on Substack](https://moodhaven.substack.com)  
- **Discussions**: [GitHub Discussions](https://github.com/kenlacroix/MoodHavenJournal/discussions)  
- **Follow**: [LinkedIn (MoodHavenApp)](https://www.linkedin.com/company/moodhavenapp)
- **Website**: [moodhaven.app] (https://journal.moodhaven.app)
---

## License

This Community Edition is licensed under the **Mozilla Public License 2.0 (MPL-2.0)**.  
See [LICENSE](LICENSE) for full terms.

---

## Authors & Acknowledgements

Built and maintained by [Ken LaCroix](https://github.com/kenlacroix) and the MoodHaven community.

Thanks to all contributors who believe in mindful, privacy-first software.
