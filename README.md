# Fridson — Property Monitoring AI 🏢

> A predictive-maintenance dashboard for apartments and offices. Digital twins of the building on one side, AI-guided action plans for real-world emergencies on the other.

Built by a team of four in **36 hours** at **[Zero to Demo](https://z2d.io) — Summer Cohort #3** (Copenhagen, 4–5 July 2026).

🎨 [Live prototype (Lovable)](https://lovable.dev/projects/030ed0f9-b913-4032-a447-3eb315452b81) &nbsp;·&nbsp; 📄 [Z2D kick-off deck](./docs/Z2D_Summer_Cohort3_PPT.pdf)

> The Lovable link may require authentication to open.

---

## What it does

Fridson turns every apartment or office into a live digital twin. The dashboard shows the building's state — occupancy, sensor telemetry, maintenance status — and continuously watches for anomalies. When something goes wrong, the app doesn't just raise an alert: it produces a step-by-step AI action plan tailored to whoever is affected.

Two scenarios drove the demo:

### 🚪 Scenario 1 — Locked out

The action plan surfaced on the resident's phone:

1. **Take a breath. You're safe.** The building knows you're at Door A1.
2. **Stay near the QR plate** so the lobby camera keeps you in view.
3. **We're dialling your landlord now** — answer the incoming call.
4. **Your digital key is being auto-renewed online.** No locksmith needed.

### 💧 Scenario 2 — Rooftop leak

A leak on the roof is detected and localised on the digital twin. The system triages the affected units, notifies residents in the impact zone, and produces a maintenance action plan (contractor dispatch, temporary shut-off, damage estimate) before water reaches the ceiling below.

## Feature highlights (as of demo day)

- **Digital twin dashboard** — floor-by-floor visualisation of the building, with clickable units and live status.
- **Anomaly detection → AI action plan** — the system converts a sensor event into a plain-language sequence of steps for the resident and the property manager.
- **Scenario-based demos** — end-to-end walkthroughs of the two scenarios above, integrated into the live dashboard.
- **Property-manager view** — priority queue of incidents across the building.

## Tech stack

- **Frontend:** built on [Lovable](https://lovable.dev) (React + Vite + Tailwind).
- **Prototype scope:** front-end and scenario logic wired for a live demo; backend and sensor integration are stubbed for the sprint.

*(Fill in additional stack details — Supabase, APIs, auth — as the project grows past hackathon scope.)*

## About the hackathon

**Zero to Demo (Z2D) — Summer Cohort #3** — a 36-hour AI venture sprint held in Copenhagen, June–August 2026. The sprint is positioned as a "controlled pressure test": teams start at zero on Saturday morning and ship a deployed MVP with real user conversations by Sunday evening. The top 3 teams enter Z2D's 6-week fellowship.

**Sponsors & partners:** byFounders, Lovable, Cursor, Microsoft, Heartcore, Kring, Entrepreneurs First, Opally, Google for Startups, Antler.

**Jury:** Lærke (Heartcore), Corey (Kring), Anastasia (Entrepreneurs First), Paula (Interhuman).

**Prizes:** $150K+ across the cohort; per-team credits from Lovable, Cursor, Microsoft, and Google for Startups.

See [`docs/Z2D_Summer_Cohort3_PPT.pdf`](./docs/Z2D_Summer_Cohort3_PPT.pdf) for the organiser's kick-off deck.

## Outcome

- Delivered a **functional dashboard with the two scenarios wired end-to-end** for the live demo.
- **Advanced to the top 8 teams out of 20** in the final assessment round.
- Did not progress to the top 3 fellowship, but the project remains open for continued exploration.

## Team

Team of four at Z2D Summer Cohort #3:

- **[Christopher Wang](https://github.com/christopherwang0129SE)** — Product & pitch, UX / front-end
- *…add the other three teammates here*

## Repository structure

```
.
├── docs/
│   └── Z2D_Summer_Cohort3_PPT.pdf     Z2D organiser kick-off deck (see note below)
├── README.md
└── LICENSE                            (to add)
```

> **Note on the Z2D deck:** the file was authored by Z2D and shared with participants at kick-off. Before publishing it in a public repository, confirm with Z2D that redistribution is OK. If not, replace the local copy with a link to Z2D's own hosted version or remove it. The PDF is also ~108 MB — if you keep it in the repo, use [Git LFS](https://git-lfs.com) or link out to an external host (Google Drive, Dropbox) instead of committing directly.

## License

TBD — recommend **MIT** for the code. Open an issue if you disagree before committing to it.

## Links

| | |
| --- | --- |
| 🎨 Lovable prototype | [Open in Lovable](https://lovable.dev/projects/030ed0f9-b913-4032-a447-3eb315452b81) |
| 🏆 Hackathon | [Zero to Demo](https://z2d.io) |
| 📄 Kick-off deck | [Z2D_Summer_Cohort3_PPT.pdf](./docs/Z2D_Summer_Cohort3_PPT.pdf) |
