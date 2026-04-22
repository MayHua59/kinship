"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { guideActiveChatsDemo, seekerActiveChatsDemo } from "@/data/active-chats";
import {
  ArrowLeftIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/solid";

function initials(name) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

function ChatRow({ chat, isGuide }) {
  return (
    <li>
      <Link
        href={`/chats/${chat.id}`}
        className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-4 text-left shadow-sm transition-all duration-200 hover:border-accent/45 hover:shadow-md hover:shadow-accent/10 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-primary to-orange-600 text-sm font-bold text-white shadow-sm ring-2 ring-accent/45"
          aria-hidden
        >
          {initials(chat.peerName)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-semibold text-gray-900">
                {isGuide ? "Chat with " : ""}
                {chat.peerName}
                <ChatBubbleLeftRightIcon className="ml-1 inline-block h-4 w-4 text-gray-400" aria-hidden />
              </p>
              <p className="text-xs text-gray-500 mt-0.5">{chat.peerLabel}</p>
            </div>
            <span className="text-xs text-gray-400 shrink-0 tabular-nums">
              {chat.time}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
            {chat.lastMessage}
          </p>
        </div>
        {chat.unread > 0 ? (
          <span className="flex h-6 min-w-6 shrink-0 items-center justify-center rounded-full bg-accent px-1.5 text-xs font-semibold text-gray-900 shadow-sm">
            {chat.unread > 9 ? "9+" : chat.unread}
          </span>
        ) : null}
      </Link>
    </li>
  );
}

export default function ActiveChatsPage() {
  const [role, setRole] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored =
      typeof window !== "undefined"
        ? window.localStorage.getItem("kinship-role")
        : null;
    setRole(stored === "guide" ? "guide" : "seeker");
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center bg-gray-50">
        <div className="h-10 w-10 rounded-full border-2 border-accent/50 border-t-primary animate-spin" />
      </div>
    );
  }

  const isGuide = role === "guide";
  const chats = isGuide ? guideActiveChatsDemo : seekerActiveChatsDemo;

  return (
    <div className="min-h-full flex flex-col bg-gray-50">
      <div className="relative overflow-hidden">
        <div className="absolute top-[-60px] right-[-40px] w-56 h-56 bg-accent/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-40px] left-[-20px] w-48 h-48 bg-primary/12 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-2xl mx-auto px-4 pt-6 pb-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-accent transition-colors mb-8"
          >
            <ArrowLeftIcon className="h-4 w-4" aria-hidden />
            Back to home
          </Link>

          <header className="mb-8">
            <p className="text-sm font-medium uppercase tracking-wide mb-1">
              <span className="text-primary">KinCircle</span>
              <span className="text-gray-400"> · </span>
              <span className="text-accent">{isGuide ? "Guide" : "Seeker"}</span>
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {isGuide ? "Active chats" : "My chats"}
            </h1>
            <p className="text-gray-600 mt-1">
              {isGuide
                ? "Ongoing conversations with people you’re guiding."
                : "Pick up where you left off with your guides."}
            </p>
          </header>

          {chats.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-200 bg-white/80 p-10 text-center text-gray-500">
              No active chats yet.
            </div>
          ) : (
            <ul className="space-y-3">
              {chats.map((chat) => (
                <ChatRow key={chat.id} chat={chat} isGuide={isGuide} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
