import type { AuthService } from "../types";
import type { AppUser } from "@/types";

const STORAGE_KEY = "mock-auth-user";

let currentUser: AppUser | null = null;
const listeners = new Set<(u: AppUser | null) => void>();

const load = (): AppUser | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AppUser) : null;
  } catch {
    return null;
  }
};

const persist = (u: AppUser | null) => {
  currentUser = u;
  if (typeof window !== "undefined") {
    if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    else localStorage.removeItem(STORAGE_KEY);
  }
  listeners.forEach((cb) => cb(u));
};

currentUser = load();

const fakeUser = (email: string): AppUser => ({
  uid: `mock-${email}`,
  email,
  displayName: email.split("@")[0],
  photoURL: null,
  credits: 100,
});

export const mockAuthService: AuthService = {
  async getCurrentUser() {
    return currentUser;
  },
  onAuthChange(cb) {
    listeners.add(cb);
    cb(currentUser);
    return () => listeners.delete(cb);
  },
  async signInWithEmail(email) {
    const u = fakeUser(email);
    persist(u);
    return u;
  },
  async signUpWithEmail(email) {
    const u = fakeUser(email);
    persist(u);
    return u;
  },
  async signInWithGoogle() {
    const u = fakeUser("demo@google.com");
    persist(u);
    return u;
  },
  async signOut() {
    persist(null);
  },
};
