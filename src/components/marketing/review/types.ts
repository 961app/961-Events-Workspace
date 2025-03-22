export interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  review: string;
  event: {
    title: string;
    date: string;
    image: string;
  };
  replied?: boolean;
}