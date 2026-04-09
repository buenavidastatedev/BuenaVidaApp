"use client";

import { useState } from "react";

interface Props {
  label: string;
  type: string;
  placeholder: string;
  icon: string;
  hasToggle?: boolean;
}

export default function LoginInput({
  label,
  type,
  placeholder,
  icon,
  hasToggle,
}: Props) {
  const [show, setShow] = useState(false);

  const inputType = hasToggle ? (show ? "text" : "password") : type;

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold">{label}</label>

      <div className="relative">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2">
          {icon}
        </span>

        <input
          type={inputType}
          placeholder={placeholder}
          className="w-full pl-10 pr-12 py-3 border rounded-lg"
        />

        {hasToggle && (
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            <span className="material-symbols-outlined">visibility</span>
          </button>
        )}
      </div>
    </div>
  );
}
