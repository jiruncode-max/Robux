:root {
    --text-primary: #000000;
    --text-secondary: #444444;
    --text-muted: #666666;
    --border-color: rgba(255, 255, 255, 0.1);
    --accent: #335fff;
    --accent-hover: #2a4fe0;
    --avatar-bg: #ffffff;
}

* { box-sizing: border-box; }

html, body {
    margin: 0; padding: 0;
    min-height: 100vh;
    color: var(--text-primary);
    font-family: 'Inter', "Helvetica Neue", Helvetica, Arial, sans-serif;
    overflow-x: hidden;
    background: #191b1d;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
}

/* ===== FOTO BACKGROUND: FULL LAYAR ===== */
.bg-photo {
    position: fixed; top: 0; left: 0;
    width: 100vw; height: 100vh; height: 100dvh;
    z-index: 0; background: #232527; overflow: hidden;
}
.bg-photo img { width: 100%; height: 100%; object-fit: cover; object-position: center; display: block; }

::-webkit-scrollbar { width: 0; height: 0; }

/* ===== HEADER ===== */
.rbx-header {
    background-color: #ffffff;
    height: 60px; padding: 0 16px;
    display: flex; justify-content: space-between; align-items: center; gap: 16px;
    border-bottom: 1px solid rgba(0,0,0,0.10);
    position: sticky; top: 0; z-index: 100;
}

.rbx-header-left { display: flex; align-items: center; }

.rbx-logo-link { display: flex; align-items: center; text-decoration: none; color: var(--text-primary); }
.rbx-logo-text { font-weight: 900; font-size: 21px; color: #000; line-height: 1; letter-spacing: 0.5px; }
.rbx-logo-o {
    display: inline-block; width: 16px; height: 16px;
    border: 5px solid #000; border-radius: 3px;
    transform: rotate(15deg); margin: 0 4px;
}

.rbx-header-center { flex-grow: 1; max-width: 560px; margin: 0 16px; position: relative; }
.rbx-search-input {
    width: 100%; padding: 11px 14px 11px 44px; border-radius: 10px;
    border: 1px solid transparent; background-color: #f2f2f2;
    font-family: inherit; font-size: 15px; color: #000; outline: none; transition: 0.2s;
}
.rbx-search-input::placeholder { color: #666666; }
.rbx-search-input:focus { border-color: var(--accent); background-color: #ececec; }
.rbx-icon-search {
    position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
    width: 20px; height: 20px; fill: #000000; pointer-events: none;
}

.rbx-header-right { display: flex; align-items: center; gap: 8px; }

.rbx-balance-display { display: flex; align-items: center; gap: 7px; padding: 8px 12px; }
.rbx-robux-svg { width: 20px; height: 20px; fill: #000; flex-shrink: 0; }
.rbx-balance { font-weight: 700; font-size: 15px; color: var(--text-primary); }

.rbx-user-chip {
    display: flex; align-items: center; gap: 8px; cursor: pointer;
    padding: 5px 10px 5px 5px; border-radius: 999px; transition: 0.2s;
}
.rbx-user-chip:hover { background-color: rgba(0,0,0,0.06); }
.rbx-user-chip span { font-weight: 700; font-size: 14px; color: var(--text-primary); }

.avatar-circle {
    position: relative; width: 32px; height: 32px; border-radius: 50%;
    background: var(--avatar-bg);
    display: flex; align-items: center; justify-content: center;
    font-weight: 800; font-size: 14px; color: #fff; overflow: hidden;
    flex-shrink: 0;
}
.avatar-circle img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }

.rbx-icon-btn {
    width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center;
    justify-content: center; cursor: pointer; transition: 0.2s;
}
.rbx-icon-btn:hover { background-color: rgba(0,0,0,0.06); }
.rbx-icon-btn svg { width: 22px; height: 22px; fill: #000000; }

.rbx-header .send-btn,
.rbx-header .send-button,
.rbx-header #sendBtn,
.rbx-header [data-action="send"] { display: none !important; }
.rbx-header .notification-bell { display: inline-flex !important; }

.rbx-header-right { display: flex !important; align-items: center !important; gap: 8px !important; }
.rbx-header-right .rbx-user-chip { order: 1 !important; }
.rbx-header-right .rbx-balance-display { order: 2 !important; }
.rbx-header-right .notification-bell { order: 3 !important; }
.rbx-header-right .notification-bell svg { width: 22px; height: 22px; fill: #000 !important; }

/* ===== MODAL: PUTIH, TEKS HITAM ===== */
.modal-overlay {
    display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0, 0, 0, 0.45); justify-content: center; align-items: center; z-index: 1000;
    backdrop-filter: blur(3px);
}
.modal {
    background-color: #ffffff; color: #111111;
    border-radius: 18px; width: 90%; max-width: 380px;
    box-shadow: 0 24px 70px rgba(0,0,0,0.35); padding: 24px;
    text-align: center;
}
.modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.modal-title { font-weight: 700; display: flex; align-items: center; gap: 8px; font-size: 18px; color: #111; }
.modal-title .rbx-robux-svg { width: 22px; height: 22px; fill: #000; }
.modal-balance { font-weight: 700; display: flex; align-items: center; gap: 5px; font-size: 15px; color: #666; }
.modal-balance .rbx-robux-svg { width: 16px; height: 16px; fill: #000; }
.close-btn { border: none; background: none; font-size: 26px; color: #9aa0a6; cursor: pointer; padding: 0; line-height: 1; }
.close-btn:hover { color: #111; }

.input-box {
    width: 100%; padding: 12px; border: 1px solid #e4e7ea; border-radius: 10px;
    font-size: 16px; outline: none; font-weight: 600; font-family: inherit;
    background-color: #f2f3f5; color: #111111; transition: 0.2s;
}
.input-box::placeholder { color: #8a8f96; font-weight: 500; }
.input-box:focus { border-color: var(--accent); background-color: #fff; }
.search-status { font-size: 12px; font-weight: 600; margin-top: 8px; min-height: 15px; text-align: left; color: #5f6771; }

.search-wrap { position: relative; }
.suggestions-box {
    display: none; position: absolute;
    top: 100%; left: 0; right: 0; margin-top: 6px;
    background: #ffffff;
    border: 1px solid #e8eaed;
    border-radius: 12px;
    z-index: 200; overflow: hidden; text-align: left;
    max-height: 220px; overflow-y: auto;
    box-shadow: 0 10px 30px rgba(0,0,0,0.16);
}
.suggestion-item { display: flex; align-items: center; gap: 10px; padding: 10px 12px; cursor: pointer; transition: 0.15s; }
.suggestion-item:hover { background-color: #f4f5f7; }
.suggestion-item img { width: 36px; height: 36px; border-radius: 50%; object-fit: cover; background: var(--avatar-bg); flex-shrink: 0; border: 1px solid #eee; }
.suggestion-info { min-width: 0; }
.suggestion-name { font-weight: 700; font-size: 14px; color: #111; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.suggestion-username { color: #7a828a; font-size: 12px; font-weight: 600; }

.primary-btn {
    background-color: var(--accent); color: white; border: none; width: 100%; padding: 12px;
    border-radius: 10px; font-weight: 700; font-size: 16px; cursor: pointer; margin-top: 15px;
    font-family: inherit; transition: 0.2s;
}
.primary-btn:hover { background-color: var(--accent-hover); }
.primary-btn:disabled { background-color: #ececee; color: #9aa0a6; cursor: not-allowed; }

.user-profile { margin-bottom: 20px; }
.modal-avatar {
    width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 10px; overflow: hidden;
    border: 1px solid #e8eaed; background: var(--avatar-bg);
    display: flex; align-items: center; justify-content: center;
    font-weight: 800; font-size: 30px; color: #9aa0a6; position: relative;
}
.modal-avatar img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; display: none; }
.display-name { font-weight: 800; font-size: 18px; margin-bottom: 2px; color: #111; }
.username-tag { color: #6a727b; font-size: 13px; font-weight: 600; }

.amount-wrapper { display: flex; align-items: center; justify-content: center; gap: 10px; margin: 25px 0; }
.amount-wrapper .rbx-robux-svg { width: 38px; height: 38px; fill: #000; }
.amount-input {
    border: none; font-size: 42px; font-weight: 800; width: 200px; outline: none; padding: 0;
    background: transparent; font-family: inherit; text-align: center; color: #111;
}
.amount-input::placeholder { color: #b6bcc2; }

.preset-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-bottom: 20px; }
.preset-btn {
    background-color: #f2f3f5; border: 1px solid #e4e7ea; padding: 10px 0;
    border-radius: 10px; font-size: 14px; font-weight: 700; cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 6px;
    font-family: inherit; color: #111; transition: 0.2s;
}
.preset-btn:hover { border-color: var(--accent); }
.preset-btn.selected { background-color: var(--accent); border-color: var(--accent); color: #fff; }

/* ===== MENU KLIK KANAN TEMPEL: PUTIH ===== */
#paste-ctx-menu {
    display: none; position: fixed; z-index: 5000;
    background: #ffffff;
    border: 1px solid #e8eaed;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.18);
    min-width: 180px; padding: 5px 0;
}
.ctx-item {
    display: flex; align-items: center; gap: 10px;
    padding: 9px 14px; font-size: 13px; font-weight: 600; color: #111;
    cursor: pointer; font-family: inherit; user-select: none;
}
.ctx-item:hover { background: #f4f5f7; }
.ctx-item svg { width: 15px; height: 15px; fill: #555; flex-shrink: 0; }
.ctx-sep { height: 1px; background: #ececec; margin: 4px 0; }

/* ===== PENGATURAN: PUTIH ===== */
.settings-section {
    display: flex; align-items: center; gap: 12px;
    background: #f7f8f9;
    border: 1px solid #e8eaed;
    border-radius: 12px; padding: 14px; margin-bottom: 12px; text-align: left;
}
.settings-section-icon {
    width: 40px; height: 40px; border-radius: 10px;
    background: rgba(51, 95, 255, 0.12);
    display: flex; align-items: center; justify-content: center;
    font-size: 19px; flex-shrink: 0;
}
.settings-section-body { flex: 1; min-width: 0; }
.settings-label { display: block; font-size: 11px; font-weight: 700; color: #8a8f96; margin-bottom: 5px; letter-spacing: 0.5px; }
.settings-section .input-box { padding: 10px 12px; font-size: 15px; }
.settings-hint { font-size: 10.5px; color: #9aa0a6; margin-top: 6px; font-weight: 500; }
.spinner {
    border: 4px solid rgba(0,0,0,0.08); border-top: 4px solid var(--accent);
    border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin: 20px auto;
}
@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

/* ===== DROPDOWN HASIL PENCARIAN HEADER ===== */
#header-search-dropdown {
    display: none; position: absolute;
    top: calc(100% + 8px); left: 0; right: 0;
    background: #fff; border-radius: 14px;
    box-shadow: 0 12px 40px rgba(0,0,0,.28);
    padding: 8px; max-height: 340px; overflow-y: auto;
    text-align: left; z-index: 300;
}
#header-search-dropdown.show { display: block; }
#hs-status { padding: 2px 10px 6px; color: #666; }
.hs-item { display: flex; align-items: center; gap: 10px; padding: 9px 10px; border-radius: 10px; cursor: pointer; transition: .15s; }
.hs-item:hover { background: #f4f4f4; }
.hs-item img { width: 42px; height: 42px; border-radius: 50%; object-fit: cover; background: #fff; flex-shrink: 0; border: 1px solid #eee; }
.hs-name { font-weight: 700; font-size: 14px; color: #000; }
.hs-user { font-size: 12px; color: #666; font-weight: 600; }
#hs-skip-btn { margin-top: 6px; background: #e6a817; display: none; }
#hs-skip-btn.show { display: block; }

/* ===== POPUP PROFIL TARGET: SETENGAH LAYAR, KANAN ===== */
#target-photo-popup {
    position: fixed; inset: 0; z-index: 99999;
    display: none; justify-content: flex-end;
    background: rgba(0,0,0,.45);
    backdrop-filter: blur(3px);
}
#target-photo-popup.show { display: flex; }

.photo-popup-card {
    width: 50vw; min-width: 340px; max-width: 600px;
    height: 100%;
    background: #f2f4f6;
    box-shadow: -24px 0 70px rgba(0,0,0,.5);
    display: flex; flex-direction: column;
    overflow-y: auto; overflow-x: hidden;
    position: relative;
    animation: ppSlideRight .32s cubic-bezier(.2,.8,.3,1);
}
@media (max-width: 820px) {
    .photo-popup-card { width: 100vw; max-width: none; min-width: 0; }
}
@keyframes ppSlideRight {
    from { transform: translateX(150px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

.photo-popup-close {
    position: absolute; top: 20px; left: 20px; z-index: 10;
    width: 52px; height: 52px; border: 0; border-radius: 50%;
    background: #fff; cursor: pointer;
    box-shadow: 0 4px 16px rgba(0,0,0,.18);
    display: flex; align-items: center; justify-content: center;
    transition: .15s;
}
.photo-popup-close:hover { transform: scale(1.07); }
.photo-popup-close svg { width: 26px; height: 26px; fill: #1b2a4a; }

.pp-hero {
    flex: 0 0 auto; height: 44vh; min-height: 250px;
    background: radial-gradient(ellipse at 50% 30%, #eef1f4 0%, #d7dde3 60%, #cfd6dd 100%);
    display: flex; align-items: flex-end; justify-content: center;
    padding: 34px 20px 0;
}
.pp-hero img { max-height: 100%; max-width: 72%; object-fit: contain; filter: drop-shadow(0 18px 26px rgba(0,0,0,.22)); }
.pp-hero-fallback { font-size: 72px; font-weight: 800; color: #9aa4ad; margin-bottom: 28px; }

.pp-body {
    flex: 1;
    background: linear-gradient(180deg, #f4f5f7 0%, #ffffff 32%);
    border-radius: 30px 30px 0 0;
    margin-top: -30px;
    padding: 0 26px 26px;
    display: flex; flex-direction: column;
    position: relative;
}
.pp-idrow { display: flex; align-items: center; gap: 16px; margin: -56px 0 20px; position: relative; z-index: 2; }
.pp-avatar-circle {
    width: 96px; height: 96px; border-radius: 50%;
    background: #fff; box-shadow: 0 6px 18px rgba(0,0,0,.15);
    overflow: hidden;
    display: flex; align-items: center; justify-content: center;
    font-weight: 800; font-size: 34px; color: #9aa4ad;
    position: relative; flex-shrink: 0;
}
.pp-avatar-circle img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; display: none; }
.pp-online-dot {
    position: absolute; right: 3px; bottom: 3px; z-index: 3;
    width: 20px; height: 20px; border-radius: 50%;
    background: #00b06f; border: 3px solid #fff;
}
.pp-names { min-width: 0; }
.pp-display-name { font-size: 28px; font-weight: 800; color: #1b2a4a; line-height: 1.15; word-break: break-word; }
.pp-username { font-size: 17px; font-weight: 600; color: #5b6770; margin-top: 2px; word-break: break-all; }

.pp-stats { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 22px; }
.pp-stat-chip { background: #eef0f3; border-radius: 999px; padding: 12px 20px; font-size: 16px; font-weight: 600; color: #3c4650; white-space: nowrap; }
.pp-stat-chip b { font-weight: 800; color: #1b2a4a; margin-right: 5px; }

.pp-actions { display: flex; gap: 12px; align-items: center; position: relative; }
.pp-btn {
    flex: 1; min-width: 0;
    border: 0; border-radius: 999px;
    background: #eef0f3;
    padding: 17px 12px;
    font-family: inherit; font-size: 17px; font-weight: 700; color: #1b2a4a;
    cursor: pointer; transition: .15s;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.pp-btn:hover { background: #e2e5e9; }
.pp-btn:active { transform: scale(.97); }
.pp-btn-round {
    flex: 0 0 auto; width: 56px; height: 56px; border: 0; border-radius: 50%;
    background: #eef0f3; color: #1b2a4a;
    font-family: inherit; font-size: 18px; font-weight: 800; letter-spacing: 1px;
    cursor: pointer; transition: .15s;
}
.pp-btn-round:hover { background: #e2e5e9; }

/* ===== MENU TITIK TIGA (PUTIH) ===== */
.pp-menu {
    display: none;
    position: absolute;
    bottom: calc(100% + 10px);
    right: 0;
    background: #ffffff;
    border-radius: 16px;
    box-shadow: 0 16px 50px rgba(0,0,0,.24);
    padding: 6px;
    min-width: 230px;
    z-index: 30;
    animation: ppMenuPop .18s cubic-bezier(.2,.8,.3,1);
}
.pp-menu.show { display: block; }
@keyframes ppMenuPop {
    from { transform: translateY(8px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
}
.pp-menu-item {
    padding: 13px 18px;
    font-size: 15px; font-weight: 500;
    color: #111111;
    border-radius: 11px;
    cursor: pointer;
}
.pp-menu-item:hover { background: #f2f3f5; }

/* ===== SAAT INI MEMAKAI ===== */
.pp-wearing { margin-top: 28px; }
.pp-wearing-title { font-size: 22px; font-weight: 800; color: #1b2a4a; margin-bottom: 14px; }
.pp-wearing-row { display: flex; gap: 12px; overflow-x: auto; padding-bottom: 10px; }
.pp-wear-item {
    flex: 0 0 auto;
    width: 116px; height: 116px;
    border-radius: 16px;
    background: #eef0f3;
    overflow: hidden;
    display: flex; align-items: center; justify-content: center;
}
.pp-wear-item img { width: 100%; height: 100%; object-fit: cover; }
.pp-wearing-empty { color: #8a939c; font-size: 13px; font-weight: 600; padding: 8px 2px; }

/* ===== SUCCESS KAYAK ASLI: LINGKARAN + CENTANG SVG, TENGAH PAS ===== */
#step-3 {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 230px;
    text-align: center;
}
.success-check {
    width: 76px; height: 76px;
    margin: 0 auto 26px;
    animation: checkPop .5s cubic-bezier(.2,1.4,.4,1);
}
.success-check svg { width: 100%; height: 100%; display: block; }
.success-check .check-circle {
    stroke-dasharray: 63;
    stroke-dashoffset: 63;
    animation: drawCircle .4s ease-out forwards;
}
.success-check .check-mark {
    stroke-dasharray: 15;
    stroke-dashoffset: 15;
    animation: drawCheck .3s .3s ease-out forwards;
}
@keyframes drawCircle { to { stroke-dashoffset: 0; } }
@keyframes drawCheck  { to { stroke-dashoffset: 0; } }
@keyframes checkPop {
    0%   { transform: scale(.6); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
}
.success-text {
    margin: 0 0 24px;
    color: #111;
    font-size: 17px;
    font-weight: 500;
}

/* ===== TOAST ===== */
#pp-toast {
    position: fixed; bottom: 26px; left: 50%;
    transform: translateX(-50%) translateY(80px);
    background: #1b2a4a; color: #fff;
    padding: 12px 22px; border-radius: 999px;
    font-size: 14px; font-weight: 700; font-family: inherit;
    opacity: 0; pointer-events: none; transition: .3s;
    z-index: 100000; box-shadow: 0 10px 30px rgba(0,0,0,.35);
    max-width: 88vw; text-align: center;
}
#pp-toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }
