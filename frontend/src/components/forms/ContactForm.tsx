"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Send, Loader2, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { submitContact } from "@/services/api";
import { fadeInUp } from "@/lib/animations";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required").max(200),
  message: z.string().min(1, "Message is required").max(2000),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      await submitContact(data);
      toast.success("Message sent successfully!", {
        description: "We'll get back to you within 24 hours.",
      });
      reset();
    } catch (error) {
      toast.error("Failed to send message", {
        description: error instanceof Error ? error.message : "Please try again.",
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
        <div className="space-y-2">
          <Label htmlFor="name" className="text-[#4A3A2A] font-medium">Name</Label>
          <Input
            id="name"
            placeholder="Your name"
            {...register("name")}
            className={`border-[#EFE7DD] focus:border-[#B98B5D] focus:ring-[#B98B5D]/20 rounded-xl ${errors.name ? "border-red-500" : ""}`}
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-[#4A3A2A] font-medium">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            {...register("email")}
            className={`border-[#EFE7DD] focus:border-[#B98B5D] focus:ring-[#B98B5D]/20 rounded-xl ${errors.email ? "border-red-500" : ""}`}
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject" className="text-[#4A3A2A] font-medium">Subject</Label>
        <Input
          id="subject"
          placeholder="What's this about?"
          {...register("subject")}
          className={`border-[#EFE7DD] focus:border-[#B98B5D] focus:ring-[#B98B5D]/20 rounded-xl ${errors.subject ? "border-red-500" : ""}`}
        />
        {errors.subject && <p className="text-sm text-red-500">{errors.subject.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-[#4A3A2A] font-medium">Message</Label>
        <Textarea
          id="message"
          placeholder="Tell us how we can help..."
          rows={5}
          {...register("message")}
          className={`border-[#EFE7DD] focus:border-[#B98B5D] focus:ring-[#B98B5D]/20 rounded-xl ${errors.message ? "border-red-500" : ""}`}
        />
        {errors.message && <p className="text-sm text-red-500">{errors.message.message}</p>}
      </div>

      <Button type="submit" variant="gradient" size="lg" className="w-full rounded-2xl" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <MessageSquare className="w-5 h-5 mr-2" />
            Send Message
            <Send className="w-4 h-4 ml-2" />
          </>
        )}
      </Button>
    </motion.form>
  );
}
