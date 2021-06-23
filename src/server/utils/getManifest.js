const path = require('path'),
    fs = require('fs').promises;

module.exports = async function getManifest() {
    const manifestPath = path.join(process.cwd(), 'public/manifest.json');

    if (process.env.NODE_ENV === 'production') {
        // when requiring a JSON file the object will be cached the first time it's required,
        // for development this means you'd need to restart the server every time your front
        // end scripts changed or it'd be sending an old script, but this is
        // more efficient for production, so we're doing both.
        return require(manifestPath);
    }
    //reload every time for development
    return JSON.parse((await fs.readFile(manifestPath)).toString());
}

