'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>Deploy your new project in one-click.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button>Default</Button>
          <Button variant={'secondary'}>Secondary</Button>
          <Button variant={'destructive'}>Destructive</Button>
          <Button variant={'ghost'}>Ghost</Button>
          <Button variant={'link'}>Link</Button>
          <Button variant={'outline'}>Outline</Button>
        </CardContent>
        <CardFooter className="flex justify-between">Footer</CardFooter>
      </Card>
    </>
  );
}
