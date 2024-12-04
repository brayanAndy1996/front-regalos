import axios from 'axios'
import { urlBasicFinal, EndpointConfig } from './Api'

const END_POINT = 'users'

const cfg = new EndpointConfig()

interface UserApiInterface {
  fetchUsers: (params: object) => Promise<any>
  fetchAllUsers: () => Promise<any>
  fetchUserByFilters: (params: object) => Promise<any>
  fetchUserRoleByFilters: (params: object) => Promise<any>
  fetchUser: (id: string) => Promise<any>
  createUser: (data: object) => Promise<any>
  updateUser: (email: string, data: object) => Promise<any>
  setProductFavorites:(email: string, productsFavorites: []) => Promise<any>
  deleteUser: (id: string) => Promise<any>
}

const UserApi: UserApiInterface = {
  fetchUsers: async (params) => {
    const headers = cfg.headerToken()
    const { data: users } = await axios.get(`${urlBasicFinal}/${END_POINT}/get-users`, {
      headers,
      params
    })
    return users
  },
  fetchAllUsers: async () => {
    const { data: users } = await cfg.ApiBasic().get(`${END_POINT}/get-all-users`)
    return users
  },
  fetchUserByFilters: async params => {
    const token = localStorage.getItem('token')
    const headers = {
      'Content-Type': 'application/json',
      Accept: '*/*',
      'x-token': token
    }
    const user = await axios.get(`${urlBasicFinal}/${END_POINT}/get-users-filters`, {
      params,
      headers
    })
    return user.data
  },
  fetchUserRoleByFilters: async params => {
    const user = await axios.get(`${urlBasicFinal}/${END_POINT}/get-usersRol-filters`, {
      params
    })
    return user.data
  },
  fetchUser: async id => {
    const user = await cfg.ApiBasic().get(`${END_POINT}/${id}`)
    return user
  },
  createUser: async data => {
    const user = await cfg.ApiBasic().post(`${END_POINT}/create-user`, data)
    return user
  },
  updateUser: async (email, data) => {
    const user = await cfg.ApiBasic().put(`${END_POINT}/update-user/${email}`, data)
    return user
  },
  setProductFavorites: async (email, productsFavorites) => {
    const user = await cfg.ApiBasic().put(`${END_POINT}/update-user/${email}`, { productsFavorites })
    return user
  },
  deleteUser: async id => {
    const user = await cfg.ApiBasic().delete(`${END_POINT}/delete-user/${id}`)
    return user
  }
}

export default UserApi
