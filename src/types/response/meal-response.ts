//get all
export interface Meal {
  ID: string;
  Name: string;
  Price: number;
  ImageUrl: string;
  Vendor_ID: string | null;
  createdAt: string;
  createdBy: string;
  modifiedAt: string;
  modifiedBy: string;
  Description: string;
}

export interface MealResponse {
  "@odata.context": string;
  value: Meal[];
}

export interface CreateMealResponse {
  "@odata.context": string;
  Name: string;
  Description?: string;
  Price: number;
  ImageUrl?: string;
  VendorName?: string;
  VendorPhone?: string;
  VendorAddr?: string;
  createdAt: string;
  createdBy: string;
  modifiedAt: string;
  modifiedBy: string;
}


export interface BulkUpdateMealResponse {
  "@odata.context": string;
  success: boolean;
  count: number;
}
