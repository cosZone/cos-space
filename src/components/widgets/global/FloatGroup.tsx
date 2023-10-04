import BackTop from './BackTop';

export default function FloatGroup() {
  return (
    <div className="group fixed bottom-0 right-0 z-10 bg-background/80 text-primary/80 shadow-xl hover:shadow-card md:bg-background md:text-primary">
      <BackTop />
    </div>
  );
}
