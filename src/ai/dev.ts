import { config } from 'dotenv';
config();

import '@/ai/flows/analyze-vendor-demand.ts';
import '@/ai/flows/provide-decor-recommendations.ts';
import '@/ai/flows/generate-menu-suggestions.ts';