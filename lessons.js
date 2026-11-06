/* A.W. Law LLC — Staff Onboarding: lesson content and tests.
   Each test needs MORE than 75% to pass. */

window.LEAVE_APPROVER_URL = "https://leave-approver-vert.vercel.app";

window.LESSONS = [
/* ───────────────────────────── 1. FIRM ───────────────────────────── */
{
  id: "firm",
  num: "01",
  title: "Welcome to A.W. Law LLC",
  short: "Our firm",
  blurb: "Who we are, what we do, and the people you'll work with.",
  minutes: 5,
  ack: "I have read and understood the introduction to A.W. Law LLC, its people and how we work with clients.",
  html: `
<p class="lead">Welcome to the team. A.W. Law LLC is a Singapore law practice of Advocates &amp; Solicitors. We are a small team by design, so every person here, lawyer or staff, is visible to our clients and carries the firm's name.</p>

<h3>At a glance</h3>
<div class="facts">
  <div><span>Office</span>133 New Bridge Road, #20-03, Chinatown Point, Singapore 059413</div>
  <div><span>Main line</span>+65 6733 0021</div>
  <div><span>Website</span><a href="https://www.awlaw.com.sg" target="_blank" rel="noopener">www.awlaw.com.sg</a></div>
  <div><span>Languages served</span>English, Malay and Tamil (Mandarin and Vietnamese through an interpreter)</div>
</div>

<h3>Our practice areas</h3>
<div class="cards3">
  <div class="mini"><b>Family Law</b>Divorce (civil and Syariah), child custody, maintenance, applications in the Family Justice Courts and the Syariah Court, wills.</div>
  <div class="mini"><b>Civil Law</b>Debt recovery, letters of demand, contract and employment disputes, landlord–tenant matters, suits in the Magistrates', District and High Courts, arbitration.</div>
  <div class="mini"><b>Criminal Law</b>Charges ranging from drug, theft, assault and fraud offences, bail, pleas of guilt, trials and appeals.</div>
</div>
<p>We also handle conveyancing, accident and injury matters, which have their own billing contacts (see the Bill Collection lesson).</p>

<h3>Our people</h3>
<ul>
  <li><b>Abdul Wahab</b> — Managing Director. He leads the firm; "AW" in our procedures refers to him.</li>
  <li><b>Muhammad Hasif</b> — Associate Director.</li>
  <li><b>Roy Paul Mukkam</b> — Associate Director.</li>
  <li><b>Shantini</b> — Associate.</li>
  <li><b>HR / Billing Department</b></li>
</ul>

<h3>How we work with clients</h3>
<ul>
  <li><b>A lawyer must be present at every consultation.</b> The initial consultation fee is <b>$218.00</b> ($200 + GST) unless AW waives or changes it.</li>
  <li>Clients get a clear plan and fee quote before work begins, and the engagement is recorded in a <b>Warrant to Act (WTA)</b>.</li>
  <li>Every client update is given <b>in writing</b> (email, letter or WhatsApp) and saved to the client's OneDrive folder.</li>
  <li>Our solicitors are members of the <b>Law Society of Singapore</b> and are bound by its rules of professional conduct. So are you, by extension.</li>
</ul>

<h3>Your first-week checklist</h3>
<ol>
  <li>Complete all six lessons and pass every test (more than 75%).</li>
  <li>Get added to the <b>Appointments</b> WhatsApp group and given access to OneDrive (AW Law LLC &gt; Files – A.W. Law LLC).</li>
  <li>Sign in to the <b>Leave Approver</b>. All leave is applied for and approved there. <a href="${"https://leave-approver-vert.vercel.app"}" target="_blank" rel="noopener">Open Leave Approver →</a></li>
  <li>Sign the acknowledgement pages of the SOP and the Employee Code of Conduct and hand them to Admin.</li>
</ol>`,
  quiz: [
    { q: "Who is the Managing Director of A.W. Law LLC?", o: ["Muhammad Hasif", "Abdul Wahab", "Roy Paul Mukkam", "Shantini"], a: 1 },
    { q: "Where is the firm's office?", o: ["Raffles Place", "Chinatown Point, 133 New Bridge Road", "Paya Lebar Square", "The State Courts building"], a: 1 },
    { q: "Which three main practice areas does the firm cover?", o: ["Corporate, tax and IP", "Family, civil and criminal", "Shipping, insurance and banking", "Immigration, property and tax"], a: 1 },
    { q: "What is the standard initial consultation fee?", o: ["$100.00", "$200.00 with no GST", "$218.00 ($200 + GST)", "It is always free"], a: 2 },
    { q: "Who must be present during every client consultation?", o: ["The receptionist only", "A paralegal", "A lawyer", "Admin"], a: 2 },
    { q: "Who are the firm's Associate Directors?", o: ["Abdul Wahab and Shantini", "Muhammad Hasif and Roy Paul Mukkam", "Shantini and Roy Paul Mukkam", "Abdul Wahab and Muhammad Hasif"], a: 1 },
    { q: "Where do you apply for leave?", o: ["By WhatsApp to any lawyer", "On paper with Admin", "In the Leave Approver app", "By email to the client"], a: 2 },
    { q: "In what form must client updates be given?", o: ["Verbally is enough", "In writing: email, letter or WhatsApp", "Only by phone call", "Only in person"], a: 1 },
    { q: "Which professional body are the firm's solicitors members of?", o: ["Law Society of Singapore", "Singapore Academy of Accountancy", "Institute of Banking", "Ministry of Manpower"], a: 0 },
    { q: "What document records a client's engagement of the firm?", o: ["The Questionnaire Form", "The Warrant to Act (WTA)", "The receipt book", "Form 29"], a: 1 }
  ]
},

/* ───────────────────────── 2. LETTER FORMATTING ───────────────────────── */
{
  id: "letters",
  num: "02",
  title: "Letter Formatting",
  short: "Letter formatting",
  blurb: "The house style for every letter and email that leaves the firm.",
  minutes: 8,
  ack: "I have read and understood the A.W. Law LLC letter formatting house style and will follow it for all correspondence.",
  html: `
<p class="lead">Every letter we send is evidence. It may be read by a judge, exhibited in an affidavit or relied on by the other side. Follow this house style every time, and never send anything until the lawyer on the file has checked it.</p>

<h3>The parts of a firm letter, top to bottom</h3>
<div class="letter-anatomy">
  <div class="la-row"><b>1. Letterhead</b><span>Always use the firm's letterhead template with the A.W. Law LLC logo, address and contact numbers. Never retype the letterhead.</span></div>
  <div class="la-row"><b>2. References</b><span><i>Our Ref:</i> the lawyer's initials and the file number, e.g. <code>AW/202504200</code>. <i>Your Ref:</i> the recipient's reference, copied exactly from their last letter (leave it out if they have none).</span></div>
  <div class="la-row"><b>3. Date</b><span>Written in full, day first: <code>5 November 2026</code>. No "5th", no "05/11/26".</span></div>
  <div class="la-row"><b>4. Mode of delivery</b><span>State how it is sent, above the address: <code>BY EMAIL (abc@xyzlaw.com)</code>, <code>BY HAND</code>, <code>BY REGISTERED POST</code> or <code>BY eLITIGATION</code>.</span></div>
  <div class="la-row"><b>5. Privilege marking</b><span>If the letter contains a settlement offer or proposal, mark it <code>WITHOUT PREJUDICE</code> (or <code>WITHOUT PREJUDICE SAVE AS TO COSTS</code>) at the top. Only the lawyer decides this.</span></div>
  <div class="la-row"><b>6. Addressee</b><span>Full name or firm name and postal address of the recipient.</span></div>
  <div class="la-row"><b>7. Salutation</b><span><code>Dear Sirs</code> to a firm, company or government body; <code>Dear Sir / Madam</code> to the Registrar or an officer whose name you don't know; <code>Dear Mr Tan</code> / <code>Dear Ms Lim</code> to a named person (clients included).</span></div>
  <div class="la-row"><b>8. Subject heading</b><span>Bold and in capitals. For court matters: case number and parties, e.g. <code>DC/OC 123/2026 — JOHN TAN v XYZ PTE LTD</code>. For client letters, the client's name comes first.</span></div>
  <div class="la-row"><b>9. Body</b><span>Numbered paragraphs. Open by stating who we act for or what we refer to: "We act for Mr John Tan…" / "We refer to your letter dated…". One point per paragraph.</span></div>
  <div class="la-row"><b>10. Closing</b><span><code>Yours faithfully</code> after "Dear Sirs" or "Dear Sir / Madam". <code>Yours sincerely</code> after a named salutation.</span></div>
  <div class="la-row"><b>11. Signature</b><span>Letters are signed in the firm's name: <code>A.W. LAW LLC</code>, not by an individual. Add a contact line, e.g. "Contact: Muhammad Hasif (hasif@awlaw.com.sg)".</span></div>
  <div class="la-row"><b>12. Copies</b><span>Add <code>cc: Client</code> where the client is copied. Never copy a client on a letter without the lawyer's approval.</span></div>
</div>

<h3>Emails</h3>
<ul>
  <li>The client's name <b>must</b> be at the front of every email subject: <code>John Tan: Update of status conference / court attendance on 26 05 2025</code>.</li>
  <li>Same tone as a letter: formal, numbered points where there is more than one issue, and no emojis or shorthand.</li>
  <li>Letters sent by email go as a signed PDF attachment, with a short covering email.</li>
</ul>

<h3>Saving your letter</h3>
<ul>
  <li>File name format: <code>Document Name DD MM YYYY</code>.<br>
      Sent: <code>Letter to XYZ Law Firm 25 05 2025.pdf</code><br>
      Received: <code>Letter from XYZ Law Firm 23 05 2025.pdf</code></li>
  <li>Drafts go in the client's <b>Corres &gt; Draft</b> folder; the final PDF goes in <b>Corres &gt; Draft &gt; Pdf</b> on OneDrive.</li>
  <li>WhatsApp updates to clients are saved as screenshots in the client's folder.</li>
</ul>

<h3>Before anything goes out</h3>
<ol>
  <li>The lawyer on the file has checked it. The lawyer takes full responsibility for staff work on the file.</li>
  <li>The client has approved it <b>in black and white</b> (email or WhatsApp) where it is sent on the client's behalf.</li>
  <li>Names, NRIC numbers, case numbers, dates and amounts have been checked against the file.</li>
  <li>Case citations follow OSCOLA, e.g. <i>NRAM Ltd v Evans</i> [2017] SGCA 1013, [2018] 1 SLR 639.</li>
</ol>

<div class="callout"><b>Timing.</b> Updates after a court attendance go out the same day, or by 12.00am the next day. If a full reply needs more time, the lawyer sends a holding reply within 2 days.</div>`,
  quiz: [
    { q: "How should the date be written on a firm letter?", o: ["05/11/26", "5th Nov 2026", "5 November 2026", "November 5, 2026"], a: 2 },
    { q: "You are writing to another law firm and start with \"Dear Sirs\". How do you close?", o: ["Yours sincerely", "Yours faithfully", "Best regards", "Thank you"], a: 1 },
    { q: "You are writing to a client, Mr Tan, and start with \"Dear Mr Tan\". How do you close?", o: ["Yours faithfully", "Cheers", "Yours sincerely", "Warm wishes"], a: 2 },
    { q: "Who signs off a letter from the firm?", o: ["The paralegal who drafted it", "The firm, as \"A.W. LAW LLC\"", "The receptionist", "No signature is needed"], a: 1 },
    { q: "When is a letter marked \"WITHOUT PREJUDICE\"?", o: ["On every letter", "When it contains a settlement offer or proposal, as the lawyer decides", "Only on letters to the court", "When it is urgent"], a: 1 },
    { q: "Which email subject line follows firm rules?", o: ["Update", "Court attendance today!!", "John Tan: Update of status conference / court attendance on 26 05 2025", "RE: RE: FW: matter"], a: 2 },
    { q: "What is the correct file name for a letter we sent to XYZ Law Firm on 25 May 2025?", o: ["xyz letter final v2.pdf", "Letter to XYZ Law Firm 25 05 2025.pdf", "25-5-2025 XYZ.pdf", "Letter from XYZ Law Firm 25 05 2025.pdf"], a: 1 },
    { q: "Where does the final PDF of a letter go on OneDrive?", o: ["Admin", "Research", "Corres > Draft > Pdf", "Desktop"], a: 2 },
    { q: "What must happen before a letter is sent on a client's behalf?", o: ["Nothing, if you're confident", "The lawyer checks it and the client approves it in writing", "Admin stamps it", "The other side agrees to it"], a: 1 },
    { q: "How is the body of a firm letter set out?", o: ["One long paragraph", "Bullet points only", "Numbered paragraphs, one point each", "Any way you like"], a: 2 }
  ]
},

/* ───────────────────────── 3. PRECEDENT LETTERS ───────────────────────── */
{
  id: "precedents",
  num: "03",
  title: "Precedent Letters",
  short: "Precedent letters",
  blurb: "Ready-to-adapt templates for the letters you'll draft most often.",
  minutes: 10,
  ack: "I have read and understood the A.W. Law LLC precedent letters and will have every letter checked by the lawyer on the file before it is sent.",
  html: `
<p class="lead">A precedent is a tested starting point, not a finished letter. Copy the right one, fill every <mark>[bracket]</mark>, delete what doesn't apply, and have the lawyer on the file check it before it goes out. Each precedent below follows the house style from Lesson 02.</p>

<div class="prec" data-title="Letter of Demand">
<h4>A. Letter of Demand <small>Civil · debt recovery · quoted to clients at $150–$1,000 + GST</small></h4>
<p class="use">Use when: a client is owed money and has instructed us to demand payment before starting a suit.</p>
<pre>Our Ref: [AW]/[File No.]
[Date]

BY REGISTERED POST AND EMAIL ([email])

[Debtor's full name]
[Address]

Dear [Sirs / Mr / Ms Name],

[CLIENT NAME] — OUTSTANDING SUM OF $[AMOUNT]

1.  We act for [client name] ("our client").

2.  Our client informs us that [brief facts, e.g. under an agreement
    dated [date], you agreed to pay our client $[amount] for [goods /
    services]]. Despite reminders, the sum of $[amount] remains unpaid.

3.  We are instructed to demand, which we hereby do, that you pay the
    sum of $[amount] to our client within [7] days of the date of this
    letter, failing which our client will commence legal proceedings
    against you without further notice. You will be liable for interest
    and costs.

4.  Payment may be made to [payment details].

5.  Nothing in this letter waives any of our client's rights, all of
    which are expressly reserved.

Yours faithfully / sincerely

A.W. LAW LLC
Contact: [Lawyer name] ([email])
cc: Client</pre>
</div>

<div class="prec" data-title="Holding Reply">
<h4>B. Holding Reply <small>Within 2 days of receiving a letter or query</small></h4>
<p class="use">Use when: a substantive reply needs more time (instructions, documents or research). The SOP requires a holding reply within 2 days.</p>
<pre>Our Ref: [AW]/[File No.]
Your Ref: [their ref]
[Date]

BY EMAIL ([email])

[Recipient]

Dear Sirs,

[CASE NO.] — [PARTIES]

1.  We refer to your letter dated [date].

2.  We are taking our client's instructions and will revert
    substantively by [date / as soon as possible].

3.  In the meantime, all our client's rights are reserved.

Yours faithfully

A.W. LAW LLC</pre>
</div>

<div class="prec" data-title="Client Update">
<h4>C. Client Update after a Court Attendance <small>Same day, or by 12.00am the next day</small></h4>
<p class="use">Use when: reporting to the client after a mention, status conference or hearing. Save a copy (or WhatsApp screenshot) in the client's folder.</p>
<pre>Subject: [Client Name]: Update of court attendance on [DD MM YYYY]

Dear [Mr / Ms Name],

1.  We attended the [mention / status conference / hearing] in
    [case no.] before [the Court / Registrar] today, [date].

2.  The following directions were given:
    (a)  [direction];
    (b)  [direction].

3.  The next court date is [date, time, mode: in person / Zoom].
    [Please attend / You need not attend.]

4.  Next steps: [what we need from the client and by when].

Please contact us if you have any questions.

Yours sincerely

A.W. LAW LLC</pre>
</div>

<div class="prec" data-title="Letter to Court">
<h4>D. Letter to Court (e.g. Request for Adjournment) <small>Filed through eLitigation</small></h4>
<p class="use">Use when: asking the court for an administrative direction. The other side's position should be stated. The lawyer must approve before filing.</p>
<pre>Our Ref: [AW]/[File No.]
[Date]

BY eLITIGATION

The Registrar
[State Courts / Family Justice Courts / Supreme Court]
[Address]

Dear Sir / Madam,

[CASE NO.] — [PARTIES]
[HEARING] FIXED ON [DATE]

1.  We act for the [Claimant / Defendant / Accused] in the above matter.

2.  We write to request that the [hearing] fixed on [date] be adjourned
    to a date after [date] because [reason].

3.  We have written to [opposing counsel / the Prosecution], who
    [consent / do not object / object] to this request.

4.  We are grateful for the Court's consideration.

Yours faithfully

A.W. LAW LLC
cc: [Opposing counsel / Prosecution]</pre>
</div>

<div class="prec" data-title="Without Prejudice Proposal">
<h4>E. Without Prejudice Settlement Proposal <small>To opposing counsel</small></h4>
<p class="use">Use when: the client has approved, in writing, a settlement offer. Never show this letter to the court.</p>
<pre>WITHOUT PREJUDICE SAVE AS TO COSTS

Our Ref: [AW]/[File No.]
Your Ref: [their ref]
[Date]

BY EMAIL ([email])

[Opposing firm]

Dear Sirs,

[CASE NO.] — [PARTIES]

1.  We refer to the above matter.

2.  With a view to resolving this matter amicably and without any
    admission of liability, our client proposes as follows:
    (a)  [term];
    (b)  [term];
    (c)  each party bears its own costs.

3.  This offer remains open for acceptance until [time, date], after
    which it lapses without further notice.

Yours faithfully

A.W. LAW LLC</pre>
</div>

<div class="prec" data-title="Notice of Additional Fees">
<h4>F. Notice to Client of Additional Fees <small>At least one week before billing</small></h4>
<p class="use">Use when: work goes beyond the scope of the Warrant to Act. The Billing Department calendars the date one week after this notice to ask for the fee.</p>
<pre>Subject: [Client Name]: Additional work beyond the Warrant to Act

Dear [Mr / Ms Name],

1.  Under your Warrant to Act dated [date], our agreed scope of work is
    [scope].

2.  The following work falls outside that scope: [describe work, e.g.
    an additional application / extra hearing days].

3.  Our fee for this additional work is $[amount] + GST, excluding
    disbursements. We will bill this on or after [date one week later].

4.  Please let us know by [date] if you have any questions or do not
    wish us to proceed with this work.

Yours sincerely

A.W. LAW LLC</pre>
</div>

<div class="prec" data-title="Sanction to Act for a Bankrupt">
<h4>G. Request for Sanction to Act for a Bankrupt <small>To the Official Assignee / PTIB</small></h4>
<p class="use">Use when: the client is a bankrupt. No work may start until sanction is granted, and the client's representative must also sign a letter of undertaking.</p>
<pre>Our Ref: [AW]/[File No.]
[Date]

BY EMAIL ([email])

The Official Assignee
[Insolvency Office address]

Dear Sir / Madam,

[CLIENT NAME] ([NRIC]) — BANKRUPTCY NO. [ ]
REQUEST FOR SANCTION TO ACT

1.  We have been approached by [client name], an undischarged bankrupt,
    to act for [him / her] in [describe matter].

2.  Our fees will be paid by [representative's name], [relationship],
    and not from the bankrupt's estate.

3.  We should be grateful for your sanction to act for [client name] in
    this matter. We will not take any steps until sanction is granted.

Yours faithfully

A.W. LAW LLC</pre>
</div>`,
  quiz: [
    { q: "A client is owed $5,000 and wants payment before suing. Which precedent do you start from?", o: ["Holding reply", "Letter of demand", "Letter to court", "Client update"], a: 1 },
    { q: "The other side wrote yesterday and the lawyer needs a week to get instructions. What do you send, and by when?", o: ["Nothing until the full reply is ready", "A holding reply within 2 days", "A without prejudice offer", "A letter to the Registrar"], a: 1 },
    { q: "When must the client update after a court attendance be sent?", o: ["Within a week", "At the end of the month", "The same day, or by 12.00am the next day", "Only if the client asks"], a: 2 },
    { q: "Which letter must never be shown to the court?", o: ["A letter of demand", "A without prejudice settlement proposal", "A holding reply", "A client update"], a: 1 },
    { q: "Work has gone beyond the Warrant to Act. How far in advance must the client be told before billing?", o: ["No notice is needed", "At least one week", "One day", "One month"], a: 1 },
    { q: "The client is an undischarged bankrupt. When can work on the matter start?", o: ["Immediately", "After the deposit is paid", "Only after the OA / PTIB grants sanction", "After the first court date"], a: 2 },
    { q: "In a letter to court asking for an adjournment, what should you also state?", o: ["Nothing else", "The other side's position (consent or objection)", "The client's NRIC", "Our fees"], a: 1 },
    { q: "What must you do with every [bracket] in a precedent?", o: ["Leave it for the recipient", "Fill it in or delete it, then have the lawyer check the letter", "Highlight it in yellow", "Replace it with N/A"], a: 1 },
    { q: "How is a letter to the Registrar of the State Courts usually sent?", o: ["By WhatsApp", "By eLitigation", "By hand to the judge", "By fax"], a: 1 },
    { q: "Before sending a without prejudice offer, what approval is needed?", o: ["The client's written approval of the terms", "Admin's approval", "The opposing counsel's agreement", "None"], a: 0 }
  ]
},

/* ─────────────────────────────── 4. SOP ─────────────────────────────── */
{
  id: "sop",
  num: "04",
  title: "Standard Operational Procedure",
  short: "SOP",
  blurb: "Consultations, fees, Warrants to Act, files and turnaround times.",
  minutes: 15,
  ack: "I have read and understood the A.W. Law LLC Standard Operational Procedure and agree to comply with it.",
  html: `
<p class="lead">The SOP is how a matter moves through the firm, from the first phone call to the closed file. PIC means the <b>Paralegal in Charge</b>; Recep means the <b>Receptionist</b>.</p>

<h3>A. Initial consultation</h3>
<ol>
  <li>PIC or Recep confirms receipt of the consult fee of <b>$218.00</b> ($200 + GST), unless AW has waived or changed it.</li>
  <li><b>Paid by PayNow / bank transfer:</b> WhatsApp the payment receipt and the client's NRIC (front and back), or the full Singpass digital NRIC, to the <b>Appointments</b> group. Then arrange for the client to see AW or another lawyer.</li>
  <li><b>Paid by cash:</b> Recep keeps the cash, records it in the Excel sheet (OneDrive &gt; AW Law LLC &gt; Files – A.W. Law LLC &gt; Admin) and issues a receipt from the receipt book. A copy of each receipt and the spreadsheet go to <b>Minah by 5pm every Friday</b>. Tell Minah to replenish the book when <b>10 pages</b> remain.</li>
  <li>Photocopy the client's NRIC / passport, write their email and mobile number on the copy, and pass it to the PIC and lawyer.</li>
  <li>Save the client in your phone as <code>NAME NAME AW Client</code> (e.g. "Eugene Tan Aw Client") and add the contact to the Appointments group.</li>
</ol>
<div class="callout"><b>A lawyer HAS to be present during every consultation.</b></div>

<h3>B. Criminal consultation</h3>
<ul>
  <li>The PIC and lawyer meet the client, take their name and review the charge sheet and bail bond. The lawyer can suggest possible outcomes but cannot advise at this stage.</li>
  <li><b>Pre-trial (up to plead guilty):</b> $8,000–$15,000+ excl. GST and disbursements, by monthly instalments. Deposit $1,000–$2,000 + GST.</li>
  <li><b>Criminal trial:</b> from $20,000 excl. GST and disbursements. Deposit $3,000–$10,000 + GST. Pre-trial work $5,000–$10,000 + GST. Trial days $2,500–$4,500 + GST per day. Trials are dynamic, so we explain why fees cannot be capped.</li>
  <li>Send the <b>Questionnaire Form</b>; the PIC makes sure it is returned within <b>14 days</b>.</li>
  <li>PIC files <b>Form 29</b> with the Crime Registry to record us as counsel, opens a physical file and calendars further meetings.</li>
</ul>

<h3>C. Civil and matrimonial consultation</h3>
<table class="fees">
  <tr><th>Matter</th><th>Legal fee (excl. GST &amp; disbursements)</th><th>Deposit (+ GST)</th></tr>
  <tr><td>Letter of demand / proposal / correspondence</td><td>$150 – $1,000</td><td>—</td></tr>
  <tr><td>Magistrate's Court (MC) suit</td><td>$8,000 – $15,000+</td><td>$1,000 – $2,000</td></tr>
  <tr><td>District Court (DC) suit</td><td>from $20,000</td><td>$3,000 – $5,000</td></tr>
  <tr><td>High Court (HC) suit</td><td>from $50,000</td><td>$10,000 – $20,000</td></tr>
  <tr><td>FJC applications</td><td>$6,000 – $15,000+</td><td>$1,000 – $2,000</td></tr>
  <tr><td>Syariah divorce</td><td>$6,000 – $15,000+</td><td>$1,000 – $2,000</td></tr>
  <tr><td>Syariah Court applications</td><td>$2,000 – $15,000+</td><td>$1,000 – $2,000</td></tr>
  <tr><td>Trial (civil or matrimonial)</td><td>Pre-trial $5,000 – $10,000; $2,500 – $4,500 per trial day</td><td>—</td></tr>
</table>
<p>For civil divorce, the client must be shown <b>Annex A</b>, the firm's schedule of fees for divorce and matrimonial proceedings. Clients reimburse us for registered post, FedEx / DHL and personal service. If there are voluminous documents, the lawyer tells the client a fee applies to review them.</p>

<h3>D. Warrant to Act (WTA)</h3>
<ul>
  <li>When the client engages us, the PIC prepares the WTA for the client to sign on the spot or e-sign through <b>SignNow</b> within <b>3 days</b>.</li>
  <li><b>Company client:</b> an authorised representative signs and provides a letter of authorisation before work starts.</li>
  <li><b>Minor (below 21):</b> both the client and their parent / guardian sign.</li>
  <li><b>Bankrupt:</b> payment comes from the client's representative, who also signs a letter of undertaking. The lawyer writes to the OA / PTIB for sanction, and work starts only after sanction is granted.</li>
</ul>

<h3>E. Opening the file</h3>
<ul>
  <li>Open the physical file and the OneDrive folder <b>on the same day</b> the deposit is paid.</li>
  <li>Folder name: client's first English name, further names and file number, e.g. <code>EUGENE TAN – 202504200</code>.</li>
  <li>Sub-folders: <b>Admin</b> (NRIC, WTA, proof of payment, invoices, tax receipts) · <b>Cause</b> (court papers) &gt; Draft · <b>Corres</b> &gt; Draft &gt; Pdf · <b>Documents</b> (attendance notes, minutes, instructions) · <b>Research</b> (case law, saved per OSCOLA).</li>
  <li>File names: <code>Document Name DD MM YYYY</code>. Email subjects start with the client's name.</li>
</ul>

<h3>F. Lawyers' responsibilities</h3>
<p>Lawyers evaluate the case and set strategy, research, draft and file pleadings, manage discovery, represent clients in court, negotiate settlements, prepare for trial, and follow court rules and ethics. The lawyer on the file:</p>
<ul>
  <li>Advises the client on deadlines and makes sure the dates are calendared.</li>
  <li>Checks any correspondence a PIC, staff member or trainee prepares, and <b>takes full responsibility</b> for it. Interns may not update clients.</li>
  <li>Sends updates the same day as a court attendance or by 12.00am the next day, and a holding reply within 2 days where more time is needed.</li>
  <li>Gets the client's approval of any work <b>in black and white</b> (email or WhatsApp). The PIC saves the WhatsApp screenshot to OneDrive.</li>
</ul>

<h3>G. General conduct for all staff</h3>
<ul>
  <li>Keep professional decorum with the court, judges, clients, other parties, opposing counsel and everyone external.</li>
  <li>Do not discuss your salary, grievances or workload with external parties, and never disparage the firm, its staff or its director.</li>
  <li>No boastful or self-promotional statements about expertise or cases won.</li>
  <li><b>Never accept a ride in a client's vehicle</b>, even if offered.</li>
  <li>Breaches can lead to reprimand, suspension, reduced bonuses, termination and a report to the appropriate legal authority.</li>
</ul>`,
  quiz: [
    { q: "Who must be present during every client consultation?", o: ["The PIC only", "A lawyer", "The receptionist", "Minah"], a: 1 },
    { q: "A client pays the consult fee in cash. When must the receipt copies and spreadsheet reach Minah?", o: ["Immediately", "By 5pm every Friday", "End of the month", "When the receipt book runs out"], a: 1 },
    { q: "When should Recep ask Minah to replenish the receipt book?", o: ["When it is empty", "When 10 pages remain", "Every Monday", "When 50 pages remain"], a: 1 },
    { q: "How should a client be saved in your phone?", o: ["By NRIC number", "NAME NAME AW Client, e.g. \"Eugene Tan Aw Client\"", "By case number", "First name only"], a: 1 },
    { q: "Within how many days must the criminal Questionnaire Form be returned?", o: ["3 days", "7 days", "14 days", "30 days"], a: 2 },
    { q: "What does the PIC file with the Crime Registry to record us as counsel?", o: ["Form 29", "The WTA", "Annex A", "A letter of demand"], a: 0 },
    { q: "Within how many days must a client e-sign the WTA via SignNow?", o: ["Same day", "3 days", "14 days", "1 month"], a: 1 },
    { q: "The client is 19 years old. Who signs the WTA?", o: ["The client only", "The parent only", "Both the client and their parent / guardian", "No WTA is needed"], a: 2 },
    { q: "How is the OneDrive folder for client Eugene Tan, file 202504200, named?", o: ["eugene tan", "202504200", "EUGENE TAN – 202504200", "Tan E (new client)"], a: 2 },
    { q: "Which sub-folder holds the client's NRIC, WTA and invoices?", o: ["Cause", "Corres", "Admin", "Research"], a: 2 },
    { q: "A client offers you a lift back to the office after court. What do you do?", o: ["Accept, it saves time", "Accept if the lawyer is with you", "Politely decline; staff must not accept transport in a client's vehicle", "Ask Admin"], a: 2 },
    { q: "What is the deposit range for a District Court suit?", o: ["$1,000 – $2,000 + GST", "$3,000 – $5,000 + GST", "$10,000 – $20,000 + GST", "No deposit"], a: 1 }
  ]
},

/* ─────────────────────────── 5. CODE OF CONDUCT ─────────────────────────── */
{
  id: "conduct",
  num: "05",
  title: "Employee Code of Conduct",
  short: "Code of conduct",
  blurb: "The ethical and professional standards everyone here is held to.",
  minutes: 7,
  ack: "I have read and understood the A.W. Law LLC Employee Code of Conduct and agree to comply with it.",
  html: `
<p class="lead">As a legal services provider, we are held to the highest standards of integrity, confidentiality and professionalism. This Code applies to <b>everyone</b>: lawyers, paralegals, legal assistants, administrative staff, interns and contractors working with or representing A.W. Law LLC.</p>

<div class="code-grid">
  <div class="code"><span>1</span><h4>Professional standards</h4><p>Comply with the rules of professional conduct set by the Law Society of Singapore. Act with ethical conduct, honesty and fair dealing.</p></div>
  <div class="code"><span>2</span><h4>Confidentiality &amp; privilege</h4><p>Treat all client information as strictly confidential and protect solicitor-client privilege. Don't discuss case details with unauthorised people, even inside the firm, unless necessary. Follow data privacy and document retention policies.</p></div>
  <div class="code"><span>3</span><h4>Conflict of interest</h4><p>Disclose any potential or actual conflict immediately. Avoid situations where personal interests could compromise your judgment or loyalty to the client or the firm.</p></div>
  <div class="code"><span>4</span><h4>Integrity in practice</h4><p>No deception or misrepresentation. Every filing, statement and representation must be accurate and truthful. Never destroy, alter or conceal evidence or legal documents.</p></div>
  <div class="code"><span>5</span><h4>Court &amp; client conduct</h4><p>Treat judges, opposing counsel, clients, witnesses and court staff with respect. Give competent, timely, diligent service. Communicate transparently, bill ethically, and protect the firm's name.</p></div>
  <div class="code"><span>6</span><h4>Firm resources</h4><p>Use firm documents, research tools and communication platforms for professional purposes only. Safeguard firm equipment, data and intellectual property.</p></div>
  <div class="code"><span>7</span><h4>Reporting</h4><p>Report unethical behaviour, misconduct or legal violations to your supervisor, HR or a designated ethics officer. Retaliation against anyone who reports in good faith is prohibited.</p></div>
  <div class="code"><span>8</span><h4>Discipline</h4><p>Breaches may result in reprimand, suspension or termination of employment, and may be reported to the appropriate legal authority.</p></div>
</div>

<h3>In practice</h3>
<ul>
  <li>A friend asks about a case they saw in the news that we're handling: you say nothing about it.</li>
  <li>You realise you know the opposing party personally: tell the lawyer on the file straight away.</li>
  <li>A document turns out to be unhelpful to our client: it is never altered, hidden or destroyed.</li>
  <li>You use the firm's laptop, OneDrive and research subscriptions for work only.</li>
</ul>

<p>You'll be asked to sign the Code's <b>Acknowledgment of Receipt and Understanding</b>. Tick the box below to confirm before taking the test.</p>`,
  quiz: [
    { q: "Who does the Employee Code of Conduct apply to?", o: ["Lawyers only", "Lawyers and paralegals only", "All lawyers, paralegals, legal assistants, admin staff, interns and contractors", "Only full-time staff"], a: 2 },
    { q: "Whose rules of professional conduct must we comply with?", o: ["The Law Society of Singapore", "The firm's clients", "Opposing counsel", "None"], a: 0 },
    { q: "Can you discuss case details with a colleague who is not working on the matter?", o: ["Yes, always", "Only if necessary", "Only at lunch", "Yes, if the client is famous"], a: 1 },
    { q: "You discover you are related to the opposing party. What do you do?", o: ["Keep quiet", "Disclose the conflict immediately", "Wait until the trial", "Tell the opposing party"], a: 1 },
    { q: "A document in the file hurts our client's case. What can you do with it?", o: ["Shred it", "Edit it", "Hide it in another folder", "Nothing improper: never destroy, alter or conceal it"], a: 3 },
    { q: "What can firm resources (research tools, platforms, equipment) be used for?", o: ["Anything", "Professional purposes only", "Personal projects after hours", "Side businesses"], a: 1 },
    { q: "You report misconduct in good faith. What protection does the Code give you?", o: ["None", "Retaliation against you is prohibited", "A bonus", "Anonymity in court"], a: 1 },
    { q: "Which of these is a possible consequence of breaching the Code?", o: ["A warning only, never more", "Reprimand, suspension or termination, and a possible report to the legal authority", "Nothing", "A fine paid to the client"], a: 1 },
    { q: "How must filings, statements and representations be?", o: ["Persuasive, even if slightly inaccurate", "Accurate and truthful", "As short as possible", "Approved by the client only"], a: 1 },
    { q: "How should judges, opposing counsel, witnesses and court staff be treated?", o: ["With respect and professionalism", "Depends on the case", "Formally only in court", "However they treat you"], a: 0 }
  ]
},

/* ─────────────────────────── 6. BILL COLLECTION ─────────────────────────── */
{
  id: "billing",
  num: "06",
  title: "Bill Collection Process",
  short: "Bill collection",
  blurb: "Deposits, instalments, billing contacts and following up enquiries.",
  minutes: 5,
  ack: "I have read and understood the A.W. Law LLC Bill Collection Process and agree to comply with it.",
  html: `
<p class="lead">Billing protects the firm and the client. Every bill must match what the client agreed to in the Warrant to Act, and the client is never surprised by a fee.</p>

<div class="flow">
  <div class="step"><b>New case</b><p>New client pays a <b>deposit</b>. The <b>PIC who opens the file collects the deposit</b>, and tells the <b>Billing Department</b> the instalment date(s) so they can calendar and track them.</p></div>
  <div class="arrow">→</div>
  <div class="step"><b>Ongoing case</b><p>Existing clients pay <b>instalments</b>. The PIC tells the <b>Billing Department</b> the amount to bill and the work done to date.</p></div>
  <div class="arrow">→</div>
  <div class="step"><b>WTA check</b><p>The <b>Billing Department checks the WTA</b> and makes sure the amount billed complies with it.</p></div>
  <div class="arrow">→</div>
  <div class="step"><b>Out of scope?</b><p>If the work is additional or beyond the WTA, the PIC puts the client <b>on notice by email at least one week</b> before billing. The Billing Department calendars the date a week after the notice to ask for the fee.</p></div>
</div>

<h3>Who bills what</h3>
<p>All billing, including conveyancing (Cvy), accident and injury matters, is handled by the <b>Billing Department</b>.</p>

<h3>Following up new enquiries</h3>
<ol>
  <li>The <b>day after</b> a lawyer sees a new client, check with that lawyer whether the client engaged us.</li>
  <li>If not, find out the status: were they quoted a fee? Will they engage us on a certain date?</li>
  <li>Follow up with the client the <b>next day, between 9am and 1pm</b>, to see whether they will engage us.</li>
</ol>

<div class="callout">Use precedent <b>F, Notice to Client of Additional Fees</b> (Lesson 03) when work goes beyond the WTA.</div>`,
  quiz: [
    { q: "For a new case, who collects the client's deposit?", o: ["The Billing Department", "The receptionist", "The PIC who opens the file", "The lawyer"], a: 2 },
    { q: "Who must the PIC tell about the client's instalment dates?", o: ["The client's family", "The Billing Department", "The opposing party", "Nobody"], a: 1 },
    { q: "For ongoing cases, what does the PIC tell the Billing Department?", o: ["Only the client's phone number", "The amount to bill and the work done to date", "The court's decision", "Nothing; they work it out"], a: 1 },
    { q: "What does the Billing Department check every bill against?", o: ["The Warrant to Act (WTA)", "The receipt book", "The court calendar", "Last year's bills"], a: 0 },
    { q: "Work goes beyond the WTA. How much notice must the client get before billing?", o: ["None", "At least one week, by email", "One day, by phone", "One month, by letter"], a: 1 },
    { q: "Who handles billing for conveyancing matters?", o: ["The receptionist", "The Billing Department", "The client", "The opposing party"], a: 1 },
    { q: "Who handles billing for accident and injury matters?", o: ["The PIC alone", "The receptionist", "The Billing Department", "The court"], a: 2 },
    { q: "A lawyer saw a new client on Monday. When do you check whether they engaged us, and when do you follow up with the client?", o: ["Check Tuesday; follow up the next day between 9am and 1pm", "Check next month; no follow-up", "Follow up Monday night", "Wait for the client to call"], a: 0 }
  ]
}
];
