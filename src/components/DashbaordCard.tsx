import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type DashbaordCardProps = {
  title: string;
  desc: string;
  content: string;
};

export default function DashboardCard({
  title,
  desc,
  content,
}: DashbaordCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardDescription>{desc}</CardDescription>
      <CardContent>
        <p>{content}</p>
      </CardContent>
    </Card>
  );
}
