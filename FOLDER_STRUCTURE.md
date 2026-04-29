# 📁 Project Folder Structure

This file provides a live overview of the current project organization. 

## 🏗️ Actual Repository Structure

```text
projectbimsaraweb/
│
├── 📂 frontend_source/           🚀 ACTIVE REACT PROJECT (Primary)
│   ├── 📂 src/                   - Component source code
│   ├── 📂 public/                - Static assets (HTML, Icons)
│   ├── 📂 build/                 - Production build output (generated)
│   ├── 📄 package.json           - Project dependencies & scripts
│   └── 📄 package-lock.json      - Dependency lock file
│
├── 📂 build/                     📦 Root build folder (Production ready)
│
├── 📂 frontend/                  ⚠️ Legacy/Draft React structure
│   ├── 📂 src/
│   └── 📂 public/
│
├── 📂 bimsara-clone/             📔 Clone/Reference project files
│
├── 📂 .vscode/                   - VS Code workspace settings
│
├── 📄 patch_ui_v1.js             🛠️ UI Patch scripts (Versions 1-4)
├── 📄 patch_ui_v2.js
├── 📄 patch_ui_v3.js
├── 📄 patch_ui_v4.js
│
├── 📄 test_email.js              📧 Email configuration test script
│
├── 📄 PROJECT_STRUCTURE.md       - Detailed architecture documentation
├── 📄 README.md                  - Main project guide
└── 📄 .gitignore                 - Git exclusion rules
```

---

## 🛠️ How to Update This File
To keep this structure up-to-date after adding new directories, you can run the following command in your terminal while inside the `projectbimsaraweb` folder:

### Windows (PowerShell)
```powershell
# This will display the tree structure excluding node_modules
tree /f /a | Select-Object -First 50
```

### Purpose of Key Directories

| Folder/File | Description |
| :--- | :--- |
| `frontend_source/` | The core development folder for the React website. **Work here.** |
| `frontend_source/build/` | Created when you run `npm run build`. Contains the files served to users. |
| `patch_ui_v*.js` | Custom scripts used to apply UI updates or fixes across the codebase. |
| `bimsara-clone/` | Reference materials or a previous version of the site for comparison. |
| `test_email.js` | Used for verifying EmailJS or backend email functionality. |

---
**Last Updated**: April 29, 2026
