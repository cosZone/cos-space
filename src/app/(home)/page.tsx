'use client';
import PostItemCard from '@/components/ui/post/PostItemCard';
import { CLERK_JWT_TEMPLATE_ID } from '@/constants';
import { useAuth, useUser } from '@clerk/nextjs';
import _ from 'lodash-es';
import { useEffect } from 'react';

const posts = _.range(0, 10);

export default function Home() {
  const { user } = useUser();
  const { getToken, isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    getToken({ template: CLERK_JWT_TEMPLATE_ID })
      .then((data) => console.log('======getToken ', { data }))
      .catch((e) => console.error(e));
  }, [getToken]);

  console.log('============user', { user, isLoaded, isSignedIn });

  return <>{posts?.length ? posts.map((v, i) => <PostItemCard key={i} />) : null}</>;
}
