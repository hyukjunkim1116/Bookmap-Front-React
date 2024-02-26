// 상태 관리를 위한 store.js 파일
import { persist } from "zustand/middleware";
import { create } from "zustand";
// 상태 초기값 설정
export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      getUid: () => get().user?.user_id || null,
      setUser: (data) => {
        set({ user: data });
      },
      clearUser: () => set({ token: null, user: null }),
      setToken: (access, refresh) => {
        set({
          token: {
            access: access,
            refresh: refresh,
          },
        });
      },
      getToken: () => {
        return get().token || null;
      },
      updateuser: ( partialData) => {
        const newData = {
          ...get().user,
          ...partialData,
        };
        set({ user: newData });
      },
    }),
    {
      name: "user",
    }
  )
);
