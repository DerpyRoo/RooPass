async function passGen() {
    console.log("Starting passGen()");

    const validated = validateInputs();
    if (!validated) {
        return null;
    }

    const saltText = (typeof userSalt !== 'undefined' && !userSalt.startsWith('##')) ? userSalt : '';
    if (!saltText) {
        error("Missing or invalid key.js value.");
        return null;
    }

    const pepper = await generateSimplePepper(validated.masterPassword, validated.programName);
    const combinedString = `${validated.username}:${validated.masterPassword}:${validated.programName}:${saltText}`;
    console.log("Combined input:", combinedString);

    let hashedInput;
    try {
        hashedInput = await sha256(combinedString);
        console.log("SHA-256 hash:", hashedInput);
    } catch (err) {
        error("Hashing failed.");
        return null;
    }

    const pepperedInput = pepper.secondHalf + hashedInput + pepper.firstHalf;

    let scrambled;
    try {
        scrambled = scrambleObscuredText(pepperedInput);
    } catch (err) {
        error("Scrambling failed.");
        return null;
    }

    const sliceStart = getRandomSliceStart(hashedInput, validated.length);
    const finalPassword = scrambled.slice(sliceStart, sliceStart + validated.length);

    try {
        $('#password-text').val(finalPassword);
    } catch (err) {
        error("Couldn't display the password.");
        return null;
    }

    console.log("passGen() complete.");
    return true;
}

// Local helper only used by passGen
async function generateSimplePepper(masterPassword, programName) {
    const input = `${programName}:${masterPassword}`;
    const hex = await sha256(input);

    if (!hex || hex.length < 8) {
        console.warn("Pepper digest too short.");
        return { firstHalf: 'ffff', secondHalf: 'ffff' };
    }

    return {
        firstHalf: hex.slice(0, 4),
        secondHalf: hex.slice(-4)
    };
}
