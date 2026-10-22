// SurakshaSetu AI (सुरक्षा सेतु) - Traffic Rules, Statistics & Impact Database

const SURAKSHA_DATA = {
    statistics: {
        global: {
            annualDeaths: 1190000,
            dailyDeaths: 3260,
            deathsEverySeconds: 24,
            annualInjuries: 50000000,
            breadwinnerPercentage: 68.5,
            vulnerableRoadUsersPercentage: 54, // pedestrians, cyclists, two-wheelers
            lowMiddleIncomeCountryRatio: 92, // 92% of deaths in developing nations with only 60% of vehicles
            leadingCauseAgeGroup: "5 to 29 years",
            economicLossGlobalGDP: "3% of GDP (~$1.8 Trillion)"
        },
        india: {
            annualDeaths: 168491,
            dailyDeaths: 462,
            deathsPerHour: 19,
            annualInjuries: 443366,
            breadwinnerPercentage: 71.2, // 18-45 years age bracket
            twoWheelerDeathPercentage: 44.5,
            helmetNonUseDeaths: 50029,
            seatbeltNonUseDeaths: 16715,
            overspeedingDeathPercentage: 71.8,
            wrongSideDeathPercentage: 5.6,
            drunkDrivingFatalities: 4200,
            povertyTrapPercentage: 32.7 // 32.7% of victim families plunged below poverty line
        },
        violationsBreakdown: [
            { id: "speeding", nameEn: "Over-speeding", nameHi: "तेज़ रफ़्तार (Over-speeding)", percentage: 71.8, multiplier: "7.2x crash risk", legalPenalty: "₹1,000 - ₹2,000 + License Suspended" },
            { id: "helmet", nameEn: "No Helmet (Rider/Pillion)", nameHi: "हेलमेट न पहनना", percentage: 29.7, multiplier: "80% head trauma death risk", legalPenalty: "₹1,000 + 3 Months Suspension" },
            { id: "wrongside", nameEn: "Wrong-Side Driving", nameHi: "गलत दिशा में गाड़ी चलाना", percentage: 5.6, multiplier: "Head-on collision at combined speed", legalPenalty: "₹5,000 + 6 Months Prison" },
            { id: "redlight", nameEn: "Red Light Jumping", nameHi: "रेड लाइट तोड़ना", percentage: 4.8, multiplier: "T-Bone side impact vulnerability", legalPenalty: "₹1,000 - ₹5,000" },
            { id: "mobile", nameEn: "Mobile Phone Use while Driving", nameHi: "ड्राइविंग के समय फ़ोन का उपयोग", percentage: 3.9, multiplier: "400% slower reaction time", legalPenalty: "₹1,000 - ₹5,000" },
            { id: "dui", nameEn: "Drunk Driving (DUI)", nameHi: "शराब पीकर गाड़ी चलाना", percentage: 2.5, multiplier: "Loss of motor control & delayed braking", legalPenalty: "₹10,000 or 6 Months Prison" }
        ]
    },

    trafficRules: [
        {
            code: "SEC-129",
            ruleEn: "Mandatory Wearing of Protective Headgear (Helmet)",
            ruleHi: "सुरक्षात्मक हेलमेट अनिवार्य (धारा 129)",
            category: "Two-Wheeler",
            penalty: "₹1,000 fine + 3 months license disqualification",
            crashPhysics: "Without helmet, at 50 km/h, your skull hits concrete with 4,200 Newtons of force — identical to an 80kg hammer dropped from 4 meters. Results in instant basal skull fracture and fatal brain bleed.",
            familyImpact: "Two-wheeler riders are overwhelmingly between 18-35. When head trauma causes immediate demise, young children lose their father/mother overnight, school fees stop, and families face urgent debts for funerals and medical attempts.",
            tips: "Use only ISI / DOT certified full-face helmets. Strap it tightly; an unclipped helmet flies off before impact."
        },
        {
            code: "SEC-194B",
            ruleEn: "Mandatory Seatbelt for Driver and Passengers",
            ruleHi: "सीटबेल्ट न लगाना (धारा 194B)",
            category: "Four-Wheeler",
            penalty: "₹1,000 fine for front and rear passengers",
            crashPhysics: "At 60 km/h, an unrestrained passenger is catapulted forward with the momentum of an elephant projectile, smashing into windshield or steering column with lethal kinetic velocity.",
            familyImpact: "Seatbelts reduce fatality risk by 50-60%. Ignoring it turns survivable minor fender benders into fatal family catastrophes.",
            tips: "Both front and back seat passengers must click in before the vehicle moves."
        },
        {
            code: "SEC-183",
            ruleEn: "Driving at Speed Exceeding Specified Limit",
            ruleHi: "तय गति सीमा से अधिक तेज़ चलना (धारा 183)",
            category: "General",
            penalty: "₹1,000 - ₹2,000 for LMV; ₹2,000 - ₹4,000 for heavy vehicles",
            crashPhysics: "Braking distance increases exponentially with the square of speed. At 80 km/h in a 40 km/h zone, stopping distance triples from 18m to 58m. Impact survival probability drops below 12%.",
            familyImpact: "71% of road deaths are caused by speeding. In 10 seconds of hurry, a lifetime of family security, home stability, and children's smiles are permanently erased.",
            tips: "Speed gives you thrill for minutes, but caution gives you a full life with family."
        },
        {
            code: "SEC-185",
            ruleEn: "Driving under the Influence of Alcohol or Drugs",
            ruleHi: "शराब या नशीले पदार्थों के प्रभाव में वाहन चलाना (धारा 185)",
            category: "General",
            penalty: "₹10,000 fine and/or up to 6 months imprisonment (First offense)",
            crashPhysics: "Alcohol slows synaptic reflexes by 300ms to 800ms. At 60 km/h, your car travels 20 meters blind before your foot even touches the brake pedal.",
            familyImpact: "Drunk driving is not just an accident; it is criminal negligence that slaughters innocent pedestrians and shatters your own family's reputation, savings, and dignity.",
            tips: "Never drive after drinking. Keep a designated driver or book a cab."
        },
        {
            code: "SEC-184",
            ruleEn: "Dangerous Driving & Mobile Phone Distraction",
            ruleHi: "खतरनाक ड्राइविंग व मोबाइल का प्रयोग (धारा 184)",
            category: "General",
            penalty: "₹1,000 to ₹5,000 fine + 6 months to 1 year imprisonment",
            crashPhysics: "Looking down at a WhatsApp message for 4 seconds at 60 km/h means driving 66 meters completely blindfolded — the length of an entire cricket field.",
            familyImpact: "One notification or reel costs an innocent life. Is any message more urgent than reaching home safely to your mother or children?",
            tips: "Keep your phone in your bag or mount it for GPS only without touching during motion."
        },
        {
            code: "SEC-184-WL",
            ruleEn: "Jumping Traffic Red Signals & Wrong-Side Driving",
            ruleHi: "लाल बत्ती तोड़ना और गलत दिशा में चलना",
            category: "General",
            penalty: "₹5,000 fine, vehicle seizure, criminal charges",
            crashPhysics: "Wrong-side vehicles cause direct head-on collisions where relative impact velocity doubles (e.g., 50 km/h + 50 km/h = 100 km/h destructive energy), leaving zero crumple zone protection.",
            familyImpact: "Wrong-side drivers often kill innocent pedestrians and opposite commuters who never saw them coming, destroying multiple families simultaneously.",
            tips: "Take the extra 500 meters U-turn. Saving 2 minutes is not worth gambling 50 years of your life."
        }
    ],

    familyStories: [
        {
            id: 1,
            name: "Rajesh Sharma (Age 31)",
            city: "Jaipur, Rajasthan",
            role: "Sole Breadwinner & Delivery Rider",
            violation: "Skipped Helmet & Jumped Amber/Red Signal to make a delivery in 10 mins",
            image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80",
            consequence: "Suffered catastrophic head injury when hit by a truck at the crossing. Died on the spot.",
            familyCondition: "Left behind his wife Sunita (28), a 4-year-old daughter Aarohi, and a 68-year-old paralyzed father. Sunita had never worked outside; she had to pull Aarohi out of private school. She now washes dishes in 4 houses to afford one daily meal. The family is trapped in ₹3.5 lakh debt borrowed for Rajesh's ambulance and sudden funeral expenses.",
            quote: "\"Wo kehta tha 2 minute me aa raha hoon, helmet bike pe latka tha... Aaj 2 saal ho gaye, meri 4 saal ki bacchi roz darwaze pe khadi ho kar papa ka intezaar karti hai...\" - Sunita",
            audioText: "Rajesh Sharma ne 10 minute bachaane ke chakkar me helmet nahi pehna aur red light todi. Aaj unki 4 saal ki beti bhookhi soti hai aur school chhoot gaya hai."
        },
        {
            id: 2,
            name: "Amit & Priya Verma (Age 26 & 24)",
            city: "Lucknow, UP",
            role: "Newly married Software Engineer & Teacher",
            violation: "Over-speeding at 110 km/h on expressway, no rear seatbelts",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
            consequence: "Tire blowout caused car to flip 4 times. Both ejected out through windshield due to no seatbelt.",
            familyCondition: "Amit was the only son of elderly parents who had invested their entire life savings and pension into his education. Today, his 72-year-old father has to work as a night watchman in the cold winter because there is no one left to buy his heart medications.",
            quote: "\"Humein lagta tha seatbelt to sirf police se bachne ke liye hoti hai... Kaash kisi ne bataya hota ki seatbelt hamare budhape ka sahara bacha sakti thi.\"",
            audioText: "Amit ke maa baap ne apni saari pension uski padhai me laga di thi. Aaj unke 72 saal ke pitaji thand me chowkidari karte hain."
        },
        {
            id: 3,
            name: "Mohammad Farhan (Age 19)",
            city: "Bhopal, MP",
            role: "College student, eldest brother",
            violation: "Triple riding on motorcycle with friends, recording Instagram reel while driving",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
            consequence: "Skidded into a road divider. Two friends died, Farhan suffered severe cervical spine trauma leading to permanent quadriplegia (neck-down paralysis).",
            familyCondition: "His father, an auto-rickshaw driver, sold his vehicle to pay ₹8 Lakhs for ICU surgeries. Farhan is bedridden for life. The family has no steady income, and his younger sister had to stop studying to become his full-time nurse at home.",
            quote: "\"Doston ke sath reel banana tha... wo 15 second ka video meri poori family ki zindagi ka sabse bada andhera ban gaya.\"",
            audioText: "15 second ki reel aur triple riding ne Farhan ko hamesha ke liye bed pe daal diya aur uske papa ka auto bhi bikwa diya."
        }
    ],

    governmentDemands: [
        {
            title: "Universal Golden-Hour Cashless Trauma Care",
            titleHi: "गोल्डन ऑवर में 100% फ्री कैशलेस इलाज",
            desc: "Section 162 of MV Act mandates cashless treatment for accident victims during the golden hour (first 60 mins). Government must strictly penalize private hospitals that refuse treatment demanding upfront cash deposits.",
            icon: "hospital"
        },
        {
            title: "Strict AI-Enforced Automated Cameras",
            titleHi: "AI और स्वचालित कैमरों से 24x7 चालान",
            desc: "Human traffic policing is prone to corruption and selective stopping. Deploy AI ANPR cameras across all urban and rural blackspots with automated instant Challan SMS and mandatory suspension on 3rd offense.",
            icon: "camera"
        },
        {
            title: "Emergency Breadwinner Support & Solatium Fund",
            titleHi: "अचानक मृत्यु पर अनाथ परिवारों को तुरंत आर्थिक संबल",
            desc: "Fast-track Solatium scheme payouts (₹2,00,000 for death in Hit & Run) within 15 days instead of years in court, along with free ration cards and school fee waivers for orphaned kids of poor accident victims.",
            icon: "shield-alert"
        },
        {
            title: "Total Ban on Substandard Non-ISI Helmets",
            titleHi: "सड़क किनारे बिकने वाले नकली हेलमेट पर पूर्ण प्रतिबंध",
            desc: "Over 60% of two-wheeler riders buy ₹150 cheap plastic caps that shatter like eggshells on impact. Enforce criminal penalties on manufacturers and roadside vendors selling fake ISI stickers.",
            icon: "badge-check"
        }
    ],

    proactiveVoiceAlarms: {
        overspeed: {
            id: "overspeed",
            trigger: "Speed exceeds preset limit (>60 km/h in city)",
            sirenDurationMs: 1600,
            voices: {
                child: "पापा, गाड़ी धीरे चलाओ! मुझे आपके साथ बड़ा होना है, प्लीज तेज़ मत चलाओ!",
                mother: "बेटा आराम से चला! 70 की स्पीड पार हो गई है, घर पर तेरी मां इंतज़ार कर रही है, कोई जल्दी नहीं है!",
                police: "सावधान! आप तय गति सीमा 60 किलोमीटर प्रति घंटा पार कर चुके हैं। तुरंत ब्रेक लगाएं और गति नियंत्रित करें!"
            },
            voicesPhonetic: {
                child: "Papa, gaadi dheere chalao! Mujhe aapke sath bada hona hai, please tez mat chalao!",
                mother: "Beta aaram se chala! 70 ki speed paar ho gayi hai, ghar par teri maa intezaar kar rahi hai, koi jaldi nahi hai!",
                police: "Savdhan! Aap tay gati seema 60 kilometer prati ghanta paar kar chuke hain. Turant brake lagayein aur speed kam karein!"
            },
            voicesEn: {
                child: "Dad, please slow down! I want to play with you tonight, please don't overspeed!",
                mother: "Son, slow down! You have exceeded the speed limit. Your family is waiting at home.",
                police: "Attention commuter! Over-speeding detected beyond 60 km/h. Decelerate immediately."
            },
            hapticPattern: [400, 100, 400, 100, 800], // vibration pulses in ms
            smartwatchAlert: "⚠️ SPEED CRITICAL! SLOW DOWN!"
        },
        redlight: {
            id: "redlight",
            trigger: "Approaching active red light junction within 50 meters",
            sirenDurationMs: 1400,
            voices: {
                child: "पापा रुको! आगे लाल बत्ती है! 1 मिनट के लिए अपनी जान जोखिम में मत डालो!",
                mother: "रुक जा बेटा! आगे लाल बत्ती है, गाड़ी रोक ले, घर वाले सलामती चाहते हैं!",
                police: "चेतावनी! 40 मीटर पर रेड सिग्नल है। तुरंत स्टॉप लाइन से पहले रुकें, क्रॉसिंग का उल्लंघन न करें!"
            },
            voicesPhonetic: {
                child: "Papa ruko! Aage laal batti hai! Ek minute ke liye apni jaan jokhim me mat daalo!",
                mother: "Ruk ja beta! Aage laal batti hai, gaadi rok le, ghar wale salamat dekhna chahte hain!",
                police: "Chetavani! 40 meter par red signal hai. Turant stop line se pehle rukein, crossing ka ullanghan na karein!"
            },
            voicesEn: {
                child: "Stop Papa! Red light ahead! Don't cross, wait for the green signal!",
                mother: "Stop the vehicle! Red signal ahead, do not risk your life for 30 seconds.",
                police: "Warning! Red light ahead. Apply brakes and stop behind the stop line."
            },
            hapticPattern: [300, 150, 300, 150, 300],
            smartwatchAlert: "🛑 RED SIGNAL AHEAD! STOP!"
        },
        phoneDistraction: {
            id: "phoneDistraction",
            trigger: "Phone pickup / screen touch detected while vehicle is moving",
            sirenDurationMs: 1200,
            voices: {
                child: "पापा फोन नीचे रखो! गाड़ी चलाते समय बात मत करो, यह बहुत खतरनाक है!",
                mother: "फोन छोड़ दे बेटा! कोई भी कॉल या मैसेज तेरी ज़िन्दगी से बढ़कर नहीं है!",
                police: "खतरनाक ड्राइविंग अलर्ट! ड्राइविंग के दौरान मोबाइल का उपयोग गैरकानूनी है। तुरंत फोन नीचे रखें!"
            },
            voicesPhonetic: {
                child: "Papa phone niche rakho! Gaadi chalate samay baat mat karo, yeh bahut khatarnak hai!",
                mother: "Phone chhod de beta! Koi bhi call ya message teri zindagi se badhkar nahi hai!",
                police: "Khatarnak driving alert! Driving ke dauran mobile ka upayog gairkanooni hai. Turant phone niche rakhein!"
            },
            voicesEn: {
                child: "Put your phone down! Don't text while driving, it is dangerous!",
                mother: "Leave the phone! No call is more important than your life.",
                police: "Distraction Alert! Put down your mobile immediately."
            },
            hapticPattern: [200, 100, 200, 100, 200, 100, 500],
            smartwatchAlert: "📵 PUT DOWN PHONE NOW!"
        },
        lowBatteryHandoff: {
            id: "lowBatteryHandoff",
            trigger: "Mobile battery drops below 15% during driving",
            sirenDurationMs: 900,
            voices: {
                child: "फोन की बैटरी खत्म होने वाली है, अब आपकी स्मार्टवॉच आपको वाइब्रेट करके खतरे से बचाएगी!",
                mother: "फोन डिस्चार्ज हो रहा है, स्मार्टवॉच पर अलर्ट ट्रांसफर कर दिया गया है!",
                police: "सिस्टम सूचना: फोन की बैटरी कम है। इमरजेंसी सेफ्टी सिंक अब आपकी स्मार्टवॉच की कलाई पर एक्टिव है!"
            },
            voicesPhonetic: {
                child: "Phone ki battery khatam hone wali hai, ab aapki smartwatch aapko vibrate karke bachayegi!",
                mother: "Phone discharge ho raha hai, smartwatch par alert transfer kar diya gaya hai!",
                police: "System soochna: Phone ki battery kam hai. Emergency safety sync ab smartwatch par active hai!"
            },
            voicesEn: {
                child: "Phone battery is dying! Emergency guardian alerts transferred to your Smartwatch!",
                mother: "Phone discharging, alert synced with your smartwatch wrist haptics.",
                police: "Low battery detected. Safety guardian active on connected smartwatch."
            },
            hapticPattern: [600, 200, 600],
            smartwatchAlert: "🔋 SYNCED: WATCH GUARDIAN ACTIVE"
        }
    },

    childSafetyPleas: {
        speed: (name = "Aarohi") => `पापा, मैं ${name} बोल रही हूँ! गाड़ी धीरे चलाओ ना, मुझे बहुत डर लगता है! मुझे आपके साथ बड़ा होना है, प्लीज तेज़ मत चलाओ!`,
        helmet: (name = "Aarohi") => `पापा, मैं ${name} बोल रही हूँ! प्लीज़ हेलमेट पहन लो ना! मुझे आपके बिना बहुत अकेलापन लगेगा, अपने सर को बचा कर रखो!`,
        redlight: (name = "Aarohi") => `पापा रुको! आगे लाल बत्ती है! एक मिनट की जल्दी में हमारा भविष्य मत छीनो पापा, प्लीज़ रुक जाओ!`,
        phone: (name = "Aarohi") => `पापा, फोन नीचे रख दो! ड्राइविंग के समय बात मत करो, मुझे शाम को आपके गले लगना है!`,
        emotional: (name = "Aarohi") => `पापा, मुझे कोई खिलौना या चॉकलेट नहीं चाहिए! बस आप हर रोज़ सही सलामत घर आ जाया करो, मुझे आपके साथ खेलना है!`
    },

    childSafetyPleasPhonetic: {
        speed: (name = "Aarohi") => `Papa, main ${name} bol rahi hoon! Gaadi dheere chalao na, mujhe bahut darr lagta hai! Mujhe aapke sath bada hona hai, please tez mat chalao!`,
        helmet: (name = "Aarohi") => `Papa, main ${name} bol rahi hoon! Please helmet pehan lo na! Mujhe aapke bina bahut akelapan lagega, apne sar ko bacha kar rakho!`,
        redlight: (name = "Aarohi") => `Papa ruko! Aage laal batti hai! Ek minute ki jaldi me hamara bhavishya mat chheeno papa, please ruk jao!`,
        phone: (name = "Aarohi") => `Papa, phone niche rakh do! Driving ke samay baat mat karo, mujhe shaam ko aapke gale lagna hai!`,
        emotional: (name = "Aarohi") => `Papa, mujhe koi khilona ya chocolate nahi chahiye! Bas aap har roz sahi salamat ghar aa jaya karo, mujhe aapke sath khelna hai!`
    },

    childSafetyPleasEn: {
        speed: (name = "Aarohi") => `Papa, this is ${name}! Please slow down, I get scared! I want to grow up with you, please don't overspeed!`,
        helmet: (name = "Aarohi") => `Papa, this is ${name}! Please wear your helmet! Don't leave me alone in this world, keep yourself safe!`,
        redlight: (name = "Aarohi") => `Papa stop! Red light ahead! Don't risk our future for 30 seconds, please stop!`,
        phone: (name = "Aarohi") => `Papa, put your phone down! Focus on the road, I am waiting to hug you at home!`,
        emotional: (name = "Aarohi") => `Papa, I don't want toys or chocolates! I just want you to return home safe every single day!`
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = SURAKSHA_DATA;
}
