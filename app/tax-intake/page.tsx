"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { joinFieldList, submitToWeb3Forms } from "@/lib/web3forms";

const inputClass =
  "w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-[#b8962e]";
const selectClass =
  "w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm text-gray-600 focus:outline-none focus:border-[#b8962e]";

const incomeDocuments = [
  "W-2 (Employment Income)",
  "1099-NEC (Freelance/Self-Employment)",
  "1099-MISC (Other Income)",
  "1099-G (Unemployment/State Refund)",
  "1099-INT (Interest Income)",
  "1099-DIV (Dividend Income)",
  "1099-B (Stock/Investment Sales)",
  "1099-R (Retirement/Pension)",
  "SSA-1099 (Social Security)",
  "K-1 (Partnership/S-Corp/Trust)",
  "Alimony Received",
  "Other Income",
];

const investmentItems = [
  "Sold stocks, bonds, or mutual funds",
  "Contributed to or withdrew from IRA/Roth IRA",
  "401(k) or pension distribution",
  "Cryptocurrency transactions",
  "HSA contributions or withdrawals",
  "None of the above",
];

const businessItems = [
  "Self-employed / freelancer / consultant",
  "Own a small business (LLC, S-Corp, Partnership)",
  "Received 1099-NEC or 1099-MISC",
  "Have business expenses to deduct",
  "Use home office for business",
  "Have business vehicle use",
  "None of the above",
];

const realEstateItems = [
  "Own a home (mortgage interest & property tax)",
  "Sold a home or property",
  "Have rental income",
  "Have rental expenses",
  "Bought or sold land",
  "None of the above",
];

const deductionItems = [
  "Child Tax Credit",
  "Child & Dependent Care Expenses",
  "Education expenses (tuition, student loan interest)",
  "Charitable donations",
  "Medical expenses",
  "Energy-efficient home improvements",
  "Earned Income Tax Credit (EITC)",
  "American Opportunity or Lifetime Learning Credit",
  "None of the above",
];

const specialCases = [
  "Foreign income or assets (FBAR, Form 8938)",
  "Lived in or moved between states",
  "Got married or divorced this year",
  "Had a new baby or adopted",
  "Received an inheritance",
  "Had gambling winnings or losses",
  "Received forgiven debt (1099-C)",
  "Identity theft or IRS notice received",
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

export default function TaxIntakePage() {
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
      incomeDocuments: joinFieldList(formData.getAll("incomeDocuments")),
      investmentItems: joinFieldList(formData.getAll("investmentItems")),
      businessItems: joinFieldList(formData.getAll("businessItems")),
      realEstateItems: joinFieldList(formData.getAll("realEstateItems")),
      deductionItems: joinFieldList(formData.getAll("deductionItems")),
      specialCases: joinFieldList(formData.getAll("specialCases")),
      access_key: web3FormsKey,
      subject: "New Individual Tax Quote Request - SureEdge",
      formType: "individual-tax-intake",
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
          Individual Tax Return
        </div>
        <h1 className="text-3xl font-bold mb-2" style={{ color: "#1a2e4a" }}>
          Get Your Free Tax Quote
        </h1>
        <p className="text-sm text-gray-600 max-w-2xl mx-auto">
          Fill out our simple intake form and we&apos;ll provide a personalized fee quote within 2
          business days.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8">
        <p className="text-sm mb-5">
          Need a quote for a business return?{" "}
          <Link href="/business-tax-intake" className="font-semibold" style={{ color: "#b8962e" }}>
            Use our Business Tax Quote Form instead
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
              Individual Tax Return Intake Form
            </h2>

            <input name="fullName" placeholder="Full Name" required className={inputClass} />
            <input name="email" type="email" placeholder="Email Address" required className={inputClass} />
            <input name="phone" type="tel" placeholder="Phone Number" required className={inputClass} />

            <select name="filingStatus" required className={selectClass} defaultValue="">
              <option value="">Filing Status - Select</option>
              <option>Single</option>
              <option>Married Filing Jointly</option>
              <option>Married Filing Separately</option>
              <option>Head of Household</option>
              <option>Qualifying Surviving Spouse</option>
            </select>

            <select name="taxYear" required className={selectClass} defaultValue="">
              <option value="">Tax Year - Select</option>
              <option>2024</option>
              <option>2023</option>
              <option>2022 or earlier</option>
            </select>

            <select name="dependents" className={selectClass} defaultValue="">
              <option value="">Number of Dependents - Select</option>
              <option>0</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4 or more</option>
            </select>

            <div>
              <p className="font-medium mb-2">Which income documents do you have?</p>
              <GroupCheckboxes name="incomeDocuments" options={incomeDocuments} />
            </div>
            <div>
              <p className="font-medium mb-2">Which investment or retirement items apply to you?</p>
              <GroupCheckboxes name="investmentItems" options={investmentItems} />
            </div>
            <div>
              <p className="font-medium mb-2">Which business or self-employment items apply to you?</p>
              <GroupCheckboxes name="businessItems" options={businessItems} />
            </div>
            <div>
              <p className="font-medium mb-2">Which real estate items apply to you?</p>
              <GroupCheckboxes name="realEstateItems" options={realEstateItems} />
            </div>
            <div>
              <p className="font-medium mb-2">Which credits or deductions apply to you?</p>
              <GroupCheckboxes name="deductionItems" options={deductionItems} />
            </div>
            <div>
              <p className="font-medium mb-2">Do any of these special situations apply to you?</p>
              <GroupCheckboxes name="specialCases" options={specialCases} />
            </div>

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
