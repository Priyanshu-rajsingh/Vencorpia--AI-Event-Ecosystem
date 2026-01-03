import type { LucideIcon } from 'lucide-react';

export type EventType = {
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
};

export type Vendor = {
  name: string;
  service: string;
  rating: number;
  image: string;
};

export type AiTool = {
  title: string;
  description: string;
  link: string;
  image: string;
};
