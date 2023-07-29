export type Service = {
  name: string;
  items: string[];
};

export type Order = {
  name: string;
  peoples: number;
  address: string;
  eventDate: string;
  comment: string;
  services: Service[];
};
