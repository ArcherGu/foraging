export type PlanType = 'Breakfast' | 'Lunch' | 'Dinner' | 'Afternoon Tea' | 'Supper' | 'Dessert' | 'Other';

export interface Plan {
    id: string;
    name: string;
    type?: PlanType;
    item: PlanItem[];
}

export interface PlanItem {
    name: string;
}