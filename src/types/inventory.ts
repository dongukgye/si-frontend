export interface IPart {
  id: number;
  name: string;
  spec: string;
  serial: string;
  desc: string;
  category: number;
  quantity: number;
  ideal_quantity: number;
  order_quantity: number;
}

export interface ICategory {
  id: number;
  name: string;
}
