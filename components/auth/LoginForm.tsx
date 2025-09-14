import React from "react";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/contexts/LanguageContext";
import { z } from "zod";
import { Label } from "@/components/ui/label";

export function LoginForm({
  onNext,
  onBack,
  onForgot,
}: {
  onNext: (step: "confirm-otp") => void;
  onBack: () => void;
  onForgot: () => void;
}) {
  const { t } = useLanguage();
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const passwordSchema = z
      .string()
      .min(6, "Password must be at least 6 characters long");
    const validation = passwordSchema.safeParse(password);
    if (!validation.success) {
      return;
    }
    onNext("confirm-otp");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid gap-3">
        <Label htmlFor="password">{t("password")}</Label>
        <Input
          id="password"
          type="password"
          placeholder="Secure Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button type="submit">{t("logIn")}</Button>
      <Button variant="link" type="button" onClick={() => onForgot()}>
        {t("forgotPassword")}
      </Button>
      <Button variant="link" type="button" onClick={onBack}>
        {t("goBack")}
      </Button>
    </form>
  );
}
