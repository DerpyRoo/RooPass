// Character substitution bank for deterministic obfuscation
const charBank = {
    'a': '+ppJ', 'b': 'j-MM', 'c': '%Aq6', 'd': 'Uf4+',
    'e': '3*Pe', 'f': '3E4z', 'g': 'G7bx', 'h': 'wV^#',
    'i': 'C3*o', 'j': 'GhZ(', 'k': 'SS9e', 'l': '^Ru_',
    'm': '@2iL', 'n': '4ndR', 'o': 'Gz_C', 'p': '0ihM',
    'q': 'NP+r', 'r': 'IAn9', 's': 'Py!l', 't': 'VG0w',
    'u': 'O^dz', 'v': 'sTr_', 'w': 'U4Di', 'x': '&JTd',
    'y': '%VzI', 'z': '@xdQ', 'A': 'kP!a', 'B': '))Hk',
    'C': 'F5fu', 'D': 'jH7L', 'E': 'Tde&', 'F': 'R%uo',
    'G': 'zQl0', 'H': 'vcR4', 'I': 'b*Wr', 'J': 'J)Mi',
    'K': 'fX#u', 'L': 'i+Yq', 'M': 'Ih8P', 'N': 'vD+o',
    'O': '1p%G', 'P': 'RUp#', 'Q': 'Hv!_', 'R': 'cLR@',
    'S': 'o3YK', 'T': 'V45e', 'U': 'T4rz', 'V': '6rR$',
    'W': 'I9uX', 'X': '3Qsr', 'Y': 'M2gX', 'Z': 'Ta#P',
    '0': 'qQ7(', '1': '5SRt', '2': 'kq%T', '3': '9Q+a',
    '4': 'MHy6', '5': '38oU', '6': 'rgW8', '7': 'aW8j',
    '8': 'Pc#v', '9': '6zND', ' ': 'J)Su', '!': 'Gf&C',
    '@': 'jON%', '#': 'yoK#', '$': 'Cq+f', '%': '=kiM',
    '^': '-szW', '&': 'f13O', '*': 'S%Lb', '(': '=nqL',
    ')': 'wQ=e', '-': 'Bkh-', '_': '_h^Y', '+': 'rM7F',
    '=': ')2eD', '<': '(mGU', '>': 'W7Ua', '?': 'fD9_',
    '/': 'MWa+', '[': 'T_jS', ']': '@ZsQ', '{': 'sjJ&',
    '}': '06Ke', '|': 't*Zz'
};

// Obscures input string by replacing characters using the charBank
function obscureText(input) {
    return input
        .split('')
        .map(char => charBank[char] || char) // fallback to original if no mapping
        .join('');
}

// Obscures + scrambles the input into a 256-char deterministic output
function scrambleObscuredText(input) {
    const obscured = obscureText(input); // 4x length
    const blocks = obscured.match(/.{4}/g); // Split into 4-char blocks

    if (!blocks || blocks.length === 0) return '';

    // Interleave characters
    let woven = '';
    for (let i = 0; i < 4; i++) {
        for (let block of blocks) {
            woven += block[i] || '';
        }
    }

    // Optional shuffle: move last 8 chars to front
    woven = woven.slice(-8) + woven.slice(0, -8);

    // Pad to 256
    while (woven.length < 256) {
        woven += woven.slice(0, 256 - woven.length);
    }

    return woven.slice(0, 256);
}
