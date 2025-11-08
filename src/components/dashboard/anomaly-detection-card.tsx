'use client';

import { useEffect, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { AlertTriangle, Bot, CheckCircle, Loader, ShieldAlert, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { checkForAnomaly, type AnomalyState } from '@/app/actions';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

const initialState: AnomalyState = {
  status: 'idle',
  message: 'Click the button to simulate an anomaly check.',
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? (
        <>
          <Loader className="mr-2 h-4 w-4 animate-spin" />
          Simulating...
        </>
      ) : (
        <>
          <ShieldAlert className="mr-2 h-4 w-4" />
          Simulate Anomaly Check
        </>
      )}
    </Button>
  );
}

export function AnomalyDetectionCard() {
  const [state, formAction] = useActionState(checkForAnomaly, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.status === 'anomaly') {
      toast({
        variant: 'destructive',
        title: (
          <div className="flex items-center">
            <AlertTriangle className="mr-2" /> Anomaly Detected!
          </div>
        ),
        description: state.message,
      });
    } else if (state.status === 'ok') {
        toast({
            title: (
              <div className="flex items-center">
                <CheckCircle className="mr-2 text-green-500" /> System Normal
              </div>
            ),
            description: state.message,
          });
    } else if (state.status === 'error') {
      toast({
        variant: 'destructive',
        title: 'An Error Occurred',
        description: state.message,
      });
    }
  }, [state, toast]);

  const getAlertContent = () => {
    switch(state.status) {
      case 'anomaly':
        return (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Anomaly Found</AlertTitle>
            <AlertDescription>{state.message}</AlertDescription>
          </Alert>
        );
      case 'ok':
        return (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>System Normal</AlertTitle>
            <AlertDescription>{state.message}</AlertDescription>
          </Alert>
        );
      case 'idle':
      default:
        return (
          <Alert>
            <Bot className="h-4 w-4" />
            <AlertTitle>Awaiting Simulation</AlertTitle>
            <AlertDescription>{state.message}</AlertDescription>
          </Alert>
        );
    }
  }

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Sparkles className="mr-2 text-primary" />
          AI Anomaly Detection
        </CardTitle>
        <CardDescription>
          Use GenAI to detect potential supply chain anomalies.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {getAlertContent()}
      </CardContent>
      <CardFooter>
        <form action={formAction} className="w-full">
          <SubmitButton />
        </form>
      </CardFooter>
    </Card>
  );
}
