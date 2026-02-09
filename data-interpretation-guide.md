# MKT907 Web Analytics Assignment - Data Interpretation Guide

## How to Generate Your Traffic Acquisition Report

### Step 1: Access GA4
1. Go to [analytics.google.com](https://analytics.google.com)
2. Select your **Digital Marketing Hub** property

### Step 2: Generate Traffic Acquisition Report
1. Navigate to: **Reports** → **Acquisition** → **Traffic Acquisition**
2. Set date range: Last 7 days (or since deployment)
3. Click **Export** (top right) → Download as PDF or CSV

---

## Sample Data Interpretation Paragraph

Use this as a template. **Replace the [brackets] with your actual data:**

> "Analysis of the Digital Marketing Hub website over the [7-day] observation period reveals [X] total users with [Y] sessions. The primary traffic source is **[Direct/Organic Search/Social/Referral]**, accounting for [Z%] of total sessions, indicating [strong brand awareness / effective SEO / successful social promotion]. 
>
> User engagement metrics show an average session duration of [X:XX], with users viewing approximately [X.X] pages per session. The **scroll_depth** custom events indicate that [X%] of users scroll past 50% of page content, demonstrating strong content engagement. 
>
> The **newsletter_signup** conversion event recorded [X] submissions, yielding a conversion rate of [X%]. This exceeds/falls short of our target of 5%, suggesting [the CTA placement is effective / we need to optimize the form visibility].
>
> Mobile vs Desktop segmentation shows [X%] mobile traffic, with [higher/lower] engagement rates on mobile devices. This insight informs the need for [continued mobile optimization / desktop-focused improvements]."

---

## Custom Events You Can Demonstrate

Your website now tracks these events (visible in GA4 → Reports → Engagement → Events):

| Event Name | What It Tracks | KPI Alignment |
|------------|----------------|---------------|
| `cta_click` | "Start Learning" & other button clicks | Engagement Rate |
| `theme_toggle` | Light/Dark mode preference | User Preference |
| `mobile_menu_open` | Hamburger menu interactions | Mobile Engagement |
| `scroll_depth` | 25%, 50%, 75%, 100% scroll | Content Engagement |
| `newsletter_signup` | Form submissions | Lead Conversion Rate |
| `navigation_click` | Menu link clicks | Site Navigation |
| `card_interaction` | Card element clicks | Content Interest |
| `external_link_click` | Outbound link clicks | Referral Interest |

---

## How to View Events in GA4

1. **Realtime:** Reports → Realtime → See events firing live
2. **Historical:** Reports → Engagement → Events
3. **Debug:** Open browser console (F12) → Look for `[GA4] Event sent:` messages

---

## Tips for Your Viva

1. **Open GA4 Realtime** before the presentation
2. **Perform actions** on your site (click buttons, scroll, submit form) 
3. **Show events appearing** in realtime to prove tracking works
4. **Explain WHY** you chose these specific events and how they align with KPIs
