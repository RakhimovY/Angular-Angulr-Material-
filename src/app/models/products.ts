export interface IProduct {
  id: number;
  title: string;
  price: string;
  img?: string;
  configuration: {
    chip: string;
    SSD: string;
    memory: string;
    display: string;
  };
}
