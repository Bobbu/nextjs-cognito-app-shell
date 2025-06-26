# Email Deliverability Checklist for `<VerifiedEmail Recipient>`

Use this checklist to help ensure that emails sent via AWS SES land in your recipients' inboxes (and not in spam/junk folders).

---

## 1. Set Up Email Authentication Records (DNS)

### SPF (Sender Policy Framework)

Add the following TXT record to your domain's DNS:

```
Name: @
Type: TXT
Value: v=spf1 include:amazonses.com -all
```

### DKIM (DomainKeys Identified Mail)

1. In the AWS Console, go to **SES > Domains > catalyst.technology**
2. Enable DKIM.
3. Add the 3 provided CNAME records to your DNS. (If using Route 53, just agree to have your DNS updated.)

### DMARC (Domain-based Message Authentication, Reporting, and Conformance)

Recommended, especially when using SPF/DKIM.

```
Name: _dmarc
Type: TXT
Value: v=DMARC1; p=none; rua=mailto:your-email@yourdomain.com
```

---

## 2. Improve the Sender Name Format

Use a friendly `From` value to avoid looking like auto-generated spam. Note, If you want to change it form a boring sounding "Contact Us Notifier" you will need edit the contact_us_handler.py in the aws-infrasctructure-as-code/lambda folder.

```python
Source = '"Contact Us Notifier" <VerifiedEmail Recipient>'
```

---

## 3. Monitor Deliverability

### Create a Configuration Set in SES

- Go to **SES > Configuration Sets**
- Create a new set to track `Deliveries`, `Bounces`, `Complaints`
- Hook it up to **CloudWatch Logs** or **SNS topic**

---

## 4. Avoid Spam Triggers in Your Email Content

- Don’t use ALL CAPS
- Don’t use phrases like “This isn’t spam” or “Click here!”
- Limit the number of links
- Include plain-text and/or well-structured HTML content
- Add a physical address in real campaigns (for CAN-SPAM compliance)

---

## 5. Make Sure Domain Looks Legit

- Ensure your domain (`mydomain.com`) has:
  - A working homepage
  - Valid MX records
  - No domain blacklists (check on mxtoolbox.com or similar)

---

## 6. Final Tips

- Ask users to mark your email as "Not Junk" or add to address book
- Use a real reply-to address (avoid `noreply@`)
- Send test emails to Gmail, Yahoo, Outlook and see how they land

---

## Sample DNS Summary (for `catalyst.technology`)

| Type  | Name             | Value                                          |
| ----- | ---------------- | ---------------------------------------------- |
| TXT   | @                | v=spf1 include\:amazonses.com -all             |
| TXT   | \_dmarc          | v=DMARC1; p=none; rua=mailto\:you\@example.com |
| CNAME | (3 DKIM entries) | Provided by SES after enabling DKIM            |

---

> Keep this file with your infrastructure repo to help onboard new team members or debug future deliverability issues.

