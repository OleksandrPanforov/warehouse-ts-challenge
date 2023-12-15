function warning(message: string):void {
    console.log(`\x1b[33m Warning: ${message} \x1b[0m`)
}

function error(message: string): void {
    console.log(`\x1b[31m Error: ${message} \x1b[0m`)
}

export {warning, error}