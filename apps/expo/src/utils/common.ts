export default function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message

  if (String(error) === '[object Object]') return JSON.stringify(error)
  else return String(error)
}


export function makeChatName(users: any[], userData: any): string {
  const filteredUsers = users.filter((user) => userData.username.trim() !== user.username.trim())

  if (users.length > 3) {
    return String(
      filteredUsers[0].username.trim() +
        ', ' +
        filteredUsers[1].username.trim() +
        ', + ' +
        (filteredUsers.length - 2) +
        ' more',
    )
  }
  return String(filteredUsers[0].username?.trim() + ' and ' + filteredUsers[1].username.trim())
}

// export function log(msg = "") {
//   return console.log(new Date() + ":> " + msg);
// }
