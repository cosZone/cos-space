import WaveSvg from './wave';

type CoverProps = {
  images?: string[];
};
export default function Cover({ images }: CoverProps) {
  return (
    <div className="relative -z-10 flex h-[60vh] max-h-[35rem] overflow-hidden">
      <div className="absolute inset-0 h-full bg-black/40" />
      <img
        className="-z-10 h-full min-h-[15rem] w-full object-cover"
        src="https://fastly.jsdelivr.net/gh/yusixian/imgBed@1.2.1/img/cos_blog/101490359_p0.webp"
        alt=""
      />
      <WaveSvg />
    </div>
  );
}
