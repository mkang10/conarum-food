"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import {
  Edit2,
  Download,
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar,
  FileText,
  User2,
  User2Icon,
} from "lucide-react";
import { Button } from "../../shared/ui/button";
import { useMenuForm } from "../use-menu-form";
import { BaseDetailForm } from "../../shared/base/base-detail-form";
import { IconUser } from "@tabler/icons-react";

export default function MenuDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { getMenuDetail, menuDetails, loading, error } = useMenuForm();

  useEffect(() => {
    if (id) getMenuDetail(id);
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-muted-foreground">
        Loading menu details...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error: {error}
      </div>
    );

  if (!menuDetails)
    return (
      <div className="flex justify-center items-center h-screen text-muted-foreground">
        No menu data available.
      </div>
    );

  const menu = menuDetails;

  const getStatusBadge = (status: number) => {
    switch (status) {
      case 0:
        return (
          <span className="inline-flex items-center gap-2 rounded-full bg-green-100 text-green-700 px-3 py-1 text-sm font-medium">
            <CheckCircle className="h-4 w-4" />
            Open for Orders
          </span>
        );
      case 1:
        return (
          <span className="inline-flex items-center gap-2 rounded-full bg-yellow-100 text-yellow-700 px-3 py-1 text-sm font-medium">
            <Clock className="h-4 w-4" />
            Closed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 text-gray-600 px-3 py-1 text-sm font-medium">
            <AlertCircle className="h-4 w-4" />
            Archived
          </span>
        );
    }
  };

  const headerActions = (
    <>
      <Button variant="outline" size="sm" className="gap-2 bg-transparent">
        <Download className="h-4 w-4" />
        Export Data
      </Button>
      <Button
        size="sm"
        className="gap-2 bg-blue-600 hover:bg-blue-700 text-white"
      >
        <Edit2 className="h-4 w-4" />
        Edit
      </Button>
    </>
  );

  const leftSection = (
    <>
      {/* Menu Information */}
      <div className="rounded-lg border bg-card p-6">
        <h2 className="text-lg font-semibold mb-4">Menu Information</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground uppercase">Date</p>
            <p className="font-medium mt-1 break-words">{menu.Date}</p>
          </div>
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground uppercase">
              Total Orders
            </p>
            <p className="font-medium mt-1 break-words">{menu.TotalOrders}</p>
          </div>
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground uppercase">Status</p>
            <div className="mt-1">{getStatusBadge(menu.Status)}</div>
          </div>
        </div>
      </div>

      {/* Meals Information */}
      <div className="rounded-lg border bg-card p-6">
        <h2 className="text-lg font-semibold mb-6">Meal List</h2>
        <div className="space-y-6">
          {menu.meals?.map((m) => (
            <div
              key={m.ID}
              className="flex flex-col md:flex-row gap-6 items-start border-b pb-6 last:border-none overflow-hidden"
            >
              <img
                src={m.Meal.ImageUrl}
                alt={m.Meal.Name}
                className="w-32 h-32 rounded-lg object-cover border flex-shrink-0"
              />
              <div className="flex-1 min-w-0 space-y-2">
                <h3 className="text-xl font-bold truncate">{m.Meal.Name}</h3>
                <p className="text-sm text-muted-foreground break-words line-clamp-3">
                  {m.Meal.Description}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mt-2">
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground uppercase">
                      Price
                    </p>
                    <p className="font-medium mt-1 break-words">
                      {m.Meal.Price.toLocaleString("en-US")} VND
                    </p>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground uppercase">
                      Order Count
                    </p>
                    <p className="font-medium mt-1 break-words">{m.Count}</p>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground uppercase">
                      Status
                    </p>
                    <p
                      className={`font-medium mt-1 truncate ${
                        m.IsAvailable ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {m.IsAvailable ? "Available" : "Out of Stock"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  const rightSection = (
    <>
      <div className="rounded-lg border bg-card p-6">
        <h2 className="mb-4 text-lg font-semibold">Status</h2>
        {getStatusBadge(menu.Status)}
      </div>
      <div className="rounded-lg border bg-card p-6 space-y-3 text-sm break-words">
        <h2 className="text-lg font-semibold mb-2">Summary</h2>
        <p className="flex items-center gap-2 text-muted-foreground">
          <FileText className="h-4 w-4" /> Total Meals:{" "}
          <span className="font-medium text-foreground break-words">
            {menu.meals?.length}
          </span>
        </p>
        <p className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="h-4 w-4" /> Date:{" "}
          <span className="font-medium text-foreground break-words">
            {menu.Date}
          </span>
        </p>
        <p className="flex items-center gap-2 text-muted-foreground">
          <IconUser className="h-4 w-4" /> Created By:{" "}
          <span className="font-medium text-foreground truncate max-w-[180px]">
            {menu.createdByUser?.Email ?? "N/A"}
          </span>
        </p>
      </div>
    </>
  );

  return (
    <BaseDetailForm
      title="Menu Details"
      id={menu.ID}
      date={menu.Date}
      headerActions={headerActions}
      leftSection={leftSection}
      rightSection={rightSection}
    />
  );
}
