// components/WaitlistModal.tsx
"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import FocusTrap from "focus-trap-react";

// Replace this URL with your Formspree endpoint
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xeogkzgz";

type WaitlistModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const [email, setEmail] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [earlyVersion, setEarlyVersion] = useState("yes");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Lock body scroll when modal is open and reset on close
    document.body.style.overflow = isOpen ? "hidden" : "";
    if (isOpen && modalRef.current) modalRef.current.scrollTop = 0;
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleInterestToggle = (value: string) => {
    setInterests((prev) =>
      prev.includes(value) ? prev.filter((i) => i !== value) : [...prev, value]
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const payload = { email, interests, earlyVersion, message };
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Network response was not ok");
      setSuccess(true);
      setTimeout(onClose, 2000);
    } catch {
      setError("Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.3, duration: 0.6 },
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <FocusTrap>
            <motion.div
              ref={modalRef}
              className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 h-[90vh] max-h-[90vh] overflow-auto flex flex-col"
              initial={{ y: "100vh" }}
              animate={{ y: 0 }}
              exit={{ y: "100vh" }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 25,
                duration: 0.8,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-white shadow text-gray-600 hover:text-black"
                aria-label="Close modal"
              >
                <X size={28} />
              </button>

              <form
                onSubmit={handleSubmit}
                className="p-6 pt-10 flex-1 flex flex-col"
              >
                {success ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                  >
                    <h2 className="text-2xl font-semibold text-[#2C3E50] mb-4">
                      🎉 You're on the list!
                    </h2>
                    <p className="text-sm text-gray-500">
                      Thanks for joining! We'll reach out when early access is
                      available.
                    </p>
                  </motion.div>
                ) : (
                  <>
                    <motion.h2
                      className="text-xl font-semibold text-[#2C3E50] mb-2"
                      initial="hidden"
                      animate="visible"
                      custom={0}
                      variants={fieldVariants}
                    >
                      Join the MoodHaven Waitlist
                    </motion.h2>

                    <motion.p
                      className="text-sm text-gray-500 mb-4"
                      initial="hidden"
                      animate="visible"
                      custom={1}
                      variants={fieldVariants}
                    >
                      Be the first to try our private, peaceful journaling app.
                    </motion.p>

                    {/* Email */}
                    <motion.div
                      className="flex flex-col mb-4"
                      initial="hidden"
                      animate="visible"
                      custom={2}
                      variants={fieldVariants}
                    >
                      <label className="text-sm font-medium text-[#2C3E50]">
                        Email address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 p-2 bg-[#F7F9FA] border border-[#A0A4A8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6C9BD1] focus:border-[#6C9BD1] text-[#2C3E50]"
                        placeholder="you@example.com"
                      />
                    </motion.div>

                    {/* Interests */}
                    <motion.fieldset
                      className="flex flex-col mb-4"
                      initial="hidden"
                      animate="visible"
                      custom={3}
                      variants={fieldVariants}
                    >
                      <legend className="text-sm font-medium text-[#2C3E50]">
                        What interests you about MoodHaven?
                      </legend>
                      <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {[
                          "Journaling for mental health",
                          "Gratitude tracking",
                          "Privacy-first tools",
                          "Mood tracking",
                          "Supporting the mission",
                          "Just curious",
                        ].map((option) => (
                          <label
                            key={option}
                            className="inline-flex items-center"
                          >
                            <input
                              type="checkbox"
                              className="form-checkbox h-4 w-4 text-[#6C9BD1] border-[#A0A4A8]"
                              checked={interests.includes(option)}
                              onChange={() => handleInterestToggle(option)}
                            />
                            <span className="ml-2 text-sm text-[#2C3E50]">
                              {option}
                            </span>
                          </label>
                        ))}
                      </div>
                    </motion.fieldset>

                    {/* Early version */}
                    <motion.div
                      className="flex flex-col mb-4"
                      initial="hidden"
                      animate="visible"
                      custom={4}
                      variants={fieldVariants}
                    >
                      <label className="text-sm font-medium text-[#2C3E50]">
                        Would you try an early version?
                      </label>
                      <select
                        value={earlyVersion}
                        onChange={(e) => setEarlyVersion(e.target.value)}
                        className="mt-1 p-2 bg-[#F7F9FA] border border-[#A0A4A8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6C9BD1] text-[#2C3E50]"
                      >
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </motion.div>

                    {/* Message */}
                    <motion.div
                      className="flex flex-col flex-1 mb-4"
                      initial="hidden"
                      animate="visible"
                      custom={5}
                      variants={fieldVariants}
                    >
                      <label className="text-sm font-medium text-[#2C3E50]">
                        Anything you'd like to share?
                      </label>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="mt-1 p-2 bg-[#F7F9FA] border border-[#A0A4A8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6C9BD1] text-[#2C3E50] flex-1"
                        placeholder="Your thoughts..."
                        maxLength={250}
                      />
                      <p className="text-xs text-gray-400 mt-1 self-end">
                        {message.length}/250
                      </p>
                    </motion.div>

                    {error && (
                      <motion.p
                        className="text-sm text-red-500 mb-2"
                        initial="hidden"
                        animate="visible"
                        custom={6}
                        variants={fieldVariants}
                      >
                        {error}
                      </motion.p>
                    )}

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={submitting}
                      className="mt-4 px-6 py-3 bg-[#6C9BD1] hover:bg-[#5A88BF] text-white rounded-full text-sm font-semibold shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                      initial="hidden"
                      animate="visible"
                      custom={7}
                      variants={fieldVariants}
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="animate-spin w-5 h-5 mr-2 text-white" />{" "}
                          Submitting…
                        </>
                      ) : (
                        "Submit"
                      )}
                    </motion.button>
                  </>
                )}
              </form>
            </motion.div>
          </FocusTrap>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
