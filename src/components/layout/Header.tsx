"use client";

import { Search01Icon, Notification01Icon, HelpCircleIcon, AddCircleIcon } from "hugeicons-react";
import { UI_TEXTS } from "@/constants/ui-texts.constant";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  title?: string;
}

export function Header({ title }: HeaderProps) {
  const headerTitle = title ?? UI_TEXTS.APP_TITLE;

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-3 sm:gap-4 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 bg-surface-container border-b border-outline-variant/30">
      <div className="flex items-center gap-3 sm:gap-4 ml-10 sm:ml-12 lg:ml-0">
        <h2 className="font-display font-semibold text-lg sm:text-xl text-on-surface tracking-tight truncate max-w-[200px] sm:max-w-none">
          {headerTitle}
        </h2>
      </div>

      <div className="hidden md:flex items-center relative flex-1 max-w-md mx-4 lg:mx-8">
        <Search01Icon size={16} className="absolute left-3 text-on-surface-variant" />
        <input
          type="text"
          placeholder="Buscar atleta, rutina, métrica..."
          className="w-full pl-9 pr-4 py-2 rounded-lg bg-surface-container-low border border-outline-variant/50 text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:border-on-tertiary-container focus:outline-none transition-colors font-body"
        />
      </div>

      <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 border-l border-outline-variant/30 pl-3 sm:pl-4 lg:pl-6">
        <Button
          variant="ghost"
          size="icon-sm"
          className="text-on-surface-variant hover:text-on-surface transition-colors"
        >
          <Notification01Icon size={18} />
        </Button>
        <Button
          variant="ghost"
          size="icon-sm"
          className="hidden sm:flex text-on-surface-variant hover:text-on-surface transition-colors"
        >
          <HelpCircleIcon size={18} />
        </Button>
        <div className="h-8 w-8 rounded-full bg-surface-container-high border border-outline-variant overflow-hidden ml-1 cursor-pointer hover:border-outline transition-colors">
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-display font-semibold text-[10px] text-secondary-brand">AG</span>
          </div>
        </div>
        <Button
          size="sm"
          className="bg-on-tertiary-container hover:bg-on-tertiary-container/90 text-on-surface font-display font-semibold gap-1.5 rounded-lg shadow-lg shadow-on-tertiary-container/20"
        >
          <AddCircleIcon size={16} />
          <span className="hidden sm:inline">{UI_TEXTS.DASHBOARD.NEW_ANALYSIS}</span>
        </Button>
      </div>
    </header>
  );
}