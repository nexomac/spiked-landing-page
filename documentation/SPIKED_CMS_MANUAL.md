# Spiked CMS & AI Platform: End-to-End User Guide

**Version:** 1.0  
**Date:** December 2025  
**Status:** Draft

---

## 1. Introduction

This system is built on **SvelteKit** and **MongoDB**, integrated with **Google Gemini 2.5 Flash** for high-speed generative capabilities.

---

## 2. Accessing the Admin Panel

### Login
The entry point to the system is protected by a secure authentication layer.

1.  **Navigate to**: `/admin/login`
2.  **Interface**: You will see a "Spiked Admin" login screen featuring glassmorphism effects and animated background orbs.
3.  **Credentials**: Enter the secure passcode defined in your environment variables.

> **[Screenshot: Admin Login Screen]**  
\vspace{10cm}

> *Check verification:* Login screen should show "SPIKED ADMIN" with red/purple branding.

### Dashboard
Upon successful login, you are redirected to the **Dashboard**, giving you a high-level view of your Content Models.

---

## 3. Feature: AI Schema Architect

Instead of manually defining database fields, Spiked CMS uses AI to architect your content models.

### Step-by-Step Guide
1.  Navigate to **Content Models** (`/admin/models`).
2.  Click the **"Generate Schema with AI"** button in the top right.
3.  A modal window titled "AI Schema Architect" will appear.

### The Prompt
In the text area, describe the content you want to store. 

**Example Prompt:**
> "Create a 'Case Study' model. It should have a client name, a hero image, a summary of results, a 'Challenge' section, a 'Solution' section, and a 'Results' section with percentage metrics."

**What happens next?**
1.  The system sends this prompt to Gemini 2.5 Flash.
2.  The AI infers the necessary fields (e.g., `text` for Client Name, `image` for Hero Image, `richtext` for Solution).
3.  A new Content Model is automatically created in MongoDB.

> **[Screenshot: AI Schema Modal]**
\vspace{10cm}

---

## 4. Feature: AI Content Generation

Once you have a model, you can populate it with content using the specialized AI Content Generator.

### Step-by-Step Guide
1.  Navigate to **Entries** (`/admin/entries/[model-slug]`).
2.  Click the **"Generate with AI"** button.
3.  The "AI Content Generator" modal appears.

### The Prompt
Enter a high-level directive for the content you want to write.

**Example Prompt:**
> "Write a breaking news story about a new AI chip from Nvidia that accelerates sales forecasting by 500x. Write it in a dramatic, 'Wall Street Journal' style."

### Behind the Scenes (The Logic)
The system executes a sophisticated prompt chain:
1.  **Schema Awareness**: It reads the Content Model (e.g., knows there is a 'Title', 'Body', 'Date', 'Image' field).
2.  **Date Enforcement**: It forces ISO-8601 formatting (`YYYY-MM-DD`) for compatibility.
3.  **Image Strategy**: It inserts validity-checked placeholder URLs:
    *   *Unsplash Source*: `https://images.unsplash.com/...`
    *   *Placehold.co*: `https://placehold.co/800x400`
4.  **Rich Text**: It generates widespread HTML/JSON structure compatible with the Tiptap editor.

**Result**: A fully formed "Draft" entry appears in your list instantly.

---

## 5. Editor & Publishing

### The Tiptap Editor
Click on any entry to open the **Editor**.
*   **Rich Text**: Supports Bold, Italic, H1-H3, Lists.
*   **Media**: Images render with previews.
*   **Saving**: 
    *   **Save Draft**: Saves changes without publishing.
    *   **Publish**: Sets status to 'Live', making it visible on the public blog.

> **[Screenshot: Entry Editor]**
\vspace{10cm}

---

## 6. The "Newspaper Strip" Blog Layout

Public-facing content relies on a unique design system inspired by classic broadsheets tailored for the digital age.

*   **URL**: `/blog/[slug]`
*   **Visuals**: 
    *   Centered "Strip" layout on a `#f4f1ea` (off-white) background.
    *   **Typography**: Serif fonts for body text, drop-caps for the first letter.
    *   **Justification**: Text is justified for that dense, newspaper column feel.
    *   **Header**: Dynamically generated "Vol. 2025" and date lines.

---

## 7. Future Roadmap: Newsletter System

We are preparing to expand Spiked CMS to include a **Newsletter Engine**. 

### Context
The goal is to repurpose our AI-generated blog content into email campaigns without leaving the platform.

### Planned Workflow
1.  **Audience Management**: New 'Subscriber' Content Model.
2.  **Campaign Builder**:
    *   Select existing Blog Posts.
    *   **AI Summary**: "Summarize this post for an email subject line."
    *   **Template**: A clean, text-first email template matching the "Newspaper" aesthetic.
3.  **Sending Infrastructure**: Integration with standard SMTP or transactional API (e.g., Resend or SendGrid).

### Preparation Steps (For Developers)
*   [ ] Create `Newsletter` and `Subscriber` schemas.
*   [ ] Add `is_newsletter_ready` boolean to the `Blog Post` model.
*   [ ] Research `svelte-email` for template rendering.

---

## 8. Change Management & Iteration

As we roll out features, we follow this improved iteration cycle:

1.  **Request**: User identifies a gap (e.g., "I need to schedule posts").
2.  **Spec**: Create a brief `.md` plan in the codebase.
3.  **Prototype**: Implement in a feature branch or isolated route.
4.  **Audit**: Run security and performance checks (as performed for the Admin Auth system).

---

**Security Note**: 
All Admin actions (`create`, `update`, `delete`, `generate`) are protected by server-side session cookies. Ensure `ADMIN_PASSWORD` and `GEMINI_API_KEY` are rotated periodically in your `.env`.
