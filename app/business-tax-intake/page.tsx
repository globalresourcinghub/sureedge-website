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
      setErrorDetail("Missing NEXT_PUBLIC_WEB3FORMS_KEY. Add it in Vercel (or .env.local), then redeploy.");
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
          Business Tax Return
        </div>
        <h1 style={{ fontSize: "28px", fontWeight: 700, marginBottom: "8px", color: "#1a2e4a" }}>
          Get Your Free Business Tax Quote
        </h1>
        <p style={{ fontSize: "14px", color: "#6b7280", maxWidth: "560px", margin: "0 auto" }}>
          Fill out our simple intake form and we&apos;ll provide a personalized fee quote within 2 business days.
        </p>
      </div>

      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "32px" }}>
        <p style={{ fontSize: "14px", marginBottom: "20px" }}>
          Filing as an individual instead?{" "}
          <Link href="/tax-intake" style={{ fontWeight: 600, color: "#b8962e", textDecoration: "none" }}>
            Use our Individual Tax Quote Form
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
              Business Tax Return Quote Form
            </h2>

            <input name="businessName" placeholder="Business Name" required style={inputStyle} />
            <input name="contactName" placeholder="Contact Name" required style={inputStyle} />
            <input name="email" type="email" placeholder="Email Address" required style={inputStyle} />
            <input name="phone" type="tel" placeholder="Phone Number" required style={inputStyle} />

            <select name="entityType" required style={selectStyle} defaultValue="">
              <option value="">Business Entity Type - Select</option>
              <option>Sole Proprietor / Schedule C</option>
              <option>Single-Member LLC</option>
              <option>Multi-Member LLC</option>
              <option>S-Corporation (Form 1120-S)</option>
              <option>Partnership (Form 1065)</option>
              <option>C-Corporation (Form 1120)</option>
              <option>Not Sure</option>
            </select>

            <select name="taxYear" required style={selectStyle} defaultValue="">
              <option value="">Tax Year - Select</option>
              <option>2024</option>
              <option>2023</option>
              <option>2022 or earlier</option>
            </select>

            <select name="teamSize" style={selectStyle} defaultValue="">
              <option value="">Number of Employees / Contractors - Select</option>
              <option>0</option>
              <option>1-5</option>
              <option>6-20</option>
              <option>21 or more</option>
            </select>

            <select name="firstYearInBusiness" style={selectStyle} defaultValue="">
              <option value="">Is this your first year in business? - Select</option>
              <option>Yes</option>
              <option>No</option>
            </select>

            <div>
              <p style={{ fontWeight: 500, marginBottom: "8px", fontSize: "14px", color: "#1a2e4a" }}>Services Needed</p>
              <GroupCheckboxes name="servicesNeeded" options={servicesNeeded} />
            </div>

            <div>
              <p style={{ fontWeight: 500, marginBottom: "8px", fontSize: "14px", color: "#1a2e4a" }}>Business Income &amp; Activity</p>
              <GroupCheckboxes name="incomeActivity" options={incomeActivity} />
            </div>

            <select name="bookkeepingSoftware" style={selectStyle} defaultValue="">
              <option value="">Do you use bookkeeping software? - Select</option>
              <option>QuickBooks</option>
              <option>Excel / Spreadsheets</option>
              <option>Other software</option>
              <option>Nothing currently</option>
            </select>

            <select name="booksStatus" style={selectStyle} defaultValue="">
              <option value="">Are your books up to date? - Select</option>
              <option>Yes, fully up to date</option>
              <option>Partially - some catching up needed</option>
              <option>No - need full cleanup</option>
              <option>Not applicable</option>
            </select>

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
