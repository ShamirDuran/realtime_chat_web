import { debounce } from 'lodash'
import { useEffect, useRef } from 'react'

/**
 * Debounce a callback function
 * @param callback Function to be debounced
 * @param delay Time in milliseconds to wait before calling the callback
 * @returns Debounced callback
 * @example
 * const debouncedCallback = useDebouncer(() => console.log('debounced'))
 * @example
 * const debouncedCallback = useDebouncer(handleFetchContacts, 500)
 */
export const useDebouncer = (callback: (args: any) => void, delay: number = 300) => {
  const debouncedCallback = useRef(debounce(callback, delay)).current

  useEffect(() => {
    return () => debouncedCallback.cancel()
  }, [debouncedCallback])

  return debouncedCallback
}
