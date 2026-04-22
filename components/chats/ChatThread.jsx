"use client";

import {
  ArrowLeftIcon,
  DocumentIcon,
  PaperClipIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { getChatThread } from "@/data/chat-messages";

function MessageBubble({ message }) {
  const isMe = message.from === "me";
  const wrap = isMe ? "justify-end" : "justify-start";
  const bubble = isMe
    ? "bg-linear-to-br from-primary to-orange-600 text-white rounded-2xl rounded-br-md ring-1 ring-accent/35 shadow-md"
    : "bg-white text-gray-900 border border-accent/20 rounded-2xl rounded-bl-md shadow-sm";

  if (message.type === "text") {
    return (
      <div className={`flex ${wrap}`}>
        <div className={`max-w-[85%] sm:max-w-[75%] px-4 py-2.5 ${bubble}`}>
          <p className="text-sm whitespace-pre-wrap wrap-break-word leading-relaxed">
            {message.text}
          </p>
          {message.time ? (
            <p
              className={`text-[10px] mt-1.5 ${isMe ? "text-white/75" : "text-gray-400"}`}
            >
              {message.time}
            </p>
          ) : null}
        </div>
      </div>
    );
  }

  if (message.type === "image") {
    return (
      <div className={`flex ${wrap}`}>
        <div className={`max-w-[85%] sm:max-w-[75%] overflow-hidden rounded-2xl ${isMe ? "rounded-br-md ring-1 ring-accent/30 shadow-md" : "rounded-bl-md border border-accent/20 bg-white shadow-sm"}`}>
          {/* eslint-disable-next-line @next/next/no-img-element -- demo remote placeholder */}
          <img
            src={message.imageUrl}
            alt={message.imageAlt || "Shared image"}
            className="max-h-56 w-full object-cover bg-gray-100"
          />
          {message.time ? (
            <p className="text-[10px] text-gray-400 px-3 py-2 bg-white/90">
              {message.time}
            </p>
          ) : null}
        </div>
      </div>
    );
  }

  if (message.type === "file") {
    return (
      <div className={`flex ${wrap}`}>
        <div
          className={`max-w-[85%] sm:max-w-[75%] flex items-center gap-3 px-4 py-3 ${bubble}`}
        >
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${isMe ? "bg-white/20" : "bg-accent/25"}`}
          >
            <DocumentIcon
              className={`h-6 w-6 ${isMe ? "text-white" : "text-violet-800"}`}
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className={`text-sm font-medium truncate ${isMe ? "text-white" : "text-gray-900"}`}>
              {message.fileName}
            </p>
            <p className={`text-xs ${isMe ? "text-white/75" : "text-gray-500"}`}>
              {message.fileSize}
            </p>
          </div>
          {message.time ? (
            <span className={`text-[10px] shrink-0 self-end ${isMe ? "text-white/70" : "text-gray-400"}`}>
              {message.time}
            </span>
          ) : null}
        </div>
      </div>
    );
  }

  return null;
}

export default function ChatThread() {
  const params = useParams();
  const router = useRouter();
  const chatId = typeof params?.id === "string" ? params.id : null;
  const thread = chatId ? getChatThread(chatId) : null;

  const [messages, setMessages] = useState(() => thread?.messages ?? []);
  const [draft, setDraft] = useState("");
  const bottomRef = useRef(null);
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const blobUrlsRef = useRef([]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(
    () => () => {
      blobUrlsRef.current.forEach((u) => URL.revokeObjectURL(u));
    },
    []
  );

  const pushMessage = useCallback((msg) => {
    setMessages((prev) => [...prev, { ...msg, id: `local-${Date.now()}` }]);
  }, []);

  function sendText() {
    const t = draft.trim();
    if (!t) return;
    pushMessage({
      type: "text",
      from: "me",
      text: t,
      time: "Now",
    });
    setDraft("");
  }

  function onPickFile(e) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      blobUrlsRef.current.push(url);
      pushMessage({
        type: "image",
        from: "me",
        imageUrl: url,
        imageAlt: file.name,
        time: "Now",
      });
      return;
    }
    const sizeKb = Math.max(1, Math.round(file.size / 1024));
    pushMessage({
      type: "file",
      from: "me",
      fileName: file.name,
      fileSize: sizeKb > 1024 ? `${(sizeKb / 1024).toFixed(1)} MB` : `${sizeKb} KB`,
      time: "Now",
    });
  }

  if (!chatId || !thread) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <p className="text-gray-600 mb-4">This chat couldn’t be found.</p>
        <Link
          href="/chats"
          className="text-accent font-semibold hover:underline"
        >
          Back to chats
        </Link>
      </div>
    );
  }

  const { peerName, peerLabel } = thread;

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-gray-200 bg-white/95 backdrop-blur px-3 py-3 shadow-sm">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-gray-600 hover:bg-gray-100"
          aria-label="Back"
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </button>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-gray-900 truncate">{peerName}</p>
          <p className="text-xs text-gray-500 truncate">{peerLabel}</p>
        </div>
        <Link
          href="/chats"
          className="text-xs font-medium text-accent hover:underline shrink-0"
        >
          All chats
        </Link>
      </header>

      <div className="flex-1 overflow-y-auto px-3 py-4">
        <div className="max-w-lg mx-auto w-full space-y-4">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          <div ref={bottomRef} />
        </div>
      </div>

      <div className="sticky bottom-0 z-20 border-t border-gray-200 bg-white px-3 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="max-w-lg mx-auto w-full">
          <div className="flex items-end gap-2 rounded-2xl border border-gray-200 bg-gray-50 px-2 py-2 focus-within:border-accent/45 focus-within:ring-2 focus-within:ring-accent/25">
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onPickFile}
            />
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={onPickFile}
            />
            <button
              type="button"
              onClick={() => imageInputRef.current?.click()}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-gray-500 hover:bg-white hover:text-accent"
              aria-label="Attach image"
            >
              <PhotoIcon className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-gray-500 hover:bg-white hover:text-primary"
              aria-label="Attach file"
            >
              <PaperClipIcon className="h-6 w-6" />
            </button>
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendText();
                }
              }}
              placeholder="Message…"
              rows={1}
              className="max-h-32 min-h-10 flex-1 resize-none bg-transparent px-2 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
            />
            <button
              type="button"
              onClick={sendText}
              disabled={!draft.trim()}
              className="shrink-0 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white shadow-md shadow-primary/25 ring-1 ring-accent/35 transition hover:brightness-110 hover:shadow-accent/20 disabled:opacity-40 disabled:hover:brightness-100"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
