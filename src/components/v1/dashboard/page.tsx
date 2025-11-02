"use client";
import React from "react";

export default function Dashboard() {
  return (
<div className="p-6 bg-neutral-50 dark:bg-neutral-900 min-h-screen text-neutral-900 dark:text-neutral-100 ">
      {/* GRID CHÍNH */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cột trái: các ô thống kê */}
        <div className="lg:col-span-2 space-y-6">
          {/* Hàng đầu: 4 ô nhỏ thống kê */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Total Likes", value: "350,809" },
              { label: "Total Comments", value: "186,072" },
              { label: "Total Shares", value: "120,043" },
              { label: "Engagement", value: "48,07%" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-4 shadow-sm hover:shadow-md transition"
              >
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  {item.label}
                </p>
                <h2 className="text-xl font-semibold mt-2">{item.value}</h2>
              </div>
            ))}
          </div>

          {/* Ô lớn: bản đồ / thống kê tổng */}
          <div className="rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-6 h-[300px] flex items-center justify-center text-neutral-400">
            Bản đồ phân bố người dùng (placeholder)
          </div>

          {/* Hàng dưới: 2 ô lớn */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-6 h-[300px] flex items-center justify-center text-neutral-400">
              Biểu đồ giới tính & độ tuổi
            </div>
            <div className="rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-6 h-[300px] flex items-center justify-center text-neutral-400">
              Biểu đồ mối quan tâm
            </div>
          </div>
        </div>

        {/* Cột phải: danh sách influencer */}
        <div className="rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-6">
          <h3 className="text-lg font-semibold mb-4">Top Influencer</h3>
          <div className="space-y-4">
            {[
              { name: "Malik Wiwoho", projects: 23, followers: "1,620,201" },
              { name: "Nancy Aulia", projects: 34, followers: "1,224,820" },
              { name: "Natasha Viresta", projects: 12, followers: "1,100,491" },
              { name: "Wilona Hamda", projects: 8, followers: "927,421" },
              { name: "Rava Nanda", projects: 10, followers: "827,810" },
            ].map((influencer, i) => (
              <div
                key={i}
                className="flex justify-between items-center border-b border-neutral-200 dark:border-neutral-700 pb-2"
              >
                <div>
                  <p className="font-medium">{influencer.name}</p>
                  <p className="text-xs text-neutral-500">
                    {influencer.projects} projects
                  </p>
                </div>
                <span className="text-sm font-semibold">
                  {influencer.followers}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
