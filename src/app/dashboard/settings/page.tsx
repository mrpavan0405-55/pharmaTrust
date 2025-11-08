
'use client';

import { useTheme } from 'next-themes';
import { useActionState, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { saveSettings, type SettingsState } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Loader } from 'lucide-react';

const initialState: SettingsState = {
  status: 'idle',
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader className="mr-2 h-4 w-4 animate-spin" />
          Saving...
        </>
      ) : (
        'Save Changes'
      )}
    </Button>
  );
}


function SettingsForm() {
  const { theme, setTheme } = useTheme();
  const [state, formAction] = useActionState(saveSettings, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.status === 'ok') {
      toast({
        title: 'Success!',
        description: state.message,
      });
    } else if (state.status === 'error') {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <form action={formAction} className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>
          Manage your account and application settings.
        </CardDescription>
      </CardHeader>
    </Card>
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>
            Customize the look and feel of the application.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="theme-selector">Theme</Label>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger id="theme-selector" className="w-[180px]">
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>
            Choose how you want to be notified.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive email about shipment updates and alerts.
              </p>
            </div>
            <Switch id="email-notifications" name="email-notifications" defaultChecked />
          </div>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <Label htmlFor="push-notifications">Push Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Get push notifications on your devices.
              </p>
            </div>
            <Switch id="push-notifications" name="push-notifications" />
          </div>
        </CardContent>
      </Card>
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>
            Update your personal details.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" defaultValue="Alice Johnson" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" name="email" type="email" defaultValue="alice.j@example.com" />
            </div>
          </div>
           <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input id="role" name="role" defaultValue="FDA Regulator" readOnly />
            </div>
        </CardContent>
        <CardFooter>
           <SubmitButton />
        </CardFooter>
      </Card>
    </div>
  </form>
  )
}

export default function SettingsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <SettingsForm />;
}
