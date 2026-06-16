import axios from "axios";
import { config } from "../config";
import { logger } from "../utils/logger";

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
3. Pet Grooming - Professional grooming, bathing, nail trimming, ear cleaning
4. Blood Testing - Comprehensive blood panels, organ function tests
5. Digital X-Rays - Advanced diagnostic imaging
6. Ozone Therapy - Ozone treatment for various conditions
7. Acupuncture - Traditional Chinese veterinary acupuncture
8. Pet Boarding - Safe, comfortable boarding facility
9. Emergency Consultation - Urgent care for pets
10. Preventive Healthcare - Regular wellness programs

YOUR PERSONALITY:
- Compassionate: Always acknowledge the pet owner's concern and show genuine empathy
- Professional: Provide accurate, safe, and helpful information
- Conversational: Sound natural and warm, not robotic or scripted
- Veterinary-focused: Always relate responses to pet health and wellbeing

RESPONSE GUIDELINES:
When a user shares a pet health concern, follow this structure:
1. ACKNOWLEDGE with empathy ("I'm sorry to hear that your cat isn't eating.")
2. INFORM with general, safe information about possible causes
3. ADVISE with home monitoring suggestions (water intake, behavior, symptoms to watch)
4. RECOMMEND a veterinary consultation when appropriate
5. OFFER booking assistance

KNOWLEDGE AREAS - You can discuss these topics:
- Dogs, cats, puppies, kittens
- Vaccinations and preventive care schedules
- Loss of appetite, vomiting, diarrhea
- Skin problems, itching, allergies, hotspots
- Ear infections and ear care
- Tick and flea prevention and treatment
- Grooming, hygiene, nail trimming
- Diet, nutrition, weight management
- Dental care and dental disease
- Kidney disease, diabetes, and other common conditions
- Emergency symptoms and when to seek urgent care
- General pet care, behavior, and wellness
- Clinic services and appointments

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

BOOKING INTEGRATION:
When a user reports symptoms, health concerns, or asks for a checkup, end your response by asking if they'd like to book and include [Book Appointment] on its own line.

When a user says something like "for checkup", "book it", "yes please" after you offered booking, respond by confirming and asking them to select a date. Say: "I'd be happy to help schedule an appointment for your [pet]. Please visit our appointment page to select a convenient date and time. [Book Appointment]"

CONTEXT MEMORY:
Pay close attention to conversation history. If a user previously mentioned "my cat" and later says "for a checkup", understand they want a checkup for their cat. Reference their pet type and previous concern when relevant.

RESPONSE FORMAT:
- Helpful but not excessively long (2-4 paragraphs typically)
- Use bullet points with • for listing symptoms, causes, or monitoring tips
- End with a question or call to action to engage the user
- Include [Book Appointment] on its own line when booking is appropriate

EXAMPLE RESPONSES:

User: "My cat is not eating from 1 day"
Assistant: "I'm sorry to hear that your cat isn't eating.

A loss of appetite for 24 hours can happen due to stress, digestive upset, fever, dental issues, infections, or other medical conditions.

Please monitor:
• Water intake
• Vomiting
• Diarrhea
• Lethargy
• Difficulty breathing

If your cat has not eaten for more than 24 hours or appears weak, we recommend a veterinary examination. Dr. Komal and our team can help assess the cause.

Would you like me to help you book an appointment?

[Book Appointment]"

User: "My dog is scratching a lot"
Assistant: "It must be concerning to see your dog uncomfortable.

Excessive scratching can be caused by allergies, dry skin, parasites like fleas or ticks, or skin infections.

Please check for:
• Redness or rash
• Fleas or ticks
• Hair loss
• Dry or flaky skin

A veterinary examination can help identify the cause and provide relief. Dr. Komal can recommend the appropriate treatment.

Would you like to schedule a consultation?

[Book Appointment]"

For general clinic questions about services, hours, or location, answer directly and warmly.
For pricing, suggest calling the clinic.
If you don't know something, be honest and suggest contacting the clinic.`;

interface ChatResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

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

    return this.getFallbackResponse(message, history);
  },

  getFallbackResponse(message: string, history: Array<{ role: string; content: string }> = []): string {
    const msg = message.toLowerCase();

    const lastPetContext = this.extractPetContext(history);

    if (this.hasHealthConcern(msg)) {
      return this.buildHealthResponse(msg, lastPetContext);
    }

    if (msg.includes("hello") || msg.includes("hi ") || msg.includes("hey") || msg.includes("good morning") || msg.includes("good evening")) {
      return "Hello! Welcome to THE OZONE VETS. I'm your veterinary care assistant. How can I help you and your pet today? You can ask me about our services, pet health concerns, or book an appointment with Dr. Komal.";
    }

    if (msg.includes("appointment") || msg.includes("book") || msg.includes("schedule")) {
      if (lastPetContext) {
        return `I'd be happy to help schedule an appointment for your ${lastPetContext}. Please visit our appointment page to select a convenient date and time.\n\n[Book Appointment]`;
      }
      return "You can book an appointment online through our website's appointment page, or call us at +91 98204 45010. Would you like to schedule a consultation with Dr. Komal?\n\n[Book Appointment]";
    }

    if (msg.includes("hour") || msg.includes("open") || msg.includes("timing") || msg.includes("time")) {
      return "We are open Monday to Saturday from 10:00 AM to 8:00 PM. We are closed on Sundays. For emergencies, please call us immediately at +91 98204 45010.";
    }

    if (msg.includes("address") || msg.includes("location") || msg.includes("where") || msg.includes("find")) {
      return "We are located at C3 SARANGA, Lokhandwala Complex Market, Bungalow, 3rd Cross Road, Opp. Cliff Tower, Andheri West, Mumbai 400053. You can call us at +91 98204 45010 for directions.";
    }

    if (msg.includes("dr. komal") || msg.includes("doctor") || msg.includes("vet")) {
      return "Dr. Komal is our lead veterinarian at THE OZONE VETS, providing advanced veterinary care with compassion. Dr. Komal specializes in ozone therapy, acupuncture, and holistic pet care. Would you like to book a consultation?\n\n[Book Appointment]";
    }

    if (msg.includes("service") || msg.includes("treatment") || msg.includes("offer")) {
      return "We offer a wide range of services including: Veterinary Consultation, Vaccination, Pet Grooming, Blood Testing, Digital X-Rays, Ozone Therapy, Acupuncture, Pet Boarding, and Emergency Consultation. Would you like more details on any specific service?";
    }

    if (msg.includes("groom") || msg.includes("bath") || msg.includes("nail")) {
      return "Our pet grooming service includes professional bathing, brushing, nail trimming, ear cleaning, and breed-specific styling. Prices vary based on pet size and coat condition. Call +91 98204 45010 for a quote or book an appointment!\n\n[Book Appointment]";
    }

    if (msg.includes("board") || msg.includes("daycare") || msg.includes("stay")) {
      return "Yes, we offer pet boarding services! Our facility is safe, clean, and comfortable. Your pet will receive proper care, feeding, and attention. Contact us at +91 98204 45010 for availability and pricing.";
    }

    if (msg.includes("ozone") || msg.includes("ozone therapy")) {
      return "Ozone therapy is one of our specialized treatments! It uses medical-grade ozone to improve oxygen utilization, boost the immune system, and treat various conditions. Dr. Komal has extensive experience in ozone therapy. Call +91 98204 45010 to learn more.";
    }

    if (msg.includes("acupuncture") || msg.includes("acupunct")) {
      return "Yes, we offer veterinary acupuncture! This traditional Chinese medicine technique can help with pain management, arthritis, neurological conditions, and overall wellness. Dr. Komal is trained in veterinary acupuncture.";
    }

    if (msg.includes("price") || msg.includes("cost") || msg.includes("fee") || msg.includes("charge") || msg.includes("rate")) {
      return "For detailed pricing information, I recommend calling us at +91 98204 45010. Prices vary depending on the service, pet size, and specific treatment required. We'd be happy to provide a quote!";
    }

    if (msg.includes("emergency") || msg.includes("urgent")) {
      return "If you have a pet emergency, please call us immediately at +91 98204 45010. For life-threatening emergencies, please visit the nearest emergency veterinary hospital. Do not wait if your pet is in distress.";
    }

    if (msg.includes("vaccin") || msg.includes("shot") || msg.includes("rabies") || msg.includes("vaccination")) {
      return "We offer comprehensive vaccination services for dogs and cats including core vaccines and optional vaccines. Dr. Komal will recommend the best vaccination schedule based on your pet's age, lifestyle, and health status. Call +91 98204 45010 for more details or book an appointment.\n\n[Book Appointment]";
    }

    if (msg.includes("blood") || msg.includes("test") || msg.includes("lab")) {
      return "We offer comprehensive blood testing services including complete blood counts, biochemistry panels, organ function tests, and more. Results are typically available quickly for prompt diagnosis.";
    }

    if (msg.includes("x-ray") || msg.includes("xray") || msg.includes("radiograph") || msg.includes("imaging")) {
      return "We have digital X-ray facilities for advanced diagnostic imaging. Digital X-rays provide quick, high-quality images with minimal radiation exposure for your pet.";
    }

    if (msg.includes("cat") || msg.includes("dog") || msg.includes("puppy") || msg.includes("kitten") || msg.includes("pet")) {
      return "We treat both dogs and cats at THE OZONE VETS. Dr. Komal provides compassionate care for all pets. Do you have a specific concern about your pet? I'd be happy to help.";
    }

    if (msg.includes("thank")) {
      return "You're welcome! If you have any more questions, feel free to ask. We're here to help you and your pet. Wishing your pet good health!";
    }

    return "Thank you for reaching out to THE OZONE VETS. I'm your veterinary care assistant, here to help with pet health questions, clinic information, or appointment booking. How can I assist you and your pet today?";
  },

  hasHealthConcern(msg: string): boolean {
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
  },

  extractPetContext(history: Array<{ role: string; content: string }>): string {
    if (!history || history.length === 0) return "";

    const allText = history
      .map((m) => m.content.toLowerCase())
      .join(" ");

    if (allText.includes("my cat") || allText.includes("my kitten") || allText.includes("my feline")) return "cat";
    if (allText.includes("my dog") || allText.includes("my puppy") || allText.includes("my canine")) return "dog";
    if (allText.includes("my pet")) return "pet";
    return "";
  },

  buildHealthResponse(msg: string, petContext: string): string {
    const pet = petContext || "pet";

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
  },
};
