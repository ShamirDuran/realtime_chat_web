export const apiConfig = {
  baseUrl: 'http://localhost:3001',
}

export const headerToken = () => {
  const token = localStorage.getItem('token')

  return `Bearer ${token}`
}
