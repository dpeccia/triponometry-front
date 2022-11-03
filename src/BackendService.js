import axios from 'axios';
import _, { isNull, isUndefined } from 'lodash';

const backend = axios.create({
    baseURL: 'http://localhost:8080/',
    headers: { "Access-Control-Allow-Origin": "*" }, 
    withCredentials: true
});

const handleSuccess = (response) => {
    return response?.data
}

const handleError = (error) => {
    if(isNull(error?.response?.data) || isUndefined(error?.response?.data)) {
        return { status: "Error", msg: "Error de conexión con el servidor" }
    }
    if(error.response.data.error === "Internal Server Error") {
        return { status: "Error", msg: "Ocurrió un error inesperado" }
    }
    return { status: "Error", msg: error.response.data.error }
}

const get = async (endpoint) => {
    return await backend.get(endpoint).then(handleSuccess).catch(handleError);
}

const erase = async (endpoint) => {
    return await backend.delete(endpoint).then(handleSuccess).catch(handleError);
}

const post = async (endpoint, body) => {
    return await backend.post(endpoint, body).then(handleSuccess).catch(handleError);
}

const put = async (endpoint, body) => {
    return await backend.put(endpoint, body).then(handleSuccess).catch(handleError);
}

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

    return await post('/trip/optimal-route', backendCalculatorInputs)
}

export const saveNewTrip = async (tripName, calculatorInputs, calculatorOutputs) => {
    const request = {
        "name": tripName,
        "calculatorInputs": calculatorInputs,
        "calculatorOutputs": calculatorOutputs
    }

    return await post('/trip', request)
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

    return await put('/trip/update', request)
}

export const archiveTrip = async (tripId) => {
    const request = {
        "id": tripId,
        "newStatus": "ARCHIVED"
    }

    return await put(`/trip`, request)
}

export const unarchivedTrip = async (tripId) => {
    const request = {
        "id": tripId,
        "newStatus": "ACTIVE"
    }

    return await put(`/trip`, request)
}

export const getMyTrips = async () => {
    return await get('/trip')
}

export const getMyTrip = async (id) => {
    return await get(`/trip/info/${id}`)
}

export const getAllTrips = async () => {
    return await get('/trip/all')
}

export const getATrip = async (id) => {
    return await get(`/trip/explorar/${id}`)
}

export const logout = async () => {
    return await erase('/user/tokens')
}

export const logIn = async (email, password) => {
    const request = { mail: email, password: password }
    return await post('/user/tokens', request)
}

export const googleLogIn = async (gmail, gpassword, gusername) => {
    const request = { mail: gmail, password: gpassword, username: gusername }
    return await post('/user/gtokens', request)
}

export const signUp = async (email, password, username) => {
    const request = { mail: email, password: password, username: username }
    return await post('/user', request)
}

export const loadCalendarEvents = async (eventsList, startDate) => {

    const calendarRequest = {
        "events": eventsList,
        "startDate": {
          "day": startDate.getDate()+1,
          "hour": 0,
          "minute": 0,
          "month": startDate.getMonth(),
          "year": startDate.getFullYear()
        }
    };

    return await post('calendar/rawContent', calendarRequest)
}

export const loadMapKml = async (kmlId) => {
    return await get(`trip/kml/${kmlId}`)
}

export const checkLogin = async () => {
    return await get('/user')
}

export const deleteDraft = async (draftId) => {
    return await erase(`trip/delete/${draftId}`)
}

export const saveNewRating = async (id, score, hasDone, review) => {
    const request = {
        "description": review,
        "done": hasDone,
        "stars": score
    }

    return await post(`/trip/review/${id}`, request)
}

export const getActivityInfo = async (cityName, activityName) => {
    const request = {
        "cityName": cityName,
        "activityName": activityName
    }

    return await post('/trip/info/activity', request)
}

export const getUserInfo = async (userId) => {
    return await get(`/user/${userId}`)
}

export const updateTripAvatar = async (tripId, imageUrl) => {
    const request = {
        "id": tripId,
        "image": imageUrl
    }

    return await post('/trip/image', request)
}

export const updateUserPassword = async (oldPassword, newPassword) => {
    const request = {
       "newPassword": newPassword,
       "oldPassword": oldPassword
    }

    return await post('/user/password', request)
}

export const sendRestorePasswordEmail = async (email) => {
    const request = { "email": email }

    return await post('/user/password/email', request)
}

export const verifyRestorePasswordCode = async (restoreInfo) => {
    const request = { "email": restoreInfo.email, "code": restoreInfo.verificationCode }

    return await post('/user/password/verify', request)
}

export const recoverPassword = async (restoreInfo, newPassword) => {
    const request = { "email": restoreInfo.email, "code": restoreInfo.verificationCode, "newPassword": newPassword }

    return await post('/user/password/recover', request)
}