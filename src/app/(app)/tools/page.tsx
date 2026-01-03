import { PageHeader } from '@/components/page-header';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { MenuSuggester } from '@/components/tools/menu-suggester';
import { DecorRecommender } from '@/components/tools/decor-recommender';
import { DemandAnalyzer } from '@/components/tools/demand-analyzer';
import { UtensilsCrossed, Paintbrush, LineChart } from 'lucide-react';

export default function ToolsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Vencorpia AI Suite"
        description="Your intelligent assistants for flawless event planning and business growth."
      />
      <Tabs defaultValue="menu" className="w-full">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 h-auto sm:h-12">
          <TabsTrigger value="menu" className="py-2 sm:py-0">
            <UtensilsCrossed className="mr-2 h-5 w-5" />
            Menu Planner
          </TabsTrigger>
          <TabsTrigger value="decor" className="py-2 sm:py-0">
            <Paintbrush className="mr-2 h-5 w-5" />
            Décor Recommender
          </TabsTrigger>
          <TabsTrigger value="demand" className="py-2 sm:py-0">
            <LineChart className="mr-2 h-5 w-5" />
            Vendor Analyzer
          </TabsTrigger>
        </TabsList>
        <TabsContent value="menu" className="mt-6">
          <MenuSuggester />
        </TabsContent>
        <TabsContent value="decor" className="mt-6">
          <DecorRecommender />
        </TabsContent>
        <TabsContent value="demand" className="mt-6">
          <DemandAnalyzer />
        </TabsContent>
      </Tabs>
    </div>
  );
}
