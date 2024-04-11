import 'react-native-get-random-values'

import { v4 as uuidv4 } from 'uuid'

export const generateUsername = (): string => {
  return 'user_' + uuidv4().split('-').join('').slice(0, 13)
}
