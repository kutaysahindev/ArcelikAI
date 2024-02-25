import { useEffect } from "react";
import { useState } from "react";
import { getQuestions } from "../../api";
import { useSelector } from "react-redux";

export const QuestionPool = () => {
  const [questionsDB, setQuestionsDB] = useState([]);
  const {accessToken}  = useSelector(state => state.user)
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const ques = await getQuestions(accessToken);
        setQuestionsDB(ques)
        console.log('ques: ', ques)
      } catch (err) {
        console.error(err.message)
      }
    }
    fetchQuestions()
  }, [])
  return (
    <div>QuestionPool :D</div>
  )
}