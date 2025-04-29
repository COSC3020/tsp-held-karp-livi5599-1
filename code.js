function tsp_hk(distance_matrix) {
    const cities = new Set();
    for (let city = 0; city < distance_matrix.length; city++) {
        cities.add(city);
    }
    console.log(cities);
    let start = [...cities][0];
    const cache = new Map();

    console.log(distance_matrix[start]);

    heldKarp(distance_matrix, cities, start, cache);
    //return -1;
}

function heldKarp(distance_matrix, cities, start, cache) {
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
        for (let city of cities) {
            if (city != start) {
                tourLen = distance_matrix[start][city];
                break;
            }
        }
        return tourLen; //final result
    }
    else {
        //return the min of
        let minDist = Infinity;
        for (city of cities) {
            if (city == start) {
                continue;
            }
            let newCities = new Set(cities);
            newCities.delete(start);
            console.log("removed start from cities. Cities = ", cities);
            let key = JSON.stringify([...newCities].sort()) + "," + city;
            let totalDistance = 0;
            if (cache.has(key)) {
                totalDistance = cache.get(key) + distance_matrix[start][city];
            }
            else {
                totalDistance = heldKarp(distance_matrix, newCities, city, cache) + distance_matrix[start][city];
                console.log("totalDistance = ", totalDistance);
                if (totalDistance < minDist) {
                    minDist = totalDistance;
                }
            }
            cache.set(key, minDist);
        }
        return minDist; //needs to be stored in cache
    }
}
