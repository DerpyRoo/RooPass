// Toggles the password display
function showPassword() {
    const passwordDiv = $('#password-div');

    if (passwordDiv.css('display') === 'none') {
        generatePassword();
        passwordDiv.show();
    } else {
        passwordDiv.hide();
    }
}

// Copies password to clipboard
async function copy(before, after) {
    // Default to empty strings if undefined
    if (typeof before === 'undefined' || typeof before === 'object') before = '';
    if (typeof after === 'undefined') after = '';

    // Generate password (returns true/false)
    const success = await generatePassword();
    if (!success) return false;

    let password = $('#password-text').val();
    if (!password || password.trim() === '') return false;

    // Add before/after text
    password = before + password + after;
    $('#password-text').val(password);

    // Try navigator clipboard (modern)
    try {
        await navigator.clipboard.writeText(password);
    } catch (err) {
        console.warn('Clipboard API fallback to execCommand.');
        
        // Handle visibility logic
        const wasHidden = ($('#password-div').css('display') === '' || $('#password-div').css('display') === 'none');
        $('#password-div').show();
        
        // Copy to clipboard
        selectPassword(); // highlights the text
        document.execCommand('copy');

        if (wasHidden) $('#password-div').hide();
    }
}
// Highlights password text
function selectPassword() {
    document.querySelector('#password-text').select();
}

// Displays error to UI
function error(message) {
    const errorElement = $('#error');
    const errorContainer = $('#error-div');

    errorElement.text(message);
    errorContainer.stop(true, true).fadeIn(600).delay(3000).fadeOut(600);

    errorElement.addClass('shake');
    setTimeout(() => errorElement.removeClass('shake'), 400);
}

// Only uses Gen 6 — the official and final generator
function generatePassword() {
    return passGen();
}

// Initialization on page load
function start() {
    $('#inputContainer').show();
    $('#button-container').show();
    $('#password-div').hide();

    $('#show').on('click', showPassword);
    $('#copy').on('click', copy);
    $('#password-text').on('click', selectPassword);

    // Default to allowing special characters
    document.getElementById("allowSpecialChar").checked = true;

    if (typeof $ === 'undefined') {
        console.error("jQuery is not loaded.");
        error("jQuery is not loaded. Generator cannot function.");
        return;
    }

    // Enter key triggers password generation
    $('.input-div').on('keypress', function (event) {
        if (event.which === 13) {
            event.preventDefault();
            generatePassword();
        }
    });
}

$(start);
