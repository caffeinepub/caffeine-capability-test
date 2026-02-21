import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ReactNode } from 'react';

export type StatusType = 'PASS' | 'LOCAL-ONLY' | 'NOT SUPPORTED';

interface FeatureCardProps {
  title: string;
  description: string;
  status: StatusType;
  explanation?: string;
  children: ReactNode;
}

const statusConfig = {
  PASS: {
    variant: 'default' as const,
    className: 'bg-chart-2 text-white border-chart-2',
  },
  'LOCAL-ONLY': {
    variant: 'secondary' as const,
    className: 'bg-chart-5 text-white border-chart-5',
  },
  'NOT SUPPORTED': {
    variant: 'destructive' as const,
    className: 'bg-destructive text-destructive-foreground border-destructive',
  },
};

export default function FeatureCard({ title, description, status, explanation, children }: FeatureCardProps) {
  const config = statusConfig[status];

  return (
    <Card className="flex flex-col h-full border-border/50 bg-card/50 backdrop-blur-sm hover:border-border transition-all duration-300 hover:shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2 mb-2">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <Badge variant={config.variant} className={config.className}>
            {status}
          </Badge>
        </div>
        <CardDescription className="text-sm">{description}</CardDescription>
        {explanation && (
          <p className="text-xs text-muted-foreground mt-2 p-2 bg-muted/30 rounded border border-border/30">
            {explanation}
          </p>
        )}
      </CardHeader>
      <CardContent className="flex-1 pt-0">{children}</CardContent>
    </Card>
  );
}
