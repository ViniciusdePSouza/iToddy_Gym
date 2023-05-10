import { ReactNode, createContext, useEffect, useState } from "react";

import { UserDTO } from "@dtos/UserDTO";

import { api } from "@services/api";
import {
  getStorageUser,
  storageUserRemove,
  storageUserSave,
} from "@storage/storageUser";

import {
  getStorageAuthToken,
  removeAuthToken,
  saveStorageAuthToken,
} from "@storage/storageAuthToken";

export type AuthContextDataProps = {
  user: UserDTO;
  signIn: (email: string, password: string) => Promise<void>;
  isLoadingUserData: boolean;
  signOut: () => Promise<void>;
  updateUserProfile: (userUpdated: UserDTO) => Promise<void>;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [isLoadingUserData, setIsLoadingUserData] = useState(true);

  async function updateUserAndToken(userData: UserDTO, token: string) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser(userData);
  }

  async function saveUserAndTokenOnStorage(
    userData: UserDTO,
    token: string,
    refresh_token: string
  ) {
    try {
      setIsLoadingUserData(true);

      await storageUserSave(userData);
      await saveStorageAuthToken({ token, refresh_token });
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserData(false);
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post("/sessions", { email, password });

      if (data.user && data.token && data.refresh_token) {
        setIsLoadingUserData(true);

        await saveUserAndTokenOnStorage(
          data.user,
          data.token,
          data.refresh_token
        );

        updateUserAndToken(data.user, data.token);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserData(false);
    }
  }

  async function signOut() {
    try {
      setIsLoadingUserData(true);

      setUser({} as UserDTO);

      await storageUserRemove();
      await removeAuthToken();
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserData(false);
    }
  }

  async function updateUserProfile(user: UserDTO) {
    try {
      setUser(user);

      await storageUserSave(user);
    } catch (error) {
      throw error;
    }
  }

  async function loadUserData() {
    try {
      setIsLoadingUserData(true);

      const userLoggedIn = await getStorageUser();
      const { token } = await getStorageAuthToken();

      if (userLoggedIn && token) {
        updateUserAndToken(userLoggedIn, token);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserData(false);
    }
  }

  useEffect(() => {
    loadUserData();
  }, []);

  useEffect(() => {
    const subscribe = api.registerInterceptTokenManager(signOut);

    return () => {
      subscribe();
    };
  }, [signOut]);

  return (
    <AuthContext.Provider
      value={{ user, signIn, isLoadingUserData, signOut, updateUserProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}
