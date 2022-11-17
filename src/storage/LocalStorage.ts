import { useState } from 'react'
import { AuthLoginResponse } from '../../common-interface/auth/auth-login'
import { League } from '../../server/data/league/league.entity'

export type LocalStorageKeys = 'user' | 'league'


type GetLocalStorage<T> = T extends 'user' ? AuthLoginResponse : League

export class LocalStorage<T extends LocalStorageKeys> {
  constructor(key: T) {
    this.key = key
  }

  key: T

  remove(): void {
    localStorage.removeItem(this.key)
  }

  get(): null | GetLocalStorage<T> {
    const values = localStorage.getItem(this.key)

    if (values !== null) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const localStorageParse: GetLocalStorage<T> = JSON.parse(values)
      return localStorageParse
    } else return null
  }

  set<S extends SetLocalStorageValues<T>>(value: S): void {
    localStorage.setItem(this.key, JSON.stringify(value))
  }
}

export function useLocalStorage<T extends LocalStorageKeys>(
  key: T
): [
  GetLocalStorage<T>,
  <S extends SetLocalStorageValues<T>>(value: S) => void
] {
  const [getLocalStorage, setStoreValue] = useState<null | GetLocalStorage<T>>(
    () => {
      try {
        const values = localStorage.getItem(key)
        if (values !== null) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const localStorageParse: GetLocalStorage<T> = JSON.parse(values)
          return localStorageParse
        }
        return null
      } catch (ex) {
        console.log(ex)
        return null
      }
    }
  )

  function setLocalStorage<S extends SetLocalStorageValues<T> | null>(
    value: S
  ): void {
    try {
    } catch (ex) {
      console.log(ex)
    }
    const values = localStorage.getItem(key)
    if (values === null) {
      localStorage.removeItem(key)
    }
    setStoreValue(value)
    localStorage.setItem(key, JSON.stringify(value))
  }

  return [getLocalStorage, setLocalStorage]
}
