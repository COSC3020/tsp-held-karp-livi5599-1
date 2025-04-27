function tsp_hk(distance_matrix) {
    const cities = new Set();
    for (let city = 0; city < distance_matrix.length; city++) {
        cities.add(city);
    }
    console.log(cities);
    let start = [...cities][0];

    console.log(distance_matrix[start]);

    return heldKarp(distance_matrix, cities, start);
}

function heldKarp(distance_matrix, cities, start) {
    const cache = new Map();
    let tourLen = undefined;
    // for (city of cities) {
    //     if (distance_matrix[start][city] != 0 && city != start) {
    //         var end = city;
    //         break;
    //     }
    // }
    //console.log("end = ", end);
    if (Math.abs(cities.size) == 2) { //base case
        console.log("2 cities in set");
        tourLen = distance_matrix[start][end];
        console.log("tourLen = ", tourLen);
        return tourLen;
    }
    else {
        //return the min of
        let minDist = Infinity;
        for (city of cities) {
            if (city == start) {
                continue;
            }
            cities.delete(start);
            console.log("removed start from cities. Cities = ", cities);
            let totalDistance = heldKarp(distance_matrix, cities, city) + distance_matrix[start][city];
            console.log("totalDistance = ", totalDistance);
            if (totalDistance < minDist) {
                minDist = totalDistance;
            }
        }
    }
}
