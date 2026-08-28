import type { Metadata } from "next";
import "./globals.css";

import { SavedResourcesProvider } from "@/components/learn/SavedResourcesProvider";

export const metadata: Metadata = {
  title: "Learn — AI Orbit",
  description:
    "Discover courses, guides, tutorials and resources for the modern AI ecosystem.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SavedResourcesProvider>
          {children}
        </SavedResourcesProvider>
      </body>
    </html>
  );
}