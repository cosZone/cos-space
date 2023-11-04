import BackTop from './BackTop';
import ToBottom from './ToBottom';

export default function FloatGroup() {
  return (
    <div className="group fixed bottom-0 right-0 z-10 bg-background/80 text-primary/80 shadow-xl hover:shadow-card md:bg-background md:text-primary">
      <BackTop className="pt-3" />
      <ToBottom className="pb-3" />
    </div>
  );
}
