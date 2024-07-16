import { useProfile } from './use-profile';

function useUser() {
  const {
    state: { userInfo },
  } = useProfile();

  return userInfo;
}

export { useUser };
