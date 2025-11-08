import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { users } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export function UserRolesCard() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Stakeholders</CardTitle>
        <CardDescription>
          Participants in the current supply chain.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.map((user) => (
            <div key={user.name} className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint={user.avatarHint} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.role}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
