import { createContext, ReactNode, useEffect, useReducer } from 'react';
import { fetchUserData } from '../../pages/api';
import { User } from '../../types/user';
import { useProfile } from '../hooks/use-profile';

type State = {
  isEditing: boolean;
  userInfo?: User | null;
  loading: boolean;
  error?: string | null;
};

type Action =
  | { type: 'TOGGLE_EDIT_MODE' }
  | { type: 'SET_USER_INFO'; payload: User | null }
  | { type: 'SAVE_USER'; meta: 'request' | 'success' | 'failure'; payload?: User; error?: string };

const initialState: State = {
  isEditing: false,
  userInfo: null,
  loading: false,
  error: null,
};

export const ProfileContext = createContext<{
  state: State;
  dispatch: (action: Action | ((dispatch: React.Dispatch<Action>) => void)) => void;
}>({
  state: initialState,
  dispatch: () => undefined,
});

const profileReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'TOGGLE_EDIT_MODE':
      return { ...state, isEditing: !state.isEditing };
    case 'SET_USER_INFO':
      return { ...state, userInfo: action.payload };
    case 'SAVE_USER':
      if (action.meta === 'request') {
        return { ...state, loading: true, error: null };
      } else if (action.meta === 'success') {
        return { ...state, loading: false, userInfo: action.payload };
      } else if (action.meta === 'failure') {
        return { ...state, loading: false, error: action.error };
      }
      return state;
    default:
      throw new Error(`Unknown action: ${action}`);
  }
};

type ProfileProviderProps = { children: ReactNode };

const ProfileProvider = ({ children }: ProfileProviderProps) => {
  const [state, dispatch] = useReducer(profileReducer, initialState);

  useEffect(() => {
    // Fetch user data when component mounts
    const fetchUser = async () => {
      const res = await fetchUserData();
      dispatch({ type: 'SET_USER_INFO', payload: res.user });
    };

    fetchUser();
  }, []);

  const enhancedDispatch = (action: Action | ((dispatch: React.Dispatch<Action>) => void)) => {
    if (typeof action === 'function') {
      return action(dispatch);
    }
    return dispatch(action);
  };

  return <ProfileContext.Provider value={{ state, dispatch: enhancedDispatch }}>{children}</ProfileContext.Provider>;
};

export { ProfileProvider, useProfile };
