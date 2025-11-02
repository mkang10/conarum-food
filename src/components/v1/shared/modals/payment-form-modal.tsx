"use client";

import { Input } from "../ui/input";
import { BaseCreateForm } from "../base/base-create-page";

export interface PaymentFormData {
  supplier: string;
  dueDate: string;
  issueDate: string;
  reference: string;
  amount: string;
  status: "overdue" | "approve";
}

interface PaymentFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (payment: PaymentFormData) => void;
  initialData?: PaymentFormData;
  title?: string;
}

export default function PaymentFormModalForm({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  title = "Add Payment",
}: PaymentFormModalProps) {
  const defaultData: PaymentFormData = {
    supplier: "",
    dueDate: "",
    issueDate: "",
    reference: "",
    amount: "",
    status: "approve",
  };

  return (
    <BaseCreateForm<PaymentFormData>
      open={open}
      title={title}
      onOpenChange={onOpenChange}
      onSubmit={onSubmit}
      initialData={initialData || defaultData}
      resetData={defaultData}
    >
      {(formData, handleChange) => (
        <>
          <div>
            <label className="text-sm font-medium text-foreground">Supplier</label>
            <Input
              name="supplier"
              value={formData.supplier}
              onChange={handleChange}
              placeholder="Enter supplier name"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground">Due Date</label>
              <Input name="dueDate" type="date" value={formData.dueDate} onChange={handleChange} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Issue Date</label>
              <Input name="issueDate" type="date" value={formData.issueDate} onChange={handleChange} />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Reference</label>
            <Input
              name="reference"
              value={formData.reference}
              onChange={handleChange}
              placeholder="Enter reference number"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Amount</label>
            <Input
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter amount"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="approve">Approve</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
        </>
      )}
    </BaseCreateForm>
  );
}
