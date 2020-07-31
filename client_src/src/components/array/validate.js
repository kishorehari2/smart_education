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
      if (!question || !question.correct_answer) {
        questionErrors.correct_answer = 'Required'
        questionsArrayErrors[questionIndex] = questionErrors
      } else if (isNaN(question.correct_answer)) {
        questionErrors.correct_answer = 'Correct option should be number'
        questionsArrayErrors[questionIndex] = questionErrors
      }
      if (!question.answers || !question.answers.length) {
        errors.questions = { _error: 'At least one option must be entered' }
      }
      else if (question && question.answers && question.answers.length) {
        const optionArrayErrors = []
        question.answers.forEach((answer, answerIndex) => {
          if (!answer || !answer.length) {
            optionArrayErrors[answerIndex] = 'Required'
          }
        })
        if (optionArrayErrors.length) {
          questionErrors.answers = optionArrayErrors
          questionsArrayErrors[questionIndex] = questionErrors
        }

      }

    })
    if (questionsArrayErrors.length) {
      errors.questions = questionsArrayErrors
    }
  }
  return errors
}

export default validate
