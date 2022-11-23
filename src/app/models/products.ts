export interface IProduct {
  id: number;
  title: string;
  price: string;
  img?: string;
  quantity: number;
  configuration: {
    chip: string;
    SSD: string;
    memory: string;
    display: string;
  };
}
