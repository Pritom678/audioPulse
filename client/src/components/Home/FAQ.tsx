"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for all unused items in original packaging. Simply contact our support team to initiate a return."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship worldwide. Shipping costs and delivery times vary by location. Free shipping on orders over $100."
    },
    {
      question: "How long is the warranty?",
      answer: "All our products come with a 2-year manufacturer warranty covering defects and malfunctions."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, Apple Pay, and Google Pay for your convenience."
    },
    {
      question: "Can I track my order?",
      answer: "Yes, you'll receive tracking information via email once your order ships. You can also track in your account dashboard."
    },
    {
      question: "Do you offer bulk discounts?",
      answer: "Yes, we offer competitive bulk pricing for orders of 10+ items. Contact our sales team for custom quotes."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-base-100 py-20">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section heading */}
        <div className="mb-20 flex items-center gap-6">
          <span className="h-px w-12 bg-neutral" />
          <h2 className="text-2xl font-semibold tracking-tight text-neutral">
            Frequently Asked Questions
          </h2>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="group rounded-xl border border-base-200 bg-white/50 backdrop-blur-sm transition-all duration-300 hover:bg-white/80"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between transition-colors duration-200"
              >
                <h3 className="text-base font-medium text-neutral pr-4">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-neutral/60 transition-transform duration-200" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-neutral/60 transition-transform duration-200" />
                  )}
                </div>
              </button>
              
              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-6 pb-5">
                  <p className="text-sm text-neutral/70 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Help Section */}
        <div className="mt-16 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 p-8 text-center">
          <h3 className="text-lg font-medium text-neutral mb-3">
            Still have questions?
          </h3>
          <p className="text-sm text-neutral/70 mb-6">
            Our support team is here to help you with any inquiries.
          </p>
          <button className="inline-flex items-center gap-2 rounded-full px-6 py-3 bg-primary text-white font-medium transition-all duration-200 hover:bg-primary/90 hover:shadow-lg">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
