export interface Plan {
    id: string;
    name: string;
    type?: string;
    item: PlanItem[];
}

export interface PlanItem {
    name: string;
}