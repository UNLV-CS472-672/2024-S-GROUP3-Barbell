export default function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message

  if (String(error) === '[object Object]') return JSON.stringify(error)
  else return String(error)
}