import React from "react";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useLanguage } from "@/lib/contexts/LanguageContext";
import { Label } from "@/components/ui/label";

export function ResetPasswordForm({
  email,
  onBack,
}: {
  email: string;
  onBack: () => void;
}) {
  const { t } = useLanguage();
  const [error, setError] = useState<string | null>(null);
  const [username] = useState("existingUser");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // clear previous errors
    setError(null);
    const passwordSchema = z
      .string()
      .min(6, "Password must be at least 6 characters long");
    const validation = passwordSchema.safeParse(password);
    if (!validation.success) {
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid gap-3">
        <Label htmlFor="username">{t("name")}</Label>
        <Input id="username" type="text" value={username} disabled />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="email">{t("email")}</Label>
        <Input id="email" type="email" value={email} disabled />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="password">{t("password")}</Label>
        <Input
          id="password"
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="confirm-password">{t("confirmPassword")}</Label>
        <Input
          id="confirm-password"
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <Button type="submit">{t("continue")}</Button>
      <Button variant="link" type="button" onClick={onBack}>
        {t("goBack")}
      </Button>
    </form>
  );
}
