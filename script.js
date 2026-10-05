/* ============================================
   SEND FAKE ROBUX — SCRIPT UTAMA
   ============================================ */

// ===== SALDO AWAL: 50,000 =====
let myBalance = 50000;
let accountName = "Jirun";
let targetUser = "";
let selectedTarget = null;
let lastSearchResults = [];
let searchTimeout;

// ===== MUAT SETTINGAN TERSIMPAN =====
try {
    const savedName = localStorage.getItem('rbx_name');
    const savedBalance = localStorage.getItem('rbx_balance_v2');
    if (savedName) accountName = savedName;
    if (savedBalance && !isNaN(parseInt(savedBalance, 10))) myBalance = parseInt(savedBalance, 10);
} catch(e) {}

document.getElementById('header-username').innerText = accountName;

function formatNum(num) { return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); }

function updateBalances() {
    document.getElementById('nav-balance').innerText = formatNum(myBalance);
    document.getElementById('modal-balance').innerText = formatNum(myBalance);
}
updateBalances();

/* ============ PENGATURAN ============ */
function openSettings() {
    document.getElementById('settings-name').value = accountName;
    document.getElementById('settings-balance').value = formatNum(myBalance);
    document.getElementById('settings-modal').style.display = 'flex';
}
function closeSettings() {
    document.getElementById('settings-modal').style.display = 'none';
}
function saveSettings() {
    const newName = document.getElementById('settings-name').value.trim();
    if (newName) {
        accountName = newName;
        document.getElementById('header-username').innerText = accountName;
    }
    const newBalance = parseInt(document.getElementById('settings-balance').value.replace(/,/g, ''), 10);
    if (!isNaN(newBalance) && newBalance >= 0) {
        myBalance = newBalance;
        updateBalances();
    }
    try {
        localStorage.setItem('rbx_name', accountName);
        localStorage.setItem('rbx_balance_v2', myBalance);
    } catch(e) {}
    closeSettings();
}
document.getElementById('settings-balance').addEventListener('input', function() {
    let value = this.value.replace(/[^0-9]/g, '');
    if (value === '') { this.value = ''; return; }
    this.value = parseInt(value, 10).toLocaleString('en-US');
});

/* ============ MESIN PENCARIAN TARGET ============ */
const amountInput = document.getElementById('amount-input');
const sendBtn = document.getElementById('send-btn');
const usernameInput = document.getElementById('username-input');
const suggestionsBox = document.getElementById('suggestions-box');
const searchStatus = document.getElementById('search-status');
const searchBtn = document.getElementById('search-btn');

const API = '/api/user';
let searchToken = 0;
let netOk = 0, netFail = 0;

async function apiGet(params) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 10000);
    try {
        const res = await fetch(API + '?' + params, { signal: ctrl.signal });
        if (!res.ok) { netFail++; return null; }
        const d = await res.json();
        if (!d || d.ok === false) { netFail++; return null; }
        netOk++;
        return d;
    } catch (e) {
        netFail++;
        return null;
    } finally {
        clearTimeout(timer);
    }
}

async function tryJSON(url, options) {
    try {
        const res = await fetch(url, options);
        if (!res.ok) return null;
        return await res.json();
    } catch (e) { return null; }
}

async function exactMatchUser(keyword) {
    const d = await apiGet('username=' + encodeURIComponent(keyword));
    if (d) return d.found ? d.user : null;

    const body = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usernames: [keyword], excludeBannedUsers: false })
    };
    const data = await tryJSON('https://users.roproxy.com/v1/usernames/users', body);
    if (data && data.data) return data.data.length > 0 ? data.data[0] : null;
    return null;
}

async function searchUsers(keyword) {
    const d = await apiGet('search=' + encodeURIComponent(keyword));
    if (d) return d.results || [];

    const kw = encodeURIComponent(keyword);
    const web = await tryJSON('https://www.roproxy.com/search/users/results?keyword=' + kw + '&maxRows=10&startIndex=0');
    if (web && web.UserSearchResults && web.UserSearchResults.length > 0) {
        return web.UserSearchResults.map(u => ({
            id: u.Id, name: u.Name,
            displayName: (u.DisplayName && u.DisplayName !== '') ? u.DisplayName : u.Name
        }));
    }
    const v1 = await tryJSON('https://users.roproxy.com/v1/users/search?keyword=' + kw + '&limit=10');
    if (v1 && v1.data && v1.data.length > 0) return v1.data;
    return [];
}

async function getUserById(id) {
    const d = await apiGet('id=' + id);
    if (d) return d.found ? d.user : null;

    const data = await tryJSON('https://users.roproxy.com/v1/users/' + id);
    if (data && data.id && data.name) {
        return { id: data.id, name: data.name, displayName: data.displayName || data.name };
    }
    return null;
}

async function fetchAvatarMap(userIds) {
    const map = {};
    if (!userIds.length) return map;

    const d = await apiGet('avatar=' + userIds.join(','));
    if (d && d.images) { Object.assign(map, d.images); return map; }

    const q = 'userIds=' + userIds.join(',') + '&size=150x150&format=Png&isCircular=true';
    const data = await tryJSON('https://thumbnails.roproxy.com/v1/users/avatar-headshot?' + q);
    if (data && data.data) {
        data.data.forEach(x => { if (x.state === 'Completed') map[x.targetId] = x.imageUrl; });
    }
    return map;
}

async function fetchAvatarUrl(id) {
    const map = await fetchAvatarMap([id]);
    return map[id] || null;
}

function parsePastedInput(raw) {
    let text = (raw || '').trim();
    const urlMatch = text.match(/roblox\.com\/users\/(\d+)/i);
    if (urlMatch) return { id: parseInt(urlMatch[1], 10), keyword: urlMatch[1] };
    if (/^\d{4,}$/.test(text)) return { id: parseInt(text, 10), keyword: text };
    return { keyword: text.replace(/^@+/, '').trim() };
}

/* ============ MENU KLIK KANAN TEMPEL (PUTIH) ============ */
const ctxMenu = document.createElement('div');
ctxMenu.id = 'paste-ctx-menu';
ctxMenu.innerHTML = `
    <div class="ctx-item" id="ctx-paste">
        <svg viewBox="0 0 24 24"><path d="M19 2h-4.18C14.4.84 13.3 0 12 0c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 18H5V4h2v3h10V4h2v16z"/></svg>
        Tempel
    </div>
    <div class="ctx-sep"></div>
    <div class="ctx-item" id="ctx-clear">
        <svg viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
        Hapus
    </div>
`;
document.body.appendChild(ctxMenu);

function hideCtxMenu() { ctxMenu.style.display = 'none'; }

usernameInput.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    usernameInput.focus();
    const x = Math.min(e.clientX, window.innerWidth - 200);
    const y = Math.min(e.clientY, window.innerHeight - 110);
    ctxMenu.style.left = x + 'px';
    ctxMenu.style.top = y + 'px';
    ctxMenu.style.display = 'block';
});

document.getElementById('ctx-paste').addEventListener('click', async function() {
    hideCtxMenu();
    try {
        const text = await navigator.clipboard.readText();
        if (text && text.trim()) {
            usernameInput.value = text.trim();
            handleInputSearch(true);
        }
    } catch (e) {
        alert('Tidak bisa membaca clipboard otomatis.\nKlik kolom, lalu tekan Ctrl + V.');
        usernameInput.focus();
    }
});

document.getElementById('ctx-clear').addEventListener('click', function() {
    hideCtxMenu();
    usernameInput.value = '';
    searchStatus.innerText = '';
    searchBtn.disabled = true;
    selectedTarget = null;
    lastSearchResults = [];
    hideSuggestions();
});

document.addEventListener('click', function(e) {
    if (!ctxMenu.contains(e.target)) hideCtxMenu();
    if (!e.target.closest('.search-wrap')) hideSuggestions();
    if (!e.target.closest('.rbx-header-center')) hsHide();
    if (!e.target.closest('.pp-actions')) ppMenuHide();
});
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') { hideCtxMenu(); ppMenuHide(); }
});

// ===== Input kolom search modal: paste = langsung hasil =====
usernameInput.addEventListener('input', function() {
    const v = this.value.trim();
    if (/roblox\.com\/users\/\d+/i.test(v) || /^\d{4,}$/.test(v)) {
        handleInputSearch(true);
    } else {
        handleInputSearch();
    }
});

usernameInput.addEventListener('paste', function() {
    setTimeout(() => handleInputSearch(true), 100);
});

usernameInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        handleInputSearch(true);
    }
});

function hideSuggestions() {
    suggestionsBox.style.display = 'none';
    suggestionsBox.innerHTML = '';
}

async function showSuggestions(results, myToken) {
    if (myToken !== undefined && myToken !== searchToken) return;
    if (!results.length) { hideSuggestions(); return; }

    const avatarMap = await fetchAvatarMap(results.map(u => u.id));
    if (myToken !== undefined && myToken !== searchToken) return;

    suggestionsBox.innerHTML = results.map(u => {
        const ava = avatarMap[u.id] || '';
        return `<div class="suggestion-item" onclick="pickSuggestion(${u.id}, '${u.name.replace(/'/g, "\\'")}', '${(u.displayName || u.name).replace(/'/g, "\\'")}', '${ava}')">
            <img src="${ava}" alt="" onerror="this.style.visibility='hidden'">
            <div class="suggestion-info">
                <div class="suggestion-name">${(u.displayName || u.name).replace(/</g, '&lt;')}</div>
                <div class="suggestion-username">@${u.name.replace(/</g, '&lt;')}</div>
            </div>
        </div>`;
    }).join('');

    suggestionsBox.style.display = 'block';
}

function pickSuggestion(id, name, displayName, avatarUrl) {
    searchToken++;
    selectedTarget = { id: id, name: name, displayName: displayName };
    targetUser = name;
    usernameInput.value = name;
    hideSuggestions();
    searchStatus.innerText = "✓ " + displayName + " (@" + name + ")";
    searchBtn.disabled = false;
    openTargetProfile(selectedTarget, avatarUrl || null);
}

function handleInputSearch(immediate) {
    const parsed = parsePastedInput(usernameInput.value);
    const input = parsed.keyword;

    clearTimeout(searchTimeout);
    searchBtn.disabled = true;
    selectedTarget = null;
    lastSearchResults = [];
    hideSuggestions();
    searchToken++;
    const myToken = searchToken;
    netOk = 0; netFail = 0;

    if (!input || (input.length < 3 && !parsed.id)) {
        searchStatus.innerText = "";
        return;
    }

    searchStatus.innerText = "Mencari...";

    const doSearch = async () => {
        if (myToken !== searchToken) return;

        if (parsed.id) {
            const user = await getUserById(parsed.id);
            if (myToken !== searchToken) return;
            if (user) {
                selectedTarget = user;
                lastSearchResults = [user];
                usernameInput.value = user.name;
                showSuggestions([user], myToken);
                searchStatus.innerText = "✓ " + user.displayName + " (@" + user.name + ")";
                searchBtn.disabled = false;
                return;
            }
        }

        const [exact, results] = await Promise.all([
            exactMatchUser(input),
            searchUsers(input)
        ]);
        if (myToken !== searchToken) return;

        if (exact) {
            selectedTarget = exact;
            const merged = [exact].concat((results || []).filter(u => (u.name || '').toLowerCase() !== exact.name.toLowerCase()));
            lastSearchResults = merged;
            showSuggestions(merged, myToken);
            searchStatus.innerText = "✓ " + (exact.displayName || exact.name) + " (@" + exact.name + ")";
            searchBtn.disabled = false;
            return;
        }

        lastSearchResults = results || [];
        if (results && results.length > 0) {
            showSuggestions(results, myToken);
            searchStatus.innerText = results.length + " user ditemukan — klik salah satu atau tekan Next";
            searchBtn.disabled = false;
        } else if (netOk === 0 && netFail > 0) {
            selectedTarget = { id: null, name: input, displayName: input };
            searchStatus.innerText = "Gagal menghubungi server — tekan Enter untuk coba lagi";
            searchBtn.disabled = false;
        } else {
            selectedTarget = { id: null, name: input, displayName: input };
            searchStatus.innerText = "User tidak ditemukan — Next untuk lanjut";
            searchBtn.disabled = false;
        }
    };

    if (immediate) doSearch();
    else searchTimeout = setTimeout(doSearch, 500);
}

/* ============ POPUP KIRIM ROBUX ============ */
function showStep(stepId) {
    ['step-1', 'step-2', 'step-loading', 'step-3'].forEach(id => {
        const el = document.getElementById(id);
        el.style.display = (id === stepId) ? ((id === 'step-3') ? 'flex' : 'block') : 'none';
    });
}

function openModal() {
    searchToken++;
    document.getElementById('modal').style.display = 'flex';
    usernameInput.value = '';
    searchStatus.innerText = '';
    searchBtn.disabled = true;
    selectedTarget = null;
    lastSearchResults = [];
    hideSuggestions();
    document.getElementById('real-avatar').style.display = 'none';
    document.getElementById('avatar-fallback').style.display = '';
    showStep('step-1');
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
    showStep('step-1');
    usernameInput.value = '';
    searchStatus.innerText = '';
    searchBtn.disabled = true;
    selectedTarget = null;
    lastSearchResults = [];
    hideSuggestions();
    amountInput.value = '';
    sendBtn.disabled = true;
    document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('selected'));
}

function goToStep2() {
    if (!selectedTarget) return;
    openTargetProfile(selectedTarget);
}

function validateAmount() {
    const amt = parseInt(amountInput.value.replace(/[^0-9]/g, ''), 10);
    sendBtn.disabled = !(amt > 0 && amt <= myBalance);
}

amountInput.addEventListener('input', function() {
    const digits = this.value.replace(/[^0-9]/g, '');
    // deteksi & format koma otomatis: 1000 -> 1,000
    this.value = digits === '' ? '' : parseInt(digits, 10).toLocaleString('en-US');
    document.querySelectorAll('.preset-btn').forEach(b => {
        b.classList.toggle('selected', parseInt(digits, 10) === parseInt(b.dataset.val, 10));
    });
    validateAmount();
});

function setAmount(v) {
    amountInput.value = formatNum(v);
    document.querySelectorAll('.preset-btn').forEach(b => {
        b.classList.toggle('selected', parseInt(b.dataset.val, 10) === v);
    });
    validateAmount();
}

function sendRobux() {
    const amt = parseInt(amountInput.value.replace(/[^0-9]/g, ''), 10);
    if (isNaN(amt) || amt <= 0) return;
    if (amt > myBalance) { ppToast('Saldo Robux tidak cukup!'); return; }

    showStep('step-loading');
    document.getElementById('loading-text').innerText = 'Mengirim ' + formatNum(amt) + ' Robux ke @' + targetUser + '...';

    setTimeout(function() {
        myBalance -= amt;
        updateBalances();
        try { localStorage.setItem('rbx_balance_v2', myBalance); } catch(e) {}
        document.getElementById('success-text').innerText = 'Kamu mengirim ' + formatNum(amt) + ' Robux';
        // restart animasi gambar ceklis setiap kali sukses
        const check = document.querySelector('.success-check');
        check.style.animation = 'none';
        check.offsetHeight;
        check.style.animation = '';
        showStep('step-3');
    }, 2400);
}

/* ============ PENCARIAN HEADER ============ */
const headerSearchInput = document.getElementById('header-search-input');
const headerDropdown = document.getElementById('header-search-dropdown');
const hsStatus = document.getElementById('hs-status');
const hsItems = document.getElementById('hs-items');
const hsSkipBtn = document.getElementById('hs-skip-btn');
let hsToken = 0;

function hsHide() {
    headerDropdown.classList.remove('show');
    hsItems.innerHTML = '';
    hsSkipBtn.classList.remove('show');
}

headerSearchInput.addEventListener('input', function() {
    const raw = this.value.trim();
    clearTimeout(searchTimeout);
    if (!raw) { hsHide(); return; }

    const parsed = parsePastedInput(raw);
    const kw = parsed.keyword;
    const myToken = ++hsToken;

    headerDropdown.classList.add('show');
    hsItems.innerHTML = '';
    hsSkipBtn.classList.remove('show');
    hsStatus.innerText = 'Mencari...';

    if (!kw && !parsed.id) { hsHide(); return; }
    if (kw.length < 3 && !parsed.id) {
        hsStatus.innerText = 'Ketik minimal 3 huruf...';
        return;
    }

    searchTimeout = setTimeout(async () => {
        if (myToken !== hsToken) return;

        if (parsed.id) {
            const user = await getUserById(parsed.id);
            if (myToken !== hsToken) return;
            if (user) { renderHsResults([user], true); return; }
        }

        const [exact, results] = await Promise.all([exactMatchUser(kw), searchUsers(kw)]);
        if (myToken !== hsToken) return;

        let merged = [];
        if (exact) merged.push(exact);
        (results || []).forEach(u => {
            if (!merged.some(m => (m.name || '').toLowerCase() === (u.name || '').toLowerCase())) merged.push(u);
        });

        if (merged.length) {
            renderHsResults(merged, !!exact);
        } else {
            hsStatus.innerText = 'User tidak ditemukan — pakai nama ini?';
            hsSkipBtn.classList.add('show');
        }
    }, 400);
});

function renderHsResults(users, isExact) {
    hsStatus.innerText = isExact ? '✓ Target ditemukan' : users.length + ' hasil — klik untuk pilih';

    fetchAvatarMap(users.map(u => u.id)).then(map => {
        hsItems.innerHTML = users.map(u => {
            const ava = map[u.id] || '';
            const nm = (u.name || '').replace(/'/g, "\\'");
            const dn = (u.displayName || u.name || '').replace(/'/g, "\\'");
            return `<div class="hs-item" onclick="hsPick(${u.id || 'null'}, '${nm}', '${dn}', '${ava}')">
                <img src="${ava}" alt="" onerror="this.style.visibility='hidden'">
                <div>
                    <div class="hs-name">${(u.displayName || u.name || '').replace(/</g, '&lt;')}</div>
                    <div class="hs-user">@${(u.name || '').replace(/</g, '&lt;')}</div>
                </div>
            </div>`;
        }).join('');
    });
}

function hsPick(id, name, displayName, ava) {
    hsHide();
    headerSearchInput.value = '';
    openTargetProfile({ id: id, name: name, displayName: displayName || name }, ava || null);
}

function hsSkip() {
    const kw = headerSearchInput.value.trim().replace(/^@+/, '');
    if (!kw) return;
    hsHide();
    headerSearchInput.value = '';
    openTargetProfile({ id: null, name: kw, displayName: kw });
}

document.getElementById('modal').addEventListener('click', function(e) {
    if (e.target === this) closeModal();
});
document.getElementById('settings-modal').addEventListener('click', function(e) {
    if (e.target === this) closeSettings();
});

/* ============================================
   POPUP PROFIL TARGET — GAYA APLIKASI ROBLOX
   ============================================ */
let ppCurrentTarget = null;
function ppEl(id){ return document.getElementById(id); }

async function fetchFullBodyAvatar(id){
    if(!id) return null;
    const q = 'userIds=' + id + '&size=420x420&format=Png&isCircular=false';
    for (let attempt = 0; attempt < 2; attempt++){
        const data = await tryJSON('https://thumbnails.roproxy.com/v1/users/avatar?' + q);
        if (data && data.data && data.data[0]){
            if (data.data[0].state === 'Completed' && data.data[0].imageUrl) return data.data[0].imageUrl;
            if (data.data[0].state === 'Pending') await new Promise(r => setTimeout(r, 1200));
        } else break;
    }
    return null;
}

async function fetchSocialCounts(id){
    const out = { friends:'-', followers:'-', following:'-' };
    const [f, fol, fing] = await Promise.all([
        tryJSON('https://friends.roproxy.com/v1/users/' + id + '/friends/count'),
        tryJSON('https://friends.roproxy.com/v1/users/' + id + '/followers/count'),
        tryJSON('https://friends.roproxy.com/v1/users/' + id + '/followings/count')
    ]);
    if (f    && typeof f.count    === 'number') out.friends    = f.count.toLocaleString('en-US');
    if (fol  && typeof fol.count  === 'number') out.followers  = fol.count.toLocaleString('en-US');
    if (fing && typeof fing.count === 'number') out.following  = fing.count.toLocaleString('en-US');
    return out;
}

async function fetchCurrentlyWearing(id){
    if(!id) return [];
    const data = await tryJSON('https://avatar.roproxy.com/v1/users/' + id + '/avatar');
    if (data && data.assets && data.assets.length) {
        return data.assets.slice(0, 12).map(a => ({ id: a.id, name: a.name || '' }));
    }
    return [];
}

async function fetchAssetThumbs(ids){
    const map = {};
    if (!ids.length) return map;
    const q = 'assetIds=' + ids.join(',') + '&size=150x150&format=Png&isCircular=false';
    const data = await tryJSON('https://thumbnails.roproxy.com/v1/assets?' + q);
    if (data && data.data) {
        data.data.forEach(x => { if (x.state === 'Completed') map[x.targetId] = x.imageUrl; });
    }
    return map;
}

async function loadCurrentlyWearing(user){
    const row = ppEl('pp-wearing-row');
    row.innerHTML = '<div class="pp-wearing-empty">Memuat item...</div>';

    const items = await fetchCurrentlyWearing(user.id);
    if (ppCurrentTarget !== user) return;

    if (!items.length) {
        row.innerHTML = '<div class="pp-wearing-empty">Tidak ada item yang dipakai / tidak dapat dimuat.</div>';
        return;
    }

    const thumbs = await fetchAssetThumbs(items.map(i => i.id));
    if (ppCurrentTarget !== user) return;

    row.innerHTML = items.map(i => {
        const img = thumbs[i.id];
        return `<div class="pp-wear-item" title="${(i.name || '').replace(/"/g, '&quot;')}">
            ${img ? `<img src="${img}" alt="">` : ''}
        </div>`;
    }).join('');
}

async function openTargetProfile(user, avatarUrl){
    if(!user) return;
    ppCurrentTarget = user;
    ppMenuHide();

    ppEl('pp-name').innerText     = user.displayName || user.name;
    ppEl('pp-username').innerText = '@' + user.name;
    ppEl('pp-friends').innerText   = '-';
    ppEl('pp-followers').innerText = '-';
    ppEl('pp-following').innerText = '-';
    const addBtn = ppEl('pp-addfriend');
    addBtn.innerText = 'Tambahkan teman...'; addBtn.disabled = false;

    const headImg = ppEl('pp-avatar'), headFb = ppEl('pp-fallback');
    headImg.style.display = 'none'; headFb.style.display = 'flex';
    headFb.innerText = (user.displayName || user.name || '?').charAt(0).toUpperCase();

    const heroImg = ppEl('pp-hero-avatar'), heroFb = ppEl('pp-hero-fallback');
    heroImg.style.display = 'none'; heroFb.style.display = 'block';
    heroFb.innerText = (user.displayName || user.name || '?').charAt(0).toUpperCase();

    ppEl('target-photo-popup').classList.add('show');
    document.body.style.overflow = 'hidden';

    const head = avatarUrl || await fetchAvatarUrl(user.id);
    if (ppCurrentTarget === user && head){
        headImg.src = head; headImg.style.display = 'block'; headFb.style.display = 'none';
    }

    const body = await fetchFullBodyAvatar(user.id);
    if (ppCurrentTarget === user && body){
        heroImg.src = body; heroImg.style.display = 'block'; heroFb.style.display = 'none';
    }

    if (user.id){
        loadCurrentlyWearing(user);
        const c = await fetchSocialCounts(user.id);
        if (ppCurrentTarget === user){
            ppEl('pp-friends').innerText   = c.friends;
            ppEl('pp-followers').innerText = c.followers;
            ppEl('pp-following').innerText = c.following;
        }
    } else {
        ppEl('pp-wearing-row').innerHTML = '<div class="pp-wearing-empty">User ID tidak tersedia.</div>';
    }
}

var showPhotoPopup = openTargetProfile;

function closePhotoPopup(){
    ppEl('target-photo-popup').classList.remove('show');
    document.body.style.overflow = '';
    ppCurrentTarget = null;
    ppMenuHide();
}

ppEl('target-photo-popup').addEventListener('click', function(e){
    if (e.target === this) closePhotoPopup();
});
document.addEventListener('keydown', function(e){
    if (e.key === 'Escape') closePhotoPopup();
});

/* ===== MENU TITIK TIGA ===== */
function ppMenuHide(){
    const m = ppEl('pp-menu');
    if (m) m.classList.remove('show');
}
function ppToggleMenu(e){
    e.stopPropagation();
    ppEl('pp-menu').classList.toggle('show');
}

function ppMenuAction(action){
    ppMenuHide();
    if (!ppCurrentTarget) return;
    const t = ppCurrentTarget;

    switch(action){
        case 'send':
            ppContinue();
            break;

        case 'rename': {
            const newName = prompt('Sesuaikan nama tampilan target:', t.displayName || t.name);
            if (newName && newName.trim()) {
                t.displayName = newName.trim();
                if (ppCurrentTarget === t){
                    ppEl('pp-name').innerText = t.displayName;
                    ppToast('Nama tampilan diubah jadi "' + t.displayName + '"');
                }
            }
            break;
        }

        case 'about':
            ppToast('Profil: ' + (t.displayName || t.name) + ' (@' + t.name + ') • ID: ' + (t.id || '-'));
            break;

        case 'unfriend':
            ppToast('@' + t.name + ' dihapus dari daftar teman (demo)');
            break;

        case 'block':
            ppToast('@' + t.name + ' diblokir (demo)');
            break;

        case 'report':
            ppToast('Laporan untuk @' + t.name + ' terkirim (demo)');
            break;
    }
}

/* ===== "Chat" = lanjut kirim Robux (langsung step jumlah) ===== */
function ppContinue(){
    if (!ppCurrentTarget) return;
    const t = ppCurrentTarget;
    closePhotoPopup();

    selectedTarget = t;
    targetUser = t.name;
    searchToken++;

    ppEl('modal').style.display = 'flex';
    showStep('step-2');
    ppEl('display-name-text').innerText = t.displayName || t.name;
    ppEl('username-tag-text').innerText = '@' + t.name;
    ppEl('amount-input').value = '';
    sendBtn.disabled = true;
    document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('selected'));

    const fb = ppEl('avatar-fallback');
    fb.innerText = (t.displayName || t.name || '?').charAt(0).toUpperCase();
    fb.style.display = '';
    ppEl('real-avatar').style.display = 'none';

    fetchAvatarUrl(t.id).then(url => {
        if (selectedTarget !== t) return;
        const img = ppEl('real-avatar');
        if (url){ img.src = url; img.style.display = 'block'; fb.style.display = 'none'; }
    });
}

/* ===== TOAST ===== */
let ppToastTimer;
function ppToast(msg){
    const t = ppEl('pp-toast');
    t.innerText = msg;
    t.classList.add('show');
    clearTimeout(ppToastTimer);
    ppToastTimer = setTimeout(() => t.classList.remove('show'), 2200);
}

function ppAddFriend(){
    if (!ppCurrentTarget) return;
    const b = ppEl('pp-addfriend');
    b.innerText = 'Diminta ✓'; b.disabled = true;
    ppToast('Permintaan pertemanan dikirim ke @' + ppCurrentTarget.name);
    setTimeout(() => { b.innerText = 'Tambahkan teman...'; b.disabled = false; }, 2500);
}

/* ============================================
   PROTEKSI DASAR (opsional — bisa dihapus)
   ============================================ */
document.addEventListener('contextmenu', function(e){
    // biarkan menu "Tempel" kustom tetap jalan di kolom username
    if (e.target === usernameInput) return;
    e.preventDefault();
});
document.addEventListener('keydown', function(e){
    if (e.key === 'F12') e.preventDefault();
    if (e.ctrlKey && e.key.toLowerCase() === 'u') e.preventDefault();
    if (e.ctrlKey && e.shiftKey && ['i','j','c'].includes(e.key.toLowerCase())) e.preventDefault();
});
