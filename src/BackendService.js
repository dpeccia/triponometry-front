import axios from 'axios';
import _ from 'lodash';

const backend = axios.create({
    baseURL: 'http://localhost:8080/',
});

const getMinutes = (mealTime) => {
    if (mealTime.time === 'h') return mealTime.number * 60
    return mealTime.number
}

export const calculateNewTrip = async (calculatorInputs) => {
    const accomodation = {
        name: calculatorInputs.accommodation.name,
        coordinates: {
            latitude: calculatorInputs.accommodation.latitude,
            longitude: calculatorInputs.accommodation.longitude
        },
        timeSpent: null
    }
    const activities = calculatorInputs.activities.map((activity) => {
        return ({
            name: activity.name,
            coordinates: {
                latitude: activity.latitude,
                longitude: activity.longitude
            },
            timeSpent: 120 // 2 hours hardcoded for now
        })
    })
    const places = [accomodation].concat(activities)

    const backendCalculatorInputs = {
        "places": places,
        "travelMode": calculatorInputs.mobility,
        "time": {
            "startHour": calculatorInputs.horarios.despertarse,
            "finishHour": calculatorInputs.horarios.dormirse,
            "breakfast": getMinutes(calculatorInputs.horarios.desayuno),
            "lunch": getMinutes(calculatorInputs.horarios.almuerzo),
            "snack": getMinutes(calculatorInputs.horarios.merienda),
            "dinner": getMinutes(calculatorInputs.horarios.cena),
            "freeDays": calculatorInputs.horarios.libres
        }
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

export const saveNewTrip = async (tripName, calculatorInputs, calculatorOutputs) => {
    const request = {
        "name": tripName,
        "calculatorInputs": _.omit(calculatorInputs, ['days', 'money']),
        "calculatorOutputs": calculatorOutputs
    }

    const backendResponse = await backend.post(
        '/trip', 
        request, 
        { headers: {"Access-Control-Allow-Origin": "*"}, withCredentials: true }
    ).catch((error) => {
        return null
    });
    
    return backendResponse?.data
}

export const archiveTrip = async (tripId) => {
    const request = {
        "id": tripId,
        "newStatus": "ARCHIVED"
    }

    const backendResponse = await backend.put(
        `/trip`,
        request ,
        { headers: {"Access-Control-Allow-Origin": "*"}, withCredentials: true }
    ).catch((error) => {
        return null
    });
    
    return backendResponse?.data
}

export const unarchivedTrip = async (tripId) => {
    const request = {
        "id": tripId,
        "newStatus": "ACTIVE"
    }

    const backendResponse = await backend.put(
        `/trip`,
        request ,
        { headers: {"Access-Control-Allow-Origin": "*"}, withCredentials: true }
    ).catch((error) => {
        return null
    });

    return backendResponse?.data
}

export const getMyTrips = async () => {
    const backendResponse = await backend.get(
        '/trip', 
        { headers: {"Access-Control-Allow-Origin": "*"}, withCredentials: true }
    ).catch((error) => {
        return null
    });
    
    return backendResponse?.data
}

export const getMyTrip = async (id) => {
    const backendResponse = await backend.get(
        `/trip/info?tripId=${id}`,
        { headers: {"Access-Control-Allow-Origin": "*"}, withCredentials: true }
    ).catch((error) => {
        return null
    });

    return backendResponse?.data
}

export const getAllTrips = async () => {
    const backendResponse = await backend.get(
        '/trip/all',
        { headers: {"Access-Control-Allow-Origin": "*"}, withCredentials: true }
    ).catch((error) => {
        return null
    });
    return backendResponse?.data
}

export const logout = async () => {
    const response = await backend.delete('/user/tokens',{ headers: {"Access-Control-Allow-Origin": "*"} , withCredentials: true})
        .catch((error) => {
            return null
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

export const loadCalendarEvents = async (eventsList) => {
    const calendarRequest = {
        "events": eventsList,
        "startDate": {
          "day": 29,
          "hour": 0,
          "minute": 0,
          "month": 7,
          "year": 2022
        }
    };

    const response = await backend.post(
      'calendar/rawContent', 
      calendarRequest, 
      { headers: {"Access-Control-Allow-Origin": "*"}}
    ).catch((error) => {
      return null
    }).then((response) => {
        return response?.data;
    });

    return response
}

export const loadMapKml = async (kmlId) => {
    const response = await backend.get(`trip/kml/${kmlId}`,
    {headers: {"Access-Control-Allow-Origin": "*"}})
    .catch((error) => {
      return null
    }).then((response) => {
        return response?.data;
    });

    return response
}

export const checkLogin = async () => {
    const response = await backend.get('/user', {withCredentials: true})
        .catch((error) => {
            return null
        })
    return response?.data
}