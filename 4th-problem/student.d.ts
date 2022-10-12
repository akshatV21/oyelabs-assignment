type Student = {
  id: number
  firstName: string
  lastName: string
  email: string
  persueing: string
  testsTaken: Test[]
  averageScore: number
  currentSemester: number
}

type Test = {
  id: number
  subject: string
  studentId: number
  scored: number
}
