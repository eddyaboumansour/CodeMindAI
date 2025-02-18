export interface Question {
    question: string
    answers: string[]
  }
  
  export interface QuizState {
    subject: string
    questionCount: string
    questions: Question[]
    currentQuestionIndex: number
    score: number
    quizStarted: boolean
    quizFinished: boolean
  }  