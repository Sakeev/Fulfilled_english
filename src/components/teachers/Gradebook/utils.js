export const calculateAverageGrade = (grades, type, selectedUser) => {
    const filteredGrades = grades.filter(
        (grade) =>
            grade[type] &&
            (selectedUser === null || grade.user === selectedUser)
    )
    if (filteredGrades.length === 0) {
        return '---'
    }

    const totalGrades = filteredGrades.reduce(
        (sum, grade) => sum + grade.grade,
        0
    )
    const average = totalGrades / filteredGrades.length

    return `${average.toFixed(2)}`
}

export const getGrade = (grades, type) => {
    const gradedAssignment = grades.find((grade) => grade[type])

    return gradedAssignment ? gradedAssignment.grade : '---'
}
