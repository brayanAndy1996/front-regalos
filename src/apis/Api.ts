import axios from 'axios'

// const urlBasic = process.env.NEXT_PUBLIC_URL_PRODUCTION
const urlBasic = process.env.NEXT_PUBLIC_URL_LOCAL
export const urlBasicFinal = `${urlBasic}/api`

export class EndpointConfig {
  headerToken() {
    const token = localStorage.getItem('token')

    let headersList = {
      'Content-Type': 'application/json',
      Accept: '*/*',
      'x-token': token,
    }
    return headersList
  }
  ApiBasic() {
    const headers = this.headerToken()
    const ApiBasic = axios.create({
      baseURL: `${urlBasic}/api/`,
      headers,
    })
    return ApiBasic
  }
}
