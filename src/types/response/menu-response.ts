import { CreatedByUser } from "./create-by";

export interface Menu {
  ID: string;
  Date: string;
  Status: number;
  TotalOrders: number;
  createdAt: string;
  createdBy: string;
  modifiedAt: string;
  modifiedBy: string;
  createdByUser: CreatedByUser;
}

export interface MenuResponse {
  "@odata.context": string;
  value: Menu[];
}

//create
export interface CreateMenuChangeResult {
  changes: number;
}

export interface CreateMenuMealResponse {
  ID: string;
  Meal_ID: string;
  Menu_ID: string;
  IsAvailable: boolean;
}

export interface CreateMenuResponse {
  "@odata.context": string;
  results: CreateMenuChangeResult[];
  meals: CreateMenuMealResponse[];
}

//update bulk
export interface BulkUpdateMenuResponse {
  "@odata.context": string;
  success: boolean;
  count: number;
}

//detail
export interface MenuDetailResponse {
  "@odata.context"?: string;
  ID: string;
  Date: string;
  Status: number;
  TotalOrders: number;
  createdAt: string;
  createdBy: string;
  modifiedAt: string;
  createdByUser: {
      ID: string;
      Name: string;
      Email: string;
    };
  modifiedBy: string;
  meals: {
    ID: string;
    Meal_ID: string;
    Menu_ID: string;
    Count: number;
    IsAvailable: boolean;
    createdAt: string;
    createdBy: string;
    modifiedAt: string;
    
    modifiedBy: string;
    Meal: {
      ID: string;
      Name: string;
      Description: string;
      Price: number;
      ImageUrl: string;
      VendorName: string | null;
      VendorPhone: string | null;
      VendorAddr: string | null;
      createdAt: string;
      createdBy: string;
      modifiedAt: string;
      modifiedBy: string;
    };
    
  }[];
}
