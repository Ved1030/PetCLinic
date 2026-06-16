"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Calendar, Clock, Stethoscope, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { createAppointment } from "@/services/api";
import { fadeInUp } from "@/lib/animations";

const appointmentSchema = z.object({
  petName: z.string().min(1, "Pet name is required").max(100),
  ownerName: z.string().min(1, "Owner name is required").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  service: z.string().min(1, "Please select a service"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  notes: z.string().max(500).optional(),
});

type AppointmentFormData = z.infer<typeof appointmentSchema>;

const services = [
  "Veterinary Consultation",
  "Blood Testing",
  "Digital X-Rays",
  "Ozone Therapy",
  "Acupuncture",
  "Pet Grooming",
  "Pet Boarding",
  "Preventive Healthcare",
];

export default function AppointmentForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
  });

  const onSubmit = async (data: AppointmentFormData) => {
    setIsSubmitting(true);
    try {
      const response = await createAppointment(data);
      const emailSent = response?.meta?.emailSent === true;

      if (emailSent) {
        toast.success("Appointment booked successfully!", {
          description: "Confirmation email sent successfully.",
        });
      } else {
        toast.success("Appointment booked!", {
          description: "We received your appointment but could not send the confirmation email.",
        });
      }
      reset();
    } catch (error) {
      toast.error("Failed to book appointment", {
        description: error instanceof Error ? error.message : "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Pet Name */}
        <div className="space-y-2">
          <Label htmlFor="petName" className="text-[#4A3A2A] font-medium">Pet Name</Label>
          <Input
            id="petName"
            placeholder="e.g., Max"
            {...register("petName")}
            className={`border-[#EFE7DD] focus:border-[#B98B5D] focus:ring-[#B98B5D]/20 rounded-xl ${errors.petName ? "border-red-500" : ""}`}
          />
          {errors.petName && (
            <p className="text-sm text-red-500">{errors.petName.message}</p>
          )}
        </div>

        {/* Owner Name */}
        <div className="space-y-2">
          <Label htmlFor="ownerName" className="text-[#4A3A2A] font-medium">Owner Name</Label>
          <Input
            id="ownerName"
            placeholder="Your full name"
            {...register("ownerName")}
            className={`border-[#EFE7DD] focus:border-[#B98B5D] focus:ring-[#B98B5D]/20 rounded-xl ${errors.ownerName ? "border-red-500" : ""}`}
          />
          {errors.ownerName && (
            <p className="text-sm text-red-500">{errors.ownerName.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-[#4A3A2A] font-medium">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            {...register("email")}
            className={`border-[#EFE7DD] focus:border-[#B98B5D] focus:ring-[#B98B5D]/20 rounded-xl ${errors.email ? "border-red-500" : ""}`}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-[#4A3A2A] font-medium">Phone</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+91 98204 45010"
            {...register("phone")}
            className={`border-[#EFE7DD] focus:border-[#B98B5D] focus:ring-[#B98B5D]/20 rounded-xl ${errors.phone ? "border-red-500" : ""}`}
          />
          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>

        {/* Service */}
        <div className="space-y-2">
          <Label htmlFor="service" className="text-[#4A3A2A] font-medium">Service</Label>
          <select
            id="service"
            {...register("service")}
            className="flex h-10 w-full rounded-xl border border-[#EFE7DD] bg-white px-3 py-2 text-sm focus:border-[#B98B5D] focus:ring-[#B98B5D]/20 focus-visible:outline-none focus-visible:ring-2 transition-all"
          >
            <option value="">Select a service</option>
            {services.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {errors.service && (
            <p className="text-sm text-red-500">{errors.service.message}</p>
          )}
        </div>

        {/* Date */}
        <div className="space-y-2">
          <Label htmlFor="date" className="text-[#4A3A2A] font-medium">Preferred Date</Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7B6A58]" />
            <Input
              id="date"
              type="date"
              className={`pl-10 border-[#EFE7DD] focus:border-[#B98B5D] focus:ring-[#B98B5D]/20 rounded-xl ${errors.date ? "border-red-500" : ""}`}
              {...register("date")}
            />
          </div>
          {errors.date && (
            <p className="text-sm text-red-500">{errors.date.message}</p>
          )}
        </div>

        {/* Time */}
        <div className="space-y-2">
          <Label htmlFor="time" className="text-[#4A3A2A] font-medium">Preferred Time</Label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7B6A58]" />
            <Input
              id="time"
              type="time"
              className={`pl-10 border-[#EFE7DD] focus:border-[#B98B5D] focus:ring-[#B98B5D]/20 rounded-xl ${errors.time ? "border-red-500" : ""}`}
              {...register("time")}
            />
          </div>
          {errors.time && (
            <p className="text-sm text-red-500">{errors.time.message}</p>
          )}
        </div>

        {/* Notes - Full width */}
        <div className="sm:col-span-2 space-y-2">
          <Label htmlFor="notes" className="text-[#4A3A2A] font-medium">Additional Notes (Optional)</Label>
          <Textarea
            id="notes"
            placeholder="Any special requirements or concerns..."
            className={`border-[#EFE7DD] focus:border-[#B98B5D] focus:ring-[#B98B5D]/20 rounded-xl ${errors.notes ? "border-red-500" : ""}`}
            {...register("notes")}
          />
          {errors.notes && (
            <p className="text-sm text-red-500">{errors.notes.message}</p>
          )}
        </div>
      </div>

      <Button
        type="submit"
        variant="gradient"
        size="lg"
        className="w-full rounded-2xl"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Booking...
          </>
        ) : (
          <>
            <Stethoscope className="w-5 h-5 mr-2" />
            Book Appointment
            <Send className="w-4 h-4 ml-2" />
          </>
        )}
      </Button>
    </motion.form>
  );
}
