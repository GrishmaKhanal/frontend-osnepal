import React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useLanguage } from "@/lib/contexts/LanguageContext";
import { Label } from "@/components/ui/label";

export function EmailOtpForm({
  onVerify,
  onBack,
}: {
  onVerify: () => void;
  onBack: () => void;
}) {
  const { t } = useLanguage();
  const [otp, setOtp] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 6) {
      onVerify();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center">
      <div className="grid gap-3">
        <Label htmlFor="input-otp">{t("enterOtp")}</Label>
        <InputOTP maxLength={6} value={otp} onChange={setOtp}>
          <InputOTPGroup>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <InputOTPSlot key={i} index={i} />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </div>
      <Button type="submit">{t("continue")}</Button>
      <Button variant="link" type="button" onClick={onBack}>
        {t("goBack")}
      </Button>
    </form>
  );
}
