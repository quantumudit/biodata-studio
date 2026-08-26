---
name: Script Writing Constraints
description: Enforces plain ASCII-only characters across all scripts, code, and markdown files, with exceptions for code blocks and ASCII art.
---

# Script Writing Constraints

## Plain ASCII Only

All scripts, config files, code, and markdown files must use plain ASCII characters only.
No Unicode, no special symbols, no characters that cannot be typed directly
from a standard keyboard.

## Prohibited Characters

The following are strictly banned in all scripts, code, and markdown files:

```
| Banned | Description              | Use instead                        |
|--------|--------------------------|------------------------------------|
| —      | Em dash (U+2014)         | - or --                            |
| –      | En dash (U+2013)         | -                                  |
| " "    | Curly double quotes      | "                                  |
| ' '    | Curly single quotes      | '                                  |
| •      | Bullet point (U+2022)    | - or *                             |
| …      | Ellipsis (U+2026)        | ...                                |
| ©®™    | Copyright/TM symbols     | (c) (r) (tm)                       |
| ─ ┐ └  | Box drawing (U+2500-257F)| - or = or | (except in ASCII art)  |
| (any)  | Any Unicode > U+007F     | ASCII equivalent                   |
```

## Separators and Dividers

Use only plain keyboard characters for visual separators in comments:
```
# Good - plain ASCII
# -------------------------------------------------------
# =====================================================
# *** Section Header ***

# Bad - box drawing characters used as separators
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  <- box drawing (U+2501)
# ═══════════════════════════════════════════════════  <- box drawing (U+2550)
```

## String Content in Scripts

- Use straight double quotes `"` for strings
- Use straight single quotes `'` where required by syntax
- Never use curly/smart quotes even inside string content
- Hyphens in text: use `-` not em dash or en dash

## Comments in Scripts

- Use `#` for single line comments
- Use plain words and ASCII punctuation only
- No emoji in comments
- No Unicode arrows like -> use -> instead
- No Unicode checkmarks, crosses, bullets

## Applies To

This rule applies to all script, code, and markdown files including:
- JavaScript / TypeScript (.js, .ts, .jsx, .tsx)
- CSS (.css)
- Shell scripts (.sh, .bash)
- PowerShell (.ps1)
- YAML (.yml, .yaml)
- JSON (.json, .jsonc)
- Config files of any kind
- Markdown files (.md, README.md, etc.)

## Exceptions

The following are excluded from these constraints regardless of file type:

- **Code blocks** - content inside fenced code blocks (` ``` `) or inline code (`` ` ``) is exempt
- **ASCII art** - diagrams and visual representations are exempt, including box drawing
  characters (U+2500-U+257F) used for things like directory trees, flowcharts, and borders:
  ```
  src/
  ├── components/
  └── views/
      └── FormView.tsx
  ```