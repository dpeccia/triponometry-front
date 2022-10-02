import axios from 'axios';
import _ from 'lodash';

const backend = axios.create({
    baseURL: 'https://triponometry-back.herokuapp.com/'
});

const getMinutes = (mealTime) => {
    if (mealTime) {       
        if (mealTime.time === 'h') return mealTime.number * 60
        return mealTime.number
    } else {
        return null
    }
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
            timeSpent: activity.timeSpent
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

export const createDraft = async (calculatorInputs) => {
    const accomodation = calculatorInputs.accommodation ? {
        name: calculatorInputs.accommodation.name,
        coordinates: {
            latitude: calculatorInputs.accommodation.latitude,
            longitude: calculatorInputs.accommodation.longitude
        },
        timeSpent: null
    } : null
    const activities = calculatorInputs.activities ? calculatorInputs.activities.map((activity) => {
        return ({
            name: activity.name,
            coordinates: {
                latitude: activity.latitude,
                longitude: activity.longitude
            },
            timeSpent: activity.timeSpent
        })
    }) : null
    const places = [accomodation].concat(activities)

    const backendCalculatorInputs = {
        "places": places,
        "travelMode": calculatorInputs.mobility ? calculatorInputs.mobility : null,
        "time": calculatorInputs.horarios ? {
            "startHour": calculatorInputs.horarios.despertarse,
            "finishHour": calculatorInputs.horarios.dormirse,
            "breakfast": getMinutes(calculatorInputs.horarios.desayuno),
            "lunch": getMinutes(calculatorInputs.horarios.almuerzo),
            "snack": getMinutes(calculatorInputs.horarios.merienda),
            "dinner": getMinutes(calculatorInputs.horarios.cena),
            "freeDays": calculatorInputs.horarios.libres
        } : {
            "startHour": null,
            "finishHour": null,
            "breakfast": null,
            "lunch": null,
            "snack": null,
            "dinner": null,
            "freeDays": null
        }
    }

    const backendResponse = await backend.post(
        '/trip', 
        {"name": "aaa", "calculatorInputs" : backendCalculatorInputs}, 
        { headers: {"Access-Control-Allow-Origin": "*"}, withCredentials: true }
    ).catch((error) => {
        return null
    });
    
    return backendResponse?.data
}

export const saveNewTrip = async (tripName, calculatorInputs, calculatorOutputs) => {
    const request = {
        "name": tripName,
        "calculatorInputs": calculatorInputs,
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

export const saveNewEdition = async (tripId, tripName, calculatorInputs, calculatorOutputs) => {
    const request = {
        "id": tripId,
        "trip": {
            "name": tripName,
            "calculatorInputs": calculatorInputs,
            "calculatorOutputs": calculatorOutputs
        }
    }

    const backendResponse = await backend.put(
        '/trip/update', 
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
        `/trip/info/${id}`,
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

export const getATrip = async (id) => {
    const backendResponse = await backend.get(
        `/trip/explorar/${id}`,
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

        return response
}

export const logIn = async (email, password) => {
    const response = await backend.post('/user/tokens', {mail: email, password: password}, {withCredentials: true})
        .catch(function (error) { 
            return null
        })
    return response?.data
    
}

export const googleLogIn = async (gmail, gpassword, gusername) => {
    const response = await backend.post('/user/gtokens', {mail: gmail, password: gpassword, username:gusername}, {withCredentials: true})
        .catch(function (error) { 
            return null
        })
    return response?.data
}

export const singUp = async (email, password, username) => {
    const response = await backend.post('/user', {mail: email, password: password, username: username}, {withCredentials: true})
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

export const deleteDraft = async (draftId) => {
    const response = await backend.delete( `trip/delete/${draftId}`, {headers: {"Access-Control-Allow-Origin": "*"}, withCredentials: true})
        .catch((error) => {
            return null
        })
    return response
}

export const saveNewRating = async (id, score, hasDone, review) => {
    const request = {
        "description": review,
        "done": hasDone,
        "stars": score
    }

    const backendResponse = await backend.post(
        `/trip/review/${id}`,
        request,
        { headers: {"Access-Control-Allow-Origin": "*"}, withCredentials: true }
    ).catch((error) => {
        return null
    });

    return backendResponse?.data
}

export const getActivityInfo = async (cityName, activityName) => {
    const request = {
        "cityName": cityName,
        "activityName": activityName
    }

    const backendResponse = await backend.post(
        '/trip/info/activity', 
        request, 
        { headers: {"Access-Control-Allow-Origin": "*"}, withCredentials: true }
    ).catch((error) => {
        return null
    });
    
    return backendResponse?.data
}

export const getUserInfo = async (userId) => {
    const response = await backend.get(`/user/${userId}`, {headers: {"Access-Control-Allow-Origin": "*"}, withCredentials: true})
        .catch((error) => {
            return null
        });

        console.log(userId)
        return response?.data
}