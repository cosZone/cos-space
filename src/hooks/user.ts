// import { CLERK_JWT_TEMPLATE_ID, CLERK_OWNER_USER_ID } from '@constants';
// import { useAuth, useUser } from '@clerk/nextjs';
// import { useMemo } from 'react';

// export const useGetToken = () => {
//   const { getToken: _getToken } = useAuth();
//   const getToken = async () => {
//     const token = await _getToken({ template: CLERK_JWT_TEMPLATE_ID });
//     return token;
//   };
//   return getToken;
// };

// export const useIsOwner = () => {
//   const { user } = useUser();
//   return useMemo(() => {
//     if (!user?.id || !CLERK_OWNER_USER_ID) return false;
//     return user?.id === CLERK_OWNER_USER_ID;
//   }, [user?.id]);
// };
