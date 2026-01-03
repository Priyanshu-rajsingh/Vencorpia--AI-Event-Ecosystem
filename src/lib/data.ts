import type { EventType, Vendor, AiTool } from '@/lib/types';
import {
  Heart,
  Briefcase,
  Cake,
  PartyPopper,
  UtensilsCrossed,
  Camera,
  Building,
  Disc,
  BrainCircuit,
  Paintbrush,
  LineChart,
} from 'lucide-react';

export const eventTypes: EventType[] = [
  {
    title: 'Weddings',
    description: 'Create the perfect day with our expert vendors.',
    icon: Heart,
    image: 'event-wedding',
  },
  {
    title: 'Corporate Events',
    description: 'Professional, seamless events for your business.',
    icon: Briefcase,
    image: 'event-corporate',
  },
  {
    title: 'Birthdays',
    description: 'Celebrate another year in style.',
    icon: Cake,
    image: 'event-birthday',
  },
  {
    title: 'Social Gatherings',
    description: 'Host unforgettable parties and get-togethers.',
    icon: PartyPopper,
    image: 'event-social',
  },
];

export const featuredVendors: Vendor[] = [
  {
    name: 'Gourmet Delights',
    service: 'Catering',
    rating: 4.9,
    image: 'vendor-caterer',
  },
  {
    name: 'Everlasting Moments',
    service: 'Photography',
    rating: 4.8,
    image: 'vendor-photographer',
  },
  {
    name: 'The Grand Hall',
    service: 'Venue',
    rating: 5.0,
    image: 'vendor-venue',
  },
  {
    name: 'Rhythm Masters',
    service: 'DJ Services',
    rating: 4.7,
    image: 'vendor-dj',
  },
];

export const aiTools: AiTool[] = [
  {
    title: 'AI Menu Planner',
    description:
      'Get intelligent menu suggestions based on your event, budget, and guest preferences.',
    link: '/tools',
    image: 'tool-menu',
  },
  {
    title: 'AI Décor Recommender',
    description:
      'Discover the perfect décor themes that match your style and venue, all within budget.',
    link: '/tools',
    image: 'tool-decor',
  },
  {
    title: 'Vendor Demand Analysis',
    description:
      'For our vendors: Optimize your pricing and offerings with AI-powered market insights.',
    link: '/tools',
    image: 'tool-demand',
  },
];
