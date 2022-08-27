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
        "daysRestriction": 0,
        "freeDays": 0,
        "places": places,
        "timePerDay": 600, // 10 hours hardcoded for now 
        "travelMode": "DRIVING"
    }

    const backendResponse = await backend.post(
        '/trip/optimal-route', 
        backendCalculatorInputs, 
        { headers: {"Access-Control-Allow-Origin": "*"}, withCredentials: true }
    ).catch((error) => {
        return null
    });
    
    return backendResponse?.data
}

export const logout = async () => {
    const response = await backend.delete('/user/tokens',{ headers: {"Access-Control-Allow-Origin": "*"} , withCredentials: true})
        .catch((error) => {
            console.log(error)
        })

        if(response){
            window.location = '/'
        }
}

export const logIn = async (email, password) => {
    const response = await backend.post('/user/tokens', {mail: email, password: password}, {withCredentials: true})
        .catch(function (error) { 
            return null
        })
    return response?.data
    
}

export const singUp = async (email, password) => {
    const response = await backend.post('/user', {mail: email, password: password})
        .catch((error) => {
            if(error.response){
                return {status: "Error", msg: error.response.data.error}
            } else {
                return {status: "Error", msg: error.message}
            }
        })

        return response
}