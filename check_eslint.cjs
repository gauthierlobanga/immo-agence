const fs = require('fs');

try {
    let raw = fs.readFileSync('eslint-report.json', 'utf16le');

    if (!raw.startsWith('[')) {
        raw = fs.readFileSync('eslint-report.json', 'utf8');
    }

    const data = JSON.parse(raw.replace(/^\uFEFF/, ''));
    const files = data.filter(f => f.errorCount > 0).map(f => f.filePath);
    console.log(files.join('\n'));
} catch (e) {
    console.error(e);
}
