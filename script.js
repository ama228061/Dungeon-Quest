// =====================================================
// DUNGEON QUEST — DARK CHRONICLES
// Enhanced Edition — script.js
// =====================================================

// ─────────────────────────────────────────────────────
// 1. STATIC DATA
// ─────────────────────────────────────────────────────
var Sprites = {
    TANK: '<svg class="hd-art" style="--glow-color:#4299e1" viewBox="0 0 64 64" fill="none" stroke="#63b3ed" stroke-width="2.5"><path d="M12 4h40v12L32 28 12 16V4z"/><path d="M12 16v24c0 11 9 20 20 20s20-9 20-20V16"/><path d="M20 28h24M32 28v32"/></svg>',
    BERSERK: '<svg class="hd-art" style="--glow-color:#f56565" viewBox="0 0 64 64" fill="none" stroke="#fc8181" stroke-width="2.5"><path d="M26 12h12v12H26z"/><path d="M14 24h36v8H14z"/><path d="M20 32v20l12 6 12-6V32"/><path d="M8 12l10 12M56 12L46 24"/></svg>',
    ALCHEMIST: '<svg class="hd-art" style="--glow-color:#b794f4" viewBox="0 0 64 64" fill="none" stroke="#d6bcfa" stroke-width="2.5"><path d="M24 6h16M32 6v14"/><path d="M44 42A16 16 0 1 1 20 42l4-22h16l4 22z"/><path d="M22 34h20"/></svg>',
    SCOUT: '<svg class="hd-art" style="--glow-color:#48bb78" viewBox="0 0 64 64" fill="none" stroke="#68d391" stroke-width="2.5"><path d="M52 12L12 52M52 12H32M52 12v20"/><path d="M16 16c10 0 24 14 24 24"/></svg>',
    SPIDER: '<svg class="hd-art" style="--glow-color:#a0aec0" viewBox="0 0 64 64" fill="none" stroke="#cbd5e0" stroke-width="2.5"><circle cx="32" cy="32" r="10"/><path d="M24 26L8 16M40 26l16-10M22 32H4M42 32h18M24 38L8 48M40 38l16 10"/></svg>',
    SKELETON: '<svg class="hd-art" style="--glow-color:#e2e8f0" viewBox="0 0 64 64" fill="none" stroke="#fff" stroke-width="2.5"><rect x="22" y="8" width="20" height="20" rx="6"/><path d="M32 28v20M20 36h24M24 56v-8h16v8"/></svg>',
    GOBLIN: '<svg class="hd-art" style="--glow-color:#38a169" viewBox="0 0 64 64" fill="none" stroke="#48bb78" stroke-width="2.5"><path d="M32 10c-10 0-16 8-16 16 0 10 16 24 16 24s16-14 16-24c0-8-6-16-16-16z"/><path d="M16 20l-10-6 4 12M48 20l10-6-4 12"/></svg>',
    TROLL: '<svg class="hd-art" style="--glow-color:#68d391" viewBox="0 0 64 64" fill="none" stroke="#9ae6b4" stroke-width="2.5"><circle cx="32" cy="20" r="12"/><path d="M16 20l-8 4 4 8M48 20l8 4-4 8"/><path d="M14 36c0 12 8 18 18 18s18-6 18-18"/><path d="M20 52l-4 8M44 52l4 8"/></svg>',
    DARKMAGE: '<svg class="hd-art" style="--glow-color:#b794f4" viewBox="0 0 64 64" fill="none" stroke="#d6bcfa" stroke-width="2.5"><path d="M32 4l4 12h12l-10 8 4 12-10-8-10 8 4-12L16 16h12z"/><path d="M32 36v24M24 52h16"/><circle cx="32" cy="44" r="4" fill="#b794f4" opacity="0.5"/></svg>',
    BOSS: '<svg class="hd-art" style="--glow-color:#e53e3e" viewBox="0 0 64 64" fill="none" stroke="#f56565" stroke-width="2.5"><path d="M32 6L14 22v26l18 10 18-10V22L32 6z"/><path d="M20 26l12 6 12-6M14 36h36M32 6v52"/></svg>',
    TRAP: '<svg class="hd-art" style="--glow-color:#dd6b20" viewBox="0 0 64 64" fill="none" stroke="#ed8936" stroke-width="2.5"><path d="M8 56h48M16 56V20l8-8 8 8v36M40 56V28l8-6 4 6v28"/></svg>',
    LOOT: '<svg class="hd-art" style="--glow-color:#ecc94b" viewBox="0 0 64 64" fill="none" stroke="#f6ad55" stroke-width="2.5"><path d="M10 24h44v28H10zM10 24l6-10h32l6 10M32 34v10M24 38h16"/></svg>',
    SHOP: '<svg class="hd-art" style="--glow-color:#63b3ed" viewBox="0 0 64 64" fill="none" stroke="#90cdf4" stroke-width="2.5"><path d="M8 20h48l-6 28H14L8 20z"/><path d="M8 20l6-10h36l6 10"/><path d="M24 30a8 8 0 0 0 16 0"/></svg>',
    UNKNOWN: '<svg class="hd-art" style="--glow-color:#4a5568" viewBox="0 0 64 64" fill="none" stroke="#718096" stroke-dasharray="4 4" stroke-width="2.5"><circle cx="32" cy="32" r="20"/><path d="M32 22c2.5 0 4.5 2 4.5 4.5 0 2.5-2 3.5-3.5 4.5V34m0 6v.01" stroke-linecap="round"/></svg>'
};

var ClassDescriptions = {
    TANK: '<div><strong style="color:#63b3ed;font-size:0.95rem;">🛡️ КЛАСС: ТАНК</strong><br><em style="color:#718096;font-size:0.75rem;">Бастион выносливости и железной защиты.</em><div style="margin-top:10px;font-size:0.78rem;display:flex;flex-direction:column;gap:6px;"><div>🟢 <b>Каменная стена:</b> Получает на 20% меньше урона. Повышенный запас HP.</div><div>⚡ <b>Живой щит:</b> Блокирует следующий удар врага, превращая его в контратаку.</div><div>🔍 <b>Специфика:</b> Врождённый бонус к сложным проверкам защиты в комнатах.</div></div></div>',
    BERSERK: '<div><strong style="color:#fc8181;font-size:0.95rem;">🪓 КЛАСС: БЕРСЕРК</strong><br><em style="color:#718096;font-size:0.75rem;">Мастер ярости, расцветающий на пороге гибели.</em><div style="margin-top:10px;font-size:0.78rem;display:flex;flex-direction:column;gap:6px;"><div>🟢 <b>Кровавый кураж:</b> Чем ниже здоровье, тем сильнее критические удары.</div><div>⚡ <b>Безрассудный замах:</b> 2.5× урон по цели, ценой 10 ХП.</div><div>🔍 <b>Специфика:</b> Огромный бонус к веткам Агрессия и Безумие.</div></div></div>',
    ALCHEMIST: '<div><strong style="color:#d6bcfa;font-size:0.95rem;">🧪 КЛАСС: АЛХИМИК</strong><br><em style="color:#718096;font-size:0.75rem;">Изобретатель скрытых сил, токсинов и эликсиров.</em><div style="margin-top:10px;font-size:0.78rem;display:flex;flex-direction:column;gap:6px;"><div>🟢 <b>Катализатор:</b> Все зелья восстанавливают на +50% больше ХП.</div><div>⚡ <b>Кислотная колба:</b> Отравляет врага — 5 урона/ход × 3 хода.</div><div>🔍 <b>Специфика:</b> Доступ к уникальной тактике в событиях Диалог.</div></div></div>',
    SCOUT: '<div><strong style="color:#68d391;font-size:0.95rem;">🏹 КЛАСС: СЛЕДОПЫТ</strong><br><em style="color:#718096;font-size:0.75rem;">Тень подземелья, бьющая точно в уязвимые точки.</em><div style="margin-top:10px;font-size:0.78rem;display:flex;flex-direction:column;gap:6px;"><div>🟢 <b>Чутьё на капканы:</b> Безошибочно замечает скрытые ловушки и засады.</div><div>⚡ <b>Прицельный выстрел:</b> 100% критическое попадание из скрытности.</div><div>🔍 <b>Специфика:</b> Колоссальное преимущество при действиях Скрытность.</div></div></div>'
};

var SensoryData = {
    visual: ["Стены покрыты фосфоресцирующим мхом, отбрасывающим длинные тени.", "Слабый луч света обнажает танцующую вековую пыль.", "Бархатная темнота с трудом рассеивается вашим тусклым факелом."],
    audio: ["Слышен далёкий, прерывистый скрежет заржавевшего металла.", "В тишине раздаётся мерный стук капающей воды.", "Доносится едва различимый шёпот, затихающий при попытке вслушаться."],
    smell: ["В воздух бьёт тяжёлый, сладковатый запах старой сырости и тлена.", "Пахнет озоном и резким ароматом древней магии.", "Холодный сквозняк приносит едва уловимый аромат сухих трав."],
    touch: ["Каменные стены ледяные и покрыты скользкой влагой.", "Пол мелко вибрирует, словно где-то далеко работает механизм.", "Воздух такой сухой, что першит в горле при каждом вздохе."],
    atmosphere: ["Вас не покидает чувство, будто чьи-то глаза смотрят вам в спину.", "Здесь чувствуется странное, усыпляющее спокойствие.", "Внезапная вспышка беспричинной тревоги заставляет сердце биться чаще."]
};

var RedHerrings = [
    "На полу лежит аккуратно выведенная стрелка, указывающая на тупиковую стену.",
    "В ювелирном углу маняще сияет золотая чаша — это кусок начищенной слюды.",
    "Свежие следы тяжёлых сапог ведут к стене и там бесследно обрываются."
];

var LootTable = {
    TANK: { weapons: [{ name: "Обитый Молот", type: "weapon", value: 6, rarity: "common" }, { name: "Булава Предков", type: "weapon", value: 12, rarity: "uncommon" }], armors: [{ name: "Кованые Поножи", type: "armor", value: 30, rarity: "common" }, { name: "Стальной Нагрудник", type: "armor", value: 60, rarity: "rare" }] },
    BERSERK: { weapons: [{ name: "Тяжёлый Топор", type: "weapon", value: 10, rarity: "common" }, { name: "Рунический Клинок", type: "weapon", value: 20, rarity: "uncommon" }], armors: [{ name: "Шкура Вепря", type: "armor", value: 15, rarity: "common" }, { name: "Доспех Истовства", type: "armor", value: 35, rarity: "uncommon" }] },
    ALCHEMIST: { weapons: [{ name: "Искрящийся Посох", type: "weapon", value: 8, rarity: "common" }, { name: "Сфера Эфира", type: "weapon", value: 16, rarity: "uncommon" }], armors: [{ name: "Укреплённая Мантия", type: "armor", value: 20, rarity: "common" }, { name: "Ряса Магистра", type: "armor", value: 45, rarity: "rare" }] },
    SCOUT: { weapons: [{ name: "Охотничий Лук", type: "weapon", value: 7, rarity: "common" }, { name: "Кинжал Тени", type: "weapon", value: 15, rarity: "uncommon" }], armors: [{ name: "Кожаный Жилет", type: "armor", value: 15, rarity: "common" }, { name: "Плащ Маскировки", type: "armor", value: 35, rarity: "uncommon" }] }
};

var AllPerks = [
    { id: "vamp", name: "🩸 Вампиризм", desc: "Восстанавливает +4 ХП при каждом попадании." },
    { id: "heavy", name: "⚡ Тяжёлый замах", desc: "+6 к базовому урону атаки." },
    { id: "thick", name: "🛡️ Каменная кожа", desc: "+25 к максимальному ХП." },
    { id: "luck", name: "🍀 Удача искателя", desc: "+3 ко всем проверкам d20." },
    { id: "speedy", name: "👟 Лёгкость", desc: "+4 к скорости уклонения." },
    { id: "greed", name: "💰 Алчность", desc: "Монстры дропают вдвое больше золота." },
    { id: "brew", name: "🧪 Знаток зелий", desc: "При повышении уровня получаете +1 зелье." }
];

var RoomNames = ["Зал Слёз", "Гнилой Проход", "Развилка Судьбы", "Склеп Предков", "Зал Теней", "Катакомбы", "Забытые Руины", "Обитель Теней", "Кровавый Коридор", "Склеп Бездны"];

var MonsterPool = [
    { name: "Пещерный паук", k: "SPIDER", behavior: "normal", hpMult: 1.0, dmgMult: 1.0 },
    { name: "Скелет-воин", k: "SKELETON", behavior: "normal", hpMult: 1.1, dmgMult: 1.0 },
    { name: "Гоблин-налётчик", k: "GOBLIN", behavior: "normal", hpMult: 0.9, dmgMult: 1.1 },
    { name: "Пещерный тролль", k: "TROLL", behavior: "defensive", hpMult: 2.0, dmgMult: 0.7 },
    { name: "Тёмный маг", k: "DARKMAGE", behavior: "magic", hpMult: 0.8, dmgMult: 1.3 }
];

var ShopCatalog = [
    { id: "potion_sm", name: "🧪 Зелье исцеления", desc: "Восстанавливает 40 ХП", cost: 30, type: "potion", heal: 40 },
    { id: "potion_lg", name: "🧪 Зелье силы", desc: "Восстанавливает 65 ХП", cost: 55, type: "potion", heal: 65 },
    { id: "sharpen", name: "⚔️ Точильный камень", desc: "+5 к урону навсегда", cost: 50, type: "stat", stat: "baseDamage", val: 5 },
    { id: "amulet", name: "❤️ Рунный амулет", desc: "+20 к макс. ХП навсегда", cost: 45, type: "stat", stat: "maxHp", val: 20 }
];

// ─────────────────────────────────────────────────────
// 2. GLOBAL STATE
// ─────────────────────────────────────────────────────
var isCoop = false;
var player = {
    classKey: "", classTitle: "", lvl: 1, exp: 0,
    hp: 0, maxHp: 0, baseDamage: 0, damage: 0,
    speed: 0, bonus: 0, vamp: 0,
    gold: 0, potions: 0, kills: 0,
    weaponItem: null, armorItem: null,
    learnedPerks: [],
    abilityReady: true,
    shieldBlock: false,
    poisonTurns: 0
};
var player2 = {
    classKey: "", classTitle: "", lvl: 1, exp: 0,
    hp: 0, maxHp: 0, baseDamage: 0, damage: 0,
    speed: 0, bonus: 0, vamp: 0,
    gold: 0, potions: 0, kills: 0,
    weaponItem: null, armorItem: null,
    learnedPerks: [],
    abilityReady: true,
    shieldBlock: false,
    poisonTurns: 0
};
var activeHeroIndex = 0;
var coopSelectionStep = 0;
var selectedHeroStatsTab = 0;
var selectedHeroInvTab = 0;
var combatTurnState = 'hero1';

var bag = [];
var eventIndex = 0;
var totalEvents = 20;
var enemy = { name: "", hp: 0, maxHp: 0, damage: 0, spriteKey: "", behavior: "normal", poisonTurns: 0 };
var mapHistory = [];
var minimapData = [];
var worldMemory = { playerIsRuthless: false, foundAncientLore: false };
var gameStats = { enemiesSlain: 0, goldEarned: 0, roomsCleared: 0 };
var settings = { vfx: true, anim: true };
var inCombat = false;
var combatLocked = false;

var logBox, actionButtons;

var onlineCoop = {
    enabled: false,
    role: 'none', // host | guest
    peer: null,
    conn: null,
    token: '',
    connected: false,
    syncTimer: null,
    applyingSnapshot: false,
    processingRemoteCommand: false,
    turn: 'setup',
    uiState: 'none',
    uiData: null,
    pendingPathLogic: null,
    pendingPathChoices: null,
    pathDiscussion: null,
    guestJoinToken: '',
    guestJoinAttempts: 0,
    guestRetryTimer: null
};

function supportsOnlineCoop() {
    return typeof Peer !== 'undefined';
}

function isOnlineHost() {
    return onlineCoop.enabled && onlineCoop.role === 'host';
}

function isOnlineGuest() {
    return onlineCoop.enabled && onlineCoop.role === 'guest';
}

function isOnlineConnOpen() {
    return !!(onlineCoop.conn && onlineCoop.conn.open);
}

function stopOnlineCoop() {
    if (onlineCoop.syncTimer) {
        clearTimeout(onlineCoop.syncTimer);
        onlineCoop.syncTimer = null;
    }
    if (onlineCoop.guestRetryTimer) {
        clearTimeout(onlineCoop.guestRetryTimer);
        onlineCoop.guestRetryTimer = null;
    }
    try { if (onlineCoop.conn) onlineCoop.conn.close(); } catch (e) { }
    try { if (onlineCoop.peer) onlineCoop.peer.destroy(); } catch (e) { }

    onlineCoop.enabled = false;
    onlineCoop.role = 'none';
    onlineCoop.peer = null;
    onlineCoop.conn = null;
    onlineCoop.token = '';
    onlineCoop.connected = false;
    onlineCoop.applyingSnapshot = false;
    onlineCoop.processingRemoteCommand = false;
    onlineCoop.turn = 'setup';
    onlineCoop.uiState = 'none';
    onlineCoop.uiData = null;
    onlineCoop.pendingPathLogic = null;
    onlineCoop.pendingPathChoices = null;
    onlineCoop.pathDiscussion = null;
    onlineCoop.guestJoinToken = '';
    onlineCoop.guestJoinAttempts = 0;
}

function makeOnlineToken() {
    var alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    var out = 'DQ-';
    for (var i = 0; i < 8; i++) {
        out += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    return out;
}

function normalizeOnlineToken(value) {
    return String(value || '').trim().toUpperCase().replace(/\s+/g, '');
}

function extractOnlineToken(value) {
    var raw = String(value || '').trim();
    if (!raw) return '';
    try { raw = decodeURIComponent(raw); } catch (e) { }
    var normalized = normalizeOnlineToken(raw);
    var directMatch = normalized.match(/DQ-[A-Z0-9]{8}/);
    if (directMatch) return directMatch[0];
    try {
        var parsed = new URL(raw.indexOf('http://') === 0 || raw.indexOf('https://') === 0 ? raw : ('https://' + raw));
        var fromJoin = normalizeOnlineToken(parsed.searchParams.get('join'));
        if (fromJoin) {
            var joinMatch = fromJoin.match(/DQ-[A-Z0-9]{8}/);
            if (joinMatch) return joinMatch[0];
            return fromJoin;
        }
    } catch (e) { }
    return normalized;
}

function setOnlineUiState(state, data) {
    if (!onlineCoop.enabled) return;
    onlineCoop.uiState = state || 'none';
    onlineCoop.uiData = data || null;
    scheduleOnlineSync(20);
}

function onlineTurnLabel() {
    if (onlineCoop.turn === 'setup') return 'Подготовка';
    return onlineCoop.turn === 'p2' ? 'P2' : 'P1';
}

function canHostActInOnlineTurn() {
    if (!isOnlineHost() || !onlineCoop.connected) return true;
    if (onlineCoop.turn === 'setup') return true;
    if (onlineCoop.processingRemoteCommand) return true;
    return onlineCoop.turn === 'p1';
}

function canGuestActInOnlineTurn() {
    if (!isOnlineGuest() || !onlineCoop.connected) return false;
    if (onlineCoop.turn === 'setup') return false;
    return onlineCoop.turn === 'p2';
}

function advanceOnlineTurn() {
    if (!isOnlineHost() || !onlineCoop.connected) return;
    if (onlineCoop.turn === 'setup') {
        onlineCoop.turn = 'p1';
    } else {
        onlineCoop.turn = (onlineCoop.turn === 'p1') ? 'p2' : 'p1';
    }
    scheduleOnlineSync(20);
}

function guardHostTurnOnly(actionTitle) {
    if (canHostActInOnlineTurn()) return false;
    log('⏳ Сейчас ход друга (' + onlineTurnLabel() + '). Действие: ' + actionTitle, 'system');
    return true;
}

function buildInviteLink(token) {
    var base = window.location.origin + window.location.pathname;
    var params = new URLSearchParams();
    params.set('join', token);
    try {
        var current = new URLSearchParams(window.location.search);
        ['peerHost', 'peerPort', 'peerPath', 'peerSecure'].forEach(function (k) {
            var v = current.get(k);
            if (v) params.set(k, v);
        });
    } catch (e) { }
    return base + '?' + params.toString();
}

function getDefaultIceServers() {
    return [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun.cloudflare.com:3478' }
    ];
}

function createPeerOptions() {
    var opts = {
        debug: 2,
        host: '0.peerjs.com',
        port: 443,
        secure: true,
        config: {
            iceServers: getDefaultIceServers()
        }
    };

    try {
        var params = new URLSearchParams(window.location.search);
        var peerHost = params.get('peerHost');
        var peerPort = parseInt(params.get('peerPort') || '', 10);
        var peerPath = params.get('peerPath');
        var peerSecure = params.get('peerSecure');

        if (peerHost) opts.host = peerHost;
        if (!isNaN(peerPort)) opts.port = peerPort;
        if (peerPath) opts.path = peerPath;
        if (peerSecure === 'false' || peerSecure === '0') opts.secure = false;
        if (peerSecure === 'true' || peerSecure === '1') opts.secure = true;
    } catch (e) { }

    return opts;
}

function queueGuestReconnect() {
    if (!isOnlineGuest() || !onlineCoop.peer || onlineCoop.connected) return;
    if (onlineCoop.guestRetryTimer) clearTimeout(onlineCoop.guestRetryTimer);

    if (onlineCoop.guestJoinAttempts >= 8) {
        log('⚠️ Не удалось подключиться. Проверьте, что хост онлайн и токен введён без ошибок.', 'system');
        renderGuestActionPanel();
        return;
    }

    onlineCoop.guestRetryTimer = setTimeout(function () {
        onlineCoop.guestRetryTimer = null;
        connectGuestToHost();
    }, 1500);
}

function connectGuestToHost() {
    if (!isOnlineGuest() || !onlineCoop.peer || !onlineCoop.guestJoinToken) return;
    if (onlineCoop.connected) return;

    onlineCoop.guestJoinAttempts++;
    if (onlineCoop.conn && !onlineCoop.conn.open) {
        try { onlineCoop.conn.close(); } catch (e) { }
        onlineCoop.conn = null;
    }

    var conn = onlineCoop.peer.connect(onlineCoop.guestJoinToken, { reliable: true, serialization: 'json' });
    bindOnlineConnection(conn);

    if (onlineCoop.guestRetryTimer) clearTimeout(onlineCoop.guestRetryTimer);
    onlineCoop.guestRetryTimer = setTimeout(function () {
        onlineCoop.guestRetryTimer = null;
        if (!onlineCoop.connected) queueGuestReconnect();
    }, 4500);
}

function sendOnlinePacket(packet) {
    if (!isOnlineConnOpen()) return;
    try { onlineCoop.conn.send(packet); } catch (e) { }
}

function buildOnlineSnapshot() {
    return {
        isCoop: isCoop,
        activeHeroIndex: activeHeroIndex,
        coopSelectionStep: coopSelectionStep,
        combatTurnState: combatTurnState,
        bag: bag,
        eventIndex: eventIndex,
        totalEvents: totalEvents,
        enemy: enemy,
        mapHistory: mapHistory,
        minimapData: minimapData,
        worldMemory: worldMemory,
        gameStats: gameStats,
        inCombat: inCombat,
        combatLocked: combatLocked,
        onlineTurn: onlineCoop.turn,
        onlineUiState: onlineCoop.uiState,
        onlineUiData: onlineCoop.uiData,
        pendingPathLogic: onlineCoop.pendingPathLogic,
        pendingPathChoices: onlineCoop.pendingPathChoices,
        pathDiscussion: onlineCoop.pathDiscussion,
        player: player,
        player2: player2
    };
}

function sendOnlineSnapshot() {
    if (!isOnlineHost() || !isOnlineConnOpen()) return;
    sendOnlinePacket({
        type: 'sync',
        state: buildOnlineSnapshot(),
        logHtml: logBox ? logBox.innerHTML : ''
    });
}

function scheduleOnlineSync(delayMs) {
    if (!isOnlineHost()) return;
    if (onlineCoop.syncTimer) clearTimeout(onlineCoop.syncTimer);
    onlineCoop.syncTimer = setTimeout(function () {
        onlineCoop.syncTimer = null;
        sendOnlineSnapshot();
    }, typeof delayMs === 'number' ? delayMs : 80);
}

function refreshGuestViewFromSnapshot() {
    if (!isOnlineGuest()) return;

    var pSprite = document.getElementById('player-sprite');
    var pName = document.getElementById('player-name-label');
    var pCard = document.getElementById('player-theater');
    if (pSprite) pSprite.innerHTML = player.classKey ? (Sprites[player.classKey] || '') : '';
    if (pName) pName.textContent = player.classTitle || 'Герой 1';
    if (pCard) pCard.style.visibility = player.classKey ? 'visible' : 'hidden';

    var p2Sprite = document.getElementById('player2-sprite');
    var p2Name = document.getElementById('player2-name-label');
    var p2Card = document.getElementById('player2-theater');
    if (p2Sprite) p2Sprite.innerHTML = player2.classKey ? (Sprites[player2.classKey] || '') : '';
    if (p2Name) p2Name.textContent = player2.classTitle || 'Герой 2';
    if (p2Card) p2Card.style.display = isCoop ? 'flex' : 'none';

    var eSprite = document.getElementById('enemy-sprite');
    var eCard = document.getElementById('enemy-theater');
    if (eSprite) {
        var eKey = enemy && enemy.spriteKey ? enemy.spriteKey : 'UNKNOWN';
        eSprite.innerHTML = Sprites[eKey] || Sprites.UNKNOWN;
    }
    if (eCard) {
        if (enemy && enemy.name) {
            eCard.style.display = 'flex';
            eCard.style.visibility = 'visible';
        } else {
            eCard.style.display = 'none';
        }
    }

    adjustTheaterLayout(player.classKey ? 'battle' : 'single');

    var statsSel = document.getElementById('stats-hero-selector-wrap');
    var invSel = document.getElementById('inventory-hero-selector-wrap');
    if (statsSel) statsSel.style.display = isCoop ? 'flex' : 'none';
    if (invSel) invSel.style.display = isCoop ? 'flex' : 'none';
}

function renderGuestActionPanel() {
    if (!isOnlineGuest() || !actionButtons) return;

    actionButtons.innerHTML = '';

    if (!onlineCoop.connected) {
        var waitConnBtn = createActionBtn('⏳ Ожидание соединения с хостом...', function () { }, 'action-btn btn-muted');
        waitConnBtn.disabled = true;
        createActionBtn('↩️ Отмена и назад', function () {
            stopOnlineCoop();
            resetGameState();
            showModeSelect();
        }, 'action-btn btn-muted');
        return;
    }

    if (coopSelectionStep === 2 && !player2.classKey) {
        var classes = [
            { key: 'TANK', text: '🛡️ Танк' },
            { key: 'BERSERK', text: '🪓 Берсерк' },
            { key: 'ALCHEMIST', text: '🧪 Алхимик' },
            { key: 'SCOUT', text: '🏹 Следопыт' }
        ];
        classes.forEach(function (entry) {
            createActionBtn(entry.text, function () {
                sendOnlinePacket({ type: 'cmd', cmd: 'select_class', classKey: entry.key });
            }, 'action-btn btn-primary');
        });
        return;
    }

    if (!player.classKey) {
        var waitClassBtn = createActionBtn('⏳ Хост готовит поход...', function () { }, 'action-btn btn-muted');
        waitClassBtn.disabled = true;
        return;
    }

    var isGuestTurn = canGuestActInOnlineTurn();

    if (inCombat) {
        if (combatTurnState !== 'hero2' || player2.hp <= 0 || combatLocked) {
            var waitTurnBtn = createActionBtn('⏳ Ожидание вашего боевого хода...', function () { }, 'action-btn btn-muted');
            waitTurnBtn.disabled = true;
            return;
        }

        createActionBtn('⚔️ Молниеносный выпад (P2)', function () {
            sendOnlinePacket({ type: 'cmd', cmd: 'hero2_attack', heavy: false });
        }, 'action-btn btn-primary');

        createActionBtn('🎲 Мощный удар (P2)', function () {
            sendOnlinePacket({ type: 'cmd', cmd: 'hero2_attack', heavy: true });
        }, 'action-btn btn-danger');

        var abilityData = getClassAbilityDataFor(player2);
        var abilityBtn = createActionBtn(abilityData.name, function () {
            sendOnlinePacket({ type: 'cmd', cmd: 'hero2_ability' });
        }, 'action-btn btn-ability');
        abilityBtn.disabled = !player2.abilityReady;

        var canPotion = player.potions > 0 && player2.hp > 0 && player2.hp < player2.maxHp;
        var potionBtn = createActionBtn('🧪 Выпить зелье (P2)', function () {
            sendOnlinePacket({ type: 'cmd', cmd: 'hero2_potion' });
        }, 'action-btn btn-success');
        potionBtn.disabled = !canPotion;
        return;
    }

    if (onlineCoop.uiState === 'path_choice') {
        createActionBtn('🕵️ Осторожно разведать (Скрытность)', function () {
            sendOnlinePacket({ type: 'cmd', cmd: 'path_action', action: 'cautious' });
        }, 'action-btn btn-muted');
        createActionBtn('🪓 Прорубаться напролом (Агрессия)', function () {
            sendOnlinePacket({ type: 'cmd', cmd: 'path_action', action: 'aggressive' });
        }, 'action-btn btn-danger');
        createActionBtn('🗣️ Вызвать скрытые силы (Диалог)', function () {
            sendOnlinePacket({ type: 'cmd', cmd: 'path_action', action: 'social' });
        }, 'action-btn btn-purple');
        if (onlineCoop.uiData && onlineCoop.uiData.canClassP2) {
            createActionBtn('🔮 Техника P2 (' + player2.classTitle + ')', function () {
                sendOnlinePacket({ type: 'cmd', cmd: 'path_action', action: 'class_p2' });
            }, 'action-btn btn-purple');
        }
        createActionBtn('🎲 Зажмуриться и прыгнуть (Безумие)', function () {
            sendOnlinePacket({ type: 'cmd', cmd: 'path_action', action: 'crazy' });
        }, 'action-btn btn-danger');
        return;
    }

    if (onlineCoop.uiState === 'path_discussion') {
        createActionBtn('💬 Написать в чат', function () {
            var txt = prompt('Сообщение напарнику:');
            if (!txt || !txt.trim()) return;
            sendOnlinePacket({ type: 'cmd', cmd: 'path_chat', text: txt.trim() });
        }, 'action-btn btn-muted');
        createActionBtn('🤝 Согласен', function () {
            sendOnlinePacket({ type: 'cmd', cmd: 'path_agree', value: 'agree' });
        }, 'action-btn btn-success');
        createActionBtn('❌ Не согласен', function () {
            sendOnlinePacket({ type: 'cmd', cmd: 'path_agree', value: 'disagree' });
        }, 'action-btn btn-danger');
        return;
    }

    if (!isGuestTurn) {
        var waitExploreBtn = createActionBtn('🧭 Ход хоста: ' + onlineTurnLabel(), function () { }, 'action-btn btn-muted');
        waitExploreBtn.disabled = true;
        return;
    }

    if (onlineCoop.uiState === 'next_step') {
        createActionBtn('🚪 Исследовать следующую зону', function () {
            sendOnlinePacket({ type: 'cmd', cmd: 'explore_next' });
        }, 'action-btn btn-primary');
        return;
    }

    if (onlineCoop.uiState === 'shop') {
        ShopCatalog.forEach(function (item) {
            var canAfford = player.gold >= item.cost;
            var btn = createActionBtn(item.name + ' — 💰 ' + item.cost, function () {
                sendOnlinePacket({ type: 'cmd', cmd: 'shop_buy', itemId: item.id });
            }, 'action-btn btn-gold' + (canAfford ? '' : ' disabled-look'));
            btn.disabled = !canAfford;
        });
        createActionBtn('↩️ Покинуть лавку', function () {
            sendOnlinePacket({ type: 'cmd', cmd: 'shop_exit' });
        }, 'action-btn btn-muted');
        return;
    }

    if (onlineCoop.uiState === 'loot') {
        createActionBtn('🔑 Открыть крышку', function () {
            sendOnlinePacket({ type: 'cmd', cmd: 'loot_open' });
        }, 'action-btn btn-success');
        return;
    }

    if (onlineCoop.uiState === 'trap') {
        createActionBtn('🤸 Рефлекторный кувырок', function () {
            sendOnlinePacket({ type: 'cmd', cmd: 'trap_resolve' });
        }, 'action-btn btn-danger');
        return;
    }

    var waitStateBtn = createActionBtn('⏳ Ожидание хоста...', function () { }, 'action-btn btn-muted');
    waitStateBtn.disabled = true;
}

function applyOnlineSnapshot(packet) {
    if (!isOnlineGuest() || !packet || !packet.state) return;

    var s = packet.state;
    onlineCoop.applyingSnapshot = true;

    isCoop = !!s.isCoop;
    activeHeroIndex = s.activeHeroIndex || 0;
    coopSelectionStep = s.coopSelectionStep || 0;
    if (!isCoop) {
        selectedHeroStatsTab = 0;
        selectedHeroInvTab = 0;
    }
    combatTurnState = s.combatTurnState || 'hero1';

    bag = s.bag || [];
    eventIndex = s.eventIndex || 0;
    totalEvents = s.totalEvents || 20;
    enemy = s.enemy || enemy;
    mapHistory = s.mapHistory || [];
    minimapData = s.minimapData || [];
    worldMemory = s.worldMemory || worldMemory;
    gameStats = s.gameStats || gameStats;
    inCombat = !!s.inCombat;
    combatLocked = !!s.combatLocked;
    onlineCoop.turn = s.onlineTurn || onlineCoop.turn || 'p1';
    onlineCoop.uiState = s.onlineUiState || 'none';
    onlineCoop.uiData = s.onlineUiData || null;
    onlineCoop.pendingPathLogic = s.pendingPathLogic || null;
    onlineCoop.pendingPathChoices = s.pendingPathChoices || null;
    onlineCoop.pathDiscussion = s.pathDiscussion || null;
    player = s.player || player;
    player2 = s.player2 || player2;

    if (typeof packet.logHtml === 'string' && logBox) {
        logBox.innerHTML = packet.logHtml;
        logBox.scrollTop = logBox.scrollHeight;
    }

    refreshGuestViewFromSnapshot();
    updateEnemyHpBar();
    renderStatusEffects();
    renderMinimap();
    updateStats();
    renderPerksList();

    onlineCoop.applyingSnapshot = false;
    renderGuestActionPanel();
}

function handleHostCommand(packet) {
    if (!isOnlineHost() || !packet) return;
    if (!isCoop) return;

    onlineCoop.processingRemoteCommand = true;
    try {
        if (packet.cmd === 'select_class') {
            if (coopSelectionStep === 2 && !player2.classKey && packet.classKey) {
                selectClass(packet.classKey);
            }
            return;
        }

        if (packet.cmd === 'explore_next') {
            if (onlineCoop.turn === 'p2' && onlineCoop.uiState === 'next_step') triggerRandomEvent();
            return;
        }

        if (packet.cmd === 'path_action') {
            if (onlineCoop.uiState !== 'path_choice' || !onlineCoop.pendingPathChoices) return;
            onlineCoop.pendingPathChoices.p2 = packet.action;
            resolvePathChoiceIfReady();
            return;
        }

        if (packet.cmd === 'path_chat') {
            if (onlineCoop.uiState !== 'path_discussion') return;
            var msg = String(packet.text || '').trim();
            if (!msg) return;
            log('💬 <b>P2:</b> ' + msg.replace(/</g, '&lt;'), 'system');
            scheduleOnlineSync(20);
            return;
        }

        if (packet.cmd === 'path_agree') {
            if (onlineCoop.uiState !== 'path_discussion' || !onlineCoop.pathDiscussion) return;
            onlineCoop.pathDiscussion.p2 = packet.value === 'agree' ? 'agree' : 'disagree';
            resolvePathDiscussion();
            return;
        }

        if (packet.cmd === 'shop_buy') {
            if (onlineCoop.turn !== 'p2' || onlineCoop.uiState !== 'shop') return;
            var item = ShopCatalog.find(function (s) { return s.id === packet.itemId; });
            if (item) buyShopItem(item);
            return;
        }

        if (packet.cmd === 'shop_exit') {
            if (onlineCoop.turn === 'p2' && onlineCoop.uiState === 'shop') handleShopExit();
            return;
        }

        if (packet.cmd === 'loot_open') {
            if (onlineCoop.turn === 'p2' && onlineCoop.uiState === 'loot') resolveLoot();
            return;
        }

        if (packet.cmd === 'trap_resolve') {
            if (onlineCoop.turn === 'p2' && onlineCoop.uiState === 'trap') resolveTrap();
            return;
        }

        if (!inCombat || combatTurnState !== 'hero2' || combatLocked || player2.hp <= 0) {
            return;
        }

        if (packet.cmd === 'hero2_attack') {
            playerAttack(!!packet.heavy, player2);
            return;
        }
        if (packet.cmd === 'hero2_ability') {
            useClassAbilityFor(player2);
            return;
        }
        if (packet.cmd === 'hero2_potion') {
            usePotionForHero(1);
        }
    } finally {
        onlineCoop.processingRemoteCommand = false;
    }
}

function bindOnlineConnection(conn) {
    onlineCoop.conn = conn;

    conn.on('open', function () {
        onlineCoop.connected = true;
        if (onlineCoop.guestRetryTimer) {
            clearTimeout(onlineCoop.guestRetryTimer);
            onlineCoop.guestRetryTimer = null;
        }
        if (isOnlineHost()) {
            log('🔗 Друг подключился к вашему кооперативу!', 'level-up');
            sendOnlineSnapshot();
        } else if (isOnlineGuest()) {
            log('🔗 Подключено! Ожидание состояния от хоста...', 'level-up');
            sendOnlinePacket({ type: 'request_sync' });
            renderGuestActionPanel();
        }
    });

    conn.on('data', function (packet) {
        if (!packet || typeof packet !== 'object') return;

        if (isOnlineHost()) {
            if (packet.type === 'request_sync') sendOnlineSnapshot();
            if (packet.type === 'cmd') handleHostCommand(packet);
            return;
        }

        if (isOnlineGuest() && packet.type === 'sync') {
            applyOnlineSnapshot(packet);
        }
    });

    conn.on('close', function () {
        onlineCoop.connected = false;
        onlineCoop.conn = null;
        if (isOnlineHost()) {
            log('⚠️ Друг отключился. Можно продолжать локально или создать новый токен.', 'system');
        } else if (isOnlineGuest()) {
            log('⚠️ Соединение с хостом закрыто.', 'system');
            queueGuestReconnect();
            renderGuestActionPanel();
        }
    });

    conn.on('error', function () {
        onlineCoop.connected = false;
        if (isOnlineHost()) log('⚠️ Ошибка соединения с другом.', 'system');
        if (isOnlineGuest()) {
            log('⚠️ Ошибка соединения с хостом.', 'system');
            queueGuestReconnect();
            renderGuestActionPanel();
        }
    });
}

function startOnlineHostLobby() {
    if (!supportsOnlineCoop()) {
        log('⚠️ Онлайн-кооп недоступен: PeerJS не загрузился.', 'system');
        return;
    }

    stopOnlineCoop();
    resetGameState();
    isCoop = true;
    coopSelectionStep = 1;
    switchTab('adventure');

    onlineCoop.enabled = true;
    onlineCoop.role = 'host';
    onlineCoop.connected = false;
    onlineCoop.turn = 'setup';
    onlineCoop.uiState = 'class_select_p1';
    onlineCoop.uiData = null;
    onlineCoop.pendingPathLogic = null;

    if (logBox) {
        logBox.innerHTML = '<div class="log-entry story">Создаём токен для подключения друга...</div>';
    }
    if (actionButtons) {
        actionButtons.innerHTML = '';
        var backBtn = createActionBtn('↩️ Назад к выбору режима', function () {
            stopOnlineCoop();
            resetGameState();
            showModeSelect();
        }, 'action-btn btn-muted');
        backBtn.style.marginTop = '8px';
    }

    var token = makeOnlineToken();
    onlineCoop.peer = new Peer(token, createPeerOptions());

    onlineCoop.peer.on('open', function (id) {
        onlineCoop.token = id;
        initClassSelect();
        log('🧷 Токен сессии: <b>' + id.toUpperCase() + '</b>', 'level-up');
        var inviteLink = buildInviteLink(id.toUpperCase());
        log('🔗 Ссылка для друга: <code>' + inviteLink + '</code>', 'system');
        log('📋 Друг открывает игру, жмёт "Подключиться по токену" и вводит этот код.', 'system');
    });

    onlineCoop.peer.on('connection', function (conn) {
        if (onlineCoop.conn && onlineCoop.conn.open) {
            try { conn.close(); } catch (e) { }
            return;
        }
        bindOnlineConnection(conn);
    });

    onlineCoop.peer.on('error', function (err) {
        var hostErr = (err && err.type) ? err.type : 'network-error';
        if (hostErr === 'unavailable-id') {
            log('⚠️ Токен уже занят. Нажмите "Назад" и создайте новый.', 'system');
        } else {
            log('⚠️ Не удалось создать токен: ' + hostErr, 'system');
        }
        stopOnlineCoop();
    });
}

function startOnlineGuestLobby(tokenInput) {
    if (!supportsOnlineCoop()) {
        log('⚠️ Онлайн-кооп недоступен: PeerJS не загрузился.', 'system');
        return;
    }

    var hostToken = extractOnlineToken(tokenInput);
    if (!hostToken) {
        log('⚠️ Пустой токен. Попробуйте ещё раз.', 'system');
        return;
    }

    stopOnlineCoop();
    resetGameState();
    isCoop = true;
    coopSelectionStep = 1;
    switchTab('adventure');

    onlineCoop.enabled = true;
    onlineCoop.role = 'guest';
    onlineCoop.connected = false;
    onlineCoop.token = hostToken;
    onlineCoop.guestJoinToken = hostToken;
    onlineCoop.guestJoinAttempts = 0;
    onlineCoop.turn = 'setup';
    onlineCoop.uiState = 'class_select_p1';
    onlineCoop.uiData = null;
    onlineCoop.pendingPathLogic = null;

    if (logBox) {
        logBox.innerHTML = '<div class="log-entry story">Подключение к хосту <b>' + hostToken.toUpperCase() + '</b>...</div>';
    }
    if (actionButtons) actionButtons.innerHTML = '';
    renderGuestActionPanel();

    onlineCoop.peer = new Peer(undefined, createPeerOptions());

    onlineCoop.peer.on('open', function () {
        connectGuestToHost();
    });

    onlineCoop.peer.on('error', function (err) {
        var errType = (err && err.type) ? err.type : 'network-error';
        if (errType === 'peer-unavailable') {
            log('⚠️ Ошибка подключения: токен не найден или хост ещё не онлайн (peer-unavailable).', 'system');
            queueGuestReconnect();
        } else {
            log('⚠️ Ошибка подключения: ' + errType, 'system');
            queueGuestReconnect();
        }
        renderGuestActionPanel();
    });
}

function promptOnlineJoin() {
    var raw = window.prompt('Введите токен друга (например DQ-2ZPPWRVH) или вставьте ссылку приглашения:', '');
    if (!raw) return;
    var token = raw;
    try {
        if (raw.indexOf('http://') === 0 || raw.indexOf('https://') === 0) {
            var u = new URL(raw);
            var maybeJoin = u.searchParams.get('join');
            if (maybeJoin) token = maybeJoin;
            ['peerHost', 'peerPort', 'peerPath', 'peerSecure'].forEach(function (k) {
                var v = u.searchParams.get(k);
                if (v) {
                    var cur = new URL(window.location.href);
                    cur.searchParams.set(k, v);
                    window.history.replaceState({}, '', cur.toString());
                }
            });
        }
    } catch (e) { }
    startOnlineGuestLobby(extractOnlineToken(token));
}

function guardGuestReadOnly() {
    if (!isOnlineGuest()) return false;
    log('ℹ️ В онлайн-коопе этим действием управляет хост.', 'system');
    return true;
}

// ─────────────────────────────────────────────────────
// 3. CANVAS PARTICLE BACKGROUND
// ─────────────────────────────────────────────────────
function initCanvas() {
    var canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    if (!ctx) return;

    var particles = [];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    for (var i = 0; i < 65; i++) {
        particles.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            r: Math.random() * 1.4 + 0.3,
            vx: (Math.random() - 0.5) * 0.14,
            vy: -(Math.random() * 0.28 + 0.06),
            alpha: Math.random() * 0.45 + 0.08,
            color: Math.random() > 0.65 ? '#c9a84c' : '#667eea'
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(function (p) {
            p.x += p.vx;
            p.y += p.vy;
            if (p.y < -5) { p.y = canvas.height + 5; p.x = Math.random() * canvas.width; }
            if (p.x < -5) { p.x = canvas.width + 5; }
            if (p.x > canvas.width + 5) { p.x = -5; }
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.alpha;
            ctx.fill();
        });
        ctx.globalAlpha = 1;
        requestAnimationFrame(animate);
    }
    animate();
}

// ─────────────────────────────────────────────────────
// 4. UI / SYSTEM FUNCTIONS
// ─────────────────────────────────────────────────────
function log(text, type) {
    if (!logBox) return;
    var entry = document.createElement('div');
    entry.className = 'log-entry ' + (type || 'normal');
    entry.innerHTML = text;
    logBox.appendChild(entry);
    logBox.scrollTop = logBox.scrollHeight;
    if (!onlineCoop.applyingSnapshot) scheduleOnlineSync(30);
}

function switchTab(tabName) {
    if (!player.classKey && tabName !== 'adventure') return;
    document.querySelectorAll('.game-tab-content').forEach(function (el) { el.classList.remove('active-content'); });
    document.querySelectorAll('.tab-btn').forEach(function (el) { el.classList.remove('active-tab'); });
    var tc = document.getElementById('tab-content-' + tabName);
    var tb = document.getElementById('tab-btn-' + tabName);
    if (tc) tc.classList.add('active-content');
    if (tb) tb.classList.add('active-tab');
    if (tabName === 'inventory') renderInventoryTab();
}

function updateStats() {
    if (!player.classKey) return;
    
    // Recalculate base damage + equipment damage
    player.damage = player.baseDamage + (player.weaponItem ? player.weaponItem.value : 0);
    if (isCoop) {
        player2.damage = player2.baseDamage + (player2.weaponItem ? player2.weaponItem.value : 0);
    }

    // Stacked/Single HP Bars in top HUD
    var soloWrap = document.getElementById('solo-hp-bar-wrap');
    var coopWrap = document.getElementById('coop-hp-bar-wrap');

    if (isCoop) {
        if (soloWrap) soloWrap.style.display = 'none';
        if (coopWrap) coopWrap.style.display = 'flex';

        var pct1 = player.maxHp > 0 ? Math.max(0, Math.min(1, player.hp / player.maxHp)) : 0;
        var fill1 = document.getElementById('hp-bar-fill-p1');
        var text1 = document.getElementById('hp-bar-text-p1');
        var lbl1 = document.getElementById('hp-p1-label');
        if (fill1) {
            fill1.style.width = (pct1 * 100) + '%';
            var hpClass1 = pct1 > 0.6 ? 'hp-high' : pct1 > 0.3 ? 'hp-mid' : 'hp-low';
            fill1.className = 'bar-fill hp-fill ' + hpClass1;
        }
        if (text1) text1.textContent = player.hp + '/' + player.maxHp;
        if (lbl1) lbl1.textContent = 'P1: ' + player.classTitle;

        var pct2 = player2.maxHp > 0 ? Math.max(0, Math.min(1, player2.hp / player2.maxHp)) : 0;
        var fill2 = document.getElementById('hp-bar-fill-p2');
        var text2 = document.getElementById('hp-bar-text-p2');
        var lbl2 = document.getElementById('hp-p2-label');
        if (fill2) {
            fill2.style.width = (pct2 * 100) + '%';
            var hpClass2 = pct2 > 0.6 ? 'hp-high' : pct2 > 0.3 ? 'hp-mid' : 'hp-low';
            fill2.className = 'bar-fill hp-fill ' + hpClass2;
        }
        if (text2) text2.textContent = player2.hp + '/' + player2.maxHp;
        if (lbl2) lbl2.textContent = 'P2: ' + player2.classTitle;
    } else {
        if (soloWrap) soloWrap.style.display = 'block';
        if (coopWrap) coopWrap.style.display = 'none';

        var pct = player.maxHp > 0 ? Math.max(0, Math.min(1, player.hp / player.maxHp)) : 0;
        var hpFill = document.getElementById('hp-bar-fill');
        var hpText = document.getElementById('hp-bar-text');
        if (hpFill) {
            hpFill.style.width = (pct * 100) + '%';
            var hpClass = pct > 0.6 ? 'hp-high' : pct > 0.3 ? 'hp-mid' : 'hp-low';
            hpFill.className = 'bar-fill hp-fill ' + hpClass;
        }
        if (hpText) hpText.textContent = player.hp + '/' + player.maxHp;
    }

    // Apply dead state gray filters to theater cards
    var p1Theater = document.getElementById('player-theater');
    var p2Theater = document.getElementById('player2-theater');
    if (p1Theater) p1Theater.classList.toggle('dead-hero', player.hp <= 0 && isCoop);
    if (p2Theater) p2Theater.classList.toggle('dead-hero', player2.hp <= 0 && isCoop);

    // XP bar
    var xpPct = Math.min(1, player.exp / 100);
    var xpFill = document.getElementById('xp-bar-fill');
    var xpText = document.getElementById('xp-bar-text');
    if (xpFill) xpFill.style.width = (xpPct * 100) + '%';
    if (xpText) xpText.textContent = 'EXP ' + player.exp + '/100 · Ур.' + player.lvl;

    // Gold & room
    var goldVal = document.getElementById('gold-val');
    var roomVal = document.getElementById('room-val');
    if (goldVal) goldVal.textContent = player.gold;
    if (roomVal) roomVal.textContent = eventIndex + '/' + totalEvents;

    // Potion bar
    updatePotionBar();

    // Stats tab fields (based on active selection tab)
    var pToShow = (selectedHeroStatsTab === 0 || !isCoop) ? player : player2;
    var fields = {
        'st-class': pToShow.classTitle,
        'st-lvl': player.lvl,
        'st-hp': pToShow.hp + '/' + pToShow.maxHp,
        'st-exp': player.exp + '/100',
        'st-gold': player.gold,
        'st-kills': player.kills,
        'st-atk': pToShow.damage,
        'st-spd': pToShow.speed,
        'st-bonus': pToShow.bonus,
        'st-vamp': pToShow.vamp,
        'st-potions': player.potions + '/3',
        'doll-weapon': pToShow.weaponItem ? pToShow.weaponItem.name : 'Кулаки',
        'doll-armor': pToShow.armorItem ? pToShow.armorItem.name : 'Ткань',
        'inv-potion-slot': player.potions + '/3'
    };
    Object.keys(fields).forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.textContent = fields[id];
    });

    // Bag badge
    var badge = document.getElementById('bag-count-badge');
    if (badge) badge.textContent = bag.length;

    // Unlock tabs
    var btnStats = document.getElementById('tab-btn-stats');
    var btnInv = document.getElementById('tab-btn-inventory');
    if (btnStats) btnStats.disabled = false;
    if (btnInv) btnInv.disabled = false;

    saveGame();
    if (!onlineCoop.applyingSnapshot) scheduleOnlineSync(60);
    if (isOnlineGuest()) renderGuestActionPanel();
}

function updatePotionBar() {
    var bar = document.getElementById('potion-quickbar');
    if (!bar || !player.classKey) return;
    if (isOnlineGuest()) {
        bar.style.display = 'none';
        bar.innerHTML = '';
        return;
    }
    bar.style.display = (player.potions > 0) ? 'flex' : 'none';
    bar.innerHTML = '';

    if (isCoop) {
        var btn1 = document.createElement('button');
        btn1.className = 'potion-btn';
        btn1.style.marginRight = '6px';
        btn1.disabled = (player.potions <= 0 || player.hp >= player.maxHp || player.hp <= 0);
        btn1.innerHTML = '🧪 ' + player.classTitle + ' · ' + player.potions + '/3';
        btn1.onclick = function() { usePotionForHero(0); };

        var btn2 = document.createElement('button');
        btn2.className = 'potion-btn';
        btn2.disabled = (player.potions <= 0 || player2.hp >= player2.maxHp || player2.hp <= 0);
        btn2.innerHTML = '🧪 ' + player2.classTitle + ' · ' + player.potions + '/3';
        btn2.onclick = function() { usePotionForHero(1); };

        bar.appendChild(btn1);
        bar.appendChild(btn2);
    } else {
        var btn = document.createElement('button');
        btn.className = 'potion-btn';
        btn.id = 'potion-use-btn';
        btn.disabled = (player.potions <= 0 || player.hp >= player.maxHp);
        btn.innerHTML = '🧪 Выпить зелье · <span id="potion-count-display">' + player.potions + '</span>/3';
        btn.onclick = function() { usePotion(); };
        bar.appendChild(btn);
    }
}

function updateEnemyHpBar() {
    var fill = document.getElementById('enemy-hp-fill');
    var lbl = document.getElementById('enemy-name-label');
    if (fill) {
        var pct = enemy.maxHp > 0 ? Math.max(0, Math.min(1, enemy.hp / enemy.maxHp)) : 1;
        fill.style.width = (pct * 100) + '%';
    }
    if (lbl) {
        if (enemy.maxHp > 0) lbl.textContent = enemy.name + ' (' + Math.max(0, enemy.hp) + '/' + enemy.maxHp + ')';
        else lbl.textContent = enemy.name || 'Враг';
    }
}

function renderMinimap() {
    var strip = document.getElementById('minimap-strip');
    if (!strip) return;
    strip.innerHTML = '';
    minimapData.forEach(function (node, i) {
        if (i > 0) {
            var conn = document.createElement('div');
            conn.className = 'mm-connector';
            strip.appendChild(conn);
        }
        var el = document.createElement('div');
        var isCurrent = (i === minimapData.length - 1);
        el.className = 'mm-node mm-' + node.type + (isCurrent ? ' mm-current' : '');
        el.title = node.label || node.type;
        el.textContent = node.icon || '?';
        strip.appendChild(el);
    });
    // Scroll minimap to right edge
    var wrap = strip.parentElement;
    if (wrap) wrap.scrollLeft = wrap.scrollWidth;
}

function renderStatusEffects() {
    var playerRow = document.getElementById('player-status-row');
    var player2Row = document.getElementById('player2-status-row');
    var enemyRow = document.getElementById('enemy-status-row');

    if (playerRow) {
        playerRow.innerHTML = '';
        if (player.shieldBlock) {
            playerRow.innerHTML += '<span class="status-badge status-shield">🛡️ Блок</span>';
        }
        if (player.poisonTurns > 0) {
            playerRow.innerHTML += '<span class="status-badge status-poison">☠️ Яд×' + player.poisonTurns + '</span>';
        }
        if (player.hp <= 0 && isCoop) {
            playerRow.innerHTML += '<span class="status-badge status-dead" style="border-color:#e53e3e; color:#fc8181;">💀 Мертв</span>';
        }
    }

    if (player2Row) {
        player2Row.innerHTML = '';
        if (isCoop) {
            if (player2.shieldBlock) {
                player2Row.innerHTML += '<span class="status-badge status-shield">🛡️ Блок</span>';
            }
            if (player2.poisonTurns > 0) {
                player2Row.innerHTML += '<span class="status-badge status-poison">☠️ Яд×' + player2.poisonTurns + '</span>';
            }
            if (player2.hp <= 0) {
                player2Row.innerHTML += '<span class="status-badge status-dead" style="border-color:#e53e3e; color:#fc8181;">💀 Мертв</span>';
            }
        }
    }

    if (enemyRow) {
        enemyRow.innerHTML = '';
        if (enemy.poisonTurns > 0) {
            enemyRow.innerHTML += '<span class="status-badge status-poison">☠️ Яд×' + enemy.poisonTurns + '</span>';
        }
    }
}

function adjustTheaterLayout(mode) {
    var pTheater = document.getElementById('player-theater');
    var p2Theater = document.getElementById('player2-theater');
    var enemyTheater = document.getElementById('enemy-theater');
    var vsBadge = document.getElementById('vs-badge');
    var container = document.getElementById('theater-container');

    if (!container) return;

    if (mode === 'single') {
        if (pTheater) pTheater.style.visibility = 'hidden';
        if (p2Theater) p2Theater.style.display = 'none';
        if (enemyTheater) enemyTheater.style.display = 'none';
        if (vsBadge) vsBadge.style.display = 'none';
        container.classList.remove('coop-active');
    } else {
        if (pTheater) pTheater.style.visibility = 'visible';
        if (enemyTheater) enemyTheater.style.display = 'flex';
        if (vsBadge) vsBadge.style.display = 'flex';

        if (isCoop) {
            if (p2Theater) p2Theater.style.display = 'flex';
            container.classList.add('coop-active');
        } else {
            if (p2Theater) p2Theater.style.display = 'none';
            container.classList.remove('coop-active');
        }
    }
}

// Floating damage number
function spawnFloatNumber(targetEl, amount, type) {
    if (!settings.vfx || !targetEl) return;
    var rect = targetEl.getBoundingClientRect();
    var el = document.createElement('div');
    el.className = 'float-dmg ' + (type || 'dmg-hit');
    var prefix = (type === 'dmg-heal') ? '+' : '-';
    el.textContent = prefix + Math.abs(amount);
    el.style.left = (rect.left + rect.width / 2 - 20) + 'px';
    el.style.top = (rect.top + 10) + 'px';
    document.body.appendChild(el);
    setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 1350);
}

// ─────────────────────────────────────────────────────
// 5. SETTINGS / SAVE / LOAD
// ─────────────────────────────────────────────────────
function openSettings() {
    var modal = document.getElementById('settings-modal');
    if (modal) modal.classList.remove('hidden');
}

function closeSettings() {
    var modal = document.getElementById('settings-modal');
    if (modal) modal.classList.add('hidden');
}

function toggleSetting(key) {
    settings[key] = !settings[key];
    var btn = document.getElementById('toggle-' + key);
    if (btn) {
        btn.textContent = settings[key] ? 'ВКЛ' : 'ВЫКЛ';
        btn.classList.toggle('off', !settings[key]);
    }
}

function saveGame() {
    if (!player.classKey || onlineCoop.enabled) return;
    try {
        localStorage.setItem('dqSave', JSON.stringify({
            player: player, bag: bag,
            eventIndex: eventIndex, minimapData: minimapData,
            mapHistory: mapHistory, worldMemory: worldMemory,
            gameStats: gameStats, settings: settings
        }));
    } catch (e) { /* quota exceeded or private mode */ }
}

function loadGame() {
    try {
        var raw = localStorage.getItem('dqSave');
        if (!raw) return false;
        var data = JSON.parse(raw);
        if (!data || !data.player || !data.player.classKey) return false;
        player = data.player;
        bag = data.bag || [];
        eventIndex = data.eventIndex || 0;
        minimapData = data.minimapData || [{ type: 'start', icon: '🏁', label: 'Начало' }];
        mapHistory = data.mapHistory || [];
        worldMemory = data.worldMemory || { playerIsRuthless: false, foundAncientLore: false };
        gameStats = data.gameStats || { enemiesSlain: 0, goldEarned: 0, roomsCleared: 0 };
        settings = data.settings || { vfx: true, anim: true };
        return true;
    } catch (e) { return false; }
}

function clearSave() {
    try { localStorage.removeItem('dqSave'); } catch (e) { }
    log('💾 Сохранение удалено.', 'system');
    closeSettings();
}

// ─────────────────────────────────────────────────────
// 6. VFX
// ─────────────────────────────────────────────────────
function triggerVFX(attackerId, defenderId, isHeavy) {
    if (!settings.vfx) return;
    var attacker = document.getElementById(attackerId);
    var defender = document.getElementById(defenderId);
    var flash = document.getElementById(defenderId + '-vfx');
    var isPlayer = (attackerId === 'player-theater');
    if (!attacker) return;

    var classToAdd = isPlayer
        ? (isHeavy ? 'attack-heavy-right' : 'attack-fast-right')
        : (isHeavy ? 'attack-heavy-left' : 'attack-fast-left');
    attacker.classList.add(classToAdd);

    setTimeout(function () {
        attacker.classList.remove(classToAdd);
        if (isHeavy) {
            var strikeClass = isPlayer ? 'attack-heavy-right-strike' : 'attack-heavy-left-strike';
            attacker.classList.add(strikeClass);
            setTimeout(function () { attacker.classList.remove(strikeClass); }, 150);
        }
        if (flash) flash.classList.add('vfx-active');
        if (defender) defender.classList.add('shaking');
        if (!isPlayer) triggerScreenFlash();
    }, isHeavy ? 200 : 150);

    setTimeout(function () {
        if (flash) flash.classList.remove('vfx-active');
        if (defender) defender.classList.remove('shaking');
    }, 600);
}

function triggerScreenFlash() {
    document.body.classList.add('screen-flash');
    setTimeout(function () { document.body.classList.remove('screen-flash'); }, 120);
}

// ─────────────────────────────────────────────────────
// 7. BUTTON FACTORY
// ─────────────────────────────────────────────────────
function createActionBtn(text, fn, cssClass) {
    var btn = document.createElement('button');
    btn.className = cssClass || 'action-btn';
    btn.innerHTML = text;
    btn.onclick = fn;
    actionButtons.appendChild(btn);
    return btn;
}

// ─────────────────────────────────────────────────────
// 8. CLASS SELECTION
// ─────────────────────────────────────────────────────
function initClassSelect() {
    if (!actionButtons) return;
    adjustTheaterLayout('single');
    if (isOnlineHost() || isOnlineGuest()) {
        if (isCoop && coopSelectionStep === 2) setOnlineUiState('class_select_p2');
        else setOnlineUiState('class_select_p1');
    }

    var pTheater = document.getElementById('player-theater');
    var p2Theater = document.getElementById('player2-theater');
    if (pTheater) pTheater.style.visibility = 'hidden';
    if (p2Theater) p2Theater.style.display = 'none';

    if (logBox) {
        var msg = "Тьма сгущается. Выберите защитника, чтобы бросить вызов подземелью...";
        if (isCoop) {
            if (coopSelectionStep === 1) msg = "👥 <b>Шаг 1 из 2:</b> Выберите <b>Первого Героя</b> для вашего отряда...";
            else if (coopSelectionStep === 2) msg = "👥 <b>Шаг 2 из 2:</b> Выберите <b>Второго Героя</b> для вашего отряда...";
        }
        logBox.innerHTML = '<div class="log-entry story">' + msg + '</div>';
        if (isOnlineHost() && onlineCoop.token) {
            logBox.innerHTML += '<div class="log-entry system">🧷 Токен сессии: <b>' + onlineCoop.token.toUpperCase() + '</b></div>';
        }
    }

    if (isOnlineHost() && onlineCoop.connected && isCoop && coopSelectionStep === 2) {
        actionButtons.innerHTML = '';
        var waitBtn = createActionBtn('⏳ Друг выбирает второго героя...', function () { }, 'action-btn btn-muted');
        waitBtn.disabled = true;
        scheduleOnlineSync(20);
        return;
    }

    actionButtons.innerHTML = '';
    var grid = document.createElement('div');
    grid.className = 'btn-grid-2';

    var classes = [
        { key: 'TANK', icon: '🛡️', name: 'Танк', sub: 'Защитник' },
        { key: 'BERSERK', icon: '🪓', name: 'Берсерк', sub: 'Разрушитель' },
        { key: 'ALCHEMIST', icon: '🧪', name: 'Алхимик', sub: 'Чародей' },
        { key: 'SCOUT', icon: '🏹', name: 'Следопыт', sub: 'Охотник' }
    ];

    classes.forEach(function (c) {
        var btn = document.createElement('button');
        btn.className = 'class-card class-card-' + c.key.toLowerCase();
        btn.id = 'class-btn-' + c.key.toLowerCase();
        btn.innerHTML =
            '<div class="class-icon">' + c.icon + '</div>' +
            '<div class="class-name">' + c.name + '</div>' +
            '<div class="class-sub">' + c.sub + '</div>';
        btn.onclick = (function (key) { return function () { previewClass(key); }; })(c.key);
        grid.appendChild(btn);
    });

    actionButtons.appendChild(grid);
    scheduleOnlineSync(20);
}

function previewClass(className) {
    if (!logBox || !actionButtons) return;
    logBox.innerHTML = '';
    log(ClassDescriptions[className], 'normal');

    var classNames = { TANK: 'Танк', BERSERK: 'Берсерк', ALCHEMIST: 'Алхимик', SCOUT: 'Следопыт' };
    var previewSpriteId = (isCoop && coopSelectionStep === 2) ? 'player2-sprite' : 'player-sprite';
    var previewLabelId = (isCoop && coopSelectionStep === 2) ? 'player2-name-label' : 'player-name-label';
    var previewTheaterId = (isCoop && coopSelectionStep === 2) ? 'player2-theater' : 'player-theater';

    var pSprite = document.getElementById(previewSpriteId);
    var pName = document.getElementById(previewLabelId);
    var pTheater = document.getElementById(previewTheaterId);

    if (pSprite) pSprite.innerHTML = Sprites[className];
    if (pName) pName.textContent = classNames[className];
    if (pTheater) {
        if (isCoop && coopSelectionStep === 2) {
            pTheater.style.display = 'flex';
            pTheater.style.visibility = 'visible';
        } else {
            pTheater.style.visibility = 'visible';
        }
    }

    actionButtons.innerHTML = '';
    createActionBtn('✅ Выбрать этот класс', function () { selectClass(className); }, 'action-btn btn-success');
    createActionBtn('↩️ Назад к выбору класса', initClassSelect, 'action-btn btn-muted');
}

function selectClass(className) {
    if (isOnlineHost() && onlineCoop.connected && isCoop && coopSelectionStep === 2 && !onlineCoop.processingRemoteCommand) {
        log('⏳ Выбор второго героя сейчас за другом.', 'system');
        return;
    }

    var stats = {
        TANK: { title: 'Танк', hp: 140, baseDamage: 14, speed: 3, bonus: 0 },
        BERSERK: { title: 'Берсерк', hp: 90, baseDamage: 24, speed: 6, bonus: 0 },
        ALCHEMIST: { title: 'Алхимик', hp: 100, baseDamage: 18, speed: 7, bonus: 2 },
        SCOUT: { title: 'Следопыт', hp: 80, baseDamage: 15, speed: 11, bonus: 3 }
    };
    var s = stats[className];

    if (isCoop && coopSelectionStep === 2) {
        player2.classKey = className;
        player2.classTitle = s.title;
        player2.hp = s.hp;
        player2.maxHp = s.hp;
        player2.baseDamage = s.baseDamage;
        player2.speed = s.speed;
        player2.bonus = s.bonus;
        player2.learnedPerks = [];
        player2.abilityReady = true;
        player2.shieldBlock = false;
        player2.poisonTurns = 0;

        coopSelectionStep = 0;

        var statsSel = document.getElementById('stats-hero-selector-wrap');
        var invSel = document.getElementById('inventory-hero-selector-wrap');
        if (statsSel) statsSel.style.display = 'flex';
        if (invSel) invSel.style.display = 'flex';
        toggleStatsHero(0);
        toggleInventoryHero(0);

        minimapData = [{ type: 'start', icon: '🏁', label: 'Начало' }];
        logBox.innerHTML = '';
        adjustTheaterLayout('battle');

        var p2Sprite = document.getElementById('player2-sprite');
        var p2Name = document.getElementById('player2-name-label');
        if (p2Sprite) p2Sprite.innerHTML = Sprites[className];
        if (p2Name) p2Name.textContent = player2.classTitle;

        if (isOnlineHost()) {
            onlineCoop.turn = 'p1';
            setOnlineUiState('next_step');
        }
        log('Ваш отряд готов! <b>' + player.classTitle + '</b> и <b>' + player2.classTitle + '</b> спускаются во тьму.', 'story');
        updateStats();
        renderMinimap();
        offerNextStep();
    } else if (isCoop && coopSelectionStep === 1) {
        player.classKey = className;
        player.classTitle = s.title;
        player.hp = s.hp;
        player.maxHp = s.hp;
        player.baseDamage = s.baseDamage;
        player.speed = s.speed;
        player.bonus = s.bonus;
        player.potions = 1;
        player.gold = 0;
        player.kills = 0;
        player.learnedPerks = [];
        player.abilityReady = true;
        player.shieldBlock = false;
        player.poisonTurns = 0;

        coopSelectionStep = 2;
        initClassSelect();
    } else {
        isCoop = false;
        player.classKey = className;
        player.classTitle = s.title;
        player.hp = s.hp;
        player.maxHp = s.hp;
        player.baseDamage = s.baseDamage;
        player.speed = s.speed;
        player.bonus = s.bonus;
        player.potions = 1;
        player.gold = 0;
        player.kills = 0;
        player.learnedPerks = [];
        player.abilityReady = true;
        player.shieldBlock = false;
        player.poisonTurns = 0;

        var statsSel = document.getElementById('stats-hero-selector-wrap');
        var invSel = document.getElementById('inventory-hero-selector-wrap');
        if (statsSel) statsSel.style.display = 'none';
        if (invSel) invSel.style.display = 'none';

        minimapData = [{ type: 'start', icon: '🏁', label: 'Начало' }];
        logBox.innerHTML = '';
        adjustTheaterLayout('battle');

        var pSprite = document.getElementById('player-sprite');
        var pName = document.getElementById('player-name-label');
        var pTheater = document.getElementById('player-theater');
        if (pSprite) pSprite.innerHTML = Sprites[className];
        if (pName) pName.textContent = player.classTitle;
        if (pTheater) pTheater.style.visibility = 'visible';

        log('Вы начали поход как элитный <b>' + player.classTitle + '</b>! С собой — 1 зелье.', 'story');
        updateStats();
        renderMinimap();
        offerNextStep();
    }
}

// ─────────────────────────────────────────────────────
// 9. ROOM FLOW
// ─────────────────────────────────────────────────────
function offerNextStep() {
    inCombat = false;
    combatLocked = false;

    var eSprite = document.getElementById('enemy-sprite');
    var eLabel = document.getElementById('enemy-name-label');
    var eTheater = document.getElementById('enemy-theater');

    if (eTheater) eTheater.style.visibility = 'visible';
    if (eSprite) eSprite.innerHTML = Sprites.UNKNOWN;
    if (eLabel) eLabel.textContent = 'Следующая комната...';

    var playerStatusRow = document.getElementById('player-status-row');
    var enemyStatusRow = document.getElementById('enemy-status-row');
    if (playerStatusRow) playerStatusRow.innerHTML = '';
    if (enemyStatusRow) enemyStatusRow.innerHTML = '';

    updateStats();

    if (eventIndex >= totalEvents) {
        initBossFight();
        return;
    }

    setOnlineUiState('next_step');
    actionButtons.innerHTML = '';
    if (isOnlineHost() && onlineCoop.connected && !canHostActInOnlineTurn()) {
        var waitBtn = createActionBtn('⏳ Сейчас ход друга: исследование зоны', function () { }, 'action-btn btn-muted');
        waitBtn.disabled = true;
        return;
    }
    createActionBtn('🚪 Исследовать следующую зону', triggerRandomEvent, 'action-btn btn-primary');
}

function triggerRandomEvent() {
    if (guardGuestReadOnly()) return;
    if (guardHostTurnOnly('Исследовать следующую зону')) return;
    switchTab('adventure');
    eventIndex++;
    gameStats.roomsCleared++;

    var nextRoom = RoomNames[Math.floor(Math.random() * RoomNames.length)] + ' (' + eventIndex + ')';
    mapHistory.push(nextRoom);
    logBox.innerHTML = '';

    // Shop room: 20% chance after room 2
    if (eventIndex > 2 && Math.random() < 0.20) {
        minimapData.push({ type: 'shop', icon: '🏪', label: 'Лавка торговца' });
        renderMinimap();
        initShopRoom();
        return;
    }

    // Map trail
    var mapStr = mapHistory.map(function (m, i) {
        return i === mapHistory.length - 1 ? '[ *' + m + ' ]' : '[' + m + ']';
    }).join(' ➔ ');
    log('<div style="color:#c9a84c;font-family:monospace;font-size:0.68rem;text-align:center;">🗺️ ' + mapStr + '</div>', 'system');

    // Description
    var desc = '<p><strong>Окружение:</strong> ' +
        SensoryData.visual[Math.floor(Math.random() * 3)] + ' ' +
        SensoryData.audio[Math.floor(Math.random() * 3)] + ' Чувствуется ' +
        SensoryData.smell[Math.floor(Math.random() * 3)] + ' Под ногами ' +
        SensoryData.touch[Math.floor(Math.random() * 3)] + ' <em>Настроение:</em> ' +
        SensoryData.atmosphere[Math.floor(Math.random() * 3)] + '</p>';

    if (Math.random() < 0.4) {
        desc += '<p style="color:#5a6a88;font-style:italic;">🔍 ' + RedHerrings[Math.floor(Math.random() * 3)] + '</p>';
    }

    var secretRoll = Math.floor(Math.random() * 20) + 1 + player.speed;
    desc += secretRoll < 12
        ? '<p style="color:#48bb78;">🟢 Место кажется абсолютно чистым от угроз.</p>'
        : '<p style="color:#f6e05e;">⚠️ Краем глаза вы заметили подозрительные щели на стыках плит!</p>';

    log(desc, 'story');
    log('<strong>Перед вами три тёмных ответвления:</strong><br>• Левый — разит сыростью.<br>• Центральный — эхо капель.<br>• Правый — вибрирует, пахнет озоном.', 'normal');

    var pathLogics = ['normal', 'shortcut', 'trap', 'loop'];
    var chosenLogic = pathLogics[Math.floor(Math.random() * pathLogics.length)];
    onlineCoop.pendingPathLogic = chosenLogic;
    onlineCoop.pendingPathChoices = isOnlineHost() && onlineCoop.connected ? { p1: null, p2: null } : null;
    onlineCoop.pathDiscussion = null;

    // Tech options for living classes
    var hasP1Ability = player.hp > 0;
    var hasP2Ability = isCoop && player2.hp > 0;
    setOnlineUiState('path_choice', { canClassP1: hasP1Ability, canClassP2: hasP2Ability });

    actionButtons.innerHTML = '';

    createActionBtn('🕵️ Осторожно разведать (Скрытность)', function () {
        if (isOnlineHost() && onlineCoop.connected) { onlineCoop.pendingPathChoices.p1 = 'cautious'; resolvePathChoiceIfReady(); return; }
        handlePathOutcome('cautious', chosenLogic);
    }, 'action-btn btn-muted');
    createActionBtn('🪓 Прорубаться напролом (Агрессия)', function () {
        if (isOnlineHost() && onlineCoop.connected) { onlineCoop.pendingPathChoices.p1 = 'aggressive'; resolvePathChoiceIfReady(); return; }
        worldMemory.playerIsRuthless = true; handlePathOutcome('aggressive', chosenLogic);
    }, 'action-btn btn-danger');

    var socialTxt = worldMemory.playerIsRuthless ? '🗣️ Закричать во тьму (Вас боятся)' : '🗣️ Воззвать к скрытым силам (Диалог)';
    createActionBtn(socialTxt, function () {
        if (isOnlineHost() && onlineCoop.connected) { onlineCoop.pendingPathChoices.p1 = 'social'; resolvePathChoiceIfReady(); return; }
        if (!worldMemory.playerIsRuthless) worldMemory.foundAncientLore = true; handlePathOutcome('social', chosenLogic);
    }, 'action-btn btn-purple');
    if (hasP1Ability) {
        createActionBtn('🔮 Использовать технику (' + player.classTitle + ')', function () {
            if (isOnlineHost() && onlineCoop.connected) { onlineCoop.pendingPathChoices.p1 = 'class_p1'; resolvePathChoiceIfReady(); return; }
            handlePathOutcome('class', chosenLogic, player);
        }, 'action-btn btn-primary');
    }
    if (hasP2Ability && !(isOnlineHost() && onlineCoop.connected)) {
        createActionBtn('🔮 Использовать технику (' + player2.classTitle + ')', function () { handlePathOutcome('class', chosenLogic, player2); }, 'action-btn btn-purple');
    }
    createActionBtn('🎲 Зажмуриться и прыгнуть (Безумие)', function () {
        if (isOnlineHost() && onlineCoop.connected) { onlineCoop.pendingPathChoices.p1 = 'crazy'; resolvePathChoiceIfReady(); return; }
        handlePathOutcome('crazy', chosenLogic);
    }, 'action-btn btn-danger');
}

function resolvePathChoiceIfReady() {
    if (!(isOnlineHost() && onlineCoop.connected) || !onlineCoop.pendingPathChoices) return;
    var picks = onlineCoop.pendingPathChoices;
    if (!picks.p1 || !picks.p2) {
        log('🧭 Выбор пути зафиксирован. Ожидание второго игрока...', 'system');
        scheduleOnlineSync(20);
        return;
    }
    if (picks.p1 === picks.p2) {
        applyResolvedPathAction(picks.p1);
        return;
    }
    onlineCoop.pathDiscussion = { p1: null, p2: null, picks: { p1: picks.p1, p2: picks.p2 } };
    setOnlineUiState('path_discussion');
    log('💬 Мнения разошлись: P1=' + picks.p1 + ', P2=' + picks.p2 + '. Обсудите и нажмите "Согласен/Не согласен".', 'system');
    renderPathDiscussionHostPanel();
}

function renderPathDiscussionHostPanel() {
    if (!actionButtons) return;
    actionButtons.innerHTML = '';
    createActionBtn('💬 Написать в чат', function () {
        var txt = prompt('Сообщение напарнику:');
        if (!txt || !txt.trim()) return;
        log('💬 <b>P1:</b> ' + txt.trim().replace(/</g, '&lt;'), 'system');
    }, 'action-btn btn-muted');
    createActionBtn('🤝 Согласен', function () {
        if (!onlineCoop.pathDiscussion) return;
        onlineCoop.pathDiscussion.p1 = 'agree';
        resolvePathDiscussion();
    }, 'action-btn btn-success');
    createActionBtn('❌ Не согласен', function () {
        if (!onlineCoop.pathDiscussion) return;
        onlineCoop.pathDiscussion.p1 = 'disagree';
        resolvePathDiscussion();
    }, 'action-btn btn-danger');
}

function resolvePathDiscussion() {
    if (!onlineCoop.pathDiscussion) return;
    var d = onlineCoop.pathDiscussion;
    if (!d.p1 || !d.p2) return scheduleOnlineSync(20);
    if (d.p1 === 'agree' && d.p2 === 'agree') {
        applyResolvedPathAction(onlineCoop.pendingPathChoices.p1);
        return;
    }
    runPathDiceDuel();
}

function runPathDiceDuel() {
    var p1Roll = Math.floor(Math.random() * 20) + 1;
    var p2Roll = Math.floor(Math.random() * 20) + 1;
    var winner = p1Roll >= p2Roll ? 'p1' : 'p2';
    var pick = onlineCoop.pendingPathChoices[winner];
    log('🎲 Кубики крутятся... <span style="display:inline-block;animation:spin 0.4s linear 6;">🎲</span> P1=' + p1Roll + ', P2=' + p2Roll + '.', 'level-up');
    log('🏆 Победил ' + (winner === 'p1' ? 'P1' : 'P2') + '. Применяем его выбор: <b>' + pick + '</b>.', 'level-up');
    applyResolvedPathAction(pick);
}

function applyResolvedPathAction(action) {
    var logic = onlineCoop.pendingPathLogic || 'normal';
    var shouldBypassHostTurnGuard = isOnlineHost() && onlineCoop.connected && onlineCoop.turn === 'p2';
    var prevProcessingRemoteCommand = onlineCoop.processingRemoteCommand;
    onlineCoop.pathDiscussion = null;
    if (action === 'aggressive') worldMemory.playerIsRuthless = true;
    if (action === 'social' && !worldMemory.playerIsRuthless) worldMemory.foundAncientLore = true;
    if (shouldBypassHostTurnGuard) onlineCoop.processingRemoteCommand = true;
    try {
        if (action === 'class_p2') return handlePathOutcome('class', logic, player2);
        if (action === 'class_p1') return handlePathOutcome('class', logic, player);
        handlePathOutcome(action, logic);
    } finally {
        onlineCoop.processingRemoteCommand = prevProcessingRemoteCommand;
    }
}

function handlePathOutcome(action, logic, hero) {
    if (guardGuestReadOnly()) return;
    if (guardHostTurnOnly('Выбор пути')) return;
    if (!logic && onlineCoop.pendingPathLogic) logic = onlineCoop.pendingPathLogic;
    onlineCoop.pendingPathLogic = null;
    if (isOnlineHost() && onlineCoop.connected) advanceOnlineTurn();
    var actingHero = hero || player;
    if (logic === 'trap') {
        log('🛑 <b>ПРОВАЛ!</b> Вы спровоцировали скрытую засаду!', 'combat');
        eventIndex = Math.max(1, eventIndex - 1);
        minimapData.push({ type: 'trap', icon: '🔥', label: 'Ловушка' });
        renderMinimap();
        initTrap();
    } else if (logic === 'shortcut') {
        log('⚡ <b>ФОРСИРОВАНИЕ!</b> Опасный трюк, исполненный <b>' + actingHero.classTitle + '</b>, срезал целый ярус подземелья!', 'level-up');
        eventIndex++;
        minimapData.push({ type: 'explore', icon: '🗺️', label: 'Обход' });
        renderMinimap();
        offerNextStep();
    } else if (logic === 'loop') {
        log('🔄 <b>НАХОДКА!</b> Вы нашли брошенный ковчег!', 'loot');
        minimapData.push({ type: 'loot', icon: '💰', label: 'Сундук' });
        renderMinimap();
        initLoot();
    } else {
        log('🗺️ Вы успешно перешли в следующую сюжетную зону.', 'story');
        if (Math.random() > 0.35) {
            minimapData.push({ type: 'combat', icon: '⚔️', label: 'Бой' });
            renderMinimap();
            initCombat();
        } else {
            minimapData.push({ type: 'explore', icon: '🗺️', label: 'Исследование' });
            renderMinimap();
            offerNextStep();
        }
    }
}

// ─────────────────────────────────────────────────────
// 10. SHOP ROOM
// ─────────────────────────────────────────────────────
function initShopRoom() {
    var eSprite = document.getElementById('enemy-sprite');
    var eLabel = document.getElementById('enemy-name-label');
    var eTheater = document.getElementById('enemy-theater');

    if (eSprite) eSprite.innerHTML = Sprites.SHOP;
    if (eLabel) eLabel.textContent = 'Торговец Теней';
    if (eTheater) { eTheater.style.display = 'flex'; eTheater.style.visibility = 'visible'; }

    log('🏪 <b>Лавка Торговца</b> возникла в тёмной нише стены!', 'shop');
    if (isCoop) {
        log('💡 <i>Характеристики улучшаются для героя, выбранного на вкладке "Герой".</i>', 'system');
    }
    log('💰 Ваше золото: <b>' + player.gold + '</b>', 'shop');
    renderShop();
}

function renderShop() {
    actionButtons.innerHTML = '';
    setOnlineUiState('shop');

    if (isOnlineHost() && onlineCoop.connected && !canHostActInOnlineTurn()) {
        var waitBtn = createActionBtn('⏳ Сейчас покупает друг (' + onlineTurnLabel() + ')', function () { }, 'action-btn btn-muted');
        waitBtn.disabled = true;
        return;
    }

    ShopCatalog.forEach(function (item, idx) {
        var canAfford = player.gold >= item.cost;
        var btn = document.createElement('button');
        btn.className = 'action-btn btn-gold' + (canAfford ? '' : ' disabled-look');
        btn.disabled = !canAfford;
        btn.id = 'shop-item-' + idx;
        btn.style.display = 'flex';
        btn.style.justifyContent = 'space-between';
        btn.style.alignItems = 'center';
        btn.innerHTML =
            '<span>' + item.name + '<br><small style="color:var(--text-secondary);font-size:0.7rem;">' + item.desc + '</small></span>' +
            '<span style="color:var(--gold);font-weight:700;flex-shrink:0;margin-left:10px;">💰 ' + item.cost + '</span>';
        btn.onclick = (function (i) { return function () { buyShopItem(i); }; })(item);
        actionButtons.appendChild(btn);
    });

    createActionBtn('↩️ Покинуть лавку', handleShopExit, 'action-btn btn-muted');
}

function handleShopExit() {
    if (guardGuestReadOnly()) return;
    if (guardHostTurnOnly('Покинуть лавку')) return;
    if (isOnlineHost() && onlineCoop.connected) advanceOnlineTurn();
    offerNextStep();
}

function buyShopItem(item) {
    if (guardGuestReadOnly()) return;
    if (guardHostTurnOnly('Покупка в лавке')) return;
    if (player.gold < item.cost) return;
    player.gold -= item.cost;

    if (item.type === 'potion') {
        var healAmt = item.heal;
        var hasAlchemist = player.classKey === 'ALCHEMIST' || (isCoop && player2.classKey === 'ALCHEMIST');
        var actualHeal = hasAlchemist ? Math.floor(healAmt * 1.5) : healAmt;
        
        if (player.potions < 3) {
            player.potions++;
            log('🧪 Куплено: <b>' + item.name + '</b> (+' + actualHeal + ' ХП при применении).', 'shop');
        } else {
            var target = player;
            var targetId = 'player-theater';
            if (isCoop) {
                if ((player.hp / player.maxHp > player2.hp / player2.maxHp && player2.hp > 0) || player.hp <= 0) {
                    target = player2;
                    targetId = 'player2-theater';
                }
            }
            target.hp = Math.min(target.maxHp, target.hp + actualHeal);
            log('🧪 Сумка полна — зелье выпито героем <b>' + target.classTitle + '</b> немедленно! +' + actualHeal + ' ХП.', 'shop');
            spawnFloatNumber(document.getElementById(targetId), actualHeal, 'dmg-heal');
        }
    } else if (item.type === 'stat') {
        var activeHero = (selectedHeroStatsTab === 0 || !isCoop) ? player : player2;
        if (item.stat === 'maxHp') {
            activeHero.maxHp += item.val;
            activeHero.hp += item.val;
        } else {
            activeHero[item.stat] += item.val;
        }
        log('✨ Куплено для <b>' + activeHero.classTitle + '</b>: <b>' + item.name + '</b> — ' + item.desc + '.', 'shop');
    }

    updateStats();
    if (isOnlineHost() && onlineCoop.connected) advanceOnlineTurn();
    renderShop();
}

// ─────────────────────────────────────────────────────
// 11. COMBAT SYSTEM
// ─────────────────────────────────────────────────────
function initCombat() {
    inCombat = true;
    combatLocked = false;
    setOnlineUiState('combat');

    // Lock tabs during combat
    var btnStats = document.getElementById('tab-btn-stats');
    var btnInv = document.getElementById('tab-btn-inventory');
    if (btnStats) btnStats.disabled = true;
    if (btnInv) btnInv.disabled = true;

    // Pick monster
    var m = MonsterPool[Math.floor(Math.random() * MonsterPool.length)];
    enemy = {
        name: m.name,
        spriteKey: m.k,
        behavior: m.behavior,
        hp: Math.floor((25 + eventIndex * 10) * m.hpMult),
        damage: Math.floor((5 + eventIndex) * m.dmgMult),
        poisonTurns: 0
    };
    enemy.maxHp = enemy.hp;

    // Reset per-combat players state
    player.abilityReady = true;
    player.shieldBlock = false;
    player.poisonTurns = 0;
    if (isCoop) {
        player2.abilityReady = true;
        player2.shieldBlock = false;
        player2.poisonTurns = 0;
    }
    enemy.poisonTurns = 0;

    var eSprite = document.getElementById('enemy-sprite');
    var eTheater = document.getElementById('enemy-theater');
    if (eSprite) eSprite.innerHTML = Sprites[enemy.spriteKey];
    if (eTheater) { eTheater.style.display = 'flex'; eTheater.style.visibility = 'visible'; }

    updateEnemyHpBar();
    renderStatusEffects();

    log('⚔️ Из теней вырывается <b>' + enemy.name + '</b>!', 'combat');
    if (enemy.behavior === 'magic') log('✨ Тёмный маг готовится к заклинанию...', 'system');
    if (enemy.behavior === 'defensive') log('🛡️ Тролль встал в оборонительную стойку!', 'system');

    // Choose active starting hero
    combatTurnState = (player.hp > 0) ? 'hero1' : 'hero2';

    showCombatOptions();
}

function showCombatOptions() {
    actionButtons.innerHTML = '';
    combatLocked = false;

    // Determine who is acting
    var activeHero = player;
    var heroLabel = '';
    
    if (isCoop) {
        if (combatTurnState === 'hero1') {
            if (player.hp <= 0) {
                combatTurnState = 'hero2';
                showCombatOptions();
                return;
            }
            activeHero = player;
            heroLabel = '👥 Ход: ' + player.classTitle + ' (P1)';
        } else if (combatTurnState === 'hero2') {
            if (player2.hp <= 0) {
                endHeroPhaseAndStartEnemyPhase();
                return;
            }
            activeHero = player2;
            heroLabel = '👥 Ход: ' + player2.classTitle + ' (P2)';
        }
    }

    // Visual Turn Indicator Highlight
    var pTheater = document.getElementById('player-theater');
    var p2Theater = document.getElementById('player2-theater');
    if (pTheater) pTheater.classList.toggle('active-turn-glow', !isCoop || (combatTurnState === 'hero1' && player.hp > 0));
    if (p2Theater) p2Theater.classList.toggle('active-turn-glow', isCoop && combatTurnState === 'hero2' && player2.hp > 0);

    if (isCoop) {
        var header = document.createElement('div');
        header.style.color = 'var(--gold-bright)';
        header.style.fontSize = '0.78rem';
        header.style.fontWeight = '600';
        header.style.textAlign = 'center';
        header.style.marginBottom = '2px';
        header.innerHTML = heroLabel;
        actionButtons.appendChild(header);
    }

    if (isOnlineHost() && onlineCoop.connected && combatTurnState === 'hero2') {
        var waitBtn = createActionBtn('⏳ Ход друга (P2): ожидаем действие...', function () { }, 'action-btn btn-muted');
        waitBtn.disabled = true;
        scheduleOnlineSync(20);
        return;
    }

    // Render attacks for the activeHero
    createActionBtn('⚔️ Молниеносный выпад (DC 8)', function () { playerAttack(false, activeHero); }, 'action-btn btn-primary');
    createActionBtn('🎲 Мощный удар (DC 12) — ×1.6 урона', function () { playerAttack(true, activeHero); }, 'action-btn btn-danger');

    var abilityData = getClassAbilityDataFor(activeHero);
    var abilityBtn = createActionBtn(
        abilityData.name + (activeHero.abilityReady ? '' : ' <small style="opacity:0.6">(исп.)</small>'),
        function () { useClassAbilityFor(activeHero); },
        'action-btn btn-ability' + (activeHero.abilityReady ? '' : ' on-cooldown')
    );
    abilityBtn.id = 'btn-class-ability';
    if (!activeHero.abilityReady) abilityBtn.disabled = true;
    scheduleOnlineSync(20);
}

function getClassAbilityDataFor(hero) {
    var map = {
        TANK: { name: '🛡️ Живой щит — прикрыть команду' },
        BERSERK: { name: '🪓 Безрассудный замах — 2.5× урон, −10 ХП' },
        ALCHEMIST: { name: '🧪 Кислотная колба — отравитель врага (5×3)' },
        SCOUT: { name: '🏹 Прицельный выстрел — гарантированный крит' }
    };
    return map[hero.classKey] || { name: '🔮 Техника класса' };
}

function disableCombatButtons() {
    actionButtons.querySelectorAll('button').forEach(function (b) { b.disabled = true; });
}

function useClassAbilityFor(hero) {
    if (guardGuestReadOnly()) return;
    if (!hero.abilityReady || combatLocked) return;
    hero.abilityReady = false;
    combatLocked = true;
    disableCombatButtons();

    var isPlayer1 = (hero === player);
    var selfId = isPlayer1 ? 'player-theater' : 'player2-theater';
    var selfEl = document.getElementById(selfId);

    switch (hero.classKey) {
        case 'TANK':
            hero.shieldBlock = true;
            renderStatusEffects();
            log('🛡️ <b>Живой щит!</b> ' + hero.classTitle + ' прикрывает команду и готов поглотить следующий удар.', 'level-up');
            setTimeout(function () { transitionToNextCombatPhase(); }, 900);
            break;

        case 'BERSERK':
            var bDmg = Math.floor(hero.damage * 2.5);
            var bCost = 10;
            hero.hp = Math.max(1, hero.hp - bCost);
            enemy.hp -= bDmg;
            triggerVFX(selfId, 'enemy-theater', true);
            spawnFloatNumber(document.getElementById('enemy-theater'), bDmg, 'dmg-crit');
            setTimeout(function () {
                updateEnemyHpBar();
                log('🪓 <b>БЕЗРАССУДНЫЙ ЗАМАХ!</b> ' + bDmg + ' урона врагу. ' + hero.classTitle + ' потерял ' + bCost + ' ХП.', 'combat');
                updateStats();
                setTimeout(function () {
                    if (enemy.hp <= 0) { resolveEnemyDeath(); }
                    else { transitionToNextCombatPhase(); }
                }, 800);
            }, 300);
            break;

        case 'ALCHEMIST':
            enemy.poisonTurns = 3;
            renderStatusEffects();
            log('🧪 <b>Кислотная колба!</b> Враг отравлен на 3 хода (5 урона/ход).', 'poison');
            setTimeout(function () { transitionToNextCombatPhase(); }, 900);
            break;

        case 'SCOUT':
            var sDmg = Math.floor(hero.damage * 2.2);
            enemy.hp -= sDmg;
            triggerVFX(selfId, 'enemy-theater', true);
            spawnFloatNumber(document.getElementById('enemy-theater'), sDmg, 'dmg-crit');
            setTimeout(function () {
                updateEnemyHpBar();
                log('🏹 <b>ПРИЦЕЛЬНЫЙ ВЫСТРЕЛ!</b> Критическое попадание! ' + sDmg + ' урона!', 'combat');
                if (hero.vamp > 0) {
                    hero.hp = Math.min(hero.maxHp, hero.hp + hero.vamp);
                    spawnFloatNumber(selfEl, hero.vamp, 'dmg-heal');
                    updateStats();
                }
                setTimeout(function () {
                    if (enemy.hp <= 0) { resolveEnemyDeath(); }
                    else { transitionToNextCombatPhase(); }
                }, 800);
            }, 300);
            break;

        default:
            log('🔮 Техника применена.', 'level-up');
            setTimeout(function () { transitionToNextCombatPhase(); }, 900);
    }
}

// Returns true if enemy died from poison
function processStatusEffects() {
    if (enemy.poisonTurns > 0) {
        var pDmg = 5;
        enemy.hp -= pDmg;
        enemy.poisonTurns--;
        spawnFloatNumber(document.getElementById('enemy-theater'), pDmg, 'dmg-poison');
        log('☠️ Яд жжёт врага: ' + pDmg + ' урона. Ходов яда: ' + enemy.poisonTurns, 'poison');
        updateEnemyHpBar();
        renderStatusEffects();
        if (enemy.hp <= 0) {
            resolveEnemyDeath();
            return true;
        }
    }
    return false;
}

function playerAttack(isHeavy, hero) {
    if (guardGuestReadOnly()) return;
    if (combatLocked) return;
    combatLocked = true;
    disableCombatButtons();

    var isPlayer1 = (hero === player);
    var selfId = isPlayer1 ? 'player-theater' : 'player2-theater';
    var selfEl = document.getElementById(selfId);

    var roll = Math.floor(Math.random() * 20) + 1;
    var dc = isHeavy ? 12 : 8;
    var totalRoll = roll + hero.speed + hero.bonus;

    log('Проверка (' + hero.classTitle + '): d20(' + roll + ') + ' + (hero.speed + hero.bonus) + ' = ' + totalRoll + ' (DC: ' + dc + ')', 'system');

    if (totalRoll >= dc) {
        var dmg = isHeavy ? Math.floor(hero.damage * 1.6) : hero.damage;

        // Berserk rage bonus
        if (hero.classKey === 'BERSERK' && hero.hp / hero.maxHp < 0.4) {
            dmg = Math.floor(dmg * 1.3);
            log('🩸 <b>Кровавый кураж!</b> Ярость берсерка усилилась!', 'system');
        }

        enemy.hp -= dmg;
        triggerVFX(selfId, 'enemy-theater', isHeavy);
        spawnFloatNumber(document.getElementById('enemy-theater'), dmg, isHeavy ? 'dmg-crit' : 'dmg-enemy');

        if (hero.vamp > 0) {
            hero.hp = Math.min(hero.maxHp, hero.hp + hero.vamp);
            spawnFloatNumber(selfEl, hero.vamp, 'dmg-heal');
            updateStats();
        }

        setTimeout(function () {
            updateEnemyHpBar();
            log('💥 Попадание от ' + hero.classTitle + '! ' + dmg + ' урона.', 'combat');
        }, 300);
    } else {
        log('❌ Промах от ' + hero.classTitle + '! Снаряд ушёл в стену.', 'system');
    }

    setTimeout(function () {
        if (enemy.hp <= 0) {
            resolveEnemyDeath();
            return;
        }
        transitionToNextCombatPhase();
    }, 1100);
}

function transitionToNextCombatPhase() {
    if (!inCombat) return;

    if (combatTurnState === 'hero1') {
        combatTurnState = 'hero2';
        if (!isCoop || player2.hp <= 0) {
            endHeroPhaseAndStartEnemyPhase();
        } else {
            combatLocked = false;
            showCombatOptions();
        }
    } else if (combatTurnState === 'hero2') {
        endHeroPhaseAndStartEnemyPhase();
    }
}

function endHeroPhaseAndStartEnemyPhase() {
    combatTurnState = 'enemy';
    var diedFromPoison = processStatusEffects();
    if (!diedFromPoison) {
        enemyAttack();
    }
}

function enemyAttack() {
    var roll = Math.floor(Math.random() * 20) + 1;
    var hitDC = (enemy.behavior === 'defensive') ? 12 : 8;

    // Choose target
    var targetHero = player;
    var targetId = 'player-theater';

    if (isCoop) {
        var h1Alive = player.hp > 0;
        var h2Alive = player2.hp > 0;

        if (h1Alive && h2Alive) {
            var h1IsTankShield = (player.classKey === 'TANK' && player.shieldBlock);
            var h2IsTankShield = (player2.classKey === 'TANK' && player2.shieldBlock);

            if (h1IsTankShield && Math.random() < 0.75) {
                targetHero = player;
                targetId = 'player-theater';
            } else if (h2IsTankShield && Math.random() < 0.75) {
                targetHero = player2;
                targetId = 'player2-theater';
            } else {
                if (Math.random() < 0.5) {
                    targetHero = player;
                    targetId = 'player-theater';
                } else {
                    targetHero = player2;
                    targetId = 'player2-theater';
                }
            }
        } else if (h1Alive) {
            targetHero = player;
            targetId = 'player-theater';
        } else {
            targetHero = player2;
            targetId = 'player2-theater';
        }
    }

    var targetEl = document.getElementById(targetId);

    // Shield block intercepts attack
    if (targetHero.shieldBlock) {
        targetHero.shieldBlock = false;
        var reflect = Math.floor(enemy.damage * 0.6);
        enemy.hp -= reflect;
        renderStatusEffects();
        spawnFloatNumber(document.getElementById('enemy-theater'), reflect, 'dmg-enemy');
        setTimeout(function () {
            log('🛡️ <b>Щит ' + targetHero.classTitle + ' поглотил удар!</b> Отражено ' + reflect + ' урона!', 'level-up');
            updateEnemyHpBar();
            if (enemy.hp <= 0) { resolveEnemyDeath(); return; }
            combatLocked = false;
            combatTurnState = (player.hp > 0) ? 'hero1' : 'hero2';
            showCombatOptions();
        }, 200);
        return;
    }

    if (roll > hitDC) {
        var dmg = enemy.damage;

        // Tank passive: 20% reduction
        if (targetHero.classKey === 'TANK') dmg = Math.floor(dmg * 0.8);

        // Dark Mage debuff
        if (enemy.behavior === 'magic' && Math.random() < 0.35) {
            targetHero.speed = Math.max(0, targetHero.speed - 2);
            log('✨ Тёмный маг замедляет ' + targetHero.classTitle + '! −2 к скорости.', 'system');
        }

        targetHero.hp -= dmg;
        triggerVFX('enemy-theater', targetId, false);
        spawnFloatNumber(targetEl, dmg, 'dmg-hit');

        setTimeout(function () {
            log('🩸 ' + targetHero.classTitle + ' пропустил удар: ' + dmg + ' ХП.', 'combat');
            updateStats();
        }, 200);
    } else {
        setTimeout(function () { log('🛡️ Уклонение! ' + targetHero.classTitle + ' парировал выпад.', 'system'); }, 200);
    }

    setTimeout(function () {
        var allDead = isCoop ? (player.hp <= 0 && player2.hp <= 0) : (player.hp <= 0);
        if (allDead) { gameOver(false); return; }
        
        combatLocked = false;
        combatTurnState = (player.hp > 0) ? 'hero1' : 'hero2';
        showCombatOptions();
    }, 1100);
}

function resolveEnemyDeath() {
    // Unlock tabs
    var btnStats = document.getElementById('tab-btn-stats');
    var btnInv = document.getElementById('tab-btn-inventory');
    if (btnStats) btnStats.disabled = false;
    if (btnInv) btnInv.disabled = false;
    inCombat = false;

    // Boss defeat = win
    if (enemy.name === 'ДРАКОН ТЕНЕЙ') {
        log('👑 <b>ДРАКОН ТЕНЕЙ ПОВЕРЖЕН!!! Подземелье покорено!</b>', 'level-up');
        try { localStorage.removeItem('dqSave'); } catch (e) { }
        setTimeout(function () { gameOver(true); }, 1200);
        return;
    }

    player.kills++;
    gameStats.enemiesSlain++;

    // Gold drop (Greed perk doubles it)
    var baseGold = Math.floor(Math.random() * 16) + 5;
    var hasGreed1 = player.learnedPerks.some(function (p) { return p.id === 'greed'; });
    var hasGreed2 = isCoop && player2.learnedPerks.some(function (p) { return p.id === 'greed'; });
    var goldDrop = (hasGreed1 || hasGreed2) ? baseGold * 2 : baseGold;
    player.gold += goldDrop;
    gameStats.goldEarned += goldDrop;

    log('💀 <b>' + enemy.name + '</b> повержен!', 'loot');
    log('💰 +' + goldDrop + ' золота.', 'loot');

    // End-of-combat revival for Coop Mode
    if (isCoop) {
        var h1Revived = false;
        var h2Revived = false;

        if (player.hp <= 0 && player2.hp > 0) {
            player.hp = Math.floor(player.maxHp * 0.25);
            h1Revived = true;
        } else if (player2.hp <= 0 && player.hp > 0) {
            player2.hp = Math.floor(player2.maxHp * 0.25);
            h2Revived = true;
        }

        if (h1Revived) log('💖 <b>' + player.classTitle + '</b> пришёл в себя после битвы! (Восстановлено 25% HP)', 'level-up');
        if (h2Revived) log('💖 <b>' + player2.classTitle + '</b> пришёл в себя после битвы! (Восстановлено 25% HP)', 'level-up');

        var p2Theater = document.getElementById('player2-theater');
        if (p2Theater) p2Theater.classList.remove('dead-hero');
        var p1Theater = document.getElementById('player-theater');
        if (p1Theater) p1Theater.classList.remove('dead-hero');
    }

    gainExp(50);
}

// ─────────────────────────────────────────────────────
// 12. POTIONS
// ─────────────────────────────────────────────────────
function usePotion() {
    if (guardGuestReadOnly()) return;
    if (player.potions <= 0 || player.hp >= player.maxHp) return;
    var healAmt = 40;
    if (player.classKey === 'ALCHEMIST') healAmt = Math.floor(healAmt * 1.5);
    player.potions--;
    player.hp = Math.min(player.maxHp, player.hp + healAmt);
    spawnFloatNumber(document.getElementById('player-theater'), healAmt, 'dmg-heal');
    log('🧪 Зелье выпито! Восстановлено <b>' + healAmt + ' ХП</b>.', 'loot');
    updateStats();
}

function usePotionForHero(heroIdx) {
    if (guardGuestReadOnly()) return;
    if (player.potions <= 0) return;
    var target = (heroIdx === 0) ? player : player2;
    if (target.hp >= target.maxHp || target.hp <= 0) return;

    var healAmt = 40;
    if (target.classKey === 'ALCHEMIST') healAmt = Math.floor(healAmt * 1.5);
    
    player.potions--;
    target.hp = Math.min(target.maxHp, target.hp + healAmt);
    
    var targetId = (heroIdx === 0) ? 'player-theater' : 'player2-theater';
    spawnFloatNumber(document.getElementById(targetId), healAmt, 'dmg-heal');
    log('🧪 Зелье исцеления выпито героем <b>' + target.classTitle + '</b>! Восстановлено <b>' + healAmt + ' ХП</b>.', 'loot');
    updateStats();
}

// ─────────────────────────────────────────────────────
// 13. PROGRESSION
// ─────────────────────────────────────────────────────
function gainExp(amt) {
    player.exp += amt;
    log('✨ +' + amt + ' EXP.', 'system');

    if (player.exp >= 100) {
        player.exp -= 100;
        player.lvl++;
        if (isCoop) player2.lvl = player.lvl;
        log('🆙 <b>ПОВЫШЕНИЕ УРОВНЯ! Вы достигли яруса ' + player.lvl + '!</b>', 'level-up');

        var hasBrew1 = player.learnedPerks.some(function (p) { return p.id === 'brew'; });
        var hasBrew2 = isCoop && player2.learnedPerks.some(function (p) { return p.id === 'brew'; });
        if (hasBrew1 || hasBrew2) {
            if (player.potions < 3) {
                player.potions++;
                log('🧪 Знаток зелий: +1 зелье!', 'loot');
            }
        }
        
        openPerkSelectionForHero(0);
    } else {
        offerNextStep();
    }
}

function openPerkSelectionForHero(heroIdx) {
    var heroToUpgrade = (heroIdx === 0 || !isCoop) ? player : player2;

    var shuffled = AllPerks.slice().sort(function () { return 0.5 - Math.random(); });
    var selected = shuffled.slice(0, 3);

    log('🔮 Выберите дар подземелья для <b>' + heroToUpgrade.classTitle + '</b>:', 'story');
    actionButtons.innerHTML = '';

    selected.forEach(function (p) {
        var btn = document.createElement('button');
        btn.className = 'perk-select-card';
        btn.id = 'perk-select-' + p.id;
        btn.innerHTML =
            '<div class="perk-select-name">' + p.name + '</div>' +
            '<div class="perk-select-desc">' + p.desc + '</div>';
        btn.onclick = function () {
            if (p.id === 'vamp') heroToUpgrade.vamp += 4;
            if (p.id === 'heavy') heroToUpgrade.baseDamage += 6;
            if (p.id === 'thick') { heroToUpgrade.maxHp += 25; heroToUpgrade.hp += 25; }
            if (p.id === 'luck') heroToUpgrade.bonus += 3;
            if (p.id === 'speedy') heroToUpgrade.speed += 4;
            if (p.id === 'brew' && player.potions < 3) player.potions++;

            heroToUpgrade.learnedPerks.push(p);
            renderPerksList();
            log('<b>' + heroToUpgrade.classTitle + '</b> запечатлел в душе: <b>' + p.name + '</b>', 'level-up');
            updateStats();

            if (isCoop && heroIdx === 0) {
                openPerkSelectionForHero(1);
            } else {
                offerNextStep();
            }
        };
        actionButtons.appendChild(btn);
    });
}

function openPerkSelection() {
    openPerkSelectionForHero(0);
}

function renderPerksList() {
    var c = document.getElementById('active-perks-list');
    if (!c) return;
    var pToShow = (selectedHeroStatsTab === 0 || !isCoop) ? player : player2;
    if (pToShow.learnedPerks.length === 0) {
        c.innerHTML = '<div class="empty-hint">Способности не изучены.</div>';
        return;
    }
    c.innerHTML = '';
    pToShow.learnedPerks.forEach(function (p) {
        c.innerHTML += '<div class="perk-badge"><strong>' + p.name + '</strong> — <small>' + p.desc + '</small></div>';
    });
}

// ─────────────────────────────────────────────────────
// 14. INVENTORY
// ─────────────────────────────────────────────────────
function renderInventoryTab() {
    var activeHero = (selectedHeroInvTab === 0 || !isCoop) ? player : player2;
    var dAvatar = document.getElementById('doll-avatar');
    if (dAvatar) dAvatar.innerHTML = Sprites[activeHero.classKey] || '';

    var weaponEl = document.getElementById('doll-weapon');
    var armorEl = document.getElementById('doll-armor');
    if (weaponEl) weaponEl.textContent = activeHero.weaponItem ? activeHero.weaponItem.name : 'Кулаки';
    if (armorEl) armorEl.textContent = activeHero.armorItem ? activeHero.armorItem.name : 'Ткань';

    var list = document.getElementById('items-list');
    if (!list) return;

    if (bag.length === 0) {
        list.innerHTML = '<div class="empty-hint">Сумка пуста.</div>';
        return;
    }

    list.innerHTML = '';
    bag.forEach(function (item, idx) {
        var card = document.createElement('div');
        var rarityClass = item.rarity === 'rare' ? 'rarity-rare' : item.rarity === 'uncommon' ? 'rarity-uncommon' : '';
        card.className = 'item-card ' + rarityClass;

        var cur = item.type === 'weapon' ? (activeHero.weaponItem ? activeHero.weaponItem.value : 0) : (activeHero.armorItem ? activeHero.armorItem.value : 0);
        var diff = item.value - cur;
        var diffTxt = diff > 0 ? '(+' + diff + ')' : diff < 0 ? '(' + diff + ')' : '(=)';
        var diffCls = diff > 0 ? 'diff-plus' : diff < 0 ? 'diff-minus' : 'diff-equal';

        card.innerHTML =
            '<div>' +
            '<div class="item-name">' + (item.type === 'weapon' ? '⚔️' : '🛡️') + ' ' + item.name + '</div>' +
            '<div class="item-bonus">' + (item.type === 'weapon' ? 'Урон' : 'ХП') + ': +' + item.value + ' <span class="' + diffCls + '">' + diffTxt + '</span></div>' +
            '</div>' +
            '<button class="btn-equip" id="equip-btn-' + idx + '" onclick="equipItem(' + idx + ')">Экипировать</button>';
        list.appendChild(card);
    });
}

function equipItem(idx) {
    if (guardGuestReadOnly()) return;
    var activeHero = (selectedHeroInvTab === 0 || !isCoop) ? player : player2;
    var item = bag.splice(idx, 1)[0];
    if (item.type === 'weapon') {
        if (activeHero.weaponItem) bag.push(activeHero.weaponItem);
        activeHero.weaponItem = item;
    } else {
        if (activeHero.armorItem) {
            activeHero.maxHp -= activeHero.armorItem.value;
            activeHero.hp = Math.max(1, activeHero.hp - activeHero.armorItem.value);
            bag.push(activeHero.armorItem);
        }
        activeHero.armorItem = item;
        activeHero.maxHp += item.value;
        activeHero.hp += item.value;
    }
    log('🎒 Экипировано герою <b>' + activeHero.classTitle + '</b>: <b>' + item.name + '</b>', 'loot');
    updateStats();
    renderInventoryTab();
}

// ─────────────────────────────────────────────────────
// 15. LOOT & TRAP
// ─────────────────────────────────────────────────────
function initLoot() {
    var eSprite = document.getElementById('enemy-sprite');
    var eLabel = document.getElementById('enemy-name-label');
    var eTheater = document.getElementById('enemy-theater');

    if (eSprite) eSprite.innerHTML = Sprites.LOOT;
    if (eLabel) eLabel.textContent = 'Древний Сундук';
    if (eTheater) { eTheater.style.display = 'flex'; eTheater.style.visibility = 'visible'; }

    setOnlineUiState('loot');
    log('🎁 Скрытые механизмы выкатили из стены сундук!', 'loot');
    actionButtons.innerHTML = '';
    if (isOnlineHost() && onlineCoop.connected && !canHostActInOnlineTurn()) {
        var waitBtn = createActionBtn('⏳ Сейчас сундук открывает друг', function () { }, 'action-btn btn-muted');
        waitBtn.disabled = true;
        return;
    }
    createActionBtn('🔑 Открыть крышку', resolveLoot, 'action-btn btn-success');
}

function resolveLoot() {
    if (guardGuestReadOnly()) return;
    if (guardHostTurnOnly('Открыть сундук')) return;
    if (isOnlineHost() && onlineCoop.connected) advanceOnlineTurn();
    if (Math.random() < 0.30) {
        var goldBonus = Math.floor(Math.random() * 35) + 20;
        player.gold += goldBonus;
        gameStats.goldEarned += goldBonus;
        log('💰 Найдено: <b>' + goldBonus + ' золота</b>!', 'loot');
        if (player.potions < 3) {
            player.potions++;
            log('🧪 И зелье исцеления!', 'loot');
        }
        updateStats();
        offerNextStep();
        return;
    }

    var poolClass = player.classKey;
    if (isCoop && player2.hp > 0 && Math.random() > 0.5) {
        poolClass = player2.classKey;
    }

    var pool = LootTable[poolClass];
    var item = Math.random() > 0.5
        ? pool.weapons[Math.floor(Math.random() * pool.weapons.length)]
        : pool.armors[Math.floor(Math.random() * pool.armors.length)];
    bag.push(item);
    log('🎁 Найдено снаряжение для класса <b>' + poolClass + '</b>: <b>' + item.name + '</b>! Положено в сумку.', 'loot');
    updateStats();
    offerNextStep();
}

function initTrap() {
    var eSprite = document.getElementById('enemy-sprite');
    var eLabel = document.getElementById('enemy-name-label');
    var eTheater = document.getElementById('enemy-theater');

    if (eSprite) eSprite.innerHTML = Sprites.TRAP;
    if (eLabel) eLabel.textContent = 'Активная Ловушка';
    if (eTheater) { eTheater.style.display = 'flex'; eTheater.style.visibility = 'visible'; }

    setOnlineUiState('trap');
    actionButtons.innerHTML = '';
    if (isOnlineHost() && onlineCoop.connected && !canHostActInOnlineTurn()) {
        var waitBtn = createActionBtn('⏳ Сейчас ловушку разминирует друг', function () { }, 'action-btn btn-muted');
        waitBtn.disabled = true;
        return;
    }
    createActionBtn('🤸 Рефлекторный кувырок', resolveTrap, 'action-btn btn-danger');
}

function resolveTrap() {
    if (guardGuestReadOnly()) return;
    if (guardHostTurnOnly('Разминировать ловушку')) return;
    if (isOnlineHost() && onlineCoop.connected) advanceOnlineTurn();
    var scoutAlive = (player.classKey === 'SCOUT' && player.hp > 0) || (isCoop && player2.classKey === 'SCOUT' && player2.hp > 0);
    
    if (scoutAlive) {
        log('🏹 <b>Чутьё на капканы!</b> Следопыт в отряде легко замечает и обезвреживает ловушку.', 'loot');
    } else {
        var highestSpd = player.speed;
        if (isCoop && player2.hp > 0 && player2.speed > highestSpd) {
            highestSpd = player2.speed;
        }

        var roll = Math.floor(Math.random() * 20) + 1 + highestSpd;
        if (roll > 13) {
            log('🤸 Отличная реакция! Отряд успешно увернулся от ловушки.', 'loot');
        } else {
            if (isCoop) {
                var p1Dmg = player.hp > 0 ? 15 : 0;
                var p2Dmg = player2.hp > 0 ? 15 : 0;
                if (p1Dmg > 0) {
                    player.hp -= p1Dmg;
                    spawnFloatNumber(document.getElementById('player-theater'), p1Dmg, 'dmg-hit');
                }
                if (p2Dmg > 0) {
                    player2.hp -= p2Dmg;
                    spawnFloatNumber(document.getElementById('player2-theater'), p2Dmg, 'dmg-hit');
                }
                log('💥 Ловушка сработала! ' + (p1Dmg > 0 ? '<b>' + player.classTitle + '</b> получил 15 урона. ' : '') + (p2Dmg > 0 ? '<b>' + player2.classTitle + '</b> получил 15 урона.' : ''), 'combat');
            } else {
                player.hp -= 20;
                triggerVFX('enemy-theater', 'player-theater', false);
                spawnFloatNumber(document.getElementById('player-theater'), 20, 'dmg-hit');
                log('💥 Механизм наносит вам <b>20 урона</b>!', 'combat');
            }
            updateStats();
        }
    }
    var allDead = isCoop ? (player.hp <= 0 && player2.hp <= 0) : (player.hp <= 0);
    if (allDead) { gameOver(false); return; }
    offerNextStep();
}

// ─────────────────────────────────────────────────────
// 16. BOSS FIGHT
// ─────────────────────────────────────────────────────
function initBossFight() {
    inCombat = true;
    combatLocked = false;
    setOnlineUiState('combat');

    var btnStats = document.getElementById('tab-btn-stats');
    var btnInv = document.getElementById('tab-btn-inventory');
    if (btnStats) btnStats.disabled = true;
    if (btnInv) btnInv.disabled = true;

    enemy = { name: 'ДРАКОН ТЕНЕЙ', spriteKey: 'BOSS', hp: 160, maxHp: 160, damage: 16, behavior: 'normal', poisonTurns: 0 };
    
    player.abilityReady = true;
    player.shieldBlock = false;
    if (isCoop) {
        player2.abilityReady = true;
        player2.shieldBlock = false;
    }

    var eSprite = document.getElementById('enemy-sprite');
    var eTheater = document.getElementById('enemy-theater');
    if (eSprite) eSprite.innerHTML = Sprites.BOSS;
    if (eTheater) { eTheater.style.display = 'flex'; eTheater.style.visibility = 'visible'; }

    updateEnemyHpBar();
    renderStatusEffects();

    minimapData.push({ type: 'boss', icon: '👑', label: 'Финальный бой!' });
    renderMinimap();

    log('👑 <b>ФИНАЛЬНАЯ ЗОНА!</b> Дракон Теней пробудился от вечного сна!', 'story');
    
    combatTurnState = (player.hp > 0) ? 'hero1' : 'hero2';
    
    updateStats();
    showCombatOptions();
}

// ─────────────────────────────────────────────────────
// 17. GAME OVER / VICTORY
// ─────────────────────────────────────────────────────
function gameOver(isWin) {
    inCombat = false;
    combatLocked = false;
    setOnlineUiState('none');

    var overlay = document.getElementById('endgame-overlay');
    var card = document.getElementById('endgame-card');
    if (!overlay || !card) {
        log(isWin ? '🎉 <b>ПОБЕДА!</b>' : '💀 <b>ВЫ ПОГИБЛИ.</b>', isWin ? 'level-up' : 'combat');
        actionButtons.innerHTML = '';
        createActionBtn('🔄 Начать заново', function () { location.reload(); }, 'action-btn btn-success');
        return;
    }

    card.className = 'endgame-card ' + (isWin ? 'endgame-win' : 'endgame-lose');
    card.innerHTML =
        '<div class="endgame-title">' + (isWin ? '⚜️ ПОБЕДА!' : '💀 ГЕРОИ ПАЛИ') + '</div>' +
        '<div class="endgame-subtitle">' + (isWin ? 'Дракон Теней повержен. Подземелье покорено!' : 'Тьма сомкнулась над вашими телами. Ваш путь окончен.') + '</div>' +
        '<div class="endgame-stats">' +
        '<div class="endgame-stat"><div class="endgame-stat-val">' + player.lvl + '</div><div class="endgame-stat-lbl">Уровень</div></div>' +
        '<div class="endgame-stat"><div class="endgame-stat-val">' + gameStats.enemiesSlain + '</div><div class="endgame-stat-lbl">Врагов убито</div></div>' +
        '<div class="endgame-stat"><div class="endgame-stat-val">' + player.gold + '</div><div class="endgame-stat-lbl">Золото</div></div>' +
        '<div class="endgame-stat"><div class="endgame-stat-val">' + gameStats.roomsCleared + '</div><div class="endgame-stat-lbl">Комнат пройдено</div></div>' +
        '</div>' +
        '<button class="endgame-btn endgame-btn-primary" id="btn-play-again" onclick="location.reload()">🔄 Начать заново</button>' +
        '<button class="endgame-btn endgame-btn-secondary" id="btn-share-score" onclick="shareScore()">📋 Скопировать результат</button>';

    overlay.classList.remove('hidden');
}

function shareScore() {
    var pTitleText = isCoop ? player.classTitle + ' + ' + player2.classTitle : player.classTitle;
    var result = [
        'Dungeon Quest 🗡️ ' + (isCoop ? '[👥 Кооператив]' : '[🗡️ Соло]'),
        'Класс: ' + pTitleText + ' · Уровень ' + player.lvl,
        'Враги: ' + gameStats.enemiesSlain + ' · Золото: ' + player.gold + ' · Комнаты: ' + gameStats.roomsCleared
    ].join('\n');

    try {
        navigator.clipboard.writeText(result).then(function () {
            var btn = document.getElementById('btn-share-score');
            if (btn) { btn.textContent = '✅ Скопировано!'; btn.disabled = true; }
        });
    } catch (e) { alert(result); }
}

// ─────────────────────────────────────────────────────
// 18. CONTINUE GAME (Save/Load)
// ─────────────────────────────────────────────────────
function showModeSelect() {
    if (onlineCoop.enabled) stopOnlineCoop();

    adjustTheaterLayout('single');
    var pTheater = document.getElementById('player-theater');
    if (pTheater) pTheater.style.visibility = 'hidden';

    if (logBox) {
        logBox.innerHTML = '<div class="log-entry story">Приветствуем в Dungeon Quest! Выберите режим вашего приключения...</div>';
    }

    actionButtons.innerHTML = '';
    
    var soloBtn = document.createElement('button');
    soloBtn.className = 'action-btn btn-primary';
    soloBtn.style.padding = '14px 16px';
    soloBtn.innerHTML = '<strong>🗡️ Одиночный поход</strong><br><small style="color:var(--text-secondary); font-size:0.72rem;">Испытание для одного героя. Классический баланс.</small>';
    soloBtn.onclick = function() {
        isCoop = false;
        coopSelectionStep = 0;
        initClassSelect();
    };
    actionButtons.appendChild(soloBtn);

    var coopBtn = document.createElement('button');
    coopBtn.className = 'action-btn btn-purple';
    coopBtn.style.padding = '14px 16px';
    coopBtn.style.marginTop = '6px';
    coopBtn.innerHTML = '<strong>👥 Совместный поход (Кооператив)</strong><br><small style="color:var(--text-secondary); font-size:0.72rem;">Управляйте отрядом из двух героев. Совместные ходы и тактика.</small>';
    coopBtn.onclick = function() {
        isCoop = true;
        coopSelectionStep = 1;
        initClassSelect();
    };
    actionButtons.appendChild(coopBtn);

    if (supportsOnlineCoop()) {
        var hostBtn = document.createElement('button');
        hostBtn.className = 'action-btn btn-danger';
        hostBtn.style.padding = '14px 16px';
        hostBtn.style.marginTop = '6px';
        hostBtn.innerHTML = '<strong>🌐 Хост по токену</strong><br><small style="color:var(--text-secondary); font-size:0.72rem;">Создайте токен и отправьте другу для подключения.</small>';
        hostBtn.onclick = function () {
            startOnlineHostLobby();
        };
        actionButtons.appendChild(hostBtn);

        var joinBtn = document.createElement('button');
        joinBtn.className = 'action-btn btn-muted';
        joinBtn.style.padding = '12px 16px';
        joinBtn.style.marginTop = '6px';
        joinBtn.innerHTML = '<strong>🔗 Подключиться по токену</strong><br><small style="color:var(--text-secondary); font-size:0.72rem;">Введите токен, который прислал друг.</small>';
        joinBtn.onclick = function () {
            promptOnlineJoin();
        };
        actionButtons.appendChild(joinBtn);
    }
}

function showContinuePrompt() {
    adjustTheaterLayout('single');
    var pTitleText = isCoop ? player.classTitle + ' и ' + player2.classTitle : player.classTitle;
    
    if (logBox) {
        logBox.innerHTML = '<div class="log-entry story">Найдено сохранение. Хотите продолжить поход отряда (' + pTitleText + ', Ур.' + player.lvl + ')?</div>';
    }

    var pSprite = document.getElementById('player-sprite');
    var pTheater = document.getElementById('player-theater');
    if (pSprite) pSprite.innerHTML = Sprites[player.classKey];
    if (pTheater) pTheater.style.visibility = 'visible';

    if (isCoop) {
        var p2Sprite = document.getElementById('player2-sprite');
        var p2Theater = document.getElementById('player2-theater');
        if (p2Sprite) p2Sprite.innerHTML = Sprites[player2.classKey];
        if (p2Theater) p2Theater.style.display = 'flex';
    }

    actionButtons.innerHTML = '';

    var continueBtn = createActionBtn(
        '▶️ Продолжить поход (Ур.' + player.lvl + ')',
        function () {
            var statsSel = document.getElementById('stats-hero-selector-wrap');
            var invSel = document.getElementById('inventory-hero-selector-wrap');
            if (isCoop) {
                if (statsSel) statsSel.style.display = 'flex';
                if (invSel) invSel.style.display = 'flex';
                toggleStatsHero(0);
                toggleInventoryHero(0);
            } else {
                if (statsSel) statsSel.style.display = 'none';
                if (invSel) invSel.style.display = 'none';
            }

            renderPerksList();
            adjustTheaterLayout('battle');
            updateStats();
            renderMinimap();
            offerNextStep();
        },
        'action-btn btn-success'
    );
    continueBtn.id = 'btn-continue-save';

    createActionBtn('🆕 Новая игра (сброс сохранения)', function () {
        clearSave();
        resetGameState();
        showModeSelect();
    }, 'action-btn btn-muted');
}

function resetGameState() {
    if (onlineCoop.enabled) stopOnlineCoop();

    isCoop = false;
    activeHeroIndex = 0;
    coopSelectionStep = 0;
    selectedHeroStatsTab = 0;
    selectedHeroInvTab = 0;
    combatTurnState = 'hero1';
    
    player = {
        classKey: '', classTitle: '', lvl: 1, exp: 0,
        hp: 0, maxHp: 0, baseDamage: 0, damage: 0,
        speed: 0, bonus: 0, vamp: 0,
        gold: 0, potions: 0, kills: 0,
        weaponItem: null, armorItem: null, learnedPerks: [],
        abilityReady: true, shieldBlock: false, poisonTurns: 0
    };
    
    player2 = {
        classKey: '', classTitle: '', lvl: 1, exp: 0,
        hp: 0, maxHp: 0, baseDamage: 0, damage: 0,
        speed: 0, bonus: 0, vamp: 0,
        weaponItem: null, armorItem: null, learnedPerks: [],
        abilityReady: true, shieldBlock: false, poisonTurns: 0
    };
    
    bag = [];
    eventIndex = 0;
    minimapData = [];
    mapHistory = [];
    worldMemory = { playerIsRuthless: false, foundAncientLore: false };
    gameStats = { enemiesSlain: 0, goldEarned: 0, roomsCleared: 0 };
    inCombat = false;
    combatLocked = false;
    onlineCoop.turn = 'p1';
    onlineCoop.uiState = 'none';
    onlineCoop.uiData = null;
    onlineCoop.pendingPathLogic = null;
}

// ─────────────────────────────────────────────────────
// 19. ENTRY POINT
// ─────────────────────────────────────────────────────
function toggleStatsHero(idx) {
    selectedHeroStatsTab = idx;
    var btn1 = document.getElementById('stats-toggle-p1');
    var btn2 = document.getElementById('stats-toggle-p2');
    if (btn1) btn1.classList.toggle('active-tab', idx === 0);
    if (btn2) btn2.classList.toggle('active-tab', idx === 1);
    
    updateStats();
    renderPerksList();
}

function toggleInventoryHero(idx) {
    selectedHeroInvTab = idx;
    var btn1 = document.getElementById('inv-toggle-p1');
    var btn2 = document.getElementById('inv-toggle-p2');
    if (btn1) btn1.classList.toggle('active-tab', idx === 0);
    if (btn2) btn2.classList.toggle('active-tab', idx === 1);
    
    renderInventoryTab();
}

function startDungeonGame() {
    logBox = document.getElementById('log-box');
    actionButtons = document.getElementById('action-buttons');

    if (!logBox || !actionButtons) {
        var fb = document.getElementById('game-container') || document.body;
        fb.innerHTML += '<div style="background:#742a2a;color:#fff;padding:15px;margin:10px;border-radius:8px;text-align:center;">⚠️ <b>Ошибка интерфейса!</b></div>';
        return;
    }

    initCanvas();

    try {
        var params = new URLSearchParams(window.location.search);
        var joinToken = normalizeOnlineToken(params.get('join'));
        if (joinToken) {
            showModeSelect();
            startOnlineGuestLobby(joinToken);
            return;
        }
    } catch (e) { }

    var hasSave = loadGame();
    if (hasSave && player.classKey) {
        showContinuePrompt();
    } else {
        showModeSelect();
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startDungeonGame);
} else {
    startDungeonGame();
}
