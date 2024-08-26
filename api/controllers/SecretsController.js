const Secrets = require('../models/SecretsModel.js')

// Functions
const replacements = {
    '?': 'ph1',
    '/': 'ph2',
    ':': 'ph3',
    '=': 'ph4',
    '.': 'ph5',
    '-': 'Ph6'
};

const reverseReplacements = Object.fromEntries(Object.entries(replacements).map(([k, v]) => [v, k]));

function encode(str) {
    const replacedStr = str.replace(/[?/:=.-]/g, match => replacements[match] || match);    
    return replacedStr.split('').map(char => {
        if (char.match(/[a-z]/i)) {
            const base = char.charCodeAt(0) >= 65 && char.charCodeAt(0) <= 90 ? 65 : 97;
            return String.fromCharCode(((char.charCodeAt(0) - base + 3) % 26) + base);
        } else {
            return char;
        }
    }).join('');
}

function keyCode(str) {
    const lastSix = str.slice(-6).toUpperCase(); // Get the last six characters
    return lastSix;
}

// Get all
const getSecret = async (req, res) => {
        const secrets = await Secrets.find({}).sort({createdAt:-1})
        res.status(200).json(secrets)
}
// Key code
// Get by Key Code
const getSecretKeycode = async (req, res) => {
    const { key_code } = req.params;
    
    try {
        // Find all secrets with the given key_code
        const secrets = await Secrets.find({ key_code });

        if (secrets.length === 0) {
            return res.status(404).json({ error: 'No secrets found with this key code' });
        }

        // Return the array of corresponding e_links
        res.status(200).json(secrets.map(secret => secret.e_link));
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Create
const createSecret = async(req, res) => {
    let { e_link } = req.body;
    
    try {
        // Encode the e_link
        const encodedLink = encode(e_link);

        // Generate the key code from the encoded link
        const key_code = keyCode(encodedLink);

        // Create the secret with the encoded link and generated key code
        const secrets = await Secrets.create({ e_link: encodedLink, key_code });
        
        res.status(200).json(secrets);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createSecret, getSecret, getSecretKeycode
}