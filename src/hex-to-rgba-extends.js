
const trimSymbol = (symbol) => {
    return symbol.slice(1);
}

const hexToRgbaExtends = (hex) => {
    let cHex = trimSymbol(hex);
    let a = 1;
    let r = parseInt(cHex.slice(0, 2), 16);
    let g = parseInt(cHex.slice(2, 4), 16);
    let b = parseInt(cHex.slice(4, 6), 16);
    return { r: r, g: g, b: b, a: a }
}

export default hexToRgbaExtends;