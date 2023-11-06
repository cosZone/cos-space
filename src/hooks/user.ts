import { CLERK_JWT_TEMPLATE_ID } from '@/constants';
import { useAuth } from '@clerk/nextjs';

export const useGetToken = () => {
  const { getToken: _getToken } = useAuth();
  const getToken = async () => {
    const token = await _getToken({ template: CLERK_JWT_TEMPLATE_ID });
    return token;
  };
  return getToken;
};
