import { Service, GalleryItem, Testimonial } from "../types";

export const staticDataService = {
  async getServices(): Promise<Service[]> {
    return [
      {
        id: "1",
        title: "Wellness Exams",
        description: "Comprehensive health check-ups to keep your pet healthy and catch issues early.",
        icon: "HeartPulse",
        features: ["Physical examination", "Vaccination review", "Dental check", "Weight assessment"],
      },
      {
        id: "2",
        title: "Vaccinations",
        description: "Essential vaccinations to protect your pet from common diseases.",
        icon: "ShieldCheck",
        features: ["Core vaccines", "Bordetella", "Rabies", "DHPP/FVRCP"],
      },
      {
        id: "3",
        title: "Dental Care",
        description: "Professional dental cleaning and oral health services for your pet.",
        icon: "Tooth",
        features: ["Dental cleaning", "X-rays", "Extractions", "Oral surgery"],
      },
      {
        id: "4",
        title: "Surgery",
        description: "Advanced surgical procedures with state-of-the-art equipment.",
        icon: "Stethoscope",
        features: ["Spay/neuter", "Soft tissue surgery", "Orthopedic surgery", "Emergency surgery"],
      },
      {
        id: "5",
        title: "Diagnostics",
        description: "Advanced diagnostic tools for accurate and rapid diagnosis.",
        icon: "Microscope",
        features: ["Blood work", "Digital X-rays", "Ultrasound", "Laboratory testing"],
      },
      {
        id: "6",
        title: "Grooming",
        description: "Full-service grooming to keep your pet looking and feeling their best.",
        icon: "Scissors",
        features: ["Bath & brush", "Haircuts", "Nail trimming", "Ear cleaning"],
      },
    ];
  },

  async getGallery(): Promise<GalleryItem[]> {
    return [
      { id: "1", src: "/images/gallery-1.jpg", alt: "Happy dog after treatment", category: "dogs" },
      { id: "2", src: "/images/gallery-2.jpg", alt: "Cat recovering from surgery", category: "cats" },
      { id: "3", src: "/images/gallery-3.jpg", alt: "Pet dental procedure", category: "treatments" },
      { id: "4", src: "/images/gallery-4.jpg", alt: "Grooming session", category: "grooming" },
      { id: "5", src: "/images/gallery-5.jpg", alt: "Vaccination day", category: "treatments" },
      { id: "6", src: "/images/gallery-6.jpg", alt: "Playful puppy check-up", category: "dogs" },
      {
        id: "7",
        src: "/images/gallery-7.jpg",
        alt: "Before grooming",
        category: "grooming",
        before: "/images/before-1.jpg",
        after: "/images/after-1.jpg",
      },
      {
        id: "8",
        src: "/images/gallery-8.jpg",
        alt: "Dental cleaning result",
        category: "treatments",
        before: "/images/before-2.jpg",
        after: "/images/after-2.jpg",
      },
    ];
  },

  async getTestimonials(): Promise<Testimonial[]> {
    return [
      {
        id: "1",
        name: "Sarah Johnson",
        petName: "Max",
        content: "The team at PetClinic took amazing care of my golden retriever. Their compassion and expertise are unmatched!",
        rating: 5,
      },
      {
        id: "2",
        name: "Michael Chen",
        petName: "Luna",
        content: "I've been bringing my cat here for years. The veterinarians are knowledgeable and truly care about animal welfare.",
        rating: 5,
      },
      {
        id: "3",
        name: "Emily Rodriguez",
        petName: "Buddy",
        content: "Outstanding service! The dental cleaning transformed my dog's health. Highly recommend their preventive care programs.",
        rating: 5,
      },
      {
        id: "4",
        name: "David Park",
        petName: "Coco",
        content: "State-of-the-art facility with the friendliest staff. They made my anxious pomeranian feel completely at ease.",
        rating: 5,
      },
    ];
  },

  async getStats() {
    return {
      patientsTreated: 15000,
      yearsOfExperience: 25,
      satisfiedClients: 98,
      veterinaryExperts: 12,
    };
  },

  async getFAQs() {
    return [
      {
        question: "How often should I bring my pet for a check-up?",
        answer: "We recommend annual wellness exams for healthy adult pets, and semi-annual check-ups for senior pets (7+ years) or those with chronic conditions.",
      },
      {
        question: "Do you accept pet insurance?",
        answer: "Yes! We work with all major pet insurance providers. We can help you submit claims and provide necessary documentation.",
      },
      {
        question: "What should I bring to my first appointment?",
        answer: "Please bring any previous medical records, a list of current medications, and your pet's vaccination history. Arrive 15 minutes early to complete paperwork.",
      },
      {
        question: "How do I know if my pet needs emergency care?",
        answer: "Signs include difficulty breathing, severe bleeding, seizures, sudden collapse, or ingestion of toxins. If unsure, call us immediately — we're here 24/7 for emergencies.",
      },
      {
        question: "Do you offer payment plans?",
        answer: "Yes, we offer flexible payment plans through CareCredit and our in-house wellness plans to help manage healthcare costs.",
      },
    ];
  },
};
