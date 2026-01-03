'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, BrainCircuit, Users } from 'lucide-react';
import { VencorpiaLogo } from '@/components/icons';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();

  const isToolsActive = pathname.startsWith('/tools');

  return (
    <nav
      className={cn('flex flex-col space-y-2', className)}
      {...props}
    >
      <div className="px-4 py-2">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <VencorpiaLogo className="h-8 w-8 text-primary" />
          <span className="font-bold text-lg text-primary">Vencorpia</span>
        </Link>
      </div>

      <div className="flex-1 px-2 space-y-1">
        <Link
          href="/dashboard"
          className={cn(
            'flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-accent/50',
            pathname === '/dashboard' ? 'bg-accent/80 text-accent-foreground' : ''
          )}
        >
          <LayoutDashboard className="mr-3 h-5 w-5" />
          Dashboard
        </Link>
        <Accordion type="single" collapsible defaultValue={isToolsActive ? "item-1" : ""}>
          <AccordionItem value="item-1" className="border-b-0">
            <AccordionTrigger
              className={cn(
                'flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-accent/50 [&[data-state=open]]:bg-accent/80 [&[data-state=open]]:text-accent-foreground',
                isToolsActive ? 'bg-accent/80 text-accent-foreground' : ''
              )}
            >
              <div className="flex items-center">
                <BrainCircuit className="mr-3 h-5 w-5" />
                AI Tools
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-1">
              <div className="pl-6 space-y-1">
                <Link
                  href="/tools"
                  className={cn(
                    'block px-2 py-2 text-sm font-medium rounded-md hover:bg-accent/50',
                    pathname === '/tools' ? 'bg-accent/50' : ''
                  )}
                >
                  Tools Dashboard
                </Link>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </nav>
  );
}
