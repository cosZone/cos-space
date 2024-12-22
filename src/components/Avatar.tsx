import { Avatar, AvatarImage, AvatarFallback } from '@components/ui/avatar';

export const AvatarComponent = ({ src, alt, fallbackText }: { src: string; alt: string; fallbackText: string }) => {
  return (
    <Avatar>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{fallbackText}</AvatarFallback>
    </Avatar>
  );
};
