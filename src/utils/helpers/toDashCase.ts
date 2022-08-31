const toDashCase = (s: string) => s.replace(/[A-Z]/g, '-$&').toLowerCase()

export default toDashCase
