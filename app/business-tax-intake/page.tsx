"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { joinFieldList, submitToWeb3Forms } from "@/lib/web3forms";

const inputClass =
  "w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-[#b8962e]";
const selectClass =
  "w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm text-gray-600 focus:outline-none focus:border-[#b8962e]";

const servicesNeeded = [
  "Business Tax Return Preparation",
  "Bookkeeping (monthly)",
  "Payroll Processing",
  "Tax Planning & Strategy",
  "IRS Representation / Notice Response",
  "Quarterly Estimated Taxes",
];

const incomeActivity = [
  "Have income from sales / services",
  "Have business expenses to deduct",
  "Use a home office",
  "Have business vehicle use",
  "Have employees or contractors (W-2 / 1099)",
  "Have inventory",
  "Have rental income from business property",
  "Have foreign income or transactions",
  "None of the above",
];

function GroupCheckboxes({ name, options }: { name: string; options: string[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {options.map((option) => (
        <label key={option} className="flex items-start gap-2 text-sm text-gray-700">
          <input type="checkbox" name={name} value={option} className="mt-0.5" />
          <span>{option}</span>
        </label>
      ))}
    </div>
  );
}

export default function BusinessTaxIntakePage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorDetail, setErrorDetail] = useState<string | null>(null);
  const web3FormsKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setErrorDetail(null);
    if (!web3FormsKey) {
      setStatus("error");
      setErrorDetail(
        "Missing NEXT_PUBLIC_WEB3FORMS_KEY. Add it in Vercel (or .env.local), then redeploy."
      );
      return;
    }

    const formData = new FormData(event.currentTarget);
    const values = Object.fromEntries(formData.entries());
    const payload = {
      ...values,
      servicesNeeded: joinFieldList(formData.getAll("servicesNeeded")),
      incomeActivity: joinFieldList(formData.getAll("incomeActivity")),
      access_key: web3FormsKey,
      subject: "New Business Tax Quote Request - SureEdge",
      formType: "business-tax-intake",
    };

    try {
      const { ok, message } = await submitToWeb3Forms(payload);
      if (ok) setStatus("sent");
      else {
        setStatus("error");
        setErrorDetail(
          message ??
            "If this persists, add your domain in Web3Forms and confirm the key in Vercel, then redeploy."
        );
      }
    } catch {
      setStatus("error");
      setErrorDetail("Network error. Try again or email contact@sureedgetax.com.");
    }
  };

  return (
    <section className="py-12 px-6 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div
          className="inline-block text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3"
          style={{ background: "#b8962e", color: "#fff" }}
        >
          Business Tax Return
        </div>
        <h1 className="text-3xl font-bold mb-2" style={{ color: "#1a2e4a" }}>
          Get Your Free Business Tax Quote
        </h1>
        <p className="text-sm text-gray-600 max-w-2xl mx-auto">
          Fill out our simple intake form and we&apos;ll provide a personalized fee quote within 2
          business days.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8">
        <p className="text-sm mb-5">
          Filing as an individual instead?{" "}
          <Link href="/tax-intake" className="font-semibold" style={{ color: "#b8962e" }}>
            Use our Individual Tax Quote Form
          </Link>
          .
        </p>

        {status === "sent" ? (
          <div className="text-center py-10">
            <h2 className="text-xl font-bold mb-2" style={{ color: "#1a2e4a" }}>
              Quote Request Received
            </h2>
            <p className="text-sm text-gray-600">
              Thank you. We will review your details and reply within 2 business days.
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-5">
            <h2 className="text-lg font-semibold" style={{ color: "#1a2e4a" }}>
              Business Tax Return Quote Form
            </h2>

            <input name="businessName" placeholder="Business Name" required className={inputClass} />
            <input name="contactName" placeholder="Contact Name" required className={inputClass} />
            <input name="email" type="email" placeholder="Email Address" required className={inputClass} />
            <input name="phone" type="tel" placeholder="Phone Number" required className={inputClass} />

            <select name="entityType" required className={selectClass} defaultValue="">
              <option value="">Business Entity Type - Select</option>
              <option>Sole Proprietor / Schedule C</option>
              <option>Single-Member LLC</option>
              <option>Multi-Member LLC</option>
              <option>S-Corporation (Form 1120-S)</option>
              <option>Partnership (Form 1065)</option>
              <option>C-Corporation (Form 1120)</option>
              <option>Not Sure</option>
            </select>

            <select name="taxYear" required className={selectClass} defaultValue="">
              <option value="">Tax Year - Select</option>
              <option>2024</option>
              <option>2023</option>
              <option>2022 or earlier</option>
            </select>

            <select name="teamSize" className={selectClass} defaultValue="">
              <option value="">Number of Employees / Contractors - Select</option>
              <option>0</option>
              <option>1-5</option>
              <option>6-20</option>
              <option>21 or more</option>
            </select>

            <select name="firstYearInBusiness" className={selectClass} defaultValue="">
              <option value="">Is this your first year in business? - Select</option>
              <option>Yes</option>
              <option>No</option>
            </select>

            <div>
              <p className="font-medium mb-2">Services Needed</p>
              <GroupCheckboxes name="servicesNeeded" options={servicesNeeded} />
            </div>

            <div>
              <p className="font-medium mb-2">Business Income &amp; Activity</p>
              <GroupCheckboxes name="incomeActivity" options={incomeActivity} />
            </div>

            <select name="bookkeepingSoftware" className={selectClass} defaultValue="">
              <option value="">Do you use bookkeeping software? - Select</option>
              <option>QuickBooks</option>
              <option>Excel / Spreadsheets</option>
              <option>Other software</option>
              <option>Nothing currently</option>
            </select>

            <select name="booksStatus" className={selectClass} defaultValue="">
              <option value="">Are your books up to date? - Select</option>
              <option>Yes, fully up to date</option>
              <option>Partially - some catching up needed</option>
              <option>No - need full cleanup</option>
              <option>Not applicable</option>
            </select>

            <textarea
              name="comments"
              placeholder="Additional Comments or Questions"
              className={`${inputClass} resize-y min-h-24`}
            />

            <button
              type="submit"
              disabled={status === "sending"}
              className="text-white text-sm font-bold py-3 px-5 rounded transition-opacity hover:opacity-90"
              style={{ background: "#b8962e" }}
            >
              {status === "sending" ? "Submitting..." : "Submit Form"}
            </button>

            {status === "error" && (
              <p className="text-sm text-red-500">
                {errorDetail ??
                  "Something went wrong. Please email contact@sureedgetax.com."}
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
