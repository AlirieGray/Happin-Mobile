import serverPath from '../paths';
export const RSVP_YES = 'RSVP_YES';
export const RSVP_NO = 'RSVP_NO';

export const rsvpYes = (userId, eventId) => {
  type: RSVP_YES,
  eventId
}

export const rsvpNo = (userId, eventId) => {
  type: RSVP_NO,
  eventId
}

export const RSVP(isAttending, userId, eventId) {
  let config = {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `userId=${userId}&rsvp=${isAttending}`
  }

  return dispatch => {
    return fetch(`${serverPath}/${eventId}/rsvp`, conifg).then((res) => {
      if (res.status !== 200) {
        return Promise.reject("Error: could not RSVP")
      }

    }).catch(err => console.log(err))
  }
}
