"use client";

import { ReactNode } from "react";

interface BaseDetailFormProps {
  title: string;
  id?: string;
  date?: string;
  headerActions?: ReactNode;
  leftSection?: ReactNode;
  rightSection?: ReactNode;
}

/**
 * BaseDetailForm: layout chi tiết chuẩn dùng lại cho các trang detail khác nhau.
 */
export function BaseDetailForm({
  title,
  id,
  date,
  headerActions,
  leftSection,
  rightSection,
}: BaseDetailFormProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="mx-auto max-w-6xl px-6 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {title} {date ? `— ${date}` : ""}
            </h1>
            {id && (
              <p className="mt-1 text-sm text-muted-foreground">ID: {id}</p>
            )}
          </div>
          <div className="flex gap-2">{headerActions}</div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-6xl px-6 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-6">{leftSection}</div>
        <div className="space-y-6">{rightSection}</div>
      </main>
    </div>
  );
}
