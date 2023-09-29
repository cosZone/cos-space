import { MD_SCREEN_QUERY } from '@/constants';
import { useMediaQuery } from 'react-responsive';

const PostRightSider = () => {
  const isMdScreen = useMediaQuery({ query: MD_SCREEN_QUERY });
  if (isMdScreen) return null;
  return <div className="sticky top-20 w-40">Right</div>;
};

export default PostRightSider;
