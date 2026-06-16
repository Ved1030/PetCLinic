import axios from "axios";
import { config } from "../config";
import { logger } from "../utils/logger";

// ──────────────────────────────────────
// System prompt for the AI (LLM) path
// ──────────────────────────────────────

const CLINIC_CONTEXT = `You are a compassionate and professional veterinary assistant for THE OZONE VETS clinic in Mumbai. Your role is to help pet owners with their concerns, provide general pet care guidance, and facilitate appointment booking.

CLINIC INFORMATION:
- Name: THE OZONE VETS
- Veterinarian: Dr. Komal
- Address: C3 SARANGA, Lokhandwala Complex Market, Bungalow, 3rd Cross Road, Opp. Cliff Tower, Andheri West, Mumbai 400053
- Phone: +91 98204 45010
- Email: hello@theozonevets.com
- Hours: Mon - Sat: 10:00 AM - 8:00 PM, Sunday: Closed

SERVICES OFFERED:
1. Veterinary Consultation - General health checkups, diagnosis, treatment
2. Vaccination - Core and optional vaccines for dogs and cats
3. Pet Grooming - Professional grooming, bathing, nail trimming, ear cleaning, de-shedding, hygiene grooming, tick & flea care
4. Blood Testing - Comprehensive blood panels, organ function tests
5. Digital X-Rays - Advanced diagnostic imaging
6. Ozone Therapy - Ozone treatment for various conditions
7. Acupuncture - Traditional Chinese veterinary acupuncture
8. Pet Boarding - Safe, comfortable boarding facility
9. Emergency Consultation - Urgent care for pets

YOUR PERSONALITY:
- Compassionate: Always acknowledge the pet owner's concern and show genuine empathy
- Professional: Provide accurate, safe, and helpful information
- Conversational: Sound natural and warm, not robotic or scripted
- Veterinary-focused: Always relate responses to pet health and wellbeing

RESPONSE GUIDELINES:
When a user shares a pet health concern, follow this structure:
1. ACKNOWLEDGE with empathy
2. INFORM with general, safe information about possible causes
3. ADVISE with home monitoring suggestions
4. RECOMMEND a veterinary consultation when appropriate
5. OFFER booking assistance

CONTEXT MEMORY - CRITICAL:
- Pay VERY CLOSE attention to the conversation history. Each message has a "role" (user/assistant) and "content".
- If a user previously asked about a service (e.g., grooming) and now says "Yes" or "Tell me more" or "Yes, on grooming", they are referring to that same service.
- If a user mentioned "my cat" in an earlier message, understand future messages are still about that cat unless they specify otherwise.
- Always check the LAST user message in context of previous messages to understand follow-ups.
- Examples of follow-up understanding:
  * User: "Do you offer pet grooming?" Bot: lists services. User: "Yes, on Pet Grooming" → Provide DETAILED grooming info
  * User: "Tell me about grooming" → Provide DETAILED grooming info
  * User: "What about grooming?" → Provide DETAILED grooming info
  * User: "More details" → Check what was last discussed and provide more detail
  * User: "Yes" or "Okay" → Check what was last offered/suggested

SERVICE-SPECIFIC RESPONSES:
When asked about a SPECIFIC service, provide DETAILED information about that service, not a generic list. Use the detailed info below:

Pet Grooming:
"We offer professional grooming services to keep your pet healthy, comfortable, and looking their best.
Services include: Bathing & Coat Cleaning, Hair Trimming & Styling, Nail Trimming, Ear Cleaning, Coat Brushing & De-shedding, Hygiene Grooming, Tick & Flea Care.
Suitable for dogs and cats."

Vaccination:
"We offer comprehensive vaccination services for dogs and cats including: Core vaccines (rabies, distemper, parvovirus, etc.) and optional vaccines based on lifestyle. Dr. Komal will recommend the best vaccination schedule based on your pet's age, lifestyle, and health status."

Veterinary Consultation:
"Our veterinary consultation service includes thorough physical examinations, health assessment, diagnosis and treatment planning, nutritional counseling, and preventive care advice. Dr. Komal provides compassionate, expert care for all pets."

Blood Testing:
"We offer comprehensive blood testing services including complete blood counts, biochemistry panels, organ function tests, thyroid testing, and more. Results are typically available quickly for prompt diagnosis."

Digital X-Rays:
"We have advanced digital X-ray facilities for rapid, high-quality diagnostic imaging with minimal radiation exposure. Ideal for evaluating bones, joints, chest, abdomen, and dental issues."

Ozone Therapy:
"Ozone therapy is one of our specialized treatments! It uses medical-grade ozone to improve oxygen utilization, boost the immune system, and treat various conditions. Dr. Komal has extensive experience in ozone therapy."

Acupuncture:
"Yes, we offer veterinary acupuncture! This traditional Chinese medicine technique can help with: Pain management, Arthritis, Neurological conditions, and overall wellness. Dr. Komal is trained in veterinary acupuncture."

Pet Boarding:
"We offer safe, comfortable pet boarding services! Our facility provides: Clean and comfortable accommodation, proper feeding and medication schedule, regular exercise and attention, and 24/7 supervision."

Emergency Consultation:
"If you have a pet emergency, please call us immediately at +91 98204 45010. For life-threatening emergencies, please visit the nearest emergency veterinary hospital. Do not wait if your pet is in distress."

BOOKING CTA:
After providing service information, ALWAYS ask if they'd like to book and include [Book Appointment] on its own line. Also include 📞 Call Clinic +91 98204 45010 as an alternative.

CRITICAL SAFETY RULES - YOU MUST NEVER:
- Diagnose a specific disease or condition
- Prescribe or recommend specific medications, dosages, or treatments
- Claim certainty about what is wrong with a pet
- Dismiss any symptom as unimportant
- Guarantee any outcome or prognosis

Instead, always:
- Use careful language: "this could be due to", "possible causes include", "it may be"
- Emphasize that only a veterinarian can provide a proper diagnosis after examination
- Recommend monitoring and professional evaluation

IMPORTANT - NEVER give generic responses like "We treat both dogs and cats" unless the user specifically asks about what types of pets you treat. Always be specific and helpful.

RESPONSE FORMAT:
- Helpful but not excessively long (2-4 paragraphs typically)
- Use bullet points with • for listing items
- End with a question or call to action
- Include [Book Appointment] on its own line when booking is appropriate
`;

// ──────────────────────────────────────
// Types
// ──────────────────────────────────────

interface ChatResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

interface ConversationContext {
  lastIntent: string | null;
  selectedService: string | null;
  petType: string;
}

interface ServiceEntry {
  name: string;
  keywords: string[];
  aliases: string[];
}

// ──────────────────────────────────────
// Service Knowledge Base
// ──────────────────────────────────────

const SERVICES: ServiceEntry[] = [
  {
    name: "grooming",
    keywords: ["groom", "bath", "nail trim", "haircut", "styling", "de-shed", "de-shedding", "coat brush", "hygiene groom"],
    aliases: ["pet grooming", "grooming services", "dog grooming", "cat grooming"],
  },
  {
    name: "vaccination",
    keywords: ["vaccin", "shot", "rabies", "distemper", "parvovirus", "vaccination schedule", "vaccinate"],
    aliases: ["vaccination", "vaccines", "shots"],
  },
  {
    name: "boarding",
    keywords: ["board", "daycare", "stay", "kennel", "overnight", "pet hotel"],
    aliases: ["pet boarding", "boarding facility", "boarding services"],
  },
  {
    name: "consultation",
    keywords: ["consult", "checkup", "check-up", "health check", "general check", "physical exam", "wellness exam"],
    aliases: ["consultation", "veterinary consultation", "health checkup"],
  },
  {
    name: "bloodTest",
    keywords: ["blood", "test", "lab", "blood work", "blood panel", "blood test", "biochemistry", "cbc"],
    aliases: ["blood testing", "blood test", "lab test"],
  },
  {
    name: "xray",
    keywords: ["x-ray", "xray", "radiograph", "imaging", "digital x-ray", "x ray"],
    aliases: ["digital x-ray", "x-ray", "radiology"],
  },
  {
    name: "ozoneTherapy",
    keywords: ["ozone", "ozone therapy"],
    aliases: ["ozone therapy", "ozone treatment"],
  },
  {
    name: "acupuncture",
    keywords: ["acupunct", "acupuncture"],
    aliases: ["acupuncture", "acupuncture therapy"],
  },
  {
    name: "emergency",
    keywords: ["emergency", "urgent", "emergency care"],
    aliases: ["emergency", "emergency consultation"],
  },
];

const SERVICE_RESPONSES: Record<string, (petType?: string) => string> = {
  grooming: () =>
    "🐾 Pet Grooming Services at THE OZONE VETS\n\nWe offer professional grooming services to keep your pet healthy, comfortable, and looking their best.\n\nServices include:\n• Bathing & Coat Cleaning\n• Hair Trimming & Styling\n• Nail Trimming\n• Ear Cleaning\n• Coat Brushing & De-shedding\n• Hygiene Grooming\n• Tick & Flea Care\n\nSuitable for:\n🐶 Dogs\n🐱 Cats\n\nTo check availability or schedule a grooming session:\n\n[Book Appointment]\n📞 Call us at +91 98204 45010",

  vaccination: () =>
    "💉 Vaccination Services at THE OZONE VETS\n\nWe offer comprehensive vaccination services to protect your pet from preventable diseases.\n\nVaccines available:\n• Core Vaccines: Rabies, Distemper, Parvovirus, Adenovirus\n• Optional Vaccines: Based on your pet's lifestyle and risk factors\n\nDr. Komal will recommend the best vaccination schedule based on your pet's age, health, and lifestyle.\n\nTo schedule a vaccination:\n\n[Book Appointment]\n📞 Call us at +91 98204 45010",

  boarding: () =>
    "🏠 Pet Boarding Services at THE OZONE VETS\n\nWe offer safe and comfortable boarding facilities for your pet while you're away.\n\nOur boarding includes:\n• Clean and comfortable accommodation\n• Proper feeding schedule\n• Regular exercise and playtime\n• Medication administration if needed\n• 24/7 supervision\n• Regular updates for pet parents\n\nContact us for availability and pricing:\n\n[Book Appointment]\n📞 Call us at +91 98204 45010",

  consultation: () =>
    "🩺 Veterinary Consultation at THE OZONE VETS\n\nOur comprehensive consultation service ensures your pet receives the best possible care.\n\nWhat's included:\n• Thorough physical examination\n• Health assessment and diagnosis\n• Treatment planning\n• Nutritional counseling\n• Preventive care advice\n• Parasite prevention guidance\n\nDr. Komal provides compassionate, expert care for all pets.\n\nTo book a consultation:\n\n[Book Appointment]\n📞 Call us at +91 98204 45010",

  bloodTest: () =>
    "🧪 Blood Testing Services at THE OZONE VETS\n\nWe offer comprehensive blood testing for accurate diagnosis and health monitoring.\n\nTests available:\n• Complete Blood Count (CBC)\n• Biochemistry Panels\n• Organ Function Tests (Liver, Kidney)\n• Thyroid Testing\n• Infection Screening\n\nResults are typically available quickly for prompt diagnosis and treatment.\n\nTo book a blood test:\n\n[Book Appointment]\n📞 Call us at +91 98204 45010",

  xray: () =>
    "📷 Digital X-Ray Services at THE OZONE VETS\n\nWe have advanced digital X-ray facilities for rapid, high-quality diagnostic imaging.\n\nBenefits:\n• Quick results with minimal radiation exposure\n• High-resolution images for accurate diagnosis\n• Ideal for evaluating: Bones & Joints, Chest & Abdomen, Dental Issues, Foreign Objects\n\nOur digital X-ray system helps Dr. Komal diagnose conditions quickly and accurately.\n\nTo book an X-ray:\n\n[Book Appointment]\n📞 Call us at +91 98204 45010",

  ozoneTherapy: () =>
    "💚 Ozone Therapy at THE OZONE VETS\n\nOzone therapy is one of our specialized treatments! This advanced therapy uses medical-grade ozone to promote healing and wellness.\n\nBenefits of Ozone Therapy:\n• Improves oxygen utilization\n• Boosts the immune system\n• Anti-inflammatory effects\n• Helps treat various conditions\n• Promotes faster healing\n\nDr. Komal has extensive experience in ozone therapy and can recommend if it's suitable for your pet.\n\nTo learn more or book a consultation:\n\n[Book Appointment]\n📞 Call us at +91 98204 45010",

  acupuncture: () =>
    "📍 Veterinary Acupuncture at THE OZONE VETS\n\nWe offer veterinary acupuncture as part of our holistic care approach!\n\nBenefits of Acupuncture:\n• Pain management\n• Arthritis relief\n• Neurological condition support\n• Improved mobility\n• Overall wellness\n\nDr. Komal is trained in veterinary acupuncture and can create a customized treatment plan for your pet.\n\nTo book an acupuncture session:\n\n[Book Appointment]\n📞 Call us at +91 98204 45010",

  emergency: () =>
    "🚨 Emergency Pet Care at THE OZONE VETS\n\nIf you have a pet emergency, please call us immediately at +91 98204 45010.\n\nOur team is available to handle urgent cases during clinic hours (Mon-Sat, 10 AM - 8 PM).\n\nFor life-threatening emergencies outside our hours, please visit the nearest emergency veterinary hospital. Do not wait if your pet is in distress.\n\n⚠️ Signs of emergency:\n• Difficulty breathing\n• Severe bleeding\n• Seizures\n• Poisoning\n• Trauma or injury\n• Inability to stand\n\n📞 Call us immediately: +91 98204 45010",
};

// ──────────────────────────────────────
// Conversation Context Extraction
// ──────────────────────────────────────

function extractContext(history: Array<{ role: string; content: string }>): ConversationContext {
  const ctx: ConversationContext = {
    lastIntent: null,
    selectedService: null,
    petType: "",
  };

  if (!history || history.length === 0) return ctx;

  const allText = history.map((m) => m.content.toLowerCase()).join(" ");

  // Pet type detection
  if (/my\s+cat|my\s+kitten|my\s+feline/i.test(allText)) ctx.petType = "cat";
  else if (/my\s+dog|my\s+puppy|my\s+canine/i.test(allText)) ctx.petType = "dog";
  else if (/my\s+pet/i.test(allText)) ctx.petType = "pet";

  // Find last assistant response to know what was discussed
  const lastBotIdx = findLastIndex(history, (m) => m.role === "assistant");
  const lastBotContent = lastBotIdx >= 0 ? history[lastBotIdx].content.toLowerCase() : "";

  // Find last user message to determine intent
  const lastUserIdx = findLastIndex(history, (m) => m.role === "user");
  const lastUserContent = lastUserIdx >= 0 ? history[lastUserIdx].content.toLowerCase() : "";

  // Detect service mentioned in last bot response (what was the bot talking about?)
  for (const svc of SERVICES) {
    if (svc.keywords.some((kw) => lastBotContent.includes(kw)) || svc.aliases.some((a) => lastBotContent.includes(a))) {
      ctx.selectedService = svc.name;
      break;
    }
  }

  // Detect intent from last user message
  ctx.lastIntent = detectServiceIntent(lastUserContent, history);

  // If no intent detected, check if the last bot offered services generically
  if (!ctx.lastIntent && lastBotContent.includes("would you like more details on any specific service")) {
    ctx.lastIntent = "service_list";
  }

  return ctx;
}

function findLastIndex<T>(arr: T[], predicate: (item: T) => boolean): number {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (predicate(arr[i])) return i;
  }
  return -1;
}

// ──────────────────────────────────────
// Intent Detection
// ──────────────────────────────────────

function detectServiceIntent(msg: string, history?: Array<{ role: string; content: string }>): string | null {
  const lower = msg.toLowerCase();

  // Direct service keyword matching
  for (const svc of SERVICES) {
    if (svc.keywords.some((kw) => lower.includes(kw))) {
      return svc.name;
    }
    if (svc.aliases.some((a) => lower.includes(a))) {
      return svc.name;
    }
  }

  // Follow-up patterns: "yes on [service]", "tell me about [service]", "what about [service]"
  for (const svc of SERVICES) {
    const svcWords = svc.aliases.concat(svc.keywords);
    for (const word of svcWords) {
      if (lower.includes(`on ${word}`) || lower.includes(`about ${word}`) || lower.includes(`on ${svc.name}`) || lower.includes(`about ${svc.name}`)) {
        return svc.name;
      }
    }
  }

  // Check for generic follow-ups that need context
  const followUpPatterns = [
    "yes", "yeah", "yep", "sure", "ok", "okay", "tell me more",
    "more details", "tell me about", "what about", "interested",
    "i'm interested", "i am interested", "sounds good", "that",
    "go on", "elaborate", "explain", "details",
  ];
  const isFollowUp = followUpPatterns.some((p) => lower.includes(p));

  if (isFollowUp && history && history.length > 0) {
    // Check if the last bot response mentioned a service
    const lastBot = [...history].reverse().find((m) => m.role === "assistant");
    if (lastBot) {
      const botLower = lastBot.content.toLowerCase();
      for (const svc of SERVICES) {
        if (svc.keywords.some((kw) => botLower.includes(kw)) || svc.aliases.some((a) => botLower.includes(a))) {
          return svc.name;
        }
      }
    }
  }

  // General intent detection
  if (lower.includes("appointment") || lower.includes("book") || lower.includes("schedule")) return "appointment";
  if (lower.includes("hour") || lower.includes("open") || lower.includes("timing") || lower.includes("time") || lower.includes("close")) return "hours";
  if (lower.includes("address") || lower.includes("location") || lower.includes("where") || lower.includes("find") || lower.includes("directions")) return "location";
  if (lower.includes("dr.") || lower.includes("dr ") || lower.includes("doctor") || lower.includes("vet") || lower.includes("komal")) return "doctor";
  if (lower.includes("price") || lower.includes("cost") || lower.includes("fee") || lower.includes("charge") || lower.includes("rate")) return "pricing";
  if (lower.includes("thank") || lower.includes("thanks")) return "thanks";
  if (lower.includes("hello") || lower.includes("hi ") || lower.includes("hey") || lower.includes("good morning") || lower.includes("good evening") || lower.includes("good afternoon")) return "greeting";

  // Service list inquiry
  if (lower.includes("service") || lower.includes("treatment") || lower.includes("offer") || lower.includes("provide") || lower.includes("do you have") || lower.includes("what do you")) return "service_list";

  return null;
}

// ──────────────────────────────────────
// Routing Logic
// ──────────────────────────────────────

function isHealthConcern(msg: string): boolean {
  const healthKeywords = [
    "not eating", "not drinking", "loss of appetite", "won't eat", "refusing to eat",
    "vomit", "vomiting", "throwing up", "regurgitat",
    "diarrhea", "diarrhoea", "loose stool", "loose motion", "upset stomach",
    "itch", "itching", "scratching", "skin", "rash", "redness", "hotspot",
    "ear", "ear infection", "ear smell", "shaking head",
    "tick", "flea", "parasite", "worms",
    "lame", "limping", "not walking", "favoring leg",
    "cough", "coughing", "sneeze", "sneezing", "breathing", "wheezing",
    "eye", "eye discharge", "red eye", "squinting",
    "dental", "teeth", "bad breath", "gum", "tooth",
    "weight loss", "weight gain", "fat", "overweight", "underweight",
    "lethargy", "lethargic", "weak", "tired", "sleepy", "low energy",
    "hair loss", "fur", "shedding", "bald",
    "swelling", "lump", "bump", "mass", "tumor",
    "pain", "hurting", "crying", "whining", "whimpering",
    "accident", "injury", "wound", "cut", "bleeding", "bruise",
    "seizure", "fit", "convulsion", "shaking",
    "urine", "urinating", "peeing", "blood in urine",
    "constipation", "constipated", "straining",
    "sick", "unwell", "ill", "disease",
    "puppy", "kitten", "new pet",
    "checkup", "check-up", "health check", "general check",
    "diet", "food", "nutrition", "feeding", "hungry",
    "behavior", "aggressive", "anxious", "scared", "barking",
  ];
  return healthKeywords.some((kw) => msg.includes(kw));
}

// ──────────────────────────────────────
// Fallback Response Builder
// ──────────────────────────────────────

function buildFallbackResponse(message: string, history: Array<{ role: string; content: string }> = []): string {
  const msg = message.toLowerCase().trim();
  const ctx = extractContext(history);

  // 1. Health concern takes highest priority
  if (isHealthConcern(msg)) {
    return buildHealthResponse(msg, ctx.petType || "pet");
  }

  // 2. Detect intent from current message (supports follow-ups via ctx)
  let intent = detectServiceIntent(msg, history);

  // 3. If current message is a follow-up (yes, tell me more, etc.) and context has service, use it
  if (!intent && ctx.selectedService) {
    const followUpWords = ["yes", "yeah", "yep", "sure", "ok", "okay", "tell me more", "more", "details", "that", "interested", "sounds good", "go on", "elaborate"];
    if (followUpWords.some((w) => msg.includes(w))) {
      intent = ctx.selectedService;
    }
  }

  // 4. Fall back to context last intent
  if (!intent) {
    intent = ctx.lastIntent;
  }

  // 5. Route based on intent
  if (intent && SERVICE_RESPONSES[intent]) {
    return SERVICE_RESPONSES[intent](ctx.petType);
  }

  // 6. General intent handling
  switch (intent) {
    case "greeting":
      return "👋 Welcome to THE OZONE VETS!\n\nI'm your veterinary care assistant. I can help you with:\n• Pet health concerns\n• Clinic information\n• Booking appointments with Dr. Komal\n\nHow can I help you and your pet today?";

    case "appointment":
      if (ctx.petType) {
        return `I'd be happy to help schedule an appointment for your ${ctx.petType}.\n\nPlease visit our appointment page to select a convenient date and time.\n\n[Book Appointment]`;
      }
      return "You can book an appointment online through our website's appointment page, or call us at +91 98204 45010.\n\nWould you like to schedule a consultation with Dr. Komal?\n\n[Book Appointment]";

    case "hours":
      return "🕐 Our Clinic Timings\n\nTHE OZONE VETS\nMonday – Saturday\n10:00 AM – 8:00 PM\n\n❌ Sunday: Closed\n\n📞 For emergencies, please call us immediately at +91 98204 45010.";

    case "location":
      return "📍 Our Location\n\nTHE OZONE VETS\nC3 SARANGA,\nLokhandwala Complex Market,\nBungalow, 3rd Cross Road,\nOpp. Cliff Tower, Andheri West,\nMumbai 400053\n\n📞 Phone: +91 98204 45010\n📧 Email: hello@theozonevets.com";

    case "doctor":
      return "👩‍⚕️ Meet Dr. Komal\n\nDr. Komal is our lead veterinarian at THE OZONE VETS, providing advanced veterinary care with compassion and expertise.\n\nSpecializations include:\n• Ozone Therapy\n• Acupuncture\n• Holistic Pet Care\n\nWould you like to book a consultation?\n\n[Book Appointment]";

    case "pricing":
      return "💰 Pricing\n\nFor detailed pricing information, I recommend calling us at +91 98204 45010. Prices vary depending on the service, pet size, and specific treatment required. We'd be happy to provide a personalized quote!";

    case "service_list":
      return "🏥 Our Services\n\nWe offer a wide range of veterinary services:\n\n• Veterinary Consultation\n• Vaccination\n• Pet Grooming\n• Blood Testing\n• Digital X-Rays\n• Ozone Therapy\n• Acupuncture\n• Pet Boarding\n• Emergency Consultation\n\nWould you like more details on any specific service?";

    case "thanks":
      return "You're welcome! 😊\n\nIf you have any more questions, feel free to ask. We're always here to help you and your pet.\n\nWishing your pet good health and happiness! 🐾❤️";

    default:
      break;
  }

  // 7. Last resort - handle explicit keyword matches
  if (msg.includes("hello") || msg.includes("hi ") || msg.includes("hey") || msg.includes("good morning") || msg.includes("good evening")) {
    return "👋 Welcome to THE OZONE VETS!\n\nI'm your veterinary care assistant. I can help you with:\n• Pet health concerns\n• Clinic information\n• Booking appointments with Dr. Komal\n\nHow can I help you and your pet today?";
  }

  if (msg.includes("appointment") || msg.includes("book") || msg.includes("schedule")) {
    if (ctx.petType) {
      return `I'd be happy to help schedule an appointment for your ${ctx.petType}.\n\nPlease visit our appointment page to select a convenient date and time.\n\n[Book Appointment]`;
    }
    return "You can book an appointment online through our website's appointment page, or call us at +91 98204 45010.\n\nWould you like to schedule a consultation with Dr. Komal?\n\n[Book Appointment]";
  }

  if (msg.includes("hour") || msg.includes("open") || msg.includes("timing") || msg.includes("time")) {
    return "🕐 Our Clinic Timings\n\nTHE OZONE VETS\nMonday – Saturday\n10:00 AM – 8:00 PM\n\n❌ Sunday: Closed\n\n📞 For emergencies, please call us immediately at +91 98204 45010.";
  }

  if (msg.includes("address") || msg.includes("location") || msg.includes("where") || msg.includes("find")) {
    return "📍 Our Location\n\nTHE OZONE VETS\nC3 SARANGA,\nLokhandwala Complex Market,\nBungalow, 3rd Cross Road,\nOpp. Cliff Tower, Andheri West,\nMumbai 400053\n\n📞 Phone: +91 98204 45010\n📧 Email: hello@theozonevets.com";
  }

  if (msg.includes("dr.") || msg.includes("dr ") || msg.includes("doctor") || msg.includes("vet")) {
    return "👩‍⚕️ Meet Dr. Komal\n\nDr. Komal is our lead veterinarian at THE OZONE VETS, providing advanced veterinary care with compassion and expertise.\n\nSpecializations include:\n• Ozone Therapy\n• Acupuncture\n• Holistic Pet Care\n\nWould you like to book a consultation?\n\n[Book Appointment]";
  }

  if (msg.includes("service") || msg.includes("treatment") || msg.includes("offer")) {
    return "🏥 Our Services\n\nWe offer a wide range of veterinary services:\n\n• Veterinary Consultation\n• Vaccination\n• Pet Grooming\n• Blood Testing\n• Digital X-Rays\n• Ozone Therapy\n• Acupuncture\n• Pet Boarding\n• Emergency Consultation\n\nWould you like more details on any specific service?";
  }

  if (msg.includes("price") || msg.includes("cost") || msg.includes("fee") || msg.includes("charge") || msg.includes("rate")) {
    return "💰 Pricing\n\nFor detailed pricing information, I recommend calling us at +91 98204 45010. Prices vary depending on the service, pet size, and specific treatment required. We'd be happy to provide a personalized quote!";
  }

  if (msg.includes("thank")) {
    return "You're welcome! 😊\n\nIf you have any more questions, feel free to ask. We're always here to help you and your pet.\n\nWishing your pet good health and happiness! 🐾❤️";
  }

  if (msg.includes("cat") || msg.includes("dog") || msg.includes("puppy") || msg.includes("kitten") || msg.includes("pet")) {
    return "🐾 Compassionate Care for All Pets\n\nWe treat both dogs and cats at THE OZONE VETS. Dr. Komal provides compassionate, expert care for all pets.\n\nDo you have a specific concern about your pet? I'd be happy to help.";
  }

  return "Thank you for reaching out to THE OZONE VETS! 🏥\n\nI'm your veterinary care assistant, here to help with:\n• Pet health questions\n• Clinic information\n• Appointment booking\n\nHow can I assist you and your pet today?";
}

// ──────────────────────────────────────
// Health Response Builder (unchanged)
// ──────────────────────────────────────

function buildHealthResponse(msg: string, pet: string): string {
  if (msg.includes("not eating") || msg.includes("loss of appetite") || msg.includes("won't eat") || msg.includes("refusing to eat")) {
    return `I'm sorry to hear that your ${pet} isn't eating.

A loss of appetite can happen due to stress, digestive upset, fever, dental issues, infections, or other medical conditions.

Please monitor:
• Water intake
• Vomiting or regurgitation
• Diarrhea
• Lethargy or weakness
• Any other unusual behavior

If your ${pet} has not eaten for more than 24 hours or appears weak, we recommend a veterinary examination as soon as possible. Dr. Komal and our team at THE OZONE VETS can help assess the cause and provide appropriate treatment.

Would you like me to help you book an appointment?

[Book Appointment]`;
  }

  if (msg.includes("vomit") || msg.includes("throwing up")) {
    return `I'm sorry your ${pet} is vomiting.

Vomiting can be caused by dietary indiscretion, infections, parasites, or more serious conditions. Please note:
• How often is your ${pet} vomiting?
• Is there blood in the vomit?
• Is your ${pet} able to keep water down?
• Any diarrhea or lethargy?

If vomiting persists for more than 12 hours, contains blood, or your ${pet} is also lethargic, please seek veterinary care. Dr. Komal can examine your ${pet} to determine the cause.

Would you like to schedule a consultation?

[Book Appointment]`;
  }

  if (msg.includes("diarrhea") || msg.includes("diarrhoea") || msg.includes("loose stool") || msg.includes("loose motion")) {
    return `I'm sorry your ${pet} is having loose stools.

Diarrhea can result from dietary changes, stress, infections, parasites, or other issues. Please monitor:
• Frequency and consistency of stools
• Presence of blood or mucus
• Vomiting
• Appetite and water intake
• Energy levels

If diarrhea continues beyond 24 hours, contains blood, or your ${pet} seems unwell, we recommend a veterinary checkup. Dr. Komal can help identify the cause and recommend supportive care.

Would you like to book an appointment?

[Book Appointment]`;
  }

  if (msg.includes("itch") || msg.includes("scratching") || msg.includes("skin") || msg.includes("rash")) {
    return `It must be uncomfortable for your ${pet} to be scratching like that.

Excessive scratching can be caused by allergies, dry skin, parasites like fleas or ticks, or skin infections.

Please check for:
• Redness or rash
• Fleas or ticks
• Hair loss or bald patches
• Dry or flaky skin
• Any unusual odor

A veterinary examination can help identify the cause and provide relief. Dr. Komal can recommend the appropriate treatment for your ${pet}'s skin condition.

Would you like to schedule a consultation?

[Book Appointment]`;
  }

  if (msg.includes("ear") || msg.includes("shaking head")) {
    return `I'm sorry your ${pet} is having ear trouble.

Ear issues can be caused by infections, allergies, ear mites, or trapped debris. Look for:
• Head shaking or tilting
• Scratching at the ear
• Redness or swelling
• Discharge or bad odor
• Pain when touched

Ear problems can be uncomfortable and may worsen without treatment. Dr. Komal can examine your ${pet}'s ears and recommend appropriate care.

Would you like to book an appointment?

[Book Appointment]`;
  }

  if (msg.includes("tick") || msg.includes("flea") || msg.includes("parasite")) {
    return `Ticks and fleas can be quite troublesome for pets.

These parasites can cause itching, skin irritation, and may transmit diseases. It's important to:
• Check your ${pet}'s entire body, especially ears, neck, and paws
• Use appropriate tick/flea prevention
• Keep your home and environment clean

Dr. Komal can recommend safe and effective tick and flea prevention products for your ${pet}.

Would you like to schedule a consultation?

[Book Appointment]`;
  }

  if (msg.includes("lame") || msg.includes("limp") || msg.includes("not walking")) {
    return `I'm sorry to hear your ${pet} is limping.

Limping can result from injuries, arthritis, paw problems, or other orthopedic issues. Please check:
• Is there any visible wound or swelling?
• Which leg is affected?
• Is your ${pet} bearing any weight on it?
• Any signs of pain when touched?

If your ${pet} is not bearing weight on the leg or seems in pain, please have Dr. Komal examine them.

Would you like to book an appointment?

[Book Appointment]`;
  }

  if (msg.includes("cough") || msg.includes("sneeze") || msg.includes("breathing")) {
    return `I'm concerned to hear about your ${pet}'s breathing.

Coughing or sneezing can be due to respiratory infections, allergies, or other conditions. Please monitor:
• Frequency of coughing or sneezing
• Nasal or eye discharge
• Difficulty breathing or wheezing
• Appetite and energy levels
• Any bluish tint to gums

If your ${pet} is having difficulty breathing, please seek immediate veterinary attention.

Would you like to schedule a consultation?

[Book Appointment]`;
  }

  if (msg.includes("eye") || msg.includes("eye discharge") || msg.includes("red eye")) {
    return `I'm sorry your ${pet} is having eye issues.

Eye problems can result from infections, allergies, injuries, or more serious conditions. Please look for:
• Discharge or tearing
• Redness or swelling
• Squinting or keeping the eye closed
• Cloudiness or changes in appearance

Eye issues should be evaluated promptly to prevent complications. Dr. Komal can examine your ${pet}'s eyes.

Would you like to book an appointment?

[Book Appointment]`;
  }

  if (msg.includes("dental") || msg.includes("teeth") || msg.includes("bad breath") || msg.includes("gum")) {
    return `Dental health is very important for your ${pet}'s overall wellbeing.

Signs of dental problems include:
• Bad breath
• Yellow or brown buildup on teeth
• Red or bleeding gums
• Difficulty eating or dropping food
• Pawing at the mouth

Untreated dental disease can lead to pain, infection, and even affect internal organs. Dr. Komal can perform a dental examination and recommend appropriate care.

Would you like to schedule a dental checkup?

[Book Appointment]`;
  }

  if (msg.includes("lethargy") || msg.includes("lethargic") || msg.includes("weak") || msg.includes("tired") || msg.includes("low energy")) {
    return `I'm sorry your ${pet} seems lethargic.

Lethargy can be a sign of many conditions including infections, metabolic issues, pain, or other health problems. Please monitor:
• Appetite and water intake
• Vomiting or diarrhea
• Breathing patterns
• Any other symptoms

If your ${pet} has been lethargic for more than 24 hours or is getting worse, we recommend a veterinary evaluation.

Would you like to book an appointment?

[Book Appointment]`;
  }

  if (msg.includes("vaccin") || msg.includes("shot") || msg.includes("rabies")) {
    return `Vaccinations are essential for your ${pet}'s health!

We offer comprehensive vaccination services for dogs and cats including:
• Core vaccines (rabies, distemper, parvovirus, etc.)
• Optional vaccines based on lifestyle

Dr. Komal will recommend the best vaccination schedule based on your ${pet}'s age, health, and lifestyle.

Would you like to book a vaccination appointment?

[Book Appointment]`;
  }

  if (msg.includes("checkup") || msg.includes("check-up") || msg.includes("health check") || msg.includes("general check")) {
    return `Regular checkups are important for keeping your ${pet} healthy!

A wellness examination typically includes:
• Physical examination
• Weight and vital signs check
• Dental assessment
• Vaccination review
• Parasite prevention discussion

Dr. Komal would be happy to see your ${pet} for a thorough checkup.

Would you like me to help you book an appointment?

[Book Appointment]`;
  }

  if (msg.includes("diet") || msg.includes("food") || msg.includes("nutrition") || msg.includes("feeding")) {
    return `Proper nutrition is key to your ${pet}'s health.

A balanced diet depends on your ${pet}'s age, breed, size, and health condition. If you have concerns about:
• Weight management
• Food allergies
• Appropriate diet for puppies/kittens vs adults
• Special dietary needs for medical conditions

Dr. Komal can provide personalized dietary recommendations during a consultation.

Would you like to schedule a nutrition consultation?

[Book Appointment]`;
  }

  return `I understand you're concerned about your ${pet}.

For any health concern, it's always best to monitor your ${pet} closely and consult a veterinarian if symptoms persist or worsen.

Dr. Komal at THE OZONE VETS would be happy to examine your ${pet} and provide professional guidance.

Would you like to book an appointment?

[Book Appointment]`;
}

// ──────────────────────────────────────
// Exported Service
// ──────────────────────────────────────

export const chatService = {
  async sendMessage(message: string, history: Array<{ role: string; content: string }> = []): Promise<string> {
    const messages = [
      { role: "system", content: CLINIC_CONTEXT },
      ...history.map((m) => ({ role: m.role, content: m.content })),
      { role: "user", content: message },
    ];

    if (config.sarvamApiKey) {
      try {
        const response = await axios.post<ChatResponse>(
          config.sarvamApiUrl,
          {
            model: "sarvam-1",
            messages,
            temperature: 0.8,
            max_tokens: 800,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "api-key": config.sarvamApiKey,
            },
            timeout: 30000,
          }
        );
        return response.data.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response. Please try again.";
      } catch (error) {
        logger.error("Sarvam AI API error:", error);
      }
    }

    return buildFallbackResponse(message, history);
  },
};
