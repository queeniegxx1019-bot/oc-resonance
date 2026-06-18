"use client";

import { useCallback, useState, type KeyboardEvent } from "react";
import { stringToTags, tagsToString } from "@/lib/types";

interface TagInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
}

export default function TagInput({ label, placeholder, value, onChange, hint }: TagInputProps) {
  const [input, setInput] = useState("");
  const tags = stringToTags(value);

  const addTag = useCallback(
    (raw: string) => {
      const tag = raw.trim();
      if (!tag) return;
      const next = [...tags];
      if (!next.includes(tag)) next.push(tag);
      onChange(tagsToString(next));
      setInput("");
    },
    [tags, onChange],
  );

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === "," || e.key === "，") {
      e.preventDefault();
      addTag(input);
    } else if (e.key === "Backspace" && !input && tags.length > 0) {
      onChange(tagsToString(tags.slice(0, -1)));
    }
  }

  function removeTag(tag: string) {
    onChange(tagsToString(tags.filter((t) => t !== tag)));
  }

  return (
    <div className="space-y-2">
      <span className="text-xs font-medium uppercase tracking-wider text-sage-muted">{label}</span>
      <div className="rounded-xl border border-white/10 bg-black/25 p-3 focus-within:border-sage-500/50 focus-within:ring-2 focus-within:ring-sage-300/20">
        {tags.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-full border border-sage-300/25 bg-sage-300/10 px-3 py-1 text-xs text-sage-300"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-0.5 text-sage-muted hover:text-blossom-300"
                  aria-label={`Remove ${tag}`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
        <input
          className="w-full bg-transparent text-sm text-mist outline-none placeholder:text-sage-muted/50"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => input.trim() && addTag(input)}
          placeholder={tags.length === 0 ? placeholder : hint}
        />
      </div>
    </div>
  );
}

export const formInputClass =
  "w-full rounded-xl border border-white/10 bg-black/25 px-4 py-3.5 text-sm text-mist placeholder:text-sage-muted/50 outline-none transition focus:border-sage-500/50 focus:ring-2 focus:ring-sage-300/20";

export const formLabelClass = "text-xs font-medium uppercase tracking-wider text-sage-muted";
