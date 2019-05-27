// inspired by: https://github.com/pre-commit/pre-commit-hooks/blob/master/pre_commit_hooks/check_merge_conflict.py

const fs = require('fs')
const readline = require('readline')
const FileGlob = require('fast-glob')

const SRC_GLOB = '{public,src}/**/*.{sass,scss,css,js,ts,vue,html}'
const CONFLICT_PATTERNS = [
    '<<<<<<<',
    '=======',
    '>>>>>>>',
]

const CONFLICTING_FILES = []

checkForWarnings = async () => {
    const files = await FileGlob(SRC_GLOB)

    const processPromisses = []

    files.forEach((file) => {
        processPromisses.push(_processFile(file))
    })

    await Promise.all(processPromisses)

    if(CONFLICTING_FILES.length == 0){
        process.exit(0)
    }
    else {
        console.log('\x1b[31m')
        console.log('You missed merge conflicts in these files:')
        CONFLICTING_FILES.forEach((conflictFile) => {
            console.log(`\t${conflictFile}`)
        })
        console.log('\x1b[0m')
        process.exit(1)
    }
}

_processFile = async (file) => {
    return new Promise((resolve, reject) => {
        const rl = readline.createInterface({
            input: fs.createReadStream(file),
            crlfDelay: Infinity
        })
        .on('line', (line) => {
            const hasError = CONFLICT_PATTERNS.some((pattern) => line.startsWith(pattern))

            if(hasError){
                CONFLICTING_FILES.push(file)
                rl.close()
            }
        })
        .on('close', () => resolve())
        .on('error', (err) => reject())
    })
}

checkForWarnings()
