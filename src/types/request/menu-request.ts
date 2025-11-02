//create menu
export interface CreateMenuMeal {
  Meal: {
    ID: string;
  };
  IsAvailable: boolean;
}

export interface CreateMenuRequest {
  Date: string; 
  Status: number; 
  TotalOrders: number;
  meals: CreateMenuMeal[];
}



export interface BulkUpdateMenuRequest {
  updates: {
    ID: string;              
    Title?: string;        
    Description?: string;   
  }[];
}

