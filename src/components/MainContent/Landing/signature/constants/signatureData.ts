// ═══════════════════════════════════════════════════════════════
// Constantes de la sección Signature / La Firma
// ═══════════════════════════════════════════════════════════════

// --- BinaryMatrix ---
export const BINARY_MATRIX_COLUMNS = 15;
export const BINARY_MATRIX_ROWS = 20;
export const BINARY_FLICKER_MIN_INTERVAL = 150;
export const BINARY_FLICKER_RANGE = 300;

// --- ScanProgressHUD ---
export const TOTAL_SCAN_WORDS = 7;

export const HUD_LABELS = {
    missionComplete: 'misión_cumplida',
    cursorExperience: 'experiencia_cursor',
    manifestoUnlocked: 'manifiesto_desbloqueado',
    decrypting: 'desencriptando_manifiesto...',
    waitingExploration: 'esperando_exploración...',
    statusInProgress: 'Estado: En_proceso',
    versionStable: 'v1.0.42_estable',
} as const;

export const SOCIAL_LINKS = [
    { href: 'https://linkedin.com', label: 'LinkedIn', icon: 'linkedin' },
    { href: 'https://github.com', label: 'GitHub', icon: 'github' },
    { href: 'https://instagram.com', label: 'Instagram', icon: 'instagram' },
] as const;

// --- DecryptionOverlay ---
export const DECRYPTION_LABELS = {
    title: 'Bypass_Sequence',
    target: 'TARGET: MANIFESTO_PROTOCOL_v1.0',
    encryption: 'ENCRYPTION: RSA_AES_STRICT',
    status: 'STATUS: OVERRIDING_SECURITY_LAYER...',
    counter: 'DECRYPTING',
} as const;

// --- ManifestoContent: Headlines ---
export const MANIFESTO_HEADLINES = {
    line1: [
        { text: 'Revolucionando', type: 'plain' as const, animClass: 'manifesto-w3' },
        { text: 'el internet', type: 'badge' as const, animClass: 'manifesto-w2', color: '#89EA2B' },
    ],
    line2: [
        { text: 'Recreando', type: 'badge' as const, animClass: 'manifesto-w1', color: '#07F8F2' },
        { text: 'un concepto', type: 'plain' as const, animClass: 'manifesto-w3' },
    ],
} as const;

// --- ManifestoContent: HoverWords data ---
export interface HoverWordData {
    id: string;
    baseText: string;
    completionText: string;
    colorClass?: string;
}

export const HOVER_WORDS: HoverWordData[] = [
    { id: 'liderar', baseText: 'liderar', completionText: 'el mercado digital con autoridad' },
    { id: 'elevar', baseText: 'elevar el estándar', completionText: 'con ideas altamente disruptivas' },
    { id: 'redefiniendo', baseText: 'redefiniendo', completionText: 'el concepto de identidad de marca' },
    { id: 'premium', baseText: 'premium', completionText: 'para experiencias web de alto impacto', colorClass: 'text-[#89EA2B]' },
    { id: 'calidad', baseText: 'calidad', completionText: 'en cada línea de código' },
    { id: 'detalle', baseText: 'detalle', completionText: 'diseñado a la perfección absoluta' },
    { id: 'excepcion', baseText: 'excepción', completionText: 'que rompe todos los moldes preestablecidos' },
];

// --- HoverWord: Tooltip HUD labels ---
export const TOOLTIP_LABELS = {
    lastScanHeader: 'SISTEMA_DESBLOQUEADO //',
    normalHeader: 'DRONE_LINK // ACQUIRED',
} as const;

// --- RewardCard ---
export const REWARD_CARD_LABELS = {
    tagline: 'comencemos_a_trabajar_juntos',
    subtitle: 'si descubriste esto, agendemos una planeación gratuita',
    ctaText: 'Quiero romper estándares ya',
    dataStreamLabel: 'data_stream_v1.0',
    scrollLabel: 'CONTINUAR_VIAJE',
} as const;

export const REWARD_CARD_META = {
    topLeft: [
        'Enc_Type: RSA_4096',
        'Coord: 34.0522° N, 118.2437° W',
        'Status: Authenticated',
    ],
    bottomRight: [
        'Uplink: Stable',
    ],
} as const;

// --- Timing constants (ms) ---
export const TIMING = {
    typewriterInterval: 25,
    tooltipRevealDelay: 20,
    mobileAutoCloseDelay: 5000,
    lastScanAutoCloseDelay: 2500,
    mobileLeaveTransition: 250,
    rewardOpenDelay: 2000,
    rewardDesktopTriggerDelay: 1500,
    rewardMobileTriggerDelay: 4000,
    rewardCloseTransition: 350,
    cardRevealDelay: 30,
    cardContentRevealDelay: 380,
} as const;
