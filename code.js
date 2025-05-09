function tsp_hk(distance_matrix) {
    if (distance_matrix.length == 0 || distance_matrix.length == 1) {
        return 0;
    }
    const cities = new Set(); //cities (including start) not visited yet
    for (let city = 0; city < distance_matrix.length; city++) {
        cities.add(city);
    }
    console.log(cities);
    let start = [...cities][0];
    const cache = new Map();
    console.log("cache = ", cache);

    console.log(distance_matrix[start]);

    return heldKarp(distance_matrix, cities, start, cache);
}

function heldKarp(distance_matrix, cities, start, cache) {
    let tourLen = undefined;
    if (Math.abs(cities.size) == 2) { //base case
        console.log("2 cities in set");
        for (let city of cities) {
            console.log("city = ", city);
            if (city != start) {
                return distance_matrix[start][city];
            }
        }
    }
    else {
        //return the min of
        let minDist = Infinity;
        for (city of cities) {
            console.log("city = ", city);
            if (city == start) {
                continue;
            }
            let newCities = new Set(cities);
            console.log("newCities = ", newCities);
            newCities.delete(start);
            console.log("removed start from cities. newCities = ", newCities);
            let key = JSON.stringify([...newCities].sort()) + "," + city;
            console.log("key = ", key);
            let totalDistance = 0;
            if (cache.has(key)) {
                totalDistance = cache.get(key) + distance_matrix[start][city];
            }
            else {
                console.log("distance_matrix[start][city] = ", distance_matrix[start][city]);
                totalDistance = heldKarp(distance_matrix, newCities, city, cache) + distance_matrix[start][city];
                console.log("totalDistance = ", totalDistance);
            }
            if (totalDistance < minDist) {
                minDist = totalDistance;
                console.log("new minDist = ", minDist);
            }
            console.log("updated cache = ", cache);
        }
        let finalKey = JSON.stringify([...cities].sort()) + "," + start;
        cache.set(finalKey, minDist);
        return minDist; //needs to be stored in cache
    }
}
