"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Loader2, PawPrint, ChevronDown, Calendar } from "lucide-react";
import { useAppStore } from "@/store";
import { sendChatMessage } from "@/services/api";
import type { ChatMessage } from "@/types";
import { useRouter } from "next/navigation";

const QUICK_ACTIONS = [
  { label: "\uD83D\uDCC5 Book an Appointment", message: "I'd like to book an appointment with Dr. Ekta A. Thakkar" },
  { label: "\uD83D\uDD52 Clinic Timings", message: "What are your clinic timings?" },
  { label: "\uD83D\uDCCD Clinic Location", message: "Where is the clinic located?" },
  { label: "\uD83D\uDC89 Vaccination Schedule", message: "I need vaccination for my pet" },
  { label: "\uD83D\uDC36 Puppy Health Check", message: "I need a puppy health checkup" },
  { label: "\uD83D\uDC31 Cat Health Consultation", message: "I need a cat health consultation" },
  { label: "\uD83D\uDE91 Emergency Pet Care", message: "I need emergency pet care" },
  { label: "\uD83C\uDFE5 Kidney Care Info", message: "Tell me about kidney care" },
  { label: "\u2695\uFE0F Dialysis Support Info", message: "Tell me about dialysis support" },
  { label: "\uD83D\uDCDE Speak to Our Team", message: "I'd like to speak to someone on the team" },
];

const BOOK_MARKER = "[Book Appointment]";

function formatMessageContent(content: string) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let listItems: React.ReactNode[] = [];
  const flushList = (key: string) => {
    if (listItems.length > 0) {
      elements.push(<ul key={key} className="list-disc ml-5 space-y-1 my-1.5 text-[#4A3A2A]">{listItems}</ul>);
      listItems = [];
    }
  };

  lines.forEach((line, i) => {
    const trimmed = line.trim();
    if (!trimmed) {
      flushList(`ul-end-${i}`);
      return;
    }
    if (trimmed.startsWith('\u2022')) {
      listItems.push(<li key={`li-${i}`}>{trimmed.replace('\u2022', '').trim()}</li>);
      return;
    }
    flushList(`ul-${i}`);
    elements.push(<span key={`s-${i}`}>{trimmed}</span>);
    if (i < lines.length - 1) {
      elements.push(<br key={`br-${i}`} />);
    }
  });
  flushList('ul-final');

  return <>{elements}</>;
}

function formatBotMessage(content: string, onBook: () => void) {
  if (!content.includes(BOOK_MARKER)) {
    return <div style={{ lineHeight: "1.7" }}>{formatMessageContent(content)}</div>;
  }

  const parts = content.split(BOOK_MARKER);
  return (
    <div style={{ lineHeight: "1.7" }}>
      <div>{formatMessageContent(parts[0])}</div>
      <button
        onClick={onBook}
        className="inline-flex items-center gap-1.5 mt-3 mb-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 shadow-sm"
        style={{
          background: "linear-gradient(135deg, #B98B5D, #A67A4A)",
          color: "white",
        }}
      >
        <Calendar className="w-4 h-4" />
        Book Appointment
      </button>
      {parts[1] && <div className="mt-1">{formatMessageContent(parts[1])}</div>}
    </div>
  );
}

export default function ChatWidget() {
  const router = useRouter();
  const { isChatOpen, toggleChat } = useAppStore();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "🩺 Welcome to Pet Clinic, Ghatkopar! I'm your veterinary care assistant. I can help with pet health concerns, clinic information, or booking an appointment with Dr. Ekta A. Thakkar. How can I help you today?",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isChatOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isChatOpen]);

  const handleBook = useCallback(() => {
    router.push("/appointment");
  }, [router]);

  const handleSend = useCallback(async (text: string) => {
    const message = text.trim();
    if (!message || isLoading) return;

    setShowQuickActions(false);

    const userMessage: ChatMessage = {
      role: "user",
      content: message,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const currentHistory = messages.slice(-10);
      const response = await sendChatMessage(message, currentHistory);

      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: response,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error("[ChatWidget] Unexpected error in handleSend:", err);
      const errorMessage: ChatMessage = {
        role: "assistant",
        content: "I'm sorry, something went wrong. Please try again or call us at +91 98204 65733.",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(input);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-28 right-4 sm:right-6 z-50 w-[380px] max-w-[calc(100vw-32px)] sm:max-w-[calc(100vw-48px)] h-[580px] max-h-[calc(100vh-160px)] shadow-2xl"
            style={{
              background: "rgba(255, 255, 255, 0.85)",
              backdropFilter: "blur(24px) saturate(1.4)",
              WebkitBackdropFilter: "blur(24px) saturate(1.4)",
              border: "1px solid rgba(239, 231, 221, 0.6)",
              borderRadius: "16px",
            }}
          >
            <div className="flex flex-col h-full rounded-2xl overflow-hidden relative" style={{ isolation: "isolate" }} onWheel={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 shrink-0" style={{ background: "linear-gradient(135deg, #4A3A2A, #5A4A38)" }}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
                  <PawPrint className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">Pet Clinic, Ghatkopar</p>
                  <p className="text-white/60 text-xs">Veterinary Assistant</p>
                </div>
              </div>
              <button
                onClick={toggleChat}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 min-h-0 overflow-y-auto px-4 py-5" style={{ scrollbarWidth: "thin", scrollbarColor: "#D8C9B3 transparent", touchAction: "pan-y", overscrollBehavior: "contain" }}>
              <div className="flex flex-col gap-4">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`${
                      msg.role === "user" ? "max-w-[80%] sm:max-w-[75%]" : "max-w-[90%] sm:max-w-[85%]"
                    } px-5 py-4 rounded-2xl text-sm ${
                      msg.role === "user"
                        ? "text-white"
                        : "text-[#4A3A2A]"
                    }`}
                    style={
                      msg.role === "user"
                        ? { background: "linear-gradient(135deg, #B98B5D, #A67A4A)", lineHeight: "1.6" }
                        : { background: "rgba(250, 247, 242, 0.95)", border: "1px solid rgba(239, 231, 221, 0.5)", boxShadow: "0 2px 8px rgba(74, 58, 42, 0.06)", lineHeight: "1.7" }
                    }
                  >
                    {msg.role === "assistant"
                      ? formatBotMessage(msg.content, handleBook)
                      : msg.content}
                  </div>
                </motion.div>
              ))}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div
                      className="px-5 py-4 rounded-2xl text-sm flex items-center gap-3"
                      style={{ background: "rgba(250, 247, 242, 0.95)", border: "1px solid rgba(239, 231, 221, 0.5)", boxShadow: "0 2px 8px rgba(74, 58, 42, 0.06)" }}
                    >
                      <span className="flex gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#B98B5D] animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#B98B5D] animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#B98B5D] animate-bounce" style={{ animationDelay: "300ms" }} />
                      </span>
                    </div>
                  </motion.div>
                )}
              <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Quick Actions */}
            {showQuickActions && messages.length <= 1 && (
              <div className="px-4 pb-3">
                <p className="text-xs font-medium text-[#7B6A58] mb-2.5 px-0.5">Quick help</p>
                <div className="flex flex-wrap gap-2">
                  {QUICK_ACTIONS.map((action) => (
                    <button
                      key={action.label}
                      onClick={() => handleSend(action.message)}
                      className="text-xs font-medium px-3.5 py-2 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md"
                      style={{
                        background: "rgba(185, 139, 93, 0.08)",
                        color: "#6B4F30",
                        border: "1px solid rgba(185, 139, 93, 0.25)",
                      }}
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Scroll to bottom indicator */}
            <AnimatePresence>
              {messages.length > 3 && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  onClick={scrollToBottom}
                  className="absolute bottom-20 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-white/80 border border-[#EFE7DD] flex items-center justify-center shadow-md hover:bg-white transition-colors"
                >
                  <ChevronDown className="w-4 h-4 text-[#7B6A58]" />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Input */}
            <div className="px-4 py-3 shrink-0 border-t border-[#EFE7DD]/60">
              <div className="flex items-center gap-2 bg-[#FAF7F2] rounded-xl px-4 py-1 border border-[#EFE7DD] focus-within:border-[#B98B5D]/50 transition-colors">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Describe your pet's concern..."
                  className="flex-1 bg-transparent text-sm text-[#4A3A2A] placeholder:text-[#7B6A58]/50 outline-none py-2.5"
                  disabled={isLoading}
                />
                <button
                  onClick={() => handleSend(input)}
                  disabled={!input.trim() || isLoading}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  style={{
                    background: input.trim() ? "linear-gradient(135deg, #B98B5D, #A67A4A)" : "transparent",
                  }}
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 text-white animate-spin" />
                  ) : (
                    <Send className="w-4 h-4 text-white" />
                  )}
                </button>
              </div>
            </div>
          </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <button
        suppressHydrationWarning
        onClick={toggleChat}
        aria-label="Toggle chat"
        className="fixed bottom-[96px] right-4 sm:right-6 z-50 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-110 active:scale-95"
        style={{
          background: "linear-gradient(135deg, #4A3A2A, #5A4A38)",
          boxShadow: "0 4px 20px rgba(74, 58, 42, 0.3)",
        }}
      >
        <AnimatePresence mode="wait">
          {isChatOpen ? (
            <motion.div key="close" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <Bot className="w-6 h-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </>
  );
}
