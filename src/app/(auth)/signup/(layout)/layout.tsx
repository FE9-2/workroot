"use client";

import Background from "../(layout)/component/Background";

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return (
    <Background>
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg">{children}</div>
    </Background>
  );
}
