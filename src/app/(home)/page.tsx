'use client';
import { Button } from '@/components/ui/button';
import PostItemCard from '@/components/ui/post/PostItemCard';
import { CLERK_JWT_TEMPLATE_ID } from '@/constants';
import { useMutationCreatePost } from '@/hooks/post';
import { useAuth, useUser } from '@clerk/nextjs';
import _ from 'lodash-es';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const posts = _.range(0, 10);

export default function Home() {
  const { user } = useUser();
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const { mutate } = useMutationCreatePost();

  useEffect(() => {
    getToken({ template: CLERK_JWT_TEMPLATE_ID })
      .then((data) => console.log('======getToken ', { data }))
      .catch((e) => console.error(e));
  }, [getToken]);

  console.log('============user', { user, isLoaded, isSignedIn });

  return (
    <>
      <Button onClick={() => mutate({ title: 'test', content: '# Hello\nTest Word' })}>Create Test</Button>
      {posts?.length ? posts.map((v, i) => <PostItemCard key={i} />) : null}
    </>
  );
}
