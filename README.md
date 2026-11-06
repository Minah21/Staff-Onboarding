# A.W. Law LLC — Staff Onboarding

Induction site for new staff: six lessons, each followed by a test (pass mark: **more than 75%**), plus a link to the Leave Approver.

| # | Lesson | Source |
|---|--------|--------|
| 01 | Welcome to A.W. Law LLC | awlaw.com.sg + SOP |
| 02 | Letter Formatting | House style + SOP naming rules |
| 03 | Precedent Letters | Templates built on the SOP and Bill Collection process |
| 04 | Standard Operational Procedure | *AW Edit – A.W. Law LLC Standard Operational Procedure 08 06 2025* |
| 05 | Employee Code of Conduct | *Employee code of conduct 08 06 2025* |
| 06 | Bill Collection Process | *AW edit – Bill collection process 08 06 2025* |

## How it works
- Plain static HTML/CSS/JS — no build step. Vercel serves the repo root.
- Lesson text and test questions live in `lessons.js`. Edit there to change content.
- Test results are posted to Supabase table `onboarding_results` (see `supabase/migrations`). Staff can submit results but cannot read them; admins read them in the Supabase dashboard (or signed in as an `admin` profile).
- Leave Approver link: `LEAVE_APPROVER_URL` at the top of `lessons.js`.

## Acknowledgment and e-signature
Every lesson ends with an acknowledgment tick-box and an e-signature pad. Staff must sign before the test unlocks. Signatures are saved to Supabase table `onboarding_signatures` (insert-only for staff).

## Admin page (`/admin.html`)
Sign in with a Leave Approver account whose role is `admin`. Lists every staff member's signatures and test results, with a **Save** button that downloads that person's signed record as a PDF on the firm letterhead.
