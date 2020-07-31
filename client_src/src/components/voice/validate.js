const validate = values => {

  const errors = {}
  if (!values.name) {
    errors.name = 'Required'
  }
  if (!values.questions || !values.questions.length) {
    errors.questions = { _error: 'At least one question must be entered' }
  } else {
    const questionsArrayErrors = []
    values.questions.forEach((question, questionIndex) => {
      const questionErrors = {}

      if (!question || !question.question || question.question === undefined) {

        questionErrors.question = 'Required'
        questionsArrayErrors[questionIndex] = questionErrors
      }
      if (!question || !question.keywords) {
        questionErrors.keywords = 'Required'
        questionsArrayErrors[questionIndex] = questionErrors
      }

    })
    if (questionsArrayErrors.length) {
      errors.questions = questionsArrayErrors
    }
  }

  return errors
}

export default validate
