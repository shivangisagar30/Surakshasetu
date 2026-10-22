// SurakshaSetu AI (सुरक्षा सेतु) - Core Application Logic

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (window.lucide) {
        lucide.createIcons();
    }

    // STATE
    let currentLang = 'hi'; // Default Hindi as per user request, toggleable to 'en'
    let pageStartTime = Date.now();
    let speechSynth = window.speechSynthesis;
    let currentUtterance = null;
    let isSpeaking = false;

    // Translation Dictionary
    const I18N = {
        hi: {
            topBarText: "हर 24 सेकंड में दुनिया में 1 इंसान सड़क पर जान गंवा रहा है। 71% लोग परिवार के अकेले कमाने वाले होते हैं।",
            langBtnText: "Switch to English",
            nav_ai: "रक्षक AI",
            nav_scanner: "AI विज़न स्कैनर",
            nav_stats: "मौत के आंकड़े",
            nav_calc: "परिवार कैलकुलेटर",
            nav_stories: "सच्ची कहानियां",
            nav_pledge: "सुरक्षा संकल्प",
            nav_action: "सरकार व जनता",
            nav_alarm: "वॉइस अलार्म व वॉच",
            hero_badge: "सड़क सुरक्षा = परिवार की ज़िन्दगी • कोई मज़ाक नहीं",
            hero_title_1: "घर पर कोई इंतज़ार कर रहा है।",
            hero_title_2: "रूल्स फॉलो करो अपने परिवार के लिए।",
            hero_subtitle: "जब कोई इंसान बिना हेलमेट, तेज़ रफ़्तार या रेड लाइट तोड़कर जान गंवाता है, तो सिर्फ एक शख्स नहीं मरता — उसका पूरा परिवार अनाथ हो जाता है, बच्चे स्कूल छोड़कर दो वक्त की रोटी के मोहताज हो जाते हैं।",
            voiceNarrateBtn: "सुनिए ये सन्देश (Audio)",
            cta_ai_agent: "रक्षक AI में गलतियां टेस्ट करें",
            cta_calc: "परिवार का रिस्क नापें",
            alarm_sec_title: "नियम तोड़ने से पहले ही बजेगा मोबाइल और स्मार्टवॉच अलार्म",
            alarm_sec_desc: "जैसे ही आप रेड लाइट के पास पहुंचेंगे, या स्पीड 60 से ऊपर जाएगी, या फोन उठाएंगे — यह AI सायरन और मां/बच्चे की आवाज़ में चिल्लाकर आपको रोकेगा। अगर फोन डिस्चार्ज हो जाए, तो स्मार्टवॉच पर तेज़ वाइब्रेशन और अलार्म तुरंत चालू हो जाएगा।",
            stat_card_1_title: "विश्व में सड़क मौतें (2026 गति)",
            stat_card_1_desc: "प्रतिदिन ~3,260 लोग मारे जाते हैं (हर 24 सेकंड में 1 मौत)",
            stat_card_2_title: "भारत में रोज़ाना मौतें",
            stat_card_2_desc: "हर 1 घंटे में 19 मौतें (हर 3 मिनट में 1 परिवार तबाह)",
            stat_card_3_title: "घर के अकेले कमाने वाले",
            stat_card_3_desc: "18-45 वर्ष के युवा माता, पिता, बेटे और बेटियां",
            stat_card_4_title: "पेज खोलने के बाद हुई मौतें",
            stat_card_4_desc: "हर 24 सेकंड में दुनिया का एक परिवार बिखर रहा है",
            ai_sec_title: "रक्षक AI: ट्रैफिक रूल्स, दुर्घटना और परिवार बर्बादी विश्लेषक",
            ai_sec_desc: "अपनी कोई भी आदत चुनें या लिखें। AI बताएगा कि कानून क्या कहता है, शरीर पर कितना घातक झटका लगेगा और आपके जाने के बाद परिवार कैसे दाने-दाने को तरसेगा।",
            quick_scenarios_label: "क्लिक करके तुरंत टेस्ट करें:",
            input_label: "अपनी ट्रैफिक आदत या स्थिति लिखें",
            btn_analyze: "AI से परिणाम का विश्लेषण करें",
            ai_report_heading: "रक्षक AI - दुर्घटना व परिवार बर्बादी डायग्नोसिस",
            placeholder_msg: "ऊपर दिए गए उदाहरण पर क्लिक करें या अपनी आदत लिखकर AI विश्लेषण शुरू करें।",
            vision_title: "AI विज़न वॉयलेशन स्कैनर (कैमरा इंटेलिजेंस)",
            vision_desc: "हाइवे और चौराहों पर लगे AI कैमरे मिलीसेकंड में घातक गलतियां पकड़ लेते हैं। अपनी फोटो अपलोड करें या नीचे दिए सैंपल टेस्ट करें।",
            vision_report_title: "AI ऑप्टिकल डायग्नोसिस",
            stats_title: "आंकड़े जो दिल दहला दें: विश्व और भारत का सच",
            stats_desc: "यह सिर्फ संख्याएं नहीं हैं — हर एक अंक का मतलब है एक भूखी बिलखती मां, छूटी हुई बच्चों की पढ़ाई और बुढ़ापे में लाचार माता-पिता।",
            chart_1_title: "किन ट्रैफिक गलतियों से सबसे ज़्यादा जानें जाती हैं?",
            chart_2_title: "सड़क पर कौन मरता है? (वल्नरेबल रोड यूज़र्स)",
            calc_title: "परिवार बर्बादी रिस्क कैलकुलेटर (Destitution Calculator)",
            calc_desc: "अगर आज लापरवाही या ट्रैफिक नियम तोड़ने से आपको कुछ हो जाए, तो आपका परिवार कितने दिन भूखा मरे बिना survive कर पाएगा? सच-सच भरें।",
            stories_title: "सुनो उनकी आवाज़: एक छोटी सी भूल, एक पूरा परिवार बर्बाद",
            stories_desc: "ये कोई काल्पनिक कहानियां नहीं हैं। ये उन कमाने वालों के सच हैं जिन्होंने सोचा 'मेरे साथ कुछ नहीं होगा'। आज उनके बच्चे और बूढ़े मां-बाप भीख मांगने और बर्तन मांजने पर मजबूर हैं।",
            memorial_title: "सामुदायिक श्रद्धांजलि व सड़क सुरक्षा दीवार",
            memorial_desc: "क्या आपने किसी अपने को सड़क हादसे में खोया है? या दूसरों को आगाह करने के लिए कोई सन्देश देना चाहते हैं?",
            pledge_title: "हमारा संकल्प: परिवार सुरक्षा शपथ व डिजिटल प्रमाणपत्र",
            pledge_desc: "ट्रैफिक रूल्स पुलिस के डर से नहीं, बल्कि शाम को दरवाज़े पर राह देख रहे अपने बच्चों और मां के लिए मानिए। शपथ लें और अपना HD सर्टिफिकेट डाउनलोड करें।",
            gov_title: "सरकार की ज़िम्मेदारी और जनता का अधिकार",
            gov_desc: "सिटिजन्स को नियम मानने होंगे, पर सरकार को भी ख़राब सड़कों, अस्पतालों की लापरवाही और अनाथ परिवारों की मदद के लिए कड़े कदम उठाने होंगे।"
        },
        en: {
            topBarText: "Every 24 seconds, someone dies in a road crash worldwide. 71% are the sole breadwinners of their families.",
            langBtnText: "हिन्दी में बदलें",
            nav_ai: "Rakshak AI",
            nav_scanner: "Vision Scanner",
            nav_stats: "Mortality Data",
            nav_calc: "Family Calculator",
            nav_stories: "Real Stories",
            nav_pledge: "Pledge Certificate",
            nav_action: "Policy & Action",
            nav_alarm: "Voice Alarm & Watch",
            hero_badge: "Road Safety Is Family Survival • Not a Joke",
            hero_title_1: "Someone Is Waiting For You At Home.",
            hero_title_2: "Follow Traffic Rules For Your Family.",
            hero_subtitle: "When someone loses their life by skipping a helmet, overspeeding, or jumping a red light, it's not just one person dying — an entire family is orphaned, and children drop out of school unable to afford food.",
            voiceNarrateBtn: "Listen to Message (Audio)",
            cta_ai_agent: "Test Violations in Rakshak AI",
            cta_calc: "Calculate Family Risk",
            alarm_sec_title: "Pre-Violation Voice Alarm & Smartwatch Guardian",
            alarm_sec_desc: "Before you break a rule — overspeeding, approaching a red light, or looking at your phone — this AI alarm blasts a siren and emotional voice warnings. If your phone discharges, emergency alerts instantly sync to your smartwatch wrist haptics.",
            stat_card_1_title: "Global Road Deaths (2026 Pace)",
            stat_card_1_desc: "~3,260 lives lost every single day (~1 death every 24s)",
            stat_card_2_title: "India Lives Lost Daily",
            stat_card_2_desc: "19 deaths every hour (1 family destroyed every 3 mins)",
            stat_card_3_title: "Sole Breadwinners Lost",
            stat_card_3_desc: "Young working breadwinners aged 18-45 years",
            stat_card_4_title: "Lives Lost Since You Arrived",
            stat_card_4_desc: "World loses 1 life every 24 seconds to traffic crashes",
            ai_sec_title: "Rakshak AI: Violation, Crash Physics & Family Destitution Analyzer",
            ai_sec_desc: "Select a common mistake or type your habit. AI diagnoses legal consequences, kinetic crash impact, and how your family will struggle for daily food.",
            quick_scenarios_label: "Click to Test Common Scenarios:",
            input_label: "Describe Your Traffic Habit or Situation",
            btn_analyze: "Analyze Consequences with AI",
            ai_report_heading: "Rakshak AI - Crash Trauma & Family Destitution Diagnosis",
            placeholder_msg: "Click any preset above or enter your driving habit to start AI diagnosis.",
            vision_title: "AI Computer Vision Scanner Simulation",
            vision_desc: "Highway AI cameras detect fatal violations in milliseconds. Upload a photo or select sample presets to see how optical AI measures danger.",
            vision_report_title: "AI Optical Diagnosis",
            stats_title: "The Road Carnage: Numbers That Break Families",
            stats_desc: "These are not just statistics — every digit represents a crying mother, an orphaned child, and elderly parents left to starve.",
            chart_1_title: "Top Rule Violations Leading to Fatal Crashes",
            chart_2_title: "Fatalities by Road User Category",
            calc_title: "Family Destitution Risk Calculator",
            calc_desc: "If reckless driving takes your life today, how long can your family survive before hunger and debt crush them? Calculate honestly.",
            stories_title: "Hear Their Voices: One Moment of Rush, A Lifetime of Tears",
            stories_desc: "Real accounts of breadwinners who thought 'Nothing will happen to me'. Today, their orphaned kids and elderly parents struggle for survival.",
            memorial_title: "Community Remembrance & Safety Memorial Wall",
            memorial_desc: "Did you lose someone to a road accident? Or want to leave a heartfelt safety advice for others?",
            pledge_title: "Humara Sankalp: Family Protection Pledge",
            pledge_desc: "Follow rules not for the traffic policeman, but for your children and parents waiting at dinner. Take the oath and download your certificate.",
            gov_title: "Government Accountability & Citizen Action",
            gov_desc: "Citizens must follow rules, but governments must also ensure safe roads, cashless emergency trauma care, and fast relief for orphaned families."
        }
    };

    // ==========================================
    // 1. LANGUAGE SWITCHER LOGIC
    // ==========================================
    const langToggleBtn = document.getElementById('langToggleBtn');
    function applyLanguage(lang) {
        currentLang = lang;
        const dict = I18N[lang];
        
        // Update elements with data-i18n
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[key]) {
                el.innerText = dict[key];
            }
        });

        // Top bar & buttons
        document.getElementById('topBarText').innerText = dict.topBarText;
        document.getElementById('langBtnText').innerText = dict.langBtnText;
        document.getElementById('voiceNarrateText').innerText = dict.voiceNarrateBtn;
    }

    langToggleBtn.addEventListener('click', () => {
        applyLanguage(currentLang === 'hi' ? 'en' : 'hi');
    });

    // ==========================================
    // 2. LIVE TICKING STATS CLOCK
    // ==========================================
    const globalCounterEl = document.getElementById('globalDeathsCounter');
    const deathsSinceOpenedEl = document.getElementById('deathsSinceOpened');
    const timeOnPageEl = document.getElementById('timeOnPage');

    let baseGlobalDeaths = SURAKSHA_DATA.statistics.global.annualDeaths;
    let deathsSincePage = 0;

    setInterval(() => {
        // Update elapsed time on page
        const elapsedSec = Math.floor((Date.now() - pageStartTime) / 1000);
        const mins = String(Math.floor(elapsedSec / 60)).padStart(2, '0');
        const secs = String(elapsedSec % 60).padStart(2, '0');
        timeOnPageEl.innerText = `${mins}:${secs}`;

        // 1 death every ~24.5 seconds globally
        const newDeathsSince = Math.floor(elapsedSec / 24.5);
        if (newDeathsSince !== deathsSincePage) {
            deathsSincePage = newDeathsSince;
            deathsSinceOpenedEl.innerText = deathsSincePage;
            deathsSinceOpenedEl.classList.add('emergency-pulse');
            setTimeout(() => deathsSinceOpenedEl.classList.remove('emergency-pulse'), 1500);
        }

        // Ticking global counter
        const currentYearFraction = (Date.now() - new Date(2026, 0, 1).getTime()) / (365.25 * 24 * 3600 * 1000);
        const calculatedTotal = Math.floor(baseGlobalDeaths * currentYearFraction) + deathsSincePage;
        globalCounterEl.innerText = calculatedTotal.toLocaleString();
    }, 1000);

    // ==========================================
    // 3. VOICE NARRATION (TEXT-TO-SPEECH) ENGINE
    // ==========================================
    const voiceNarrateBtn = document.getElementById('voiceNarrateBtn');
    let cachedVoices = [];

    function updateVoicesList() {
        if (!('speechSynthesis' in window)) return;
        cachedVoices = speechSynth.getVoices();
        const badge = document.getElementById('detectedHindiVoiceBadge');
        if (badge && cachedVoices.length > 0) {
            const hindiVoice = cachedVoices.find(v => 
                (v.lang && (v.lang.toLowerCase().startsWith('hi') || v.lang.includes('hi-in') || v.lang.includes('hi_in'))) ||
                (v.name && (v.name.includes('Hindi') || v.name.includes('हिन्दी') || v.name.includes('Kalpana') || v.name.includes('Hemant') || v.name.includes('Madhur') || v.name.includes('Swara')))
            );

            if (hindiVoice) {
                const cleanName = hindiVoice.name.split(' - ')[0].replace('Microsoft ', '').replace('Google ', '');
                badge.innerText = `Native Hindi (${cleanName})`;
                badge.className = "text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/40 font-mono text-[10px]";
            } else {
                badge.innerText = "Dual Hindi Engine (Phonetic Fallback Active)";
                badge.className = "text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/40 font-mono text-[10px]";
            }
        }
    }

    if ('speechSynthesis' in window) {
        updateVoicesList();
        if (speechSynth.onvoiceschanged !== undefined) {
            speechSynth.onvoiceschanged = updateVoicesList;
        }
    }

    function getBestVoiceForLanguage(lang, persona) {
        const voices = (cachedVoices && cachedVoices.length > 0) ? cachedVoices : speechSynth.getVoices();
        if (!voices || voices.length === 0) return null;

        // Native Hindi detection
        const hindiVoices = voices.filter(v => 
            (v.lang && (v.lang.toLowerCase().startsWith('hi') || v.lang.includes('hi-in') || v.lang.includes('hi_in'))) ||
            (v.name && (v.name.includes('Hindi') || v.name.includes('हिन्दी') || v.name.includes('Kalpana') || v.name.includes('Hemant') || v.name.includes('Madhur') || v.name.includes('Swara')))
        );

        // Indian English detection
        const indianEnglishVoices = voices.filter(v => 
            (v.lang && (v.lang.toLowerCase().includes('en-in') || v.lang.toLowerCase().includes('en_in'))) ||
            (v.name && (v.name.includes('India') || v.name.includes('Heera') || v.name.includes('Ravi') || v.name.includes('Neerja')))
        );

        if (lang === 'hi' || lang === 'hi-IN') {
            if (hindiVoices.length > 0) {
                if (persona === 'child') {
                    const childChoice = hindiVoices.find(v => v.name.includes('Kalpana') || v.name.includes('Swara') || v.name.includes('Female')) || hindiVoices[0];
                    return { voice: childChoice, isNativeHindi: true, langCode: 'hi-IN' };
                } else if (persona === 'mother') {
                    const motherChoice = hindiVoices.find(v => v.name.includes('Kalpana') || v.name.includes('Swara') || v.name.includes('Female')) || hindiVoices[0];
                    return { voice: motherChoice, isNativeHindi: true, langCode: 'hi-IN' };
                } else if (persona === 'police') {
                    const policeChoice = hindiVoices.find(v => v.name.includes('Hemant') || v.name.includes('Madhur') || v.name.includes('Male')) || hindiVoices[0];
                    return { voice: policeChoice, isNativeHindi: true, langCode: 'hi-IN' };
                }
                return { voice: hindiVoices[0], isNativeHindi: true, langCode: 'hi-IN' };
            }

            // Fallback to Indian English voice or best available voice WITH Phonetic text
            if (indianEnglishVoices.length > 0) {
                const chosen = (persona === 'police') 
                    ? (indianEnglishVoices.find(v => v.name.includes('Ravi') || v.name.includes('Male')) || indianEnglishVoices[0])
                    : (indianEnglishVoices.find(v => v.name.includes('Heera') || v.name.includes('Neerja') || v.name.includes('Female')) || indianEnglishVoices[0]);
                return { voice: chosen, isNativeHindi: false, langCode: 'en-IN' };
            }

            return { voice: voices[0], isNativeHindi: false, langCode: voices[0].lang || 'en-US' };
        }

        // English requested
        if (indianEnglishVoices.length > 0) {
            return { voice: indianEnglishVoices[0], isNativeHindi: false, langCode: 'en-IN' };
        }
        return { voice: voices[0], isNativeHindi: false, langCode: voices[0].lang || 'en-US' };
    }

    function speakText(devanagariText, phoneticText = null, lang = 'hi-IN', persona = null) {
        if (!('speechSynthesis' in window)) {
            alert("Sorry, your browser doesn't support Web Speech Audio.");
            return;
        }

        // Unpause if Chrome paused speech synthesis in background
        if (speechSynth.paused) {
            speechSynth.resume();
        }

        if (isSpeaking) {
            speechSynth.cancel();
            isSpeaking = false;
            voiceNarrateBtn.innerHTML = `<i data-lucide="volume-2" class="w-5 h-5"></i> <span>${I18N[currentLang].voiceNarrateBtn}</span>`;
            if (window.lucide) lucide.createIcons();
            return;
        }

        speechSynth.cancel();

        const selectedPersona = persona || (document.getElementById('alertVoicePersona') ? document.getElementById('alertVoicePersona').value : 'child');
        const voiceMatch = getBestVoiceForLanguage(lang, selectedPersona);

        // Decide text to read: If native Hindi voice is present, use Devanagari.
        // If system lacks native Hindi voice, use Phonetic Romanized Hindi so it speaks fluent Hindi!
        let textToRead = devanagariText;
        if (voiceMatch && !voiceMatch.isNativeHindi && phoneticText) {
            textToRead = phoneticText;
        }

        currentUtterance = new SpeechSynthesisUtterance(textToRead);

        if (voiceMatch && voiceMatch.voice) {
            currentUtterance.voice = voiceMatch.voice;
            currentUtterance.lang = voiceMatch.langCode || (voiceMatch.isNativeHindi ? 'hi-IN' : 'en-IN');
        } else {
            currentUtterance.lang = 'hi-IN';
        }

        if (selectedPersona === 'child') {
            currentUtterance.pitch = 1.65;
            currentUtterance.rate = 1.05;
        } else if (selectedPersona === 'mother') {
            currentUtterance.pitch = 1.15;
            currentUtterance.rate = 0.94;
        } else if (selectedPersona === 'police') {
            currentUtterance.pitch = 0.85;
            currentUtterance.rate = 1.02;
        } else {
            currentUtterance.pitch = 1.0;
            currentUtterance.rate = 0.95;
        }

        currentUtterance.onstart = () => {
            isSpeaking = true;
            voiceNarrateBtn.innerHTML = `
                <div class="audio-wave">
                    <span class="audio-bar"></span>
                    <span class="audio-bar"></span>
                    <span class="audio-bar"></span>
                    <span class="audio-bar"></span>
                </div>
                <span>Playing Audio... (Click to Stop)</span>
            `;
        };

        currentUtterance.onend = () => {
            isSpeaking = false;
            voiceNarrateBtn.innerHTML = `<i data-lucide="volume-2" class="w-5 h-5"></i> <span>${I18N[currentLang].voiceNarrateBtn}</span>`;
            if (window.lucide) lucide.createIcons();
        };

        currentUtterance.onerror = (err) => {
            console.warn("SpeechSynthesis error:", err);
            isSpeaking = false;
            voiceNarrateBtn.innerHTML = `<i data-lucide="volume-2" class="w-5 h-5"></i> <span>${I18N[currentLang].voiceNarrateBtn}</span>`;
            if (window.lucide) lucide.createIcons();
        };

        speechSynth.speak(currentUtterance);
    }

    voiceNarrateBtn.addEventListener('click', () => {
        const messageHi = "घर पर कोई इंतज़ार कर रहा है। जब आप बिना हेलमेट या तेज़ रफ़्तार में गाड़ी चलाते हैं, तो सिर्फ आपकी ज़िन्दगी दांव पर नहीं होती। आपके पीछे आपकी बूढ़ी मां, आपके छोटे बच्चे और आपका परिवार भूखा मरने की कगार पर आ जाता है। नियमों का पालन पुलिस के डर से नहीं, अपने परिवार के लिए कीजिए।";
        const messagePhonetic = "Ghar par koi intezaar kar raha hai. Jab aap bina helmet ya tez raftaar me gaadi chalate hain, to sirf aapki zindagi daanv par nahi hoti. Aapke peeche aapki boodhi maa, aapke chhote bacche aur aapka parivaar bhookha marne ki kagaar par aa jata hai. Niyamo ka paalan police ke darr se nahi, apne parivaar ke liye kijiye.";
        const messageEn = "Someone is waiting for you at home. When you ride without a helmet or overspeed, it's not just your life at stake. If you are lost, your dependent children and elderly parents are left with zero income, unable to afford basic food or education. Follow traffic rules for the ones who love you.";
        if (currentLang === 'hi') {
            speakText(messageHi, messagePhonetic, 'hi-IN', 'child');
        } else {
            speakText(messageEn, messageEn, 'en-US', 'child');
        }
    });

    // ==========================================
    // 3.5. PROACTIVE PRE-VIOLATION VOICE ALARM & SMARTWATCH LIFE-SAVER
    // ==========================================
    let audioCtx = null;
    let sirenOscillator = null;
    let sirenGain = null;
    let isSirenPlaying = false;
    let isGpsDrivingActive = false;
    let gpsWatchId = null;
    let lastAlarmTime = 0;

    // Web Audio API Dual-Tone Emergency Siren
    function playPoliceSiren(durationMs = 1500) {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return;
            if (!audioCtx) audioCtx = new AudioContext();
            if (audioCtx.state === 'suspended') audioCtx.resume();

            stopPoliceSiren();

            sirenOscillator = audioCtx.createOscillator();
            sirenGain = audioCtx.createGain();

            sirenOscillator.type = 'sawtooth';
            const now = audioCtx.currentTime;

            // Dual tone siren sweep 600Hz <-> 950Hz
            sirenOscillator.frequency.setValueAtTime(600, now);
            sirenOscillator.frequency.linearRampToValueAtTime(950, now + 0.35);
            sirenOscillator.frequency.linearRampToValueAtTime(600, now + 0.7);
            sirenOscillator.frequency.linearRampToValueAtTime(950, now + 1.05);
            sirenOscillator.frequency.linearRampToValueAtTime(600, now + 1.4);

            sirenGain.gain.setValueAtTime(0.3, now);
            sirenGain.gain.exponentialRampToValueAtTime(0.01, now + (durationMs / 1000));

            sirenOscillator.connect(sirenGain);
            sirenGain.connect(audioCtx.destination);

            sirenOscillator.start(now);
            isSirenPlaying = true;

            setTimeout(() => {
                stopPoliceSiren();
            }, durationMs);
        } catch (e) {
            console.warn("AudioContext warning:", e);
        }
    }

    function stopPoliceSiren() {
        if (sirenOscillator) {
            try {
                sirenOscillator.stop();
                sirenOscillator.disconnect();
            } catch(e) {}
            sirenOscillator = null;
        }
        isSirenPlaying = false;
    }

    // Trigger Proactive Voice Alarm
    function triggerPreViolationAlarm(type) {
        const now = Date.now();
        // Debounce by 4 seconds so rapid triggers don't collide
        if (now - lastAlarmTime < 4000) return;
        lastAlarmTime = now;

        const alarmConfig = SURAKSHA_DATA.proactiveVoiceAlarms[type];
        if (!alarmConfig) return;

        // 1. Play Police Siren
        playPoliceSiren(alarmConfig.sirenDurationMs);

        // 2. Screen Flash Effect
        const panel = document.getElementById('drivingGuardianPanel');
        if (panel) {
            panel.classList.add('screen-alarm-active');
            setTimeout(() => panel.classList.remove('screen-alarm-active'), 4000);
        }

        // 3. Smartwatch Haptics & Visual Feedback
        triggerSmartwatchAlert(alarmConfig.smartwatchAlert, alarmConfig.hapticPattern);

        // 4. Physical Mobile Device Vibration API
        if (navigator.vibrate) {
            navigator.vibrate(alarmConfig.hapticPattern);
        }

        // 5. Emotional Voice Announcement in selected persona
        const personaSelect = document.getElementById('alertVoicePersona');
        const persona = personaSelect ? personaSelect.value : 'child';
        const voiceDevanagari = (currentLang === 'hi') 
            ? alarmConfig.voices[persona] 
            : alarmConfig.voicesEn[persona];
        const voicePhonetic = (currentLang === 'hi' && alarmConfig.voicesPhonetic)
            ? alarmConfig.voicesPhonetic[persona]
            : voiceDevanagari;

        setTimeout(() => {
            speakText(voiceDevanagari, voicePhonetic, currentLang === 'hi' ? 'hi-IN' : 'en-US', persona);
        }, 900);
    }

    // Smartwatch Visual Simulation & Haptic Pulses
    function triggerSmartwatchAlert(alertText, pattern = [400, 100, 400]) {
        const watchDevice = document.getElementById('smartwatchDevice');
        const watchRipples = document.getElementById('smartwatchRipples');
        const watchAlertHeading = document.getElementById('watchAlertHeading');
        const watchAlertSub = document.getElementById('watchAlertSub');
        const watchHapticLabel = document.getElementById('watchHapticLabel');
        const watchStatusIcon = document.getElementById('watchStatusIcon');
        const watchBpm = document.getElementById('watchBpm');

        if (!watchDevice) return;

        // Animate wrist vibration
        watchDevice.classList.add('wrist-vibrate');
        if (watchRipples) watchRipples.classList.add('active');

        // Update Watch screen
        if (watchAlertHeading) {
            watchAlertHeading.innerText = alertText;
            watchAlertHeading.className = "text-[11px] font-black text-red-500 leading-tight uppercase animate-pulse";
        }
        if (watchAlertSub) watchAlertSub.innerText = "Haptic Pulse: Urgent";
        if (watchHapticLabel) watchHapticLabel.innerText = "Wrist Vibrate: ACTIVE";
        if (watchStatusIcon) {
            watchStatusIcon.className = "w-9 h-9 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center mb-1.5 animate-bounce";
            watchStatusIcon.innerHTML = `<i data-lucide="alert-triangle" class="w-5 h-5"></i>`;
            if (window.lucide) lucide.createIcons();
        }

        // Heart rate spike to reflect emergency shock
        if (watchBpm) {
            watchBpm.innerText = "126";
            watchBpm.className = "text-red-400 font-bold";
        }

        // Reset after 3.8 seconds
        setTimeout(() => {
            watchDevice.classList.remove('wrist-vibrate');
            if (watchRipples) watchRipples.classList.remove('active');
            if (watchAlertHeading) {
                watchAlertHeading.className = "text-[11px] font-black text-white leading-tight uppercase";
                watchAlertHeading.innerText = "Suraksha Linked";
            }
            if (watchAlertSub) watchAlertSub.innerText = `Speed: ${document.getElementById('liveSpeedText').innerText} km/h • Monitored`;
            if (watchHapticLabel) watchHapticLabel.innerText = "Wrist Haptics: Ready";
            if (watchBpm) {
                watchBpm.innerText = "78";
                watchBpm.className = "text-slate-200";
            }
            if (watchStatusIcon) {
                watchStatusIcon.className = "w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-1.5";
                watchStatusIcon.innerHTML = `<i data-lucide="shield-check" class="w-5 h-5"></i>`;
                if (window.lucide) lucide.createIcons();
            }
        }, 3800);
    }

    // Smartwatch Clock Ticker
    setInterval(() => {
        const watchTimeEl = document.getElementById('watchTime');
        if (watchTimeEl) {
            const d = new Date();
            const hrs = String(d.getHours()).padStart(2, '0');
            const mns = String(d.getMinutes()).padStart(2, '0');
            watchTimeEl.innerText = `${hrs}:${mns}`;
        }
    }, 1000);

    // Speedometer Simulator Slider
    const speedRangeInput = document.getElementById('speedSimulatorRange');
    const liveSpeedText = document.getElementById('liveSpeedText');
    const sliderSpeedVal = document.getElementById('sliderSpeedVal');
    const speedStatusPill = document.getElementById('speedStatusPill');
    const speedometerDial = document.getElementById('speedometerDial');

    function updateSpeedometerDisplay(speed) {
        liveSpeedText.innerText = speed;
        if (sliderSpeedVal) sliderSpeedVal.innerText = `${speed} km/h`;

        const watchAlertSub = document.getElementById('watchAlertSub');
        if (watchAlertSub) watchAlertSub.innerText = `Speed: ${speed} km/h`;

        if (speed <= 40) {
            speedStatusPill.className = "mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30";
            speedStatusPill.innerText = "SAFE SPEED";
            speedometerDial.style.borderColor = "#10b981";
        } else if (speed <= 60) {
            speedStatusPill.className = "mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30";
            speedStatusPill.innerText = "APPROACHING SPEED LIMIT";
            speedometerDial.style.borderColor = "#f59e0b";
        } else {
            speedStatusPill.className = "mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-600 text-white animate-pulse";
            speedStatusPill.innerText = "LETHAL OVER-SPEED! SLOW DOWN!";
            speedometerDial.style.borderColor = "#ef4444";

            // Automatically trigger proactive voice alarm if above 60 km/h!
            triggerPreViolationAlarm('overspeed');
        }
    }

    if (speedRangeInput) {
        speedRangeInput.addEventListener('input', (e) => {
            const speed = parseInt(e.target.value);
            updateSpeedometerDisplay(speed);
        });
    }

    // Trigger Test Buttons
    const triggerSpeedBtn = document.getElementById('triggerSpeedAlarmBtn');
    if (triggerSpeedBtn) {
        triggerSpeedBtn.addEventListener('click', () => {
            speedRangeInput.value = 78;
            updateSpeedometerDisplay(78);
            triggerPreViolationAlarm('overspeed');
        });
    }

    const triggerRedLightBtn = document.getElementById('triggerRedLightAlarmBtn');
    if (triggerRedLightBtn) {
        triggerRedLightBtn.addEventListener('click', () => {
            triggerPreViolationAlarm('redlight');
        });
    }

    const triggerPhoneBtn = document.getElementById('triggerPhoneAlarmBtn');
    if (triggerPhoneBtn) {
        triggerPhoneBtn.addEventListener('click', () => {
            triggerPreViolationAlarm('phoneDistraction');
        });
    }

    // DEDICATED CHILD VOICE HEARTFELT PLEAS
    document.querySelectorAll('.child-plea-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const pleaKey = btn.getAttribute('data-plea');
            const nameInput = document.getElementById('childNameInput');
            const childName = (nameInput && nameInput.value.trim()) ? nameInput.value.trim() : "Aarohi";

            const pleasDict = (currentLang === 'hi') ? SURAKSHA_DATA.childSafetyPleas : SURAKSHA_DATA.childSafetyPleasEn;
            const pleasPhoneticDict = (currentLang === 'hi') ? SURAKSHA_DATA.childSafetyPleasPhonetic : SURAKSHA_DATA.childSafetyPleasEn;

            const pleaMessage = (pleasDict && pleasDict[pleaKey]) ? pleasDict[pleaKey](childName) : `पापा, गाड़ी धीरे चलाओ, मुझे आपके साथ खेलना है!`;
            const pleaPhonetic = (pleasPhoneticDict && pleasPhoneticDict[pleaKey]) ? pleasPhoneticDict[pleaKey](childName) : pleaMessage;

            // Update Smartwatch display with child plea
            triggerSmartwatchAlert(`👶 ${childName.toUpperCase()}: PAPA SUNO!`, [200, 100, 300]);

            // Visual feedback on guardian panel
            const panel = document.getElementById('drivingGuardianPanel');
            if (panel) {
                panel.classList.add('screen-alarm-active');
                setTimeout(() => panel.classList.remove('screen-alarm-active'), 3000);
            }

            // Speak in authentic high-pitched tender Child Voice with guaranteed Hindi!
            speakText(pleaMessage, pleaPhonetic, currentLang === 'hi' ? 'hi-IN' : 'en-US', 'child');
        });
    });

    // Test Child Hindi Voice Button
    const testChildVoiceBtn = document.getElementById('testChildVoiceBtn');
    if (testChildVoiceBtn) {
        testChildVoiceBtn.addEventListener('click', () => {
            const nameInput = document.getElementById('childNameInput');
            const childName = (nameInput && nameInput.value.trim()) ? nameInput.value.trim() : "Aarohi";

            const devanagariTest = `नमस्ते पापा! मैं ${childName} बोल रही हूँ। अब मेरी हिंदी आवाज़ आपको बिल्कुल साफ़ सुनाई दे रही है। सड़क पर हमेशा गाड़ी धीरे चलाइएगा, मुझे आपके साथ खेलना है!`;
            const phoneticTest = `Namaste Papa! Main ${childName} bol rahi hoon. Ab meri Hindi awaaz aapko bilkul saaf sunayi de rahi hai. Sadak par hamesha gaadi dheere chalaiyega, mujhe aapke sath khelna hai!`;

            triggerSmartwatchAlert(`👶 ${childName.toUpperCase()}: HINDI AUDIO OK`, [200, 100, 300]);

            const panel = document.getElementById('drivingGuardianPanel');
            if (panel) {
                panel.classList.add('screen-alarm-active');
                setTimeout(() => panel.classList.remove('screen-alarm-active'), 3000);
            }

            speakText(devanagariTest, phoneticTest, 'hi-IN', 'child');
        });
    }

    // Silence Alarm Button
    const silenceBtn = document.getElementById('silenceAlarmBtn');
    if (silenceBtn) {
        silenceBtn.addEventListener('click', () => {
            stopPoliceSiren();
            if (speechSynth) speechSynth.cancel();
            if (navigator.vibrate) navigator.vibrate(0);
            const panel = document.getElementById('drivingGuardianPanel');
            if (panel) panel.classList.remove('screen-alarm-active');
            const watchDevice = document.getElementById('smartwatchDevice');
            if (watchDevice) watchDevice.classList.remove('wrist-vibrate');
            const watchRipples = document.getElementById('smartwatchRipples');
            if (watchRipples) watchRipples.classList.remove('active');
        });
    }

    // Smartwatch Low Battery Simulation
    const simulateLowBatteryBtn = document.getElementById('simulateLowBatteryBtn');
    if (simulateLowBatteryBtn) {
        simulateLowBatteryBtn.addEventListener('click', () => {
            const watchBatteryText = document.getElementById('watchBatteryText');
            const watchBatteryIcon = document.getElementById('watchBatteryIcon');
            const watchPairingStatus = document.getElementById('watchPairingStatus');

            if (watchBatteryText) {
                watchBatteryText.innerText = "12%";
                watchBatteryText.className = "text-red-400 font-bold";
            }
            if (watchBatteryIcon) {
                watchBatteryIcon.className = "w-3.5 h-3.5 text-red-500 animate-pulse";
            }
            if (watchPairingStatus) {
                watchPairingStatus.innerText = "Phone Battery Critical: Haptics Transferred to Wrist";
                watchPairingStatus.className = "text-amber-400 font-bold";
            }

            triggerPreViolationAlarm('lowBatteryHandoff');
        });
    }

    // Test Smartwatch Wrist Vibration Only
    const testWatchVibrationBtn = document.getElementById('testWatchVibrationBtn');
    if (testWatchVibrationBtn) {
        testWatchVibrationBtn.addEventListener('click', () => {
            triggerSmartwatchAlert("PULSE TEST: HAPTIC ACTIVE", [300, 100, 300, 100, 500]);
            if (navigator.vibrate) navigator.vibrate([300, 100, 300]);
        });
    }

    // Real GPS Driving Guardian Mode
    const toggleGpsBtn = document.getElementById('toggleGpsDrivingBtn');
    const gpsBtnText = document.getElementById('gpsBtnText');
    const drivingStatusLabel = document.getElementById('drivingStatusLabel');
    const gpsDot = document.getElementById('gpsIndicatorDot');

    if (toggleGpsBtn) {
        toggleGpsBtn.addEventListener('click', () => {
            if (!isGpsDrivingActive) {
                if (!navigator.geolocation) {
                    alert("GPS Geolocation is not supported by your browser.");
                    return;
                }

                gpsBtnText.innerText = "Stop GPS Driving Guardian";
                drivingStatusLabel.innerText = "LIVE GPS GUARDIAN ACTIVE (सक्रिय)";
                gpsDot.className = "w-3 h-3 rounded-full bg-emerald-500 animate-ping";
                isGpsDrivingActive = true;

                gpsWatchId = navigator.geolocation.watchPosition(
                    (position) => {
                        // speed is in m/s, convert to km/h
                        const speedKmh = position.coords.speed ? Math.round(position.coords.speed * 3.6) : 0;
                        if (speedRangeInput) speedRangeInput.value = speedKmh;
                        updateSpeedometerDisplay(speedKmh);
                    },
                    (err) => {
                        console.warn("GPS watch error:", err.message);
                        alert("GPS Permission needed for live speedometer. You can still test using the slider.");
                    },
                    { enableHighAccuracy: true, maximumAge: 1000 }
                );
            } else {
                if (gpsWatchId) navigator.geolocation.clearWatch(gpsWatchId);
                gpsWatchId = null;
                isGpsDrivingActive = false;
                gpsBtnText.innerText = "Start Real GPS Driving Guardian";
                drivingStatusLabel.innerText = "Guardian Standby (ड्राइविंग सुरक्षा तैयार)";
                gpsDot.className = "w-3 h-3 rounded-full bg-emerald-500";
            }
        });
    }

    // Automatic Web Battery API Check (Real battery sensor if supported)
    if ('getBattery' in navigator) {
        navigator.getBattery().then((battery) => {
            const checkBatteryLevel = () => {
                const percent = Math.round(battery.level * 100);
                const watchBatteryText = document.getElementById('watchBatteryText');
                if (watchBatteryText && !watchBatteryText.classList.contains('text-red-400')) {
                    watchBatteryText.innerText = `${percent}%`;
                }

                // If actual phone battery goes below 15%
                if (percent <= 15 && !battery.charging) {
                    triggerPreViolationAlarm('lowBatteryHandoff');
                }
            };
            checkBatteryLevel();
            battery.addEventListener('levelchange', checkBatteryLevel);
        }).catch(() => {});
    }

    // ==========================================
    // 4. RAKSHAK AI TRAFFIC GUARDIAN & ANALYZER
    // ==========================================
    const scenarioPresets = [
        { label: "🏍️ No Helmet at 60 km/h", query: "Bike ride without helmet at 60 km/h in city traffic", vehicle: "Two-Wheeler (Bike/Scooter)", speed: "60-80 km/h" },
        { label: "🍺 Drunk Driving (DUI)", query: "Driving car after drinking alcohol late night", vehicle: "Four-Wheeler (Car/Taxi)", speed: "60-80 km/h" },
        { label: "📱 Texting / Reels while Driving", query: "Checking phone WhatsApp message while riding scooter", vehicle: "Two-Wheeler (Bike/Scooter)", speed: "40-60 km/h" },
        { label: "🚦 Red Light Jumping", query: "Jumping yellow and red signal at intersection to avoid waiting 40 seconds", vehicle: "Two-Wheeler (Bike/Scooter)", speed: "40-60 km/h" },
        { label: "↩️ Wrong-Side Highway Entry", query: "Taking wrong side on highway service road to save 500m U-turn", vehicle: "Two-Wheeler (Bike/Scooter)", speed: "40-60 km/h" },
        { label: "👥 Triple Riding with Friends", query: "Three people riding on one motorcycle without helmets", vehicle: "Two-Wheeler (Bike/Scooter)", speed: "40-60 km/h" }
    ];

    const presetsContainer = document.getElementById('scenarioPresetsContainer');
    scenarioPresets.forEach(preset => {
        const btn = document.createElement('button');
        btn.className = "px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-200 transition hover:border-red-500/40";
        btn.innerText = preset.label;
        btn.addEventListener('click', () => {
            document.getElementById('aiUserInput').value = preset.query;
            document.getElementById('aiVehicleType').value = preset.vehicle;
            document.getElementById('aiSpeedRange').value = preset.speed;
            runRakshakAiDiagnosis(preset.query, preset.vehicle, preset.speed);
        });
        presetsContainer.appendChild(btn);
    });

    const analyzeHabitBtn = document.getElementById('analyzeHabitBtn');
    analyzeHabitBtn.addEventListener('click', () => {
        const input = document.getElementById('aiUserInput').value.trim();
        const vehicle = document.getElementById('aiVehicleType').value;
        const speed = document.getElementById('aiSpeedRange').value;
        if (!input) {
            alert(currentLang === 'hi' ? "कृपया अपनी आदत या परिस्थिति लिखें।" : "Please enter a traffic habit or situation.");
            return;
        }
        runRakshakAiDiagnosis(input, vehicle, speed);
    });

    function runRakshakAiDiagnosis(query, vehicle, speed) {
        const lower = query.toLowerCase();
        let matchedRule = null;
        let dangerLevel = "CRITICAL (88%)";
        let dangerColor = "text-red-400 border-red-500/40 bg-red-500/10";

        if (lower.includes('helmet') || lower.includes('sir') || lower.includes('head')) {
            matchedRule = SURAKSHA_DATA.trafficRules[0]; // Helmet
            dangerLevel = "FATAL RISK: 94%";
        } else if (lower.includes('seatbelt') || lower.includes('belt') || lower.includes('car')) {
            matchedRule = SURAKSHA_DATA.trafficRules[1]; // Seatbelt
            dangerLevel = "EXTREME: 78%";
        } else if (lower.includes('speed') || lower.includes('tez') || lower.includes('fast') || lower.includes('km/h')) {
            matchedRule = SURAKSHA_DATA.trafficRules[2]; // Speed
            dangerLevel = "LETHAL: 91%";
        } else if (lower.includes('drink') || lower.includes('daroo') || lower.includes('alcohol') || lower.includes('sharab')) {
            matchedRule = SURAKSHA_DATA.trafficRules[3]; // DUI
            dangerLevel = "CRIMINAL / CATASTROPHIC: 98%";
        } else if (lower.includes('phone') || lower.includes('mobile') || lower.includes('reel') || lower.includes('text') || lower.includes('call')) {
            matchedRule = SURAKSHA_DATA.trafficRules[4]; // Mobile
            dangerLevel = "HIGH TRAUMA: 84%";
        } else if (lower.includes('light') || lower.includes('signal') || lower.includes('wrong') || lower.includes('side') || lower.includes('lal batti')) {
            matchedRule = SURAKSHA_DATA.trafficRules[5]; // Red light / Wrong side
            dangerLevel = "FATAL COLLISION: 92%";
        } else {
            // General high hazard
            matchedRule = SURAKSHA_DATA.trafficRules[0];
            dangerLevel = "HIGH THREAT: 85%";
        }

        // Render diagnosis
        const reportCard = document.getElementById('aiReportCard');
        reportCard.innerHTML = `
            <div class="p-4 rounded-xl border ${dangerColor} flex items-center justify-between">
                <div>
                    <span class="text-[11px] font-bold uppercase tracking-wider block text-slate-400">Threat Severity Rating</span>
                    <span class="text-lg font-black text-white">${dangerLevel}</span>
                </div>
                <div class="text-right">
                    <span class="text-[11px] font-bold uppercase tracking-wider block text-slate-400">Violated Law</span>
                    <span class="text-sm font-bold text-amber-400">${matchedRule.code}</span>
                </div>
            </div>

            <!-- Legal Section & Penalty -->
            <div class="glass-card p-4 rounded-xl border border-white/5 space-y-1">
                <div class="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                    <i data-lucide="scale" class="w-4 h-4"></i> Law & Penalties (Motor Vehicles Act)
                </div>
                <p class="text-sm font-semibold text-slate-100">${currentLang === 'hi' ? matchedRule.ruleHi : matchedRule.ruleEn}</p>
                <p class="text-xs text-amber-300 font-mono mt-1">Penalty: ${matchedRule.penalty}</p>
            </div>

            <!-- Crash Biomechanics & Physics -->
            <div class="p-4 rounded-xl bg-red-950/40 border border-red-500/30 space-y-1.5">
                <div class="flex items-center gap-1.5 text-xs font-bold text-red-400">
                    <i data-lucide="activity" class="w-4 h-4"></i> Biomechanical Crash Trauma (${speed} Impact)
                </div>
                <p class="text-xs text-slate-200 leading-relaxed">${matchedRule.crashPhysics}</p>
            </div>

            <!-- Family Destitution & Economic Shock -->
            <div class="p-4 rounded-xl bg-slate-900 border border-white/10 space-y-1.5">
                <div class="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                    <i data-lucide="home" class="w-4 h-4"></i> The Family Destitution Shockwave
                </div>
                <p class="text-xs text-slate-300 leading-relaxed">${matchedRule.familyImpact}</p>
            </div>

            <!-- Survival Action Blueprint -->
            <div class="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-start gap-2.5">
                <i data-lucide="shield-check" class="w-4 h-4 text-emerald-400 shrink-0 mt-0.5"></i>
                <div class="text-xs">
                    <span class="font-bold text-white block">Safe Commuter Protocol:</span>
                    <span class="text-slate-300">${matchedRule.tips}</span>
                </div>
            </div>
        `;

        if (window.lucide) lucide.createIcons();

        // Setup voice readout button for AI report
        const speakBtn = document.getElementById('speakAiReportBtn');
        speakBtn.onclick = () => {
            const speech = `${matchedRule.ruleHi}. ${matchedRule.crashPhysics}. ${matchedRule.familyImpact}`;
            speakText(speech, 'hi-IN');
        };
    }

    // Auto-run first scenario for initial view
    runRakshakAiDiagnosis("Helmet ride at 50 km/h", "Two-Wheeler", "40-60 km/h");

    // ==========================================
    // 5. AI VISION SCANNER (COMPUTER VISION SIMULATION)
    // ==========================================
    const visionPresets = {
        helmet: {
            image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=900&q=80",
            name: "Rider Without Certified Helmet (Head Trauma Risk)",
            penalty: "Section 129: ₹1,000 Fine + 3 Months License Disqualification",
            physics: "At 50 km/h, impact delivers 4,200 Newtons to bare skull — identical to falling 4 floors. 80% chance of brain death before ambulance arrives.",
            family: "Young breadwinner lost instantly. Family faces emergency ₹3 Lakhs funeral/hospital loans with zero income for rent and rations.",
            badge: "94% FATALITY RISK",
            boxes: [
                { top: "18%", left: "46%", width: "12%", height: "15%", label: "CRITICAL: NO HELMET" },
                { top: "52%", left: "38%", width: "24%", height: "35%", label: "VULNERABLE 2-WHEELER" }
            ]
        },
        phone: {
            image: "https://images.unsplash.com/photo-1508873696983-2df5293cb395?auto=format&fit=crop&w=900&q=80",
            name: "Mobile Phone Distraction While Commuting",
            penalty: "Section 184: ₹1,000 - ₹5,000 Fine + Possible Imprisonment",
            physics: "Looking at screen for 4 seconds at 60 km/h = traveling 66 meters blindfolded. Braking reflex drops by 400%.",
            family: "A WhatsApp notification leaves elderly parents without a caregiver. No text message is worth your mother's tears.",
            badge: "86% HIGH COLLISION RISK",
            boxes: [
                { top: "40%", left: "55%", width: "15%", height: "20%", label: "HANDHELD MOBILE IN MOTION" }
            ]
        },
        seatbelt: {
            image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=900&q=80",
            name: "Driver Operating Vehicle Without Seatbelt",
            penalty: "Section 194B: ₹1,000 Fine per unbuckled occupant",
            physics: "In head-on crash, unrestrained driver launches through front windshield like a human projectile at 70 km/h with catastrophic spine rupture.",
            family: "Seatbelt takes 2 seconds to click and reduces death risk by 60%. Don't leave your children orphans for mere carelessness.",
            badge: "79% EJECTION RISK",
            boxes: [
                { top: "25%", left: "42%", width: "20%", height: "45%", label: "UNBUCKLED CHEST HARNESS" }
            ]
        },
        triple: {
            image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=900&q=80",
            name: "Illegal Triple Riding on Single Motorcycle",
            penalty: "Section 194C: ₹1,000 Fine + Disqualification of License",
            physics: "Gross vehicle imbalance, center of gravity shift, rear tire overload. Braking distance doubles, guaranteed multi-casualty wipeout.",
            family: "Three young friends wiped out simultaneously, shattering three distinct households in one tragic afternoon.",
            badge: "92% MULTI-VICTIM RISK",
            boxes: [
                { top: "30%", left: "35%", width: "35%", height: "40%", label: "OVERLOAD: 3 OCCUPANTS" }
            ]
        }
    };

    function applyVisionScenario(scenarioKey) {
        const scenario = visionPresets[scenarioKey];
        if (!scenario) return;

        const imgEl = document.getElementById('scannerImage');
        const overlayContainer = document.getElementById('scannerOverlayContainer');
        const laser = document.getElementById('scannerLaser');

        imgEl.src = scenario.image;
        overlayContainer.innerHTML = '';

        // Trigger scan animation
        laser.style.opacity = '1';
        laser.style.top = '0%';
        laser.style.transition = 'top 1.2s ease-in-out';
        setTimeout(() => laser.style.top = '100%', 50);

        setTimeout(() => {
            laser.style.opacity = '0';
            // Render bounding boxes
            scenario.boxes.forEach(box => {
                const boxEl = document.createElement('div');
                boxEl.className = 'scanner-box';
                boxEl.style.top = box.top;
                boxEl.style.left = box.left;
                boxEl.style.width = box.width;
                boxEl.style.height = box.height;

                const labelEl = document.createElement('span');
                labelEl.className = 'scanner-label';
                labelEl.innerText = box.label;
                boxEl.appendChild(labelEl);

                overlayContainer.appendChild(boxEl);
            });

            // Update texts
            document.getElementById('visionDangerBadge').innerText = scenario.badge;
            document.getElementById('visionViolationName').innerText = scenario.name;
            document.getElementById('visionPenaltyText').innerText = scenario.penalty;
            document.getElementById('visionPhysicsText').innerText = scenario.physics;
            document.getElementById('visionFamilyText').innerText = scenario.family;
        }, 1200);
    }

    document.querySelectorAll('.vision-preset-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.vision-preset-btn').forEach(b => b.classList.remove('bg-red-500/20', 'border-red-500'));
            btn.classList.add('bg-red-500/20', 'border-red-500');
            const presetKey = btn.getAttribute('data-preset');
            applyVisionScenario(presetKey);
        });
    });

    // Default vision preset
    applyVisionScenario('helmet');

    // Image Upload Scanner
    const imageUploadInput = document.getElementById('imageUploadInput');
    imageUploadInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const imgEl = document.getElementById('scannerImage');
                imgEl.src = event.target.result;
                
                // Simulate Custom AI Optical Detection
                const laser = document.getElementById('scannerLaser');
                laser.style.opacity = '1';
                laser.style.top = '0%';
                laser.style.transition = 'top 1.5s ease-in-out';
                setTimeout(() => laser.style.top = '100%', 50);

                setTimeout(() => {
                    laser.style.opacity = '0';
                    const overlayContainer = document.getElementById('scannerOverlayContainer');
                    overlayContainer.innerHTML = `
                        <div class="scanner-box" style="top:25%; left:30%; width:40%; height:45%;">
                            <span class="scanner-label">AI DETECTED: HIGH HAZARD ZONE</span>
                        </div>
                    `;
                    document.getElementById('visionDangerBadge').innerText = "87% POTENTIAL RISK DETECTED";
                    document.getElementById('visionViolationName').innerText = "User Image Scanned: Commuter Safety Hazard";
                    document.getElementById('visionPenaltyText').innerText = "Motor Vehicles Act Applicable Sections Evaluated";
                    document.getElementById('visionPhysicsText').innerText = "AI models detect dangerous traffic interaction. Any collision in unshielded state results in irreversible trauma to occupants.";
                    document.getElementById('visionFamilyText').innerText = "Caution is the only guarantee of reaching home. Please ensure helmets, seatbelts, and speed discipline.";
                }, 1500);
            };
            reader.readAsDataURL(file);
        }
    });

    document.getElementById('rescanBtn').addEventListener('click', () => {
        const activeBtn = document.querySelector('.vision-preset-btn.border-red-500');
        const key = activeBtn ? activeBtn.getAttribute('data-preset') : 'helmet';
        applyVisionScenario(key);
    });

    // ==========================================
    // 6. MORTALITY RATIO CHARTS (CHART.JS)
    // ==========================================
    // Chart 1: Violations Causing Death
    const ctx1 = document.getElementById('violationsChart').getContext('2d');
    new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: ['Over-Speeding', 'No Helmet', 'Wrong-Side', 'Red Light', 'Phone Use', 'Drunk Driving'],
            datasets: [{
                label: '% Fatal Crashes Involved',
                data: [71.8, 29.7, 5.6, 4.8, 3.9, 2.5],
                backgroundColor: [
                    'rgba(239, 68, 68, 0.85)',
                    'rgba(245, 158, 11, 0.85)',
                    'rgba(168, 85, 247, 0.8)',
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(236, 72, 153, 0.8)',
                    'rgba(16, 185, 129, 0.8)'
                ],
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { color: '#94a3b8', font: { size: 10 } },
                    grid: { color: 'rgba(255, 255, 255, 0.05)' }
                },
                x: {
                    ticks: { color: '#94a3b8', font: { size: 10 } },
                    grid: { display: false }
                }
            }
        }
    });

    // Chart 2: Who Dies (Vulnerable Road Users)
    const ctx2 = document.getElementById('usersShareChart').getContext('2d');
    new Chart(ctx2, {
        type: 'doughnut',
        data: {
            labels: ['Two-Wheelers (44.5%)', 'Pedestrians (18.2%)', 'Cars & Cabs (15.3%)', 'Trucks & Buses (12.1%)', 'Cyclists (9.9%)'],
            datasets: [{
                data: [44.5, 18.2, 15.3, 12.1, 9.9],
                backgroundColor: [
                    '#ef4444',
                    '#f59e0b',
                    '#3b82f6',
                    '#8b5cf6',
                    '#10b981'
                ],
                borderWidth: 2,
                borderColor: '#111726'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: { color: '#94a3b8', font: { size: 10 }, boxWidth: 12 }
                }
            }
        }
    });

    // ==========================================
    // 7. FAMILY DESTITUTION RISK CALCULATOR
    // ==========================================
    let isSoleBreadwinner = true;
    const soleBtns = document.querySelectorAll('.calc-sole-btn');
    soleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            soleBtns.forEach(b => {
                b.classList.remove('border-red-500/50', 'bg-red-500/20', 'text-white', 'font-bold');
                b.classList.add('border-white/10', 'bg-slate-900', 'text-slate-300');
            });
            btn.classList.add('border-red-500/50', 'bg-red-500/20', 'text-white', 'font-bold');
            btn.classList.remove('border-white/10', 'bg-slate-900', 'text-slate-300');
            isSoleBreadwinner = btn.getAttribute('data-val') === 'yes';
            recalculateDestitutionRisk();
        });
    });

    const dependentsRange = document.getElementById('dependentsRange');
    const dependentsVal = document.getElementById('dependentsVal');
    dependentsRange.addEventListener('input', (e) => {
        dependentsVal.innerText = `${e.target.value} Members`;
        recalculateDestitutionRisk();
    });

    const expenseRange = document.getElementById('expenseRange');
    const expenseVal = document.getElementById('expenseVal');
    expenseRange.addEventListener('input', (e) => {
        expenseVal.innerText = `₹${Number(e.target.value).toLocaleString()} / mo`;
        recalculateDestitutionRisk();
    });

    const savingsBuffer = document.getElementById('savingsBuffer');
    savingsBuffer.addEventListener('change', recalculateDestitutionRisk);

    const habitCheckboxes = document.querySelectorAll('.habit-check');
    habitCheckboxes.forEach(cb => cb.addEventListener('change', recalculateDestitutionRisk));

    document.getElementById('recalcRiskBtn').addEventListener('click', recalculateDestitutionRisk);

    function recalculateDestitutionRisk() {
        const dependents = parseInt(dependentsRange.value);
        const monthlyExpense = parseInt(expenseRange.value);
        const buffer = savingsBuffer.value;

        let checkedHabitsCount = 0;
        habitCheckboxes.forEach(cb => { if (cb.checked) checkedHabitsCount++; });

        // Calculate runway
        let runwayMonths = 1;
        let riskScore = 50;

        if (buffer === 'zero') {
            runwayMonths = 0.5;
            riskScore += 35;
        } else if (buffer === 'low') {
            runwayMonths = 2;
            riskScore += 20;
        } else if (buffer === 'med') {
            runwayMonths = 8;
            riskScore += 5;
        } else {
            runwayMonths = 36;
            riskScore -= 20;
        }

        if (isSoleBreadwinner) {
            riskScore += 20;
            runwayMonths = Math.max(0.5, runwayMonths * 0.7);
        }

        riskScore += (checkedHabitsCount * 6);
        riskScore = Math.min(99, Math.max(15, riskScore));

        // Format runway text
        const runwayDisplay = runwayMonths < 1 ? "< 1 Month" : `${runwayMonths.toFixed(1)} Months`;
        document.getElementById('runwayMonths').innerText = runwayDisplay;

        // Threat Tag
        const severityTag = document.getElementById('riskSeverityTag');
        if (riskScore >= 80) {
            severityTag.className = "px-3 py-1 rounded-full bg-red-600 text-white font-extrabold text-xs animate-pulse";
            severityTag.innerText = `${riskScore}% CRITICAL CATASTROPHE`;
        } else if (riskScore >= 50) {
            severityTag.className = "px-3 py-1 rounded-full bg-amber-500 text-black font-extrabold text-xs";
            severityTag.innerText = `${riskScore}% HIGH VULNERABILITY`;
        } else {
            severityTag.className = "px-3 py-1 rounded-full bg-emerald-600 text-white font-extrabold text-xs";
            severityTag.innerText = `${riskScore}% MODERATE RISK`;
        }

        // Food & Education Impact
        const foodEl = document.getElementById('foodImpactDesc');
        const eduEl = document.getElementById('eduImpactDesc');
        const debtEl = document.getElementById('debtImpactDesc');
        const emoEl = document.getElementById('calcEmotionalMessage');

        if (isSoleBreadwinner && runwayMonths <= 2) {
            foodEl.innerText = `With ${dependents} dependents and zero backup earner, your family will exhaust all food money in under 60 days. They will be forced into informal odd jobs or skip meals.`;
            eduEl.innerText = `Your ${Math.min(dependents, 2)} children will likely be forced to leave school to support the family.`;
            debtEl.innerText = `Immediate loans of ₹3 Lakhs to ₹5 Lakhs for ICU hospital costs and final rituals borrowed from high-interest moneylenders.`;
            emoEl.innerText = `"Aapke sirf 2 minute bachaane ke chakkar me kya aapke ${dependents} parivaarjano ko sadak par anaath hona chahiye? Helmet pehno, ghar zinda laut ke aao."`;
        } else {
            foodEl.innerText = `Emergency reserves will offer temporary shelter, but loss of your income will permanently downgrade family living standards.`;
            eduEl.innerText = `Education funds will be diverted to cover everyday survival and medical liabilities.`;
            debtEl.innerText = `Estimated loss of lifetime earnings: ₹${((monthlyExpense * 12 * 20) / 100000).toFixed(1)} Lakhs that your family will never receive.`;
            emoEl.innerText = `"Zindagi aur parivaar se badhkar koi jaldi nahi hoti. Drive safe for those waiting for you tonight."`;
        }
    }

    // Run initial calc
    recalculateDestitutionRisk();

    // ==========================================
    // 8. REAL STORIES & MEMORIAL STREAM
    // ==========================================
    const storiesContainer = document.getElementById('storiesContainer');
    SURAKSHA_DATA.familyStories.forEach(story => {
        const card = document.createElement('div');
        card.className = "glass-card rounded-2xl overflow-hidden border border-white/10 flex flex-col justify-between";
        card.innerHTML = `
            <div>
                <div class="relative h-48 overflow-hidden">
                    <img src="${story.image}" alt="${story.name}" class="w-full h-full object-cover">
                    <div class="absolute inset-0 bg-gradient-to-t from-darkBg via-transparent to-transparent"></div>
                    <span class="absolute top-3 right-3 px-2 py-0.5 rounded bg-red-600 text-white font-bold text-[10px] uppercase">
                        ${story.city}
                    </span>
                </div>
                <div class="p-5">
                    <h4 class="text-base font-extrabold text-white">${story.name}</h4>
                    <span class="text-xs text-amber-400 font-semibold block mb-2">${story.role}</span>

                    <div class="text-[11px] p-2.5 rounded-lg bg-red-950/40 border border-red-500/30 text-red-200 mb-3">
                        <strong>Rule Violated:</strong> ${story.violation}
                    </div>

                    <p class="text-xs text-slate-300 leading-relaxed mb-3">
                        ${story.familyCondition}
                    </p>

                    <blockquote class="text-xs text-amber-300/90 italic border-l-2 border-amber-500 pl-2.5 py-1">
                        ${story.quote}
                    </blockquote>
                </div>
            </div>
            <div class="p-5 pt-0">
                <button class="story-audio-btn w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 flex items-center justify-center gap-2 transition" data-audio="${encodeURIComponent(story.audioText)}">
                    <i data-lucide="volume-2" class="w-3.5 h-3.5 text-red-400"></i> Suniye Yeh Kahani (Listen)
                </button>
            </div>
        `;
        storiesContainer.appendChild(card);
    });

    document.querySelectorAll('.story-audio-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const text = decodeURIComponent(btn.getAttribute('data-audio'));
            speakText(text, 'hi-IN');
        });
    });

    // Memorial Wall Stream
    const defaultMemorials = [
        { name: "Sunil Verma", dedication: "In Memory of Younger Brother Alok (Age 22)", message: "Alok didn't wear a helmet because he was only going 500m to the market. A truck hit him. My mother hasn't cooked with a smile in 3 years. Please, wear a helmet even for 100 meters.", date: "Yesterday" },
        { name: "Pooja Malhotra", dedication: "Pledge for My 2 Little Daughters", message: "I used to check phone notifications while driving my scooter. After seeing the destitution calculator, I realized my daughters will be left all alone if I make one mistake. Never touching my phone again.", date: "2 days ago" },
        { name: "Dr. K. S. Raman", dedication: "Trauma ICU Surgeon", message: "In my 18 years in emergency surgery, 90% of young fatal victims had unstrapped helmets or no seatbelts. Their skull trauma is heartbreaking. Please drive like your family is sitting next to you.", date: "4 days ago" }
    ];

    function loadMemorials() {
        const stream = document.getElementById('memorialStream');
        stream.innerHTML = '';
        const saved = JSON.parse(localStorage.getItem('suraksha_memorials') || '[]');
        const all = [...saved, ...defaultMemorials];

        all.forEach(mem => {
            const card = document.createElement('div');
            card.className = "p-4 rounded-xl glass-card border border-white/10 text-xs space-y-2";
            card.innerHTML = `
                <div class="flex items-center justify-between text-slate-400 text-[11px]">
                    <span class="font-bold text-slate-200">${mem.name}</span>
                    <span>${mem.date || 'Recent'}</span>
                </div>
                ${mem.dedication ? `<span class="text-amber-400 font-semibold block text-[11px]">${mem.dedication}</span>` : ''}
                <p class="text-slate-300 leading-relaxed italic">"${mem.message}"</p>
            `;
            stream.appendChild(card);
        });
    }
    loadMemorials();

    // Tribute Modal
    const tributeModal = document.getElementById('tributeModal');
    document.getElementById('toggleTributeModalBtn').onclick = () => tributeModal.classList.remove('hidden');
    document.getElementById('closeTributeModalBtn').onclick = () => tributeModal.classList.add('hidden');

    document.getElementById('submitTributeBtn').onclick = () => {
        const author = document.getElementById('tributeAuthor').value.trim();
        const dedicated = document.getElementById('tributeDedicated').value.trim();
        const content = document.getElementById('tributeContent').value.trim();

        if (!author || !content) {
            alert("Please fill your name and your message.");
            return;
        }

        const newEntry = {
            name: author,
            dedication: dedicated,
            message: content,
            date: "Just now"
        };

        const existing = JSON.parse(localStorage.getItem('suraksha_memorials') || '[]');
        existing.unshift(newEntry);
        localStorage.setItem('suraksha_memorials', JSON.stringify(existing));

        loadMemorials();
        tributeModal.classList.add('hidden');
        document.getElementById('tributeAuthor').value = '';
        document.getElementById('tributeDedicated').value = '';
        document.getElementById('tributeContent').value = '';
        alert("Your tribute and safety voice has been published to the community wall!");
    };

    // ==========================================
    // 9. PLEDGE & OFFICIAL CERTIFICATE GENERATOR
    // ==========================================
    const pledgeUserName = document.getElementById('pledgeUserName');
    const pledgeDedicatedTo = document.getElementById('pledgeDedicatedTo');
    const certNameDisplay = document.getElementById('certNameDisplay');
    const certDedicationDisplay = document.getElementById('certDedicationDisplay');
    const certDateDisplay = document.getElementById('certDateDisplay');
    const certIdDisplay = document.getElementById('certIdDisplay');

    // Live sync inputs to preview
    pledgeUserName.addEventListener('input', (e) => {
        certNameDisplay.innerText = e.target.value.trim() || "Ramesh Verma";
    });

    pledgeDedicatedTo.addEventListener('input', (e) => {
        certDedicationDisplay.innerText = `"${e.target.value.trim() || "For my daughter Ananya & my Mother"}"`;
    });

    // Set today's date
    const today = new Date();
    const dateStr = today.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    certDateDisplay.innerText = dateStr;
    certIdDisplay.innerText = `SS-${Math.floor(10000 + Math.random() * 90000)}`;

    const generateCertBtn = document.getElementById('generateCertificateBtn');
    generateCertBtn.addEventListener('click', () => {
        const name = pledgeUserName.value.trim();
        if (!name) {
            alert(currentLang === 'hi' ? "कृपया अपना नाम लिखें।" : "Please enter your name for the certificate.");
            return;
        }

        // Confetti celebration
        if (window.confetti) {
            confetti({
                particleCount: 80,
                spread: 70,
                origin: { y: 0.6 }
            });
        }

        // Increment counter
        const counterEl = document.getElementById('pledgeCounter');
        let count = parseInt(counterEl.innerText.replace(/,/g, ''));
        counterEl.innerText = (count + 1).toLocaleString();

        alert(currentLang === 'hi' ? 
            `बधाई हो ${name}! आपने अपने परिवार की सुरक्षा की पवित्र शपथ ली है। आप अपना सर्टिफिकेट डाउनलोड कर सकते हैं।` : 
            `Congratulations ${name}! You have taken the sacred oath for your family's safety. You can now download your certificate.`
        );
    });

    // Download Certificate as PNG via html2canvas
    document.getElementById('downloadCertBtn').addEventListener('click', () => {
        const certEl = document.getElementById('certificateContainer');
        if (window.html2canvas) {
            html2canvas(certEl, { scale: 2 }).then(canvas => {
                const link = document.createElement('a');
                link.download = `SurakshaSetu-Pledge-${certNameDisplay.innerText.replace(/\s+/g, '_')}.png`;
                link.href = canvas.toDataURL('image/png');
                link.click();
            });
        } else {
            alert("Download feature is loading, please try again in a moment.");
        }
    });

    // Share on WhatsApp
    document.getElementById('shareWhatsAppBtn').addEventListener('click', () => {
        const name = certNameDisplay.innerText;
        const msg = encodeURIComponent(`Maine aaj SurakshaSetu AI par apne parivaar ke naam par Traffic Rules follow karne ka Sankalp liya hai: "I will never risk my life for speed because my family is waiting for me at home." Aap bhi apne parivaar ke liye ye sankalp lijiye: https://surakshasetu.org`);
        window.open(`https://api.whatsapp.com/send?text=${msg}`, '_blank');
    });

    // ==========================================
    // 10. GOVERNMENT DEMANDS & CITIZEN REPORTING
    // ==========================================
    const govDemandsContainer = document.getElementById('govDemandsContainer');
    SURAKSHA_DATA.governmentDemands.forEach(item => {
        const card = document.createElement('div');
        card.className = "glass-card p-5 rounded-2xl border border-white/10 space-y-2";
        card.innerHTML = `
            <div class="flex items-center gap-2 text-purple-400 font-bold text-sm">
                <i data-lucide="${item.icon}" class="w-5 h-5"></i>
                <span>${currentLang === 'hi' ? item.titleHi : item.title}</span>
            </div>
            <p class="text-xs text-slate-300 leading-relaxed">${item.desc}</p>
        `;
        govDemandsContainer.appendChild(card);
    });

    // Hazard Grievance Generator
    const submitHazardBtn = document.getElementById('submitHazardBtn');
    submitHazardBtn.addEventListener('click', () => {
        const type = document.getElementById('hazardType').value;
        const location = document.getElementById('hazardLocation').value.trim();
        const desc = document.getElementById('hazardDesc').value.trim();

        if (!location || !desc) {
            alert("Please provide the exact location and description of the dangerous spot.");
            return;
        }

        const noticeText = `🚨 URGENT ROAD SAFETY GRIEVANCE:\nLocation: ${location}\nHazard: ${type}\nIssue: ${desc}\nUnder Section 198A of MV Act, authorities are liable for unattended road hazards causing fatal risk to innocent commuters.\nCc: @MORTHIndia @nitin_gadkari @dtptraffic #SurakshaSetu #RoadSafety`;

        const noticeBox = document.getElementById('hazardNoticeBox');
        noticeBox.classList.remove('hidden');
        document.getElementById('generatedNoticeText').innerText = noticeText;

        const tweetBtn = document.getElementById('tweetNoticeBtn');
        tweetBtn.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(noticeText)}`;
    });

    // ==========================================
    // 11. SOS MODAL LOGIC
    // ==========================================
    const sosModal = document.getElementById('sosModal');
    document.getElementById('openSosModalBtn').onclick = () => sosModal.classList.remove('hidden');
    document.getElementById('closeSosModalBtn').onclick = () => sosModal.classList.add('hidden');

    // Close modals on outside click
    window.onclick = (e) => {
        if (e.target === sosModal) sosModal.classList.add('hidden');
        if (e.target === tributeModal) tributeModal.classList.add('hidden');
    };
});
