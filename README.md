# SurakshaSetu AI (सुरक्षा सेतु) - AI Road Safety, Crash Physics & Family Life-Saver Platform

> **"Ghar par koi intezaar kar raha hai. Traffic rules police se bachne ke liye nahi, apne parivaar ke liye maano."**  
> *"When a breadwinner dies in a reckless road crash, it's not just one life lost — an entire family is orphaned, plunged into debt, and children drop out of school unable to afford food."*

---

## 🌟 Overview & Core Mission

**SurakshaSetu AI** is a socially active AI platform created to tackle one of the world's most devastating crises: **road traffic crashes caused by non-compliance with traffic rules**, and the catastrophic destitution it brings upon innocent families.

Every year across the globe:
- **~1.19 Million lives** are lost (**1 death every 24 seconds**).
- **Over 71.2% of victims are young sole breadwinners aged 18–45**.
- In India alone, over **168,000+ people die annually (~462 deaths every day, 19 deaths every hour)**.
- **32.7% of victim families plunge directly below the poverty line**, unable to afford daily meals, rent, or school fees.

This platform bridges cutting-edge **AI Traffic Violation Analysis**, **Biomechanical Crash Physics**, **Global & National Mortality Ratios**, and an emotional **Family Destitution Calculator** with a **Citizen Action & Tribute Memorial Wall**.

---

## 🚀 Key Features

### 0. 🔊 Proactive Pre-Violation Voice Alarm & Smartwatch Guardian (पूर्वानुमान वॉइस अलार्म)
- **Plays Alarm Before You Break The Law:** If a commuter is about to overspeed (>60 km/h in city), approaching a red light intersection within 50m, or picking up their phone while moving, this system immediately sounds a **loud dual-tone emergency police siren** followed by an urgent emotional voice message!
- **3 Emotional Voice Personas:**
  1. 👶 **Child's Voice (मासूम बच्चे की पुकार):** *"Papa, gadi dheemi chalao, mujhe aapke sath khelna hai!"*
  2. 👵 **Mother's Voice (मां का लाड़ व चिंता):** *"Beta aaram se chala, ghar par tera intezaar ho raha hai!"*
  3. 🚨 **Traffic Police & Siren (कड़क पुलिस व सायरन):** Loud dual-tone frequency oscillator siren + legal deceleration commands.
- **Smartwatch Wrist Haptics & Low-Battery Handover (फोन डिस्चार्ज बैकअप):**
  - **What if the driver's phone discharges on the road?** The platform features a **Smartwatch Companion System** (Apple Watch / Wear OS / Fire-Boltt / Galaxy Watch).
  - Web Battery API & simulated battery detector monitors battery level. If battery drops below 15%, the system warns via speech and automatically routes emergency alarms to the commuter's smartwatch.
  - The smartwatch screen flashes in red, spikes the simulated heart rate, and triggers intense wrist vibration pulses using the **Device Vibration API (`navigator.vibrate`)** and CSS tactile ripples!
- **Real GPS Speedometer & Simulator:** Live GPS tracking via `navigator.geolocation.watchPosition` to measure true driving speed, plus an interactive test slider to experience alarms at various speeds.

### 1. 🤖 Rakshak AI (Traffic Rule, Law & Crash Biomechanics Agent)
- **Natural Language & Scenario Analyzer:** Users can type in everyday habits or choose one-click presets (e.g., *No helmet at 60 km/h, Late-night DUI, Checking Instagram Reels/WhatsApp while driving, Jumping red lights, Wrong-side highway driving, Triple riding*).
- **Comprehensive 4-Dimensional Diagnosis:**
  1. **Legal Penalties & Motor Vehicles Act Sections:** Exact fines, vehicle seizure rules, and jail terms.
  2. **Biomechanical Crash Physics:** Precise kinetic energy calculations (e.g. at 50 km/h, hitting asphalt without a helmet delivers 4,200 Newtons of force — equivalent to falling from a 4-story building).
  3. **Family Destitution Shockwave:** How the victim's sudden death strips children of school fees, leaves aging parents without medicine, and saddles the family with predatory medical debt.
  4. **Life-Saving Commuter Protocols:** Clear safety rules to follow.
- **Text-to-Speech (Voice Readout):** One-click voice playback in Hindi/English using Web Speech Synthesis API.

### 2. 👁️ AI Computer Vision Violation Scanner (Optical Simulation)
- Simulates advanced road safety computer vision cameras (ANPR / Object Detection).
- Users can test presets or upload their own road traffic photos.
- Renders dynamic bounding boxes with violation severity scores (e.g., *94% Fatality Risk for Helmet Non-Compliance*, *Mobile Distraction in Motion*, *Unbuckled Passenger*).

### 3. 📊 World & India Mortality Ratio Dashboard (Data & Visualizations)
- **Live Ticking Global & National Clocks:**
  - Dynamic year-to-date pace ticker (~1.19M pace).
  - India daily death count (462/day, 1 every 3 minutes).
  - Real-time ticker counting lives lost worldwide since the visitor opened the web page.
- **Interactive Chart.js Visualizations:**
  - *Top Rule Violations Leading to Death:* Over-speeding (71.8%), Helmet Non-Use (29.7%), Wrong-Side Driving (5.6%), Distracted Driving (3.9%), DUI (2.5%).
  - *Vulnerable Road Users Breakdown:* Two-wheelers (44.5%), Pedestrians (18.2%), Cars (15.3%), Cyclists (9.9%).

### 4. 🧮 Family Destitution Risk Calculator (परिवार सुरक्षा कैलकुलेटर)
- Allows citizens to assess what happens to their loved ones if an accident happens:
  - Are they the sole breadwinner?
  - Number of dependent children and elderly parents.
  - Monthly household expenditure.
  - Emergency savings / Term insurance buffer.
  - Daily risky driving habits.
- **Real-time Output:**
  - **Catastrophe Vulnerability Meter** (e.g. *91% Critical Catastrophe*).
  - **Financial Runway:** Exact number of months until family runs out of food and rent money.
  - **Education & Debt Impact:** Child labor risk, school dropout risk, and predatory ICU debt burden.
  - **Emotional Reality Check:** *"Is saving 2 minutes worth turning your children into beggars?"*

### 5. 💔 "Suno Unki Awaaz" (Heartbreaking Real Stories & Memorial Wall)
- Documented real-world accounts of breadwinners lost to avoidable carelessness (delivery riders, newly married engineers, college students).
- Audio narration button for each story.
- **Community Memorial Board:** Citizens can post tributes for loved ones lost in accidents or share life-saving warnings. Stored with local persistence (`localStorage`).

### 6. 📜 "Humara Sankalp" (Family Safety Pledge & Digital Certificate)
- Users take a sacred oath dedicated to their specific family members (e.g. *"For my daughter Ananya & my Mother"*).
- Generates an official, high-definition **Digital Certificate of Sankalp** with:
  - Official Road Safety Seal, Name, Dedication, Date, and Unique Verification ID.
  - **Download as PNG** (via `html2canvas`).
  - **One-tap WhatsApp & Social Share** with pre-filled emotional safety copy.
  - Confetti celebration and live counter of pledged citizens.

### 7. 🏛️ Government Accountability & Citizen Grievance Portal
- **4 Key Policy Demands:**
  1. Universal 100% Cashless Golden-Hour Trauma Care (Section 162 MV Act).
  2. 24x7 AI Enforcement & Automated Challan Cameras.
  3. Immediate Solatium Fund & Emergency Breadwinner Support.
  4. Total Ban on Substandard Non-ISI Plastic Helmets.
- **Citizen Blackspot / Hazard Reporting Tool:**
  - Report broken signals, fatal potholes, or dangerous wrong-side spots.
  - Auto-generates formal grievance notice invoking Section 198A of the Motor Vehicles Act ready for tweet tagging to `@MORTHIndia`, `@nitin_gadkari`, and local traffic police.
- **SOS Helplines:** Instant dial directory for 112, 108 Ambulance, 1073 Highway Helpline, 1033 NHAI.

### 8. 🌐 Full Bilingual Support
- Seamless toggle between **हिन्दी (Hindi)** and **English**.

---

## 🛠️ Technology Stack
- **Frontend:** HTML5, CSS3, Modern Tailwind CSS (CDN), Custom Road Safety Theme & Animations.
- **Iconography:** Lucide Icons.
- **Data Visualization:** Chart.js.
- **Certificate Capture:** HTML2Canvas.
- **Celebration Effects:** Canvas Confetti.
- **Voice Synthesis:** Web Speech API (`SpeechSynthesisUtterance`).
- **Data Storage:** Client-side persistence via `localStorage`.

---

## 💻 How to Run Locally

1. Open a terminal / PowerShell in this directory:
   ```bash
   cd c:\Users\saksh\Desktop\portfolio\SurakshaAI-RoadSafety
   ```

2. Start a simple HTTP server using Python:
   ```bash
   python -m http.server 8080
   ```
   *or using Node:*
   ```bash
   npx serve .
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:8080
   ```
   *(Or simply double-click `index.html` to open directly in any browser!)*

---

## 🤝 Social Responsibility
Every element of this platform is engineered with one single intention: to make commuters realize that road rules are not mere government regulations — they are the thin barrier protecting their children and parents from utter ruin.

**Wear your helmet. Buckle your seatbelt. Return home safe.**
