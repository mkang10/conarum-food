export interface CreateMealRequest {
  Name: string;
  Description?: string;
  Price: number | string; // có thể là string vì form-data gửi text
  VendorName: string;
  VendorPhone: string;
  VendorAddr: string;
  ImageUrl: File | string; // form-data file
}


export interface BulkUpdateMealRequest {
  updates: {
    ID: string;
    Name?: string;
    Description?: string;
    Price?: number;
    ImageUrl?: string;
    Vendor_ID?: string | null;
  }[];
}
