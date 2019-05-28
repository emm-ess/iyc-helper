export function unique(arr: any[]){
    const result: any[] = []
    arr.forEach((ele) => {
        if (!result.includes(ele)) {
            result.push(ele)
        }
    })
    return result
}

export function hash(str: string){
    if (str.length === 0) {
        return 0
    }
    let hash = 0
    let chr
    for (let i = 0; i < str.length; i++) {
        chr = str.charCodeAt(i)
        hash = ((hash << 5) - hash) + chr
        hash |= 0
    }
    return hash
}
