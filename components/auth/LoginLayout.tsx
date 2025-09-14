import React from "react";

import { useLanguage } from "@/lib/contexts/LanguageContext";

export function LoginLayout({ children }: { children: React.ReactNode }) {
  const { t } = useLanguage();
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex flex-col items-center gap-2">
        <a href="#" className="flex flex-col items-center gap-2 font-medium">
          {/* Icon Here */}
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">O</span>
          </div>
        </a>
        <h1 className="text-xl font-bold">{t("hello")}</h1>
      </div>
      {/* Children Here */}
      <div className="w-full max-w-sm">{children}</div>
    </div>
  );
}
