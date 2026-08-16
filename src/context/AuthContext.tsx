import { createContext, useContext, useState, useMemo, useCallback, ReactNode } from "react";
import { revenuecatService } from "@/services";

export interface UserProfile {
  name: string;
  avatar: string;
  isSupporter: boolean;
}

interface AuthContextValue {
  profile: UserProfile;
  setName: (name: string) => void;
  isSupporter: boolean;
  refreshSupporterStatus: () => void;
}

const STORAGE_KEY_PROFILE = "crafty_user_profile_v1";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfileState] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROFILE);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return {
      name: "Creador Open Source",
      avatar: "🤖",
      isSupporter: revenuecatService.isSupporter(),
    };
  });

  const setName = useCallback((name: string) => {
    setProfileState((prev) => {
      const updated = { ...prev, name };
      localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const refreshSupporterStatus = useCallback(() => {
    const isSupporter = revenuecatService.isSupporter();
    setProfileState((prev) => ({ ...prev, isSupporter }));
  }, []);

  const value = useMemo(
    () => ({
      profile,
      setName,
      isSupporter: profile.isSupporter,
      refreshSupporterStatus,
    }),
    [profile, setName, refreshSupporterStatus],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return ctx;
};
