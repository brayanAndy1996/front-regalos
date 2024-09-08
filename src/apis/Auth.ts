import { EndpointConfig } from './Api'

const cfg = new EndpointConfig()

const END_POINT = 'auth'

interface AuthApi {
  login: (data: { email: string, password: string }) => Promise<any>
  reset: (data: { email: string }) => Promise<any>
  setTime: (data: { email: string }) => Promise<any>
}

const Auth: AuthApi = {
  login: async (data) => {
    const { data: login } = await cfg.ApiBasic().post(`${END_POINT}/login`, data)
    return login
  },
  reset: async (data) => {
    const reset = await cfg.ApiBasic().post(`${END_POINT}/reset`, data)
    return reset
  },
  setTime: async (data) => {
    const reset = await cfg.ApiBasic().put(`${END_POINT}/set-time`, data)
    return reset
  }
}

export default Auth
