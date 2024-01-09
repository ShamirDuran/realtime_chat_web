export const apiConfig = {
  baseUrl: 'http://localhost:3001',
}

export const headerToken = {
  Authorization: `Bearer ${localStorage.getItem('token')}`,
}
