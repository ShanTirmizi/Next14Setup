import { Button } from '@/components/ui/button';
import { prisma } from '@/lib/prisma';

export default async function Home() {
  const user = await prisma.test.findFirst();
  if (!user) return <p>No user found</p>;
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>{user?.name}</p>
      <Button className="m-auto">Click me</Button>
    </main>
  );
}
