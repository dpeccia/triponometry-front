import axios from 'axios';

const backend = axios.create({
    baseURL: 'http://localhost:8080/',
});

export const calculateNewTrip = async (calculatorInputs) => {
    const accomodation = {
        coordinates: {
            latitude: calculatorInputs.accommodation.latitude,
            longitude: calculatorInputs.accommodation.longitude
        },
        timeSpent: null
    }
    const activities = calculatorInputs.activities.map((activity) => {
        return ({
            coordinates: {
                latitude: activity.latitude,
                longitude: activity.longitude
            },
            timeSpent: 120 // 2 hours hardcoded for now
        })
    })
    const places = [accomodation].concat(activities)

    // TODO: agregar nombre de actividad
    const backendCalculatorInputs = {
        "places": places,
        "timePerDay": 600, // 10 hours hardcoded for now 
        "travelMode": "DRIVING",
        "startHour": 9,
        "lunch": 45,
        "dinner": 60,
        "daysRestriction": 5,
        "breakfast": 30,
        "freeDays": 2,
        "snack": 0
    }

    const backendResponse = await backend.post(
        '/trip/optimal-route', 
        backendCalculatorInputs, 
        { headers: {"Access-Control-Allow-Origin": "*"} }
    ).catch((error) => {
        return null
    });
    
    return backendResponse?.data
}