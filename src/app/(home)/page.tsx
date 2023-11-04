'use client';
import { Button } from '@/components/ui/button';
import PostList from '@/components/ui/post/PostList';
import { CLERK_JWT_TEMPLATE_ID } from '@/constants';
import { useMutationCreatePost } from '@/hooks/post';
import { useAuth, useUser } from '@clerk/nextjs';
import _ from 'lodash-es';
import { useEffect } from 'react';

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
      <Button
        className="mb-12"
        onClick={() =>
          mutate({
            title: 'test_' + _.random(1000),
            description: '这是一条测试摘要' + _.random(1000),
            content: '# Hello\nTest Word',
          })
        }
      >
        Create Test
      </Button>
      <PostList />
    </>
  );
}
