// Validates and sanitizes user inputs
function validateInputs() {
    const username = $('#username').val()?.trim();
    const masterPassword = $('#password').val()?.trim();
    const programName = $('#name').val()?.trim();
    const lengthRaw = $('#length').val();
    const allowSpecialChar = document.getElementById("allowSpecialChar").checked;

    // Basic field checks
    if (!username) {
        error("Username is required!");
        return null;
    }
    if (!masterPassword) {
        error("Master password is required!");
        return null;
    }
    if (!programName) {
        error("Program name is required!");
        return null;
    }

    // Validate and parse length
    const length = parseInt(lengthRaw || "16", 10);
    if (isNaN(length)) {
        error("Password length must be a number!");
        return null;
    }
    if (length < 4 || length > 100) {
        error("Length must be between 4 and 100!");
        return null;
    }

    return {
        username,
        masterPassword,
        programName,
        length,
        allowSpecialChar: Boolean(allowSpecialChar)
    };
}

// Derives a pseudo-random start index for slicing password
function getRandomSliceStart(seed, length) {
    if (length < 4 || length > 100) {
        console.warn("Requested password length is invalid. Defaulting to start at 0.");
        return 0;
    }

    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        hash = (hash << 5) - hash + seed.charCodeAt(i);
        hash |= 0; // 32-bit signed integer
    }

    const maxStart = 256 - length;
    return Math.abs(hash) % maxStart;
}
