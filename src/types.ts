export interface Plan {
    id: string;
    name: string;
    item: PlanItem[];
}

export interface PlanItem {
    name: string;
}