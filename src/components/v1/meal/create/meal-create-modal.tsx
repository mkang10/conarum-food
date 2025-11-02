"use client";

import { useState } from "react";
import { Input } from "../../shared/ui/input";
import { CreateMealRequest } from "@/types/request/meal-request";
import BaseCreateFormPage from "../../shared/base/base-create-page";

interface MealCreatePageFormProps {
  onSubmit: (data: CreateMealRequest) => Promise<void>;
}

export default function MealCreatePageForm({ onSubmit }: MealCreatePageFormProps) {
  const defaultData: CreateMealRequest = {
    Name: "",
    Description: "",
    Price: 0,
    VendorName: "",
    VendorPhone: "",
    VendorAddr: "",
    ImageUrl: undefined as unknown as File,
  };

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const tempUrl = URL.createObjectURL(file);
    setPreviewUrl(tempUrl);

    handleChange({
      target: { name: "ImageUrl", value: file },
    } as unknown as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <BaseCreateFormPage<CreateMealRequest>
      title="Create a New Meal"
      onSubmit={onSubmit}
      initialData={defaultData}
      resetData={defaultData}
    >
      {(formData, handleChange) => (
        <div className="flex flex-col gap-4">
          {/* Meal Name */}
          <div>
            <label className="text-sm font-medium text-[var(--color-primary)]">Meal Name</label>
            <Input
              name="Name"
              value={formData.Name}
              onChange={handleChange}
              placeholder="E.g., Grilled Pork Rice"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-[var(--color-primary)]">Description</label>
            <Input
              name="Description"
              value={formData.Description || ""}
              onChange={handleChange}
              placeholder="Enter detailed meal description"
            />
          </div>

          {/* Price */}
          <div>
            <label className="text-sm font-medium text-[var(--color-primary)]">Price (VND)</label>
            <Input
              type="number"
              name="Price"
              value={formData.Price || ""}
              onChange={handleChange}
              placeholder="E.g., 55000 VND"
              required
            />
          </div>

          {/* Vendor Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="text-sm font-medium text-[var(--color-primary)]">Vendor Name</label>
              <Input
                name="VendorName"
                value={formData.VendorName}
                onChange={handleChange}
                placeholder="E.g., A Chin Rice Shop"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-[var(--color-primary)]">Phone Number</label>
              <Input
                name="VendorPhone"
                value={formData.VendorPhone}
                onChange={handleChange}
                placeholder="E.g., 0901234567"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-[var(--color-primary)]">Address</label>
              <Input
                name="VendorAddr"
                value={formData.VendorAddr}
                onChange={handleChange}
                placeholder="E.g., 123 Nguyen Trai, District 5"
                required
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="text-sm font-medium text-[var(--color-primary)]">Meal Image</label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileSelect(e, handleChange)}
              required
            />
            {previewUrl && (
              <div className="mt-2">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-md border shadow-sm"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </BaseCreateFormPage>
  );
}
