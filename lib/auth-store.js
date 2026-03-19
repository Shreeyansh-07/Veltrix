const AUTH_STORAGE_KEY = 'veltrix_auth';
const USER_STORAGE_KEY = 'veltrix_user';
const WORKSPACE_STORAGE_KEY = 'veltrix_workspace';

const safeParse = (value, fallback = null) => {
  if (!value) return fallback;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

const toDisplayName = (email) => {
  const localPart = (email || '').split('@')[0] || 'workspace';
  return localPart
    .replace(/[._-]+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim();
};

const toSlug = (email) => {
  const localPart = (email || '').split('@')[0] || 'workspace';
  const cleaned = localPart.toLowerCase().replace(/[^a-z0-9-]/g, '-');
  return cleaned.replace(/-+/g, '-').replace(/^-|-$/g, '') || 'workspace';
};

const persistAuthState = (user, workspace) => {
  localStorage.setItem(AUTH_STORAGE_KEY, 'true');
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  localStorage.setItem(WORKSPACE_STORAGE_KEY, JSON.stringify(workspace));
};

export const authStore = {
  isLoggedIn() {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
  },

  getCurrentUser() {
    if (typeof window === 'undefined') return null;
    return safeParse(localStorage.getItem(USER_STORAGE_KEY), null);
  },

  getWorkspace() {
    if (typeof window === 'undefined') return null;
    return safeParse(localStorage.getItem(WORKSPACE_STORAGE_KEY), null);
  },

  login(email) {
    const now = new Date().toISOString();
    const existingUser = this.getCurrentUser();
    const existingWorkspace = this.getWorkspace();

    const user = existingUser?.email === email
      ? existingUser
      : {
          id: `user_${crypto.randomUUID().slice(0, 8)}`,
          email,
          name: toDisplayName(email),
          createdAt: now,
          authProvider: 'email',
        };

    const workspace = existingWorkspace?.email === email
      ? existingWorkspace
      : {
          id: `ws_${crypto.randomUUID().slice(0, 8)}`,
          name: `${toDisplayName(email)} Workspace`,
          slug: toSlug(email),
          email,
          userId: user.id,
          createdAt: now,
        };

    persistAuthState(user, workspace);
    return { user, workspace };
  },

  loginWithGithub(email) {
    const session = this.login(email);
    const user = {
      ...session.user,
      authProvider: 'github',
    };
    persistAuthState(user, session.workspace);
    return { user, workspace: session.workspace };
  },

  signup(email) {
    return this.login(email);
  },

  updateWorkspace(updates) {
    if (typeof window === 'undefined') return null;
    const workspace = this.getWorkspace();
    if (!workspace) return null;
    const nextWorkspace = { ...workspace, ...updates };
    localStorage.setItem(WORKSPACE_STORAGE_KEY, JSON.stringify(nextWorkspace));
    return nextWorkspace;
  },

  logout() {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
    localStorage.removeItem(WORKSPACE_STORAGE_KEY);
  },
};
