/* =========================================================
   api.js — التواصل مع Google Apps Script
   ========================================================= */

const API = {

  _post(action, payload) {
    if (!CONFIG.API_URL) {
      /* وضع تجريبي قبل ربط الشيت */
      return this._mock(action, payload);
    }
    return fetch(CONFIG.API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, ...payload }),
    }).then(r => r.json());
  },

  login(empId, password) {
    return this._post('login', { empId, password });
  },

  verifyEmployee(empId, name, shift, phone) {
    return this._post('verifyEmployee', { empId, name, shift, phone });
  },

  changePassword(empId, token, newPassword) {
    return this._post('changePassword', { empId, token, newPassword });
  },

  /* ---- وضع تجريبي (mock) قبل ربط Apps Script ---- */
  _mock(action, payload) {
    return new Promise(resolve => {
      setTimeout(() => {
        if (action === 'login') {
          if (payload.empId === '1001' && payload.password === '123456') {
            resolve({ success: true, force_change: true, user: { empId: '1001', name: 'موظف تجريبي', shift: 'أ', role: 'موظف', phone: '0500000000', token: 'demo' } });
          } else if (payload.empId === '1001' && payload.password === 'Test@123') {
            resolve({ success: true, force_change: false, user: { empId: '1001', name: 'موظف تجريبي', shift: 'أ', role: 'موظف', phone: '0500000000', token: 'demo' } });
          } else {
            resolve({ success: false, message: 'الرقم الوظيفي أو كلمة المرور غير صحيحة' });
          }
        } else if (action === 'verifyEmployee') {
          if (payload.empId === '1001' && payload.name === 'موظف تجريبي' && payload.shift === 'أ' && payload.phone === '0500000000') {
            resolve({ success: true });
          } else {
            resolve({ success: false, message: 'البيانات المدخلة غير مطابقة' });
          }
        } else if (action === 'changePassword') {
          resolve({ success: true });
        } else {
          resolve({ success: false, message: 'إجراء غير معروف' });
        }
      }, 800);
    });
  },
};
