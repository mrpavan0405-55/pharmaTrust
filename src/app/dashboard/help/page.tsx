import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CircleHelp } from "lucide-react";

export default function HelpPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <CircleHelp className="mr-2" />
          Help & Support
        </CardTitle>
        <CardDescription>
          Find answers to your questions and get support.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Help documentation and support contact information will be available here.</p>
      </CardContent>
    </Card>
  );
}
