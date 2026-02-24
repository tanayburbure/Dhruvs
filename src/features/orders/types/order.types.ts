export interface Order {
    id: number;
    name: string;
    phone: string;
    company: {
      name: string;
    };
  }