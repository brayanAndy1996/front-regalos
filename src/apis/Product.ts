import axios from 'axios'
import { urlBasicFinal, EndpointConfig } from './Api'

const END_POINT = 'productos'

const cfg = new EndpointConfig()

interface ProductApiInterface {
  fetchProducts: (params: object) => Promise<any>
  fetchAllUsers: () => Promise<any>
  fetchUserByFilters: (params: object) => Promise<any>
  fetchUserRoleByFilters: (params: object) => Promise<any>
  fetchUser: (id: string) => Promise<any>
  createUser: (data: object) => Promise<any>
  updateProduct: (id: string, data: object) => Promise<any>
  deleteUser: (id: string) => Promise<any>
}

const ProductApi: ProductApiInterface = {
  fetchProducts: async (params) => {
    const headers = cfg.headerToken()
    const { data: products } = await axios.get(`${urlBasicFinal}/${END_POINT}/get-productos`, {
      headers,
      params
    })
    return products
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
  updateProduct: async (id, data) => {
    const product = await cfg.ApiBasic().put(`${END_POINT}/update-product/${id}`, data)
    return product
  },
  deleteUser: async id => {
    const user = await cfg.ApiBasic().delete(`${END_POINT}/delete-user/${id}`)
    return user
  }
}

export default ProductApi
