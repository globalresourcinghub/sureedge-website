"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { joinFieldList, submitToWeb3Forms } from "@/lib/web3forms";

const inputStyle: React.CSSProperties = {
  width: "100%",
  border: "1px solid #e5e7eb",
  borderRadius: "6px",
  padding: "10px 12px",
  fontSize: "14px",
  outline: "none",
  boxSizing: "border-box",
};

const selectStyle: React.CSSProperties = {
  width: "100%",
  border: "1px solid #e5e7eb",
  borderRadius: "6px",
  padding: "10px 12px",
  fontSize: "14px",
  color: "#555",
  outline: "none",
  boxSizing: "border-box",
  background: "#fff",
};

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
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
      {options.map((option) => (
        <label key={option} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "14px", color: "#374151", cursor: "pointer" }}>
          <input type="checkbox" name={name} value={option} style={{ marginTop: "2px", flexShrink: 0 }} />
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
      setErrorDetail("Missing NEXT_PUBLIC_WEB3FORMS_KEY. Add it in Vercel (or .env.local), then redeploy.");
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
        setErrorDetail(message ?? "If this persists, add your domain in Web3Forms and confirm the key in Vercel, then redeploy.");
      }
    } catch {
      setStatus("error");
      setErrorDetail("Network error. Try again or email contact@sureedgetax.com.");
    }
  };

  return (
    <section style={{ padding: "48px 24px", maxWidth: "896px", margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <div style={{ display: "inline-block", fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", padding: "4px 12px", borderRadius: "20px", marginBottom: "12px", background: "#b8962e", color: "#fff" }}>
          Individual Tax Return
        </div>
        <h1 style={{ fontSize: "28px", fontWeight: 700, marginBottom: "8px", color: "#1a2e4a" }}>
          Get Your Free Tax Quote
        </h1>
        <p style={{ fontSize: "14px", color: "#6b7280", maxWidth: "560px", margin: "0 auto" }}>
          Fill out our simple intake form and we&apos;ll provide a personalized fee quote within 2 business days.
        </p>
      </div>

      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "32px" }}>
        <p style={{ fontSize: "14px", marginBottom: "20px" }}>
          Need a quote for a business return?{" "}
          <Link href="/business-tax-intake" style={{ fontWeight: 600, color: "#b8962e", textDecoration: "none" }}>
            Use our Business Tax Quote Form instead
          </Link>
          .
        </p>

        {status === "sent" ? (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "8px", color: "#1a2e4a" }}>
              Quote Request Received
            </h2>
            <p style={{ fontSize: "14px", color: "#6b7280" }}>
              Thank you. We will review your details and reply within 2 business days.
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <h2 style={{ fontSize: "17px", fontWeight: 600, color: "#1a2e4a", margin: 0 }}>
              Individual Tax Return Intake Form
            </h2>

            <input name="fullName" placeholder="Full Name" required style={inputStyle} />
            <input name="email" type="email" placeholder="Email Address" required style={inputStyle} />
            <input name="phone" type="tel" placeholder="Phone Number" required style={inputStyle} />

            <select name="filingStatus" required style={selectStyle} defaultValue="">
              <option value="">Filing Status - Select</option>
              <option>Single</option>
              <option>Married Filing Jointly</option>
              <option>Married Filing Separately</option>
              <option>Head of Household</option>
              <option>Qualifying Surviving Spouse</option>
            </select>

            <select name="taxYear" required style={selectStyle} defaultValue="">
              <option value="">Tax Year - Select</option>
              <option>2024</option>
              <option>2023</option>
              <option>2022 or earlier</option>
            </select>

            <select name="dependents" style={selectStyle} defaultValue="">
              <option value="">Number of Dependents - Select</option>
              <option>0</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4 or more</option>
            </select>

            <div>
              <p style={{ fontWeight: 500, marginBottom: "8px", fontSize: "14px", color: "#1a2e4a" }}>Which income documents do you have?</p>
              <GroupCheckboxes name="incomeDocuments" options={incomeDocuments} />
            </div>
            <div>
              <p style={{ fontWeight: 500, marginBottom: "8px", fontSize: "14px", color: "#1a2e4a" }}>Which investment or retirement items apply to you?</p>
              <GroupCheckboxes name="investmentItems" options={investmentItems} />
            </div>
            <div>
              <p style={{ fontWeight: 500, marginBottom: "8px", fontSize: "14px", color: "#1a2e4a" }}>Which business or self-employment items apply to you?</p>
              <GroupCheckboxes name="businessItems" options={businessItems} />
            </div>
            <div>
              <p style={{ fontWeight: 500, marginBottom: "8px", fontSize: "14px", color: "#1a2e4a" }}>Which real estate items apply to you?</p>
              <GroupCheckboxes name="realEstateItems" options={realEstateItems} />
            </div>
            <div>
              <p style={{ fontWeight: 500, marginBottom: "8px", fontSize: "14px", color: "#1a2e4a" }}>Which credits or deductions apply to you?</p>
              <GroupCheckboxes name="deductionItems" options={deductionItems} />
            </div>
            <div>
              <p style={{ fontWeight: 500, marginBottom: "8px", fontSize: "14px", color: "#1a2e4a" }}>Do any of these special situations apply to you?</p>
              <GroupCheckboxes name="specialCases" options={specialCases} />
            </div>

            <textarea
              name="comments"
              placeholder="Additional Comments or Questions"
              style={{ ...inputStyle, resize: "vertical", minHeight: "96px" }}
            />

            <button
              type="submit"
              disabled={status === "sending"}
              style={{ background: "#b8962e", color: "#fff", fontSize: "14px", fontWeight: 700, padding: "12px 20px", borderRadius: "6px", border: "none", cursor: status === "sending" ? "not-allowed" : "pointer", opacity: status === "sending" ? 0.75 : 1, alignSelf: "flex-start" }}
            >
              {status === "sending" ? "Submitting..." : "Submit Form"}
            </button>

            {status === "error" && (
              <p style={{ fontSize: "14px", color: "#ef4444" }}>
                {errorDetail ?? "Something went wrong. Please email contact@sureedgetax.com."}
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
