# Constitution submissions: Apps Script setup

Entries from `/constitution` are saved in the club's Google Drive, logged in a Google Sheet, and emailed to the club. This folder holds the script; it runs in the club's Google account, not on GitHub Pages.

## One-time setup (signed in as the club account)

1. **Folder:** in Google Drive, create a folder named `Constitution Submissions`. Open it and copy the ID from the address bar (the part after `/folders/`).
2. **Sheet:** create a Google Sheet named `Constitution Submissions Log`. In row 1, type these headers:
   `Submitted | Name | Email | Major | Year | Constitution | Video | Reviewed`.
   Copy its ID from the address bar (between `/d/` and `/edit`).
3. **Script:** go to script.google.com, click **New project**, and name it `Constitution Submissions`.
   - Paste `Code.gs` into the editor over the starter code.
   - In **Project Settings**, check **Show "appsscript.json" manifest file in editor**, then paste in `appsscript.json`.
   - Fill in `FOLDER_ID`, `SHEET_ID` and `NOTIFY_EMAIL` at the top of `Code.gs`.
4. **Grant permissions:** pick `testSetup` in the function menu and click **Run**. Approve the permissions. The log should print the folder name, the sheet name and the email quota.
5. **Deploy:** click **Deploy → New deployment → Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**. If you only see "Anyone within BYU", BYU blocks public web apps on this account. Stop and tell Claude, because the plan changes.
   - Copy the web app URL (ends in `/exec`).

## Test (the 200 MB check)

1. Run the site locally (`npm run dev`) and open `http://localhost:5174/ai-ethics-initiative/upload-test.html` (or 5173).
2. Paste the `/exec` URL, pick any small PDF and a large video (about 200 MB), and click **Upload test entry**.
3. Pass = both files show up in the Drive folder, a TEST ENTRY row is added to the Sheet, and the club inbox gets an email.

`public/upload-test.html` is test-only. Delete it before merging to `main`, or it will be published.

## After changing Code.gs

**Deploy → Manage deployments → edit → Version: New version.** The `/exec` URL stays the same.
