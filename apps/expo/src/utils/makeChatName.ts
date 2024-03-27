export function makeChatName(users: any[], userData: any): string {

  const filteredUsers = users.filter((user) => userData.username.trim() !== user.username.trim())

  if(users.length > 3){
    return String(filteredUsers[0].username.trim() + ", " + filteredUsers[1].username.trim() + ", + " + (filteredUsers.length-2) + " more")
  }
  return String(filteredUsers[0].username.trim() + " and " + filteredUsers[1].username.trim())
}