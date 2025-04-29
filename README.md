# MoodHaven Journal

[![Build Status](https://img.shields.io/github/actions/workflow/status/kenlacroix/MoodHavenJournal/ci.yml?branch=main)](https://github.com/kenlacroix/MoodHavenJournal/actions)  
[![License: MPL-2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](LICENSE)
[![Subscribe to MoodHaven Journal](https://img.shields.io/badge/Subscribe%20to-MoodHaven%20Journal-brightgreen)](https://moodhaven.substack.com/subscribe)

**MoodHaven Journal** is a privacy-first gratitude and mood tracker built with .NET 8 WinForms.  
All entries live in an **AES-256-encrypted** JSON store on your machine, and an optional zero-knowledge sync pushes only ciphertext to any S3-compatible backend you control.

---

## Table of Contents

- [Overview](#overview)  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Getting Started](#getting-started)  
- [Project Structure](#project-structure)  
- [Documentation](#documentation)  
- [Contributing](#contributing)  
- [License](#license)  
- [Authors & Acknowledgements](#authors--acknowledgements)  

---

## Overview

MoodHaven Journal lets you record timestamped gratitude entries—mood, tags, and free text—in a fully encrypted local database (default: `%AppData%\MoodHaven`). MaterialSkin.2 provides a modern light/dark UI. If you choose, the app can push encrypted backups to DigitalOcean Spaces, MinIO, Backblaze B2, or any other S3-compatible service **without ever uploading plain-text data**.

### UI Mock-up _(work in progress)_

> **Note:** This image is a concept render; final visuals may differ.

![MoodHaven UI Mock-up](/Docs/Assets/MoodBloom_UI_Mockup.png)

---

## Features

* **First-Run Wizard** – create profile, master password, and storage path  
* **AES-256 Encryption** – PBKDF2-derived root key; HMAC integrity  
* **Journal UI** – mood picker, tag autocomplete, rich-text entry  
* **Preferences** – change paths, rotate password, view logs, export/wipe, theme toggle  
* **Analytics & AI Insights** – mood charts, tag heatmaps, GPT-powered prompts (opt-in)  
* **Cloud Sync** – zero-knowledge S3 backup/restore  
* **Logging & Error Capture** – rolling NLog files, safe crash reports  
* **Accessibility & Localization** – full keyboard navigation, translation stubs  

---

## Tech Stack

| Layer     | Details                                                     |
|-----------|-------------------------------------------------------------|
| Language  | VB.NET (no `.Designer` files)                               |
| Framework | .NET 8.0-windows                                            |
| UI        | MaterialSkin.2                                              |
| Encryption| AES-256-CBC + HMAC via `EncryptionService`                  |
| Storage   | Encrypted JSON handled by `FileStorageService`              |
| Logging   | NLog                                                        |
| Testing   | xUnit / MSTest (`MoodHaven.Tests`)                           |
| CI        | GitHub Actions (`dotnet build`, `dotnet test`)               |
| Cloud     | Any S3-compatible target (`CloudSyncService`)               |

---

## Getting Started

### Prerequisites
* Windows 10+  
* Visual Studio 2022 with **.NET 8 SDK**  
* Git CLI or GitHub Desktop  

### Installation
```bash
git clone https://github.com/kenlacroix/MoodHavenJournal.git
cd MoodHavenJournal
