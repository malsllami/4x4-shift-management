/* =========================================================
   auth.js — إدارة جلسة المستخدم
   ========================================================= */

const Auth = {
  SESSION_KEY: '4x4_session',

  setSession(user) {
    sessionStorage.setItem(this.SESSION_KEY, JSON.stringify(user));
  },

  getSession() {
    try {
      return JSON.parse(sessionStorage.getItem(this.SESSION_KEY));
    } catch {
      return null;
    }
  },

  clearSession() {
    sessionStorage.removeItem(this.SESSION_KEY);
  },

  /* يُستخدم في صفحات تتطلب تسجيل دخول */
  requireAuth() {
    const user = this.getSession();
    if (!user) {
      window.location.href = 'index.html';
      return null;
    }
    return user;
  },

  logout() {
    this.clearSession();
    window.location.href = 'index.html';
  },
};
