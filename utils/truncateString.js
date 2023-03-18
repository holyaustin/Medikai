export default function truncatStr(fullStr, strLen){
    if (fullStr.length <= strLen) return fullStr
    const separator = "..."
    const separatorLength = separator.length
    const charToShow = strLen - separatorLength
    const frontChars = Math.ceil(charToShow / 2)
    const backChars = Math.floor(charToShow / 2)

    return (
        fullStr.substr(0, frontChars) +
        separator +
        fullStr.substr(fullStr.length - backChars)
    )
}