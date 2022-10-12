//  Finding the subjects for each student
// Done with mongoDB / mongoose js

// Lets assume we have these 3 document collection map in our mongo database

// 1) Students collection
// -> properties - { studentId: number, name: string, email: string }
// -> sample documents - { studentId: 1, name: ravi, email: ravi123@gmail.com }
//                     - { studentId: 2, name: kishan, email: kishan123@gmail.com }
//                     - { studentId: 3, name: sameer, email: sameer123@gmail.com }

// 2) Subjects collection
// -> properties - { subjectId: number, subjectName: string }
// -> sample documents - { subjectId: 1, subjectName: English }
//                    - { subjectId: 2, subjectName: Hindi }
//                    - { subjectId: 3, subjectName: Maths }

// 3) Subject-Student Mapping collection
// -> properties - { mappingId: number, studentId: number, subjectId: number }
// -> sample documents - { mappingId: 1, studentId: 1, subjectId: 1 }
//                     - { mappingId: 2, studentId: 1, subjectId: 2 }
//                     - { mappingId: 3, studentId: 1, subjectId: 3 }
//                     - { mappingId: 4, studentId: 2, subjectId: 1 }
//                     - { mappingId: 4, studentId: 3, subjectId: 3 }

// function to get student's subjects
/**
 * @param { number } studentId - student's id for which you want the subjects
 */
const getStudentsSubjects = async studentId => {
  // MappingsModel is the model for mapping subject-student relationship
  // the model will contain referance to the student's and subject's collection by using the ref property
  const studentMappings = await MappingsModel.find({ studentId: studentId })

  // using Promise.all() to wait for both populates to complete simultaneously
  await Promise.all([studentMappings.populate("studentId", "name"), studentMappings.populate("subjectId", "subjectName")])

  // formatting the subjects to match the response
  const subjects = studentMappings
    .map(mapping => mapping.subjectId.subjectName)
    .sort()
    .join() // -> English,Hindi,Maths

  const responsePayload = {
    studentId: studentMappings.studentId.id,
    name: studentMappings.studentId.name,
    subjects: subjects,
  }
  return responsePayload
}
