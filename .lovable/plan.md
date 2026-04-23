
# Smart Resource Allocation System for NGOs

A clean, trust-driven platform that turns community needs into coordinated action by matching volunteers and resources to the most urgent cases.

## Design direction
- **Style**: Modern SaaS dashboard, minimal, generous whitespace, soft shadows, rounded corners
- **Palette**: Soft blue/green trust tones — primary deep blue `#1E40AF`, accent emerald `#10B981`, neutral slate backgrounds, white cards
- **Urgency badges**: High = red, Medium = amber, Low = green
- **Typography**: Inter — clean, professional
- **Icons**: Lucide icons throughout (categories, stats, navigation)
- **Feel**: Real product, not a demo — confident, calm, data-forward

## Screens & navigation

Top nav bar (logo + links) + footer, persistent across pages.

### 1. Landing page (`/`)
- **Hero**: Bold headline "Turn community needs into action" + subtext on how data becomes coordinated impact
- **Three CTAs**: Report a Need, Join as Volunteer, View Dashboard
- **Impact stats strip**: People Helped · Active Cases · Volunteers · NGOs onboarded (animated counters)
- **How it works**: 3-step visual (Report → Prioritize → Match)
- **Category showcase** with icons (Food, Medical, Education, Shelter, Rescue)
- **Closing CTA band**

### 2. Report a Need (`/report`)
- Centered form card with sectioned fields:
  - Issue title, category (icon select), description (textarea)
  - Location (with pin icon), urgency (segmented control with colored badges)
  - People affected (number), required skills/resources (tag input)
- Sticky submit button, success toast on submit
- Side helper panel: "What happens next?" explainer

### 3. Volunteer Registration (`/volunteer`)
- Two-column layout: form left, motivational visual + benefits right
- Fields: name, email, phone, location, skills (multi-select chips), availability (weekday/weekend/evenings checkboxes), preferred cause (category select)
- Toast confirmation on register

### 4. NGO Dashboard (`/dashboard`)
- **Summary cards (4)**: Active Cases, High Priority, Volunteers Available, Resources Assigned — each with icon, number, trend
- **Filters bar**: urgency, category, location, search
- **Cases view**: card grid (default) with toggle to table view
  - Each card: title, urgency badge, category icon, location, people affected, "Find Matches" button
- **Mini chart**: Cases by category (simple bar) for visual impact

### 5. Matching page (`/match/:id`)
- **Top section**: Selected issue summary card (title, urgency, location, people affected, required skills)
- **Recommended volunteers**: card list sorted by match score
  - Each card: avatar, name, skills, location, availability, **match score ring (e.g., 85%)**, match reasons as small badges (📍 Nearby · 🎯 Skill match · ⏰ Available)
  - **Top 3** highlighted with subtle gradient border + "Top Match" ribbon
- "Assign Volunteer" action per card

## Data approach
- Frontend-only with realistic mock data (cases, volunteers, stats) so all screens feel populated and functional
- Forms work locally with toast feedback (no backend needed for demo)
- All filtering, sorting, and matching logic runs client-side for instant interactivity

## Deliverable
A polished, demo-ready, hackathon-winning UI that looks like a real scalable product — clean, professional, and impact-focused.
