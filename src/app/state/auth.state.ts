export const key = 'auth';

export interface AuthState {
  username: string | null;
}

export const initialAuthState: AuthState = {
  username: null
};
