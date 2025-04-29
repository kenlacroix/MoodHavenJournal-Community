# MoodBloom User Guide

Welcome to MoodBloom â€” your secure, personal gratitude journal. This guide walks you through setup, usage, and features to help you get the most out of your experience.

---

## 1. First Launch

### Step 1: Create Your Password
On first run, you'll be prompted to create a secure password. This encrypts all your journal data using AES-256 encryption.

### Step 2: Save Recovery Info
You'll be offered a **Recovery Kit file** and/or a **Recovery Phrase** â€” keep these safe. They're your only way to regain access if you forget your password.

---

## 2. Main Interface Overview

- **Sidebar Navigation**
  - **Journal:** Write new entries and view past reflections
  - **Insights:** See trends and visualizations
  - **Preferences:** Customize themes, password, backups
  - **Backup:** Manually backup or restore your journal

- **Entry Panel**
  - Select mood (emoji or scale)
  - Add tags (e.g., gratitude, stress)
  - Write freely and save securely

- **Quote of the Day**
  - A positive prompt to inspire reflection

---

## 3. Writing and Viewing Entries

- Click **New Entry**
- Choose your **mood**
- Add **tags** to describe your day or focus
- Type your journal reflection
- Press **Save**, entries are immediately encrypted

To view past entries:
- Use the **search bar** or **filter by tag/mood**
- Entries appear in a chronological viewer on the right

---

## 4. Using the Insights Tab

- View **mood trends** over time
- Explore **tag heatmaps**, streaks, and emotion clouds
- If Fitbit is enabled, compare stress vs mood

Insights are generated locally with optional AI assistance (no internet needed unless you opt-in to cloud services)

---

## 5. Preferences and Security

### Change Password
- Go to Preferences > Security
- Enter current and new passwords
- Changes affect the encrypted root key

### Export/Import Journal
- Preferences > Export: saves a decrypted backup
- Preferences > Import: restore from exported file

### Wipe All Data
- Permanently deletes your encrypted journal and config files
- Confirm before proceeding

---

## 6. Cloud Sync (Optional)
- Enable in Preferences > Cloud
- Syncs encrypted data to cloud storage (S3 or DigitalOcean)
- Never sends plaintext data

---

## 7. Backup and Recovery

- **Backup:** Use manual or auto-backup options
- **Recovery:** Use your Recovery Kit or Phrase if you forget your password

**Reminder:** Without your recovery info, your encrypted journal cannot be unlocked.

---

## Troubleshooting

- **App won't open:** Try running as admin or reinstalling
- **Password not working:** Double-check capitalization; use hint
- **Cannot recover journal:** Ensure Recovery Kit was saved during setup

---

## Support

For help or suggestions, email: `support@moodbloom.org`  
Or visit: [https://github.com/kenlacroix/moodbloom](https://github.com/kenlacroix/moodbloom)

---

See also:
- `/Docs/Deployment.md`
- `/Docs/Testing.md`
- `/Docs/EncryptionSpec.md`
