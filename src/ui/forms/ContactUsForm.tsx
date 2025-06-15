// app/ui/forms/ContactUsForm,tsx
"use client";

import { useEffect, useState } from "react";
import { generateMathChallenge } from "@/lib/mathChallenge";
import FormField from "@/ui/components/FormField";
import { AtSymbolIcon, CalculatorIcon } from "@heroicons/react/24/outline";

export default function ContactUsForm() {
  const [challenge, setChallenge] = useState({ question: "", answer: 0 });

  useEffect(() => {
    const { question, answer } = generateMathChallenge();
    setChallenge({ question, answer });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const userAnswer = form.mathAnswer.value;
    const correctAnswer = form.correctAnswer.value;

    if (parseInt(userAnswer) !== parseInt(correctAnswer)) {
      alert("Incorrect answer to math challenge.");
      return;
    }

    alert("Correct! Message will be sent.");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-4 p-6 mx-auto">
      <h1 className="text-4xl font-bold  dark:text-white mb-6">Contact Us</h1>

      <FormField
        id="email"
        name="email"
        type="email"
        label="Your Email"
        placeholder="Enter your email"
        Icon={AtSymbolIcon}
        required
      />

      <div>
        <label htmlFor="message" className="mb-1 block text-xs font-medium text-gray-900 dark:text-white">
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
