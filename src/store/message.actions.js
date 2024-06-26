import { reviewService } from '../services/review.service.js'
import { store } from './store.js'
import { ADD_MESSAGE, NEW_MESSAGE, REMOVE_MESSAGE, SET_MESSAGES } from './message.reducer.js'
import { SET_WATCHED_USER } from './user.reducer.js'
import { messageService } from '../services/message.service.js'

// Action Creators
export function getActionRemoveReview(reviewId) {
    return { type: REMOVE_MESSAGE, reviewId }
}
export function getActionAddReview(review) {
    return { type: ADD_MESSAGE, review }
}

export function gotNewMessage(review) {
    console.log(review)
    store.dispatch({ type: NEW_MESSAGE, review })
    // return { type: NEW_MESSAGE, review }
}

export function getActionSetWatchedUser(user) {
    return { type: SET_WATCHED_USER, user }
}

export async function loadMessages() {
    try {
        const messages = await messageService.query()
        store.dispatch({ type: SET_MESSAGES, messages })

    } catch (err) {
        console.log('Messages Action: err in loadMessages', err)
        throw err
    }
}

export async function addReview(review) {
    try {
        const addedReview = await reviewService.add(review)
        store.dispatch(getActionAddReview(addedReview))
        // const { score } = addedReview.byUser
        // store.dispatch({ type: SET_SCORE, score })
    } catch (err) {
        console.log('ReviewActions: err in addReview', err)
        throw err
    }
}

export async function removeReview(reviewId) {
    try {
        await reviewService.remove(reviewId)
        store.dispatch(getActionRemoveReview(reviewId))
    } catch (err) {
        console.log('ReviewActions: err in removeReview', err)
        throw err
    }
}