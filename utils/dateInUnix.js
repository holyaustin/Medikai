export default function dateInUnix(date){
    return Math.floor(new Date(date).getTime() / 1000)
}