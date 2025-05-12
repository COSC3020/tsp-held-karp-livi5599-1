function tsp_hk(distance_matrix) {
    if (distance_matrix.length == 0 || distance_matrix.length == 1) {
        return 0;
    }

    const cities = new Set(); //cities (including start) not visited yet
    for (let city = 0; city < distance_matrix.length; city++) {
        cities.add(city);
    }
    console.log(cities);
    const start = 0;
    const cache = new Map();
    console.log("cache = ", cache);
    
    return heldKarp(distance_matrix, cities, start, cache);
}

function heldKarp(distance_matrix, cities, start, cache) {
    console.log("Entered heldKarp with cities:", cities, "and start:", start);
    if (Math.abs(cities.size) == 2) { //base case
        console.log("2 cities in set");
        console.log("start = ", start);
        console.log("is start in cities? ", cities.has(start));
        let otherCity = [...cities].find(city => city !== start);
        console.log("otherCity = ", otherCity);
        return distance_matrix[start][otherCity];
        // for (let city of cities) {
        //     console.log("city = ", city);
        //     if (city != start) {
        //         console.log("returning ", distance_matrix[start][city]);
        //         return distance_matrix[start][city];
        //     }
        // }
    }
    
    let minDist = Infinity;
    for (let city of cities) {
        console.log("city = ", city);
        if (city === start) {
            continue;
        }
        let newCities = new Set(cities);
        console.log("newCities = ", newCities);
        newCities.delete(start);
        console.log("removed start from cities. newCities = ", newCities);
        let key = JSON.stringify([...newCities].sort()) + "|" + city;
        console.log("key = ", key);
        //let totalDistance = 0;
        if (cache.has(key)) {
            minDist = Math.min(minDist, cache.get(key) + distance_matrix[start][city]);
            continue;
            // console.log("Cache has key, retrieving from cache:", key);
            // totalDistance = cache.get(key) + distance_matrix[start][city];
        }

        console.log("Cache does not have key, calculating subproblem for:", key);
        //console.log("distance_matrix[start][city] = ", distance_matrix[start][city]);
        let subProb = heldKarp(distance_matrix, newCities, city, cache);
        let totalDistance = subProb + distance_matrix[start][city];
        console.log("SubProb distance:", subProb, "Total distance:", totalDistance);
        cache.set(key, subProb);
        //else {
            // console.log("Cache does not have key, calculating subproblem for:", key);
            // //console.log("distance_matrix[start][city] = ", distance_matrix[start][city]);
            // let subProb = heldKarp(distance_matrix, newCities, city, cache);
            // totalDistance = subProb + distance_matrix[start][city];
            // console.log("SubProb distance:", subProb, "Total distance:", totalDistance);
            // cache.set(key, subProb);
        //}
        minDist = Math.min(minDist, totalDistance);
        // if (totalDistance < minDist) {
        //     minDist = totalDistance;
        //     console.log("new minDist = ", minDist);
        // }
    }
    console.log("Returning minDist:", minDist);
    return minDist;
}
