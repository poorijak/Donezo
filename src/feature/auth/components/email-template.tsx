import React from "react";

interface EmailTemplateProps {
  email: string;
  subject: "Reset Password" | "Verify Email";
  url: string;
}

const EmailTemplate = ({ email, subject, url }: EmailTemplateProps) => {
  const message =
    subject === "Verify Email"
      ? "Confirm your email to start using TodoApp"
      : "We received a request to reset your password.";

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#ffffff",
        color: "#333",
      }}
    >
      <h2 style={{ color: "#0056b3", textAlign: "center" }}>{email} ✅</h2>
      <p style={{ fontSize: "16px", textAlign: "center" }}>
        {message}
      </p>

      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <a
          href={url}
          style={{
            display: "inline-block",
            backgroundColor: "#0056b3",
            color: "#ffffff",
            padding: "12px 20px",
            borderRadius: "5px",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Verify Email
        </a>
      </div>

      <p style={{ fontSize: "14px", textAlign: "center", color: "#777" }}>
        If you did not request this, please ignore this email.
      </p>

      <hr
        style={{
          margin: "20px 0",
          border: "none",
          borderTop: "1px solid #ddd",
        }}
      />

      <p style={{ fontSize: "12px", textAlign: "center", color: "#777" }}>
        © {new Date().getFullYear()} Todo app. All rights reserved.
      </p>
    </div>
  );
};

export default EmailTemplate;
