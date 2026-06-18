import { Service, GalleryItem, Testimonial } from "../types";

export const staticDataService = {
  async getServices(): Promise<Service[]> {
    return [
      {
        id: "1",
        title: "Veterinary Consultation",
        description: "Expert consultations and comprehensive health assessments by Dr. Ekta A. Thakkar.",
        icon: "Stethoscope",
        features: ["Health Assessment", "Medical Consultation", "Treatment Planning", "Follow-up Care"],
      },
      {
        id: "2",
        title: "Vaccination & Preventive Care",
        description: "Essential vaccinations and preventive healthcare to keep your pet protected.",
        icon: "ShieldCheck",
        features: ["Core Vaccines", "Booster Shots", "Health Check", "Wellness Exams"],
      },
      {
        id: "3",
        title: "Pet Diagnostics",
        description: "Advanced diagnostic services for accurate health assessment and early detection.",
        icon: "Microscope",
        features: ["Blood Tests", "Urinalysis", "Imaging", "Health Screening"],
      },
      {
        id: "4",
        title: "Kidney Care",
        description: "Specialized kidney care services for pets with renal conditions.",
        icon: "Droplets",
        features: ["Kidney Assessment", "Treatment Planning", "Diet Management", "Regular Monitoring"],
      },
      {
        id: "5",
        title: "Dialysis Support",
        description: "Advanced dialysis support for pets with kidney conditions requiring specialized treatment.",
        icon: "Activity",
        features: ["Dialysis Treatment", "Kidney Support", "Specialized Care", "Follow-up Care"],
      },
      {
        id: "6",
        title: "Pet Health Checkups",
        description: "Comprehensive health checkups to ensure your pet stays healthy and thriving.",
        icon: "Heart",
        features: ["Physical Exam", "Vital Signs", "Health Assessment", "Wellness Check"],
      },
    ];
  },

  async getGallery(): Promise<GalleryItem[]> {
    return [
      { id: "1", src: "/images/gallery-1.jpg", alt: "Pet consultation at Pet Clinic Ghatkopar", category: "consultations" },
      { id: "2", src: "/images/gallery-2.jpg", alt: "Vaccination services", category: "preventive" },
      { id: "3", src: "/images/gallery-3.jpg", alt: "Kidney care treatment", category: "treatments" },
      { id: "4", src: "/images/gallery-4.jpg", alt: "Clinic facilities", category: "clinic" },
      { id: "5", src: "/images/gallery-5.jpg", alt: "Health checkup", category: "checkups" },
      { id: "6", src: "/images/gallery-6.jpg", alt: "Happy pets at clinic", category: "pets" },
    ];
  },

  async getTestimonials(): Promise<Testimonial[]> {
    return [
      {
        id: "1",
        name: "Pet Parent",
        petName: "",
        content: "Very nice experience. Doctor is so good and everything was properly guided.",
        rating: 5,
      },
      {
        id: "2",
        name: "Pet Parent",
        petName: "Oreo",
        content: "Dr. Kastubh gave Oreo the best possible treatment for his kidney condition.",
        rating: 5,
      },
      {
        id: "3",
        name: "Pet Parent",
        petName: "",
        content: "I am fully satisfied with the diagnosis, investigations and consultation I received.",
        rating: 5,
      },
    ];
  },

  async getStats() {
    return {
      googleRating: "4.1★",
      patientReviews: "142+",
      happyPets: "1000+",
      trustedCare: "Veterinary",
    };
  },

  async getFAQs() {
    return [
      {
        question: "What services does Pet Clinic Ghatkopar offer?",
        answer: "We offer veterinary consultation, vaccination, pet diagnostics, kidney care, dialysis support, pet health checkups, medical treatment, and emergency guidance.",
      },
      {
        question: "Who is Dr. Ekta A. Thakkar?",
        answer: "Dr. Ekta A. Thakkar is an experienced veterinary physician dedicated to providing compassionate, evidence-based care for pets.",
      },
      {
        question: "What are the clinic hours?",
        answer: "We are open Monday to Saturday from 10:00 AM to 8:00 PM. Closed on Sundays.",
      },
      {
        question: "Where is the clinic located?",
        answer: "Shop No. 4 & 5, Indrayani CHS, General Arun Kumar Vaidya Udyan, Shri Dattaguru Mandir Marg, Opp. ARUN, Pant Nagar, Ghatkopar East, Mumbai 400077.",
      },
      {
        question: "Do you offer kidney care and dialysis support?",
        answer: "Yes, we specialize in kidney care and dialysis support for pets with renal conditions.",
      },
    ];
  },
};
