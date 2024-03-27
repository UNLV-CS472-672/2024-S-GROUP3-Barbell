export function makeChatName(users: any[]): string {
  const length = users.length
  // TODO: check and make sure user that is logged in name doesnt show in title
  // remove space from usernames
  if(length > 3){
    return String(users[0].username.trim() + ", " + users[1].username.trim() + ", + " + (length-2) + " more")
  }
  return String(users[0].username.trim() + " and " + users[1].username.trim())
}