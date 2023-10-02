'use client';
import PostItemCard from '@/components/ui/post/PostItemCard';
import _ from 'lodash-es';

const posts = _.range(0, 10);

export default function Home() {
  return <>{posts?.length ? posts.map((v, i) => <PostItemCard key={i} />) : null}</>;
}
