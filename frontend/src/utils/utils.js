const groupByDate = (array) => {
    if (!array || array?.length === 0) {
        return [];
      }
    let first = array[0].releaseMonth+"/"+array[0].releaseYear
    let groupedArray = []
    let index = 0
    groupedArray[index] = []
    array.forEach(item => {
        if(first === item.releaseMonth+"/"+item.releaseYear) {
            groupedArray[index].push(item)
        } else {
            index++
            groupedArray[index] = [item]
            first = item.releaseMonth+"/"+item.releaseYear
        }
    })
    return groupedArray
}
export { groupByDate }