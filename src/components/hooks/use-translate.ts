"use client";
import { useEffect, useState } from "react";
import enMessages from "@/lib/messages/en.json";
import mmMessages from "@/lib/messages/mm.json";
import { useCommonStore } from "@/store/common-store";

type Messages = typeof enMessages;

interface TranslateResult {
  messages: Messages;
  isLoading: boolean;
}

export const useTranslate = (): TranslateResult => {
  const { lang, setLanguage } = useCommonStore();
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState<Messages>(mmMessages);

  useEffect(() => {
    setIsClient(true);
    const storedLang = localStorage.getItem("lang") || "mm";
    setLanguage(storedLang);
    setMessages(storedLang === "mm" ? mmMessages : enMessages);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isClient) {
      setIsLoading(true);
      setMessages(lang === "mm" ? mmMessages : enMessages);
      setIsLoading(false);
    }
  }, [lang, isClient]);

  return { messages, isLoading };
};
