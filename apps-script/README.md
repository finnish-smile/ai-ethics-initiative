# Constitution submissions: Apps Script setup

Entries from `/constitution` are saved in the club's Google Drive, logged in a Google Sheet, emailed to the club, and receipted to the student. This folder holds the script; it runs in the club's Google account (ai.ethics.byu@gmail.com), not on GitHub Pages.

## One-time setup (signed in as ai.ethics.byu@gmail.com)

1. **Folders:** in Google Drive, create a folder `Constitution Submissions`, and inside it two folders: `Incoming` and `Submissions`. Open each and copy its ID from the address bar (the part after `/folders/`).
   - `Submissions` holds complete entries only. `Incoming` holds uploads that never finished; it is safe to empty now and then.
2. **Sheet:** create a Google Sheet named `Constitution Submissions Log`. In row 1, type these headers, one per column, in this order:
   `Submitted | Name | Email | Major | Year | Constitution | Video | Reviewed`.
   Copy its ID from the address bar (between `/d/` and `/edit`).
3. **Script:** go to script.google.com, click **New project**, and name it `Constitution Submissions`.
   - Paste `Code.gs` into the editor over the starter code.
   - In **Project Settings**, check **Show "appsscript.json" manifest file in editor**, then paste in `appsscript.json`.
   - Fill in `INCOMING_FOLDER_ID`, `SUBMISSIONS_FOLDER_ID` and `SHEET_ID` at the top of `Code.gs`.
4. **On/off switch:** in **Project Settings → Script properties**, add `SUBMISSIONS_OPEN` with the value `true`. Any other value (or none) turns submissions off: the script refuses everything. This is also the emergency off switch.
5. **Grant permissions:** pick `testSetup` in the function menu and click **Run**. Approve the permissions. The log should print both folder names, the sheet name, `SUBMISSIONS_OPEN: true` and the email quota.
6. **Deploy:** click **Deploy → New deployment → Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Copy the web app URL (ends in `/exec`).
7. **Connect the site:** in the repo, create `.env.local` (it is not committed) with:
   ```
   VITE_SUBMIT_URL=https://script.google.com/macros/s/.../exec
   VITE_SUBMISSIONS_OPEN=true
   ```
   Restart `npm run dev`.
8. **Share with officers:** share the `Constitution Submissions` folder and the Sheet with each club officer (Viewer or Editor).

## Test (the 200 MB check)

1. Run the site locally (`npm run dev`) and open `http://localhost:5174/ai-ethics-initiative/upload-test.html` (or 5173).
2. Paste the `/exec` URL, pick any small PDF and a large video (about 200 MB), and click **Upload test entry**.
3. Pass = both files show up in `Submissions`, a TEST ENTRY row is added to the Sheet, and the club inbox gets an email (plus a receipt to test@byu.edu, which bounces; that's fine).

`public/upload-test.html` is test-only. Delete it before merging to `main`, or it will be published.

## After changing Code.gs

**Deploy → Manage deployments → edit → Version: New version.** The `/exec` URL stays the same.

## Limits (regular Gmail account)

- 15 GB of storage shared with the inbox, roughly 80–100 videos. Check free space before launch.
- 100 script emails a day. Each entry sends 2 (club notice + receipt), so about 50 entries a day. If a deadline rush is expected, remove the club notice in `finishEntry` and rely on the Sheet.
