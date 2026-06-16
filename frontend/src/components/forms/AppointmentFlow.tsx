"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DayPicker } from "react-day-picker";
import { format, addDays } from "date-fns";
import {
  ChevronLeft, ChevronRight, Calendar, Clock, Stethoscope,
  PawPrint, Loader2, CheckCircle2, MessageCircle, Send,
  Syringe, Scissors, Activity, Zap, Bone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { createAppointment, fetchSlots } from "@/services/api";
import type { TimeSlot } from "@/types";
import "react-day-picker/dist/style.css";

const SERVICES = [
  { id: "consultation", label: "Veterinary Consultation", icon: Stethoscope, desc: "General health checkups, diagnosis, and treatment" },
  { id: "vaccination", label: "Vaccination", icon: Syringe, desc: "Core and optional vaccines for dogs and cats" },
  { id: "grooming", label: "Pet Grooming", icon: Scissors, desc: "Professional grooming, bathing, nail trimming" },
  { id: "blood-test", label: "Blood Testing", icon: Activity, desc: "Comprehensive blood panels and organ function tests" },
  { id: "ozone-therapy", label: "Ozone Therapy", icon: Zap, desc: "Ozone treatment for various conditions" },
  { id: "acupuncture", label: "Acupuncture", icon: Bone, desc: "Traditional Chinese veterinary acupuncture" },
  { id: "boarding", label: "Pet Boarding", icon: PawPrint, desc: "Safe, comfortable boarding facility" },
  { id: "emergency", label: "Emergency Consultation", icon: Activity, desc: "Urgent care for pets" },
];

const STEP_HEADERS = [
  { title: "Choose Service", subtitle: "Select the type of appointment" },
  { title: "Select Date", subtitle: "Pick your preferred date" },
  { title: "Choose Time", subtitle: "Select an available time slot" },
  { title: "Your Details", subtitle: "Tell us about you and your pet" },
  { title: "Confirmation", subtitle: "Review and confirm your booking" },
];

const STEP_ICONS = [Stethoscope, Calendar, Clock, PawPrint, CheckCircle2];

interface FormData {
  service: string;
  date: string;
  time: string;
  petName: string;
  petType: string;
  breed: string;
  ownerName: string;
  email: string;
  phone: string;
  reason: string;
}

interface AppointmentResult {
  id: string;
  service: string;
  date: string;
  time: string;
  petName: string;
  ownerName: string;
  email: string;
  phone: string;
  emailSent?: boolean;
  emailError?: string | null;
}

const disabledDays = [
  { dayOfWeek: [0] },
];

export default function AppointmentFlow() {
  const [step, setStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<AppointmentResult | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<FormData>({
    service: "",
    date: "",
    time: "",
    petName: "",
    petType: "",
    breed: "",
    ownerName: "",
    email: "",
    phone: "",
    reason: "",
  });

  const updateForm = useCallback((field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setFormErrors((prev) => ({ ...prev, [field]: "" }));
  }, []);

  useEffect(() => {
    if (!selectedDate) return;
    const dateStr = format(selectedDate, "yyyy-MM-dd");
    updateForm("date", dateStr);
    updateForm("time", "");
    setIsLoadingSlots(true);
    setSlots([]);

    fetchSlots(dateStr).then((fetched) => {
      setSlots(fetched);
      setIsLoadingSlots(false);
    }).catch(() => {
      toast.error("Failed to load time slots");
      setIsLoadingSlots(false);
    });
  }, [selectedDate, updateForm]);

  const canProceed = useCallback(() => {
    switch (step) {
      case 0: return !!formData.service;
      case 1: return !!selectedDate;
      case 2: return !!formData.time;
      case 3: return validateStep3();
      case 4: return true;
      default: return false;
    }
  }, [step, formData, selectedDate]);

  const validateStep3 = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.petName.trim()) errs.petName = "Pet name is required";
    if (!formData.petType.trim()) errs.petType = "Pet type is required";
    if (!formData.breed.trim()) errs.breed = "Breed is required";
    if (!formData.ownerName.trim()) errs.ownerName = "Owner name is required";
    if (!formData.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = "Invalid email address";
    if (!formData.phone.trim()) errs.phone = "Phone is required";
    else if (formData.phone.replace(/[\s\-]/g, "").length < 10) errs.phone = "Enter at least 10 digits";
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (step === 3 && !validateStep3()) return;
    setStep((s) => Math.min(s + 1, 4));
  };

  const handleBack = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = async () => {
    if (!validateStep3()) return;
    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        phone: formData.phone,
        service: SERVICES.find((s) => s.id === formData.service)?.label || formData.service,
        date: formData.date,
        time: formData.time,
        reason: formData.reason || undefined,
      };

      const response = await createAppointment(payload);
      const appointment = response?.data;
      const emailSent = response?.meta?.emailSent === true;
      const emailError = response?.meta?.emailError || null;

      setResult({
        id: appointment?.id || `APT-${Date.now()}`,
        service: payload.service,
        date: payload.date,
        time: payload.time,
        petName: payload.petName,
        ownerName: payload.ownerName,
        email: payload.email,
        phone: payload.phone,
        emailSent,
        emailError,
      });

      if (emailSent) {
        toast.success("Appointment booked successfully!", {
          description: "Confirmation email sent successfully.",
        });
      } else {
        toast.success("Appointment booked!", {
          description: emailError
            ? "We received your appointment but could not send the confirmation email."
            : "We received your appointment but could not send the confirmation email.",
        });
      }

      setStep(4);
    } catch (err) {
      toast.error("Booking failed", {
        description: err instanceof Error ? err.message : "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTimeDisplay = (time: string) => {
    const [h, m] = time.split(":").map(Number);
    const ampm = h >= 12 ? "PM" : "AM";
    return `${h % 12 || 12}:${m.toString().padStart(2, "0")} ${ampm}`;
  };

  const getServiceLabel = (id: string) => SERVICES.find((s) => s.id === id)?.label || id;

  const whatsappMessage = result
    ? `Hello THE OZONE VETS,%0A%0AI have booked an appointment:%0A• Service: ${result.service}%0A• Date: ${result.date}%0A• Time: ${formatTimeDisplay(result.time)}%0A• Pet: ${result.petName}%0A• Owner: ${result.ownerName}%0A• Confirmation: ${result.id}%0A%0APlease confirm my appointment. Thank you!`
    : "";

  const selectedService = SERVICES.find((s) => s.id === formData.service);

  const StepIcon = STEP_ICONS[step];

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-10 px-2">
        {STEP_HEADERS.map((_, i) => (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  i === step
                    ? "text-white shadow-md"
                    : i < step
                    ? "text-white"
                    : "text-[#7B6A58] bg-[#EFE7DD]"
                }`}
                style={
                  i <= step
                    ? { background: "linear-gradient(135deg, #B98B5D, #A67A4A)" }
                    : {}
                }
              >
                {i < step ? <CheckCircle2 className="w-5 h-5" /> : i + 1}
              </div>
            </div>
            {i < STEP_HEADERS.length - 1 && (
              <div className={`w-10 sm:w-16 h-0.5 mx-1 sm:mx-2 transition-colors duration-300 ${i < step ? "bg-[#B98B5D]" : "bg-[#EFE7DD]"}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: "rgba(185, 139, 93, 0.1)" }}>
              {selectedService && step !== 0 && step !== 4 ? (
                <selectedService.icon className="w-5 h-5 text-[#B98B5D]" />
              ) : (
                <StepIcon className="w-5 h-5 text-[#B98B5D]" />
              )}
            </div>
            <div>
              <h3 className="text-xl font-display font-bold text-[#4A3A2A]">{STEP_HEADERS[step].title}</h3>
              <p className="text-sm text-[#7B6A58]">{STEP_HEADERS[step].subtitle}</p>
            </div>
          </div>

          {/* STEP 0: Service Selection */}
          {step === 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SERVICES.map((service) => {
                const Icon = service.icon;
                const isSelected = formData.service === service.id;
                return (
                  <button
                    key={service.id}
                    onClick={() => { updateForm("service", service.id); handleNext(); }}
                    className={`p-4 rounded-2xl text-left transition-all duration-200 ${
                      isSelected
                        ? "border-2 shadow-md"
                        : "border hover:border-[#B98B5D]/40 hover:shadow-sm"
                    }`}
                    style={{
                      borderColor: isSelected ? "#B98B5D" : "#EFE7DD",
                      background: isSelected ? "rgba(185, 139, 93, 0.06)" : "white",
                    }}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                      isSelected ? "text-white" : "text-[#B98B5D]"
                    }`}
                      style={isSelected ? { background: "linear-gradient(135deg, #B98B5D, #A67A4A)" } : { background: "rgba(185, 139, 93, 0.1)" }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <p className="font-semibold text-sm text-[#4A3A2A] mb-1">{service.label}</p>
                    <p className="text-xs text-[#7B6A58] leading-relaxed">{service.desc}</p>
                  </button>
                );
              })}
            </div>
          )}

          {/* STEP 1: Date Selection */}
          {step === 1 && (
            <div className="flex flex-col items-center">
              <div className="p-4 rounded-2xl bg-white border border-[#EFE7DD] shadow-sm w-full max-w-md">
                <DayPicker
                  mode="single"
                  selected={selectedDate}
                  onSelect={(d) => { setSelectedDate(d); }}
                  disabled={disabledDays}
                  fromDate={new Date()}
                  toDate={addDays(new Date(), 60)}
                  className="!m-0"
                  styles={{
                    root: { width: "100%" },
                    month: { width: "100%" },
                    table: { width: "100%" },
                    head_cell: {
                      color: "#7B6A58",
                      fontSize: "13px",
                      fontWeight: 600,
                      padding: "8px 4px",
                    },
                    day: {
                      color: "#4A3A2A",
                      borderRadius: "10px",
                      fontSize: "14px",
                      fontWeight: 500,
                      width: "100%",
                      height: "100%",
                      aspectRatio: "1",
                    },
                    nav: {
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "0 8px",
                      marginBottom: "12px",
                    },
                    caption: {
                      color: "#4A3A2A",
                      fontWeight: 700,
                      fontSize: "16px",
                    },
                  }}
                  modifiersStyles={{
                    selected: {
                      background: "linear-gradient(135deg, #B98B5D, #A67A4A)",
                      color: "white",
                      borderRadius: "10px",
                    },
                    today: {
                      border: "2px solid #B98B5D",
                      borderRadius: "10px",
                    },
                    disabled: {
                      color: "#D8C9B3",
                      textDecoration: "line-through",
                    },
                  }}
                />
              </div>
            </div>
          )}

          {/* STEP 2: Time Slots */}
          {step === 2 && (
            <div>
              {selectedDate && (
                <p className="text-sm text-[#7B6A58] mb-4 text-center">
                  Available slots for {format(selectedDate, "EEEE, MMMM d, yyyy")}
                </p>
              )}
              {isLoadingSlots ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-6 h-6 text-[#B98B5D] animate-spin" />
                  <span className="ml-3 text-sm text-[#7B6A58]">Loading available slots...</span>
                </div>
              ) : slots.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-[#7B6A58]">No slots available for this date.</p>
                  <button onClick={() => { setSelectedDate(undefined); setStep(1); }} className="mt-2 text-sm text-[#B98B5D] hover:underline">
                    Choose another date
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                  {slots.map((slot) => {
                    const isAvailable = slot.status === "available";
                    const isBooked = slot.status === "booked";
                    const isPast = slot.status === "past";
                    const isUnavailable = slot.status === "unavailable";
                    const isSelected = formData.time === slot.time;

                    let bg = "white";
                    let textColor = "#4A3A2A";
                    let borderColor = "#EFE7DD";
                    let cursor = "cursor-pointer";
                    let hoverStyle = "hover:border-[#B98B5D]/40 hover:shadow-sm";

                    if (isBooked) {
                      bg = "#FEE2E2";
                      textColor = "#DC2626";
                      borderColor = "#FECACA";
                      cursor = "cursor-not-allowed";
                      hoverStyle = "";
                    } else if (isPast || isUnavailable) {
                      bg = "#F5F5F5";
                      textColor = "#B0B0B0";
                      borderColor = "#E5E5E5";
                      cursor = "cursor-not-allowed";
                      hoverStyle = "";
                    } else if (isSelected) {
                      bg = "rgba(185, 139, 93, 0.1)";
                      textColor = "#8A633D";
                      borderColor = "#B98B5D";
                      hoverStyle = "";
                    }

                    const statusLabel = isBooked ? "Booked" : isPast ? "Past" : isUnavailable ? "Unavailable" : "";

                    return (
                      <button
                        key={slot.time}
                        disabled={!isAvailable}
                        onClick={() => {
                          if (isAvailable) {
                            updateForm("time", slot.time);
                            handleNext();
                          }
                        }}
                        className={`relative p-3 rounded-xl border text-sm font-medium transition-all duration-200 ${cursor} ${hoverStyle}`}
                        style={{ background: bg, color: textColor, borderColor }}
                      >
                        {slot.display}
                        {statusLabel && (
                          <span className="block text-[10px] mt-0.5 opacity-70">{statusLabel}</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* STEP 3: Patient Info */}
          {step === 3 && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-[#4A3A2A] text-sm font-medium">Pet Name *</Label>
                  <Input
                    placeholder="e.g., Max"
                    value={formData.petName}
                    onChange={(e) => updateForm("petName", e.target.value)}
                    className={`border-[#EFE7DD] rounded-xl ${formErrors.petName ? "border-red-500" : ""}`}
                  />
                  {formErrors.petName && <p className="text-xs text-red-500">{formErrors.petName}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[#4A3A2A] text-sm font-medium">Pet Type *</Label>
                  <select
                    value={formData.petType}
                    onChange={(e) => updateForm("petType", e.target.value)}
                    className={`flex h-10 w-full rounded-xl border border-[#EFE7DD] bg-white px-3 py-2 text-sm focus:border-[#B98B5D] focus:ring-[#B98B5D]/20 focus-visible:outline-none focus-visible:ring-2 transition-all ${formErrors.petType ? "border-red-500" : ""}`}
                  >
                    <option value="">Select type</option>
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                    <option value="Bird">Bird</option>
                    <option value="Rabbit">Rabbit</option>
                    <option value="Other">Other</option>
                  </select>
                  {formErrors.petType && <p className="text-xs text-red-500">{formErrors.petType}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[#4A3A2A] text-sm font-medium">Breed *</Label>
                  <Input
                    placeholder="e.g., Golden Retriever"
                    value={formData.breed}
                    onChange={(e) => updateForm("breed", e.target.value)}
                    className={`border-[#EFE7DD] rounded-xl ${formErrors.breed ? "border-red-500" : ""}`}
                  />
                  {formErrors.breed && <p className="text-xs text-red-500">{formErrors.breed}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-[#4A3A2A] text-sm font-medium">Your Name *</Label>
                  <Input
                    placeholder="Full name"
                    value={formData.ownerName}
                    onChange={(e) => updateForm("ownerName", e.target.value)}
                    className={`border-[#EFE7DD] rounded-xl ${formErrors.ownerName ? "border-red-500" : ""}`}
                  />
                  {formErrors.ownerName && <p className="text-xs text-red-500">{formErrors.ownerName}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[#4A3A2A] text-sm font-medium">Phone *</Label>
                  <Input
                    type="tel"
                    placeholder="+91 98204 45010"
                    value={formData.phone}
                    onChange={(e) => updateForm("phone", e.target.value)}
                    className={`border-[#EFE7DD] rounded-xl ${formErrors.phone ? "border-red-500" : ""}`}
                  />
                  {formErrors.phone && <p className="text-xs text-red-500">{formErrors.phone}</p>}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-[#4A3A2A] text-sm font-medium">Email *</Label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => updateForm("email", e.target.value)}
                  className={`border-[#EFE7DD] rounded-xl ${formErrors.email ? "border-red-500" : ""}`}
                />
                {formErrors.email && <p className="text-xs text-red-500">{formErrors.email}</p>}
              </div>

              <div className="space-y-1.5">
                <Label className="text-[#4A3A2A] text-sm font-medium">Reason for Visit (Optional)</Label>
                <Textarea
                  placeholder="Any specific concerns or requirements..."
                  value={formData.reason}
                  onChange={(e) => updateForm("reason", e.target.value)}
                  className="border-[#EFE7DD] rounded-xl"
                />
              </div>
            </div>
          )}

          {/* STEP 4: Confirmation */}
          {step === 4 && result && (
            <div>
              <div className="p-6 rounded-2xl bg-white border border-[#EFE7DD] shadow-sm text-center mb-6">
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: "rgba(185, 139, 93, 0.1)" }}>
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
                <h4 className="text-xl font-display font-bold text-[#4A3A2A] mb-2">Booking Confirmed!</h4>
                <p className="text-sm text-[#7B6A58] mb-4">Your appointment has been booked successfully.</p>
                <p className="text-xs text-[#7B6A58]">Confirmation: <span className="font-mono font-semibold text-[#4A3A2A]">{result.id}</span></p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#EFE7DD] shadow-sm mb-6">
                <h5 className="font-semibold text-[#4A3A2A] mb-4">Appointment Summary</h5>
                <div className="space-y-3">
                  {[
                    { label: "Service", value: result.service },
                    { label: "Date", value: format(new Date(result.date + "T00:00:00"), "EEEE, MMMM d, yyyy") },
                    { label: "Time", value: formatTimeDisplay(result.time) },
                    { label: "Pet", value: result.petName },
                    { label: "Owner", value: result.ownerName },
                    { label: "Email", value: result.email },
                    { label: "Phone", value: result.phone },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between items-center py-1.5 border-b border-[#F5EFE5] last:border-0">
                      <span className="text-sm text-[#7B6A58]">{item.label}</span>
                      <span className="text-sm font-medium text-[#4A3A2A]">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center space-y-3">
                {result.emailSent ? (
                  <p className="text-xs text-green-600">Confirmation email sent successfully to {result.email}</p>
                ) : (
                  <p className="text-xs text-amber-600">
                    {result.emailError
                      ? "We received your appointment but could not send the confirmation email."
                      : "We received your appointment but could not send the confirmation email."}
                  </p>
                )}
                <a
                  href={`https://wa.me/919820445010?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-medium text-sm transition-all duration-200 hover:shadow-lg hover:scale-105"
                  style={{ background: "#25D366" }}
                >
                  <MessageCircle className="w-5 h-5" />
                  Confirm on WhatsApp
                  <Send className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      {step < 4 && step !== 0 && (
        <div className="flex justify-between mt-8 gap-3">
          <Button
            variant="outline"
            onClick={handleBack}
            className="rounded-xl border-[#EFE7DD] text-[#7B6A58]"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </Button>

          {step === 3 ? (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              variant="gradient"
              size="lg"
              className="rounded-xl"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Booking...
                </>
              ) : (
                <>
                  <Stethoscope className="w-4 h-4 mr-2" />
                  Confirm Booking
                </>
              )}
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              variant="gradient"
              size="lg"
              className="rounded-xl"
            >
              Continue
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>
      )}

      {/* Reset */}
      {step === 4 && result && (
        <div className="text-center mt-6">
          <button
            onClick={() => {
              setStep(0);
              setFormData({ service: "", date: "", time: "", petName: "", petType: "", breed: "", ownerName: "", email: "", phone: "", reason: "" });
              setSelectedDate(undefined);
              setSlots([]);
              setResult(null);
            }}
            className="text-sm text-[#B98B5D] hover:underline"
          >
            Book Another Appointment
          </button>
        </div>
      )}
    </div>
  );
}
