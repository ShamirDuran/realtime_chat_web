import { faker } from '@faker-js/faker'

const fakeChat = (size) => {
  const arr = []
  for (let i = 0; i < size; i++) {
    arr.push({
      id: i,
      message: faker.lorem.lines({
        min: 1,
        max: 3,
      }),
      time: faker.date.recent(),
      from: faker.datatype.boolean() ? 'me' : 'someone-else',
    })
  }
  return arr
}

export default fakeChat
