export default function firstLetterUppercase(string: string) {
  return (
    string[0]?.toUpperCase() + string.slice(1, string.length)
  )
}
