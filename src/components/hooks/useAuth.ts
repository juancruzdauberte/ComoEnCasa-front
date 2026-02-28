import { userStore } from "../store/userStore";

export const useUser = () => {
  const setUser = userStore((state) => state.setUser);
  const user = userStore((state) => state.user);
  const clearUser = userStore((state) => state.clearUser);
  const loading = userStore((state) => state.loading);
  const setLoading = userStore((state) => state.setLoading);
  const viewMode = userStore((state) => state.viewMode);
  const setViewMode = userStore((state) => state.setViewMode);

  return {
    user,
    setUser,
    clearUser,
    loading,
    setLoading,
    viewMode,
    setViewMode,
  };
};
