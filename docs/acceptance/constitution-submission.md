# Constitution submission: acceptance (walk criteria)

Checked by hand in a browser. Version 2 (Oct 24): entries go to the club's Google Drive (ai.ethics.byu@gmail.com) and Sheet through Apps Script; no student sign-in. The full spec is in `.specs/constitution-submission/spec.md`.

- R.1 NEGATIVE: with the flag off, a visitor on /constitution cannot submit; the button is disabled and reads "Submissions open soon."
- 0.1 Sent from localhost through upload-test.html, a ~200 MB video and a PDF both appear in the club's Drive folder.
- 0.2 The same test adds one TEST ENTRY row to the Sheet.
- 0.3 The same test sends one email to the club inbox.
- 1.1 As a student on /constitution, I can fill in name, email, major and year with no sign-in step.
- 1.2 NEGATIVE: as a student who types a non-@byu.edu email, I see "Please use your BYU email address (ending in @byu.edu)." and cannot submit.
- 1.4 NEGATIVE: calling the script's finish from the browser console with a @gmail.com email is refused and adds no Sheet row.
- 2.1 As a student, one press of "Submit my constitution →" sends all fields and both files.
- 2.2 While uploading, the Submit button is disabled.
- 2.3 While uploading, a progress bar shows how much has been sent.
- 2.4 If the upload fails, I see "Something went wrong sending your entry. Please try again in a moment."
- 2.5 After a failed upload, my typed fields and both chosen files are still there.
- 2.10 NEGATIVE: calling the script's start from the console with a 400 MB size, or a .exe type, is refused.
- 2.11 NEGATIVE: as a student whose email already has 2 entries, pressing Submit shows "You've already submitted twice. To make a change, reach out to ai.ethics.byu@gmail.com."
- 2.12 NEGATIVE: that third attempt is refused before any file uploads (nothing new in Incoming).
- 2.13 The email count ignores capitals: A@byu.edu and a@byu.edu are the same student.
- 3.1 Right after submitting, the form is replaced by "Thanks, your constitution is in."
- 3.2 The confirmation lists both file names I sent.
- 3.3 Within a minute of submitting, I get a receipt email at the address I typed.
- 3.4 The receipt lists my name and both file names.
- 4.1 NEGATIVE: opening an entry's Drive link while signed out of Google is refused.
- 4.2 NEGATIVE: opening an entry's Drive link as a Google account the club has not shared with is refused.
- 4.3 NEGATIVE: opening the Sheet as a Google account the club has not shared with is refused.
- 5.1 As a club member, each entry shows up as one Sheet row with date, name, email, major, year, constitution link and video link.
- 5.2 As a club member, I can open the constitution from its Sheet link.
- 5.3 As a club member, I can play the video from its Sheet link.
- 5.4 As a club member, I can mark an entry in the Sheet's "Reviewed" column.
- 5.5 As a club member, I get one email per entry with the details and both links.
- 5.6 NEGATIVE: an upload that stops before both files are in adds no Sheet row.
- 5.7 NEGATIVE: that stopped upload sends no email to the club or the student.
- 5.8 NEGATIVE: files from that stopped upload never appear in the Submissions folder (they stay in Incoming).
- 6.1 At 390px wide, the form, progress and confirmation have no sideways scrolling.
- 6.2 On a real phone, a student can pick a video from the camera roll and submit.
- 8.1 A classmate who has not seen the site submits a test entry on their own phone or laptop without asking for help.
