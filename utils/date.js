export const uploadDate = (seconds) => {
    const date = new Date(seconds * 1000)
    const dayDate = date.toDateString()
    return {
        day: dayDate.split(" ")[0],
        fullDate: dayDate.slice(4, dayDate.length),
        time: `${date.getHours()}:${date.getMinutes()}`,
    }
}
