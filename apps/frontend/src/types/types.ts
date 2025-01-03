
  

  export interface Type {
    id: string;
    name: string;
    image: string;
  }
  
  export interface Action {
    id: string;
    zapId: string;
    actionId: string;
    metadata: any;
    sortingOrder: number;
    type: Type;
  }
  
  export interface TriggerType {
    id: string;
    zapId: string;
    triggerId: string;
    metadata: any;
    type: Type;
  }
  
  export interface ZapType {
    id: string;
    triggerId: string;
    userId: number;
    createdAt: string;
    updatedAt: string;
    actions: Action[];
    trigger: TriggerType | null;
  }