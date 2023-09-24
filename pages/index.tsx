import Card from '@/components/card';

export default function Home() {
  return (
    <div className="h-full overflow-auto">
      <div className="mx-auto flex max-w-screen-lg flex-col gap-12 p-4">
        <Card clickable className="p-20 text-xl">
          Hello World!
        </Card>
        <Card clickable className="p-20 text-xl">
          Hello World!
        </Card>
        <Card clickable className="p-20 text-xl">
          Hello World!
        </Card>
        <Card clickable className="p-20 text-xl">
          Hello World!
        </Card>
      </div>
    </div>
  );
}
