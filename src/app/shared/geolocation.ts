export interface GeoLocationCoords {
  lat: number,
  lon: number
}

export const getGeolocationCoords = (): GeoLocationCoords => {
  const geolocation = navigator.geolocation
  const defaultPosition = {lat: 44.4598629, lon: 11.1955072}
  const noPosMsg = 'Unable to get your position :('

  if (geolocation) {
    let p = defaultPosition
    geolocation.getCurrentPosition(
      (position) => {
        p = {
          lat: position.coords.latitude,
          lon: position.coords.longitude
        }
      },
      (error) => {
        console.error(error.message)
        console.warn(noPosMsg)
      }
    )
    return p
  } else {
    console.warn(noPosMsg)
    return defaultPosition
  }
}
