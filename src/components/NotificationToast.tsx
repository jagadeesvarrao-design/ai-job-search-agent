"use client";

import React, { useEffect } from "react";
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X, Sparkles, Bot, Search, FileText } from "lucide-react";

export type ToastType = "success" | "error" | "warning" | "info" | "scout" | "filter" | "coach" | "factory";

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  message: string;
  duration?: number;
}

interface NotificationToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({ toasts, onDismiss }) => {
  useEffect(() => {
    if (toasts.length === 0) return;

    const timers = toasts.map(toast => {
      return setTimeout(() => {
        onDismiss(toast.id);
      }, toast.duration || 4500);
    });

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [toasts, onDismiss]);

  if (toasts.length === 0) return null;

  const getToastStyles = (type: ToastType) => {
    switch (type) {
      case "success":
        return {
          bg: "bg-emerald-950/90 dark:bg-emerald-950/95 border-emerald-500/50 text-emerald-100",
          icon: <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />,
          accent: "text-emerald-400",
          progressBg: "bg-[#E8F0EB]0"
        };
      case "scout":
        return {
          bg: "bg-[#092b27]/95 dark:bg-[#061e1b]/95 border-teal-500/50 text-teal-100",
          icon: <Search className="w-5 h-5 text-teal-400 flex-shrink-0" />,
          accent: "text-teal-400",
          progressBg: "bg-teal-400"
        };
      case "filter":
        return {
          bg: "bg-indigo-950/95 dark:bg-[#0f172a]/95 border-indigo-500/50 text-indigo-100",
          icon: <Sparkles className="w-5 h-5 text-indigo-400 flex-shrink-0" />,
          accent: "text-indigo-400",
          progressBg: "bg-indigo-500"
        };
      case "factory":
        return {
          bg: "bg-cyan-950/95 dark:bg-cyan-950/95 border-cyan-500/50 text-cyan-100",
          icon: <FileText className="w-5 h-5 text-cyan-400 flex-shrink-0" />,
          accent: "text-cyan-400",
          progressBg: "bg-cyan-400"
        };
      case "coach":
        return {
          bg: "bg-purple-950/95 dark:bg-purple-950/95 border-purple-500/50 text-purple-100",
          icon: <Bot className="w-5 h-5 text-purple-400 flex-shrink-0" />,
          accent: "text-purple-400",
          progressBg: "bg-purple-500"
        };
      case "warning":
        return {
          bg: "bg-amber-950/90 dark:bg-amber-950/95 border-amber-500/50 text-amber-100",
          icon: <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />,
          accent: "text-amber-400",
          progressBg: "bg-amber-500"
        };
      case "error":
        return {
          bg: "bg-rose-950/90 dark:bg-rose-950/95 border-rose-500/50 text-rose-100",
          icon: <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />,
          accent: "text-rose-400",
          progressBg: "bg-rose-500"
        };
      default:
        return {
          bg: "bg-[#1A1F1F]/95 border-slate-700 text-slate-100",
          icon: <Info className="w-5 h-5 text-slate-400 flex-shrink-0" />,
          accent: "text-slate-300",
          progressBg: "bg-slate-400"
        };
    }
  };

  return (
    <div className="fixed top-5 right-5 z-[99999] flex flex-col gap-3 max-w-md w-full px-4 sm:px-0 pointer-events-none">
      {toasts.map(toast => {
        const styles = getToastStyles(toast.type);
        return (
          <div
            key={toast.id}
            className={`pointer-events-auto backdrop-blur-xl border shadow-2xl rounded-2xl p-4 flex items-start gap-3.5 transition-all transform duration-300 animate-in slide-in-from-top-4 fade-in ${styles.bg}`}
          >
            <div className="mt-0.5">{styles.icon}</div>
            <div className="flex-1 min-w-0">
              <h4 className={`text-xs font-black uppercase tracking-wider ${styles.accent}`}>
                {toast.title}
              </h4>
              <p className="text-xs font-medium text-slate-200 mt-0.5 leading-relaxed">
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-[#FAF9F6]/10 transition-colors flex-shrink-0"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
