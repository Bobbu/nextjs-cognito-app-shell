"use client";

import { useEffect, useState } from "react";
import { generateMathChallenge } from "@/lib/mathChallenge";
import FormField from "@/ui/components/FormField";
import { AtSymbolIcon, CalculatorIcon, EnvelopeIcon, PhoneIcon, UserIcon, BuildingOfficeIcon } from "@heroicons/react/24/outline";
import { CONTACT_US_ENDPOINT } from "@/lib/constants";
export default function ContactUsForm() {
  const [challenge, setChallenge] = useState({ question: "", answer: 0 });
  const [status, setStatus] = useState<null | {
    type: "success" | "error";
    message: string;
  }>(null);

  useEffect(() => {
    const { question, answer } = generateMathChallenge();
    setChallenge({ question, answer });
  }, []);

  // Auto-clear status message after 5 seconds
  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => setStatus(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null); // Clear previous messages
    const form = e.currentTarget as HTMLFormElement;
    const userAnswer = form.mathAnswer.value;
    const correctAnswer = form.correctAnswer.value;

    if (parseInt(userAnswer) !== parseInt(correctAnswer)) {
      setStatus({
        type: "error",
        message: "Incorrect answer to math challenge.",
      });
      return;
    }

    const email = form.email.value;
    const message = form.message.value;
    const name = form.submitter_name.value;
    const phone = form.phone.value;
    const company = form.company.value;

    try {
      const res = await fetch(
        CONTACT_US_ENDPOINT,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, message, name, phone, company }),
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Server error: ${res.status} - ${errorText}`);
      }

      await res.json();
      setStatus({
        type: "success",
        message: "✅ Message sent successfully. Thank you!",
      });
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus({
        type: "error",
        message: "❌ Failed to send message. Please try again later.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-4 p-6 mx-auto">
      <h1 className="text-4xl font-bold dark:text-white mb-6">Contact Us</h1>

      {status && (
        <div
          className={`text-sm px-3 py-2 rounded-md ${
            status.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {status.message}
        </div>
      )}

      <FormField
        id="email"
        name="email"
        type="email"
        label="Your Email"
        placeholder="Enter your email"
        Icon={EnvelopeIcon}
        required
      />

      <FormField
        id="submitter_name"
        name="submitter_name"
        type="text"
        label="Your Name"
        placeholder="Enter your name"
        Icon={UserIcon}
        required
      />

      <FormField
        id="company"
        name="company"
        type="text"
        label="Your Company"
        placeholder="Enter your company"
        Icon={BuildingOfficeIcon}
      />

      <FormField
        id="phone"
        name="phone"
        type="text"
        label="Your Phone"
        placeholder="Enter your phone"
        Icon={PhoneIcon}
      />

      <div>
        <label
          htmlFor="message"
          className="mb-1 block text-xs font-medium text-gray-900 dark:text-white"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          className="w-full rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 p-2 text-sm text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
        />
      </div>

      <FormField
        id="mathAnswer"
        name="mathAnswer"
        label={challenge.question}
        placeholder="Enter your answer"
        type="number"
        Icon={CalculatorIcon}
        required
      />
      <input type="hidden" name="correctAnswer" value={challenge.answer} />

      <button
        type="submit"
        className="w-full rounded bg-blue-600 text-white px-4 py-2 hover:bg-blue-500"
      >
        Submit
      </button>
    </form>
  );
}
