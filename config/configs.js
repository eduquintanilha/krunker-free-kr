
/**
 *  Add your user and password on environment variables first.
 *  On Mac/Linux, use: export KRUNKER_USER="Guest_1"
 *  On Windows, use: set KRUNKER_USER="Guest_1"
 */

module.exports = {
    KRUNKER_URL: 'https://krunker.io/',
    KRUNKER_USER: process.env.KRUNKER_USER,
    KRUNKER_PASS: process.env.KRUNKER_PASS
}