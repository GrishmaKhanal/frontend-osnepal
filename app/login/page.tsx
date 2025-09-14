"use client";

import { useState } from "react";

import { LoginLayout } from "@/components/auth/LoginLayout";
import { EmailForm } from "@/components/auth/EmailForm";
import { LoginForm } from "@/components/auth/LoginForm";
import { SignupForm } from "@/components/auth/SignupForm";
import { EmailOtpForm } from "@/components/auth/EmailOTPForm";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";

export default function LoginPage() {
  const [step, setStep] = useState<
    "email" | "login" | "signup" | "confirm-otp" | "reset-password"
  >("email");
  const [afterOtp, setAfterOtp] = useState<"complete" | "reset-password">(
    "complete"
  );
  const [email, setEmail] = useState("");

  const handleVerify = () => {
    if (afterOtp === "reset-password") {
      setStep("reset-password");
    } else {
      setStep("email");
    }
  };

  return (
    <LoginLayout>
      {step === "email" && (
        <EmailForm
          onNext={(nextStep, inputEmail) => {
            setStep(nextStep);
            setEmail(inputEmail);
          }}
        />
      )}
      {step === "login" && (
        <LoginForm
          onNext={(next) => {
            setAfterOtp("complete");
            setStep(next);
          }}
          onBack={() => setStep("email")}
          onForgot={() => {
            setAfterOtp("reset-password");
            setStep("confirm-otp");
          }}
        />
      )}
      {step === "signup" && (
        <SignupForm
          email={email}
          onNext={(next) => {
            setAfterOtp("complete");
            setStep(next);
          }}
          onBack={() => setStep("email")}
        />
      )}
      {step === "confirm-otp" && (
        <EmailOtpForm onVerify={handleVerify} onBack={() => setStep("email")} />
      )}
      {step === "reset-password" && (
        <ResetPasswordForm email={email} onBack={() => setStep("email")} />
      )}
    </LoginLayout>
  );
}
