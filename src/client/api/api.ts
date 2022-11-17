import axios from 'axios'
import { stringify } from 'query-string'
import {
  AuthLoginResponse,
  BannedAddRequest,
  BannedAddResponse,
  DataResponse,
  RolesChangeRequest,
  RolesChangeResponse,
  ServiceFindRequest,
  ServicesCreateRequest,
  ServicesDeleteRequest,
  ServicesDeleteResponse,
  ServiceUpdateRequest,
  ServiceUpdateResponse,
  UnbannedRequest,
  UnbannedResponse,
  UserResponse,
  UserUpdatePoeResponse,
  VouchesGiveRequest,
  VouchesGiveResponse
} from '../../common-interface'
import { LocalStorage } from '../storage/localStorage'

const headers = () => {
  const userLocalStorage = new LocalStorage('user')
  if (userLocalStorage.get() && userLocalStorage.get() !== null) {
    return { Authorization: `Bearer ${userLocalStorage.get().access_token}` }
  } else return {}
}

const instance = axios.create({
  baseURL: 'http://localhost:8000/api/',
  timeout: 1000,
  headers: headers()
})

export const ServicesApi = {
  getServices(data: ServiceFindRequest) {
    const search = stringify(data)
    return instance.get(`services/${search}`)
  },
  createService(data: ServicesCreateRequest) {
    return instance.post<void>(`services`, data)
  },
  updateService(data: ServiceUpdateRequest) {
    return instance.put<ServiceUpdateResponse>(`services`, data)
  },
  deleteService(data: ServicesDeleteRequest) {
    return instance.delete<ServicesDeleteResponse>(`services`, {
      data: data
    })
  }
}

export const profileApi = {
  async updateProfile() {
    return instance.put<UserUpdatePoeResponse>(`user/character`)
  },
  getProfile() {
    return instance.get<UserResponse>(`user`)
  },
  getPublicProfile(accountName: string) {
    return instance.get<UserResponse>(`user/public/${accountName}`)
  },
  connectDiscord(data: { code: string | null }) {
    return instance.put<void>(`user/discord`, data)
  }
}

export const vouches = {
  giveVouch(data: VouchesGiveRequest) {
    return instance.post<VouchesGiveResponse>(`vouches`, data)
  }
}

export const different = {
  data() {
    return instance.get<DataResponse>(`data`)
  }
}

export const auth = {
  async signin(data: { code: string }) {
    return instance.post<AuthLoginResponse>(`auth/login`, data)
  }
}

export const admin = {
  ban(data: BannedAddRequest) {
    return instance.post<BannedAddResponse>(`admin/banned`, data)
  },

  unban(data: UnbannedRequest) {
    return instance.delete<UnbannedResponse>(`admin/unbanned`, {
      data: data
    })
  },
  roleUpdate(data: RolesChangeRequest) {
    return instance.post<RolesChangeResponse>(`admin/giverole`, data, {})
  }
}

export const reports = {
  closeReports(data: {
    accountName: string
    id: number
    userUuid: string
    statusAccept: boolean
  }) {
    return instance.put('reports/close', data)
  },
  createReports(data: {
    accountName: string
    description: string
    arrayLinks: string[]
  }) {
    return instance.post<{ message: string }>('reports/createreport', data)
  },
  reports(statusClose: boolean) {
    return instance.get(`reports?statusClose=${statusClose ? 'true' : 'false'}`)
  }
}
