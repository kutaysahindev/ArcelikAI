import { useEffect, useState } from "react";
import { getQuestions } from "../../api";
import { useSelector } from "react-redux";
import { questions } from '../../utils/questions.js'
import { PiSelectionAllDuotone, PiSelectionAllFill } from "react-icons/pi";
import { FaRegTrashAlt } from 'react-icons/fa';

import './QuestionPool.css'

export const QuestionPool = () => {
  const [fixedQuestions, setFixedQuestions] = useState([]);
  const [questionsDB, setQuestionsDB] = useState(questions);
  const {accessToken}  = useSelector(state => state.user)
  const isFixed = (id) => fixedQuestions.find(q => q.Id === id)
  // const toggleFixed = (q) => isFixed(q.Id) ? setFixedQuestions(fixedQuestions.filter(que => que.Id !== q.Id)) : setFixedQuestions(prev => [...prev, q])
  const toggleFixed = (q) => setFixedQuestions(prev => isFixed(q.Id) ? prev.filter(que => que.Id !== q.Id) : [...prev, q])

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

  useEffect(() => {
    console.log('fixedQuestions: ', fixedQuestions)
  }, [fixedQuestions])
  return (
    <div className="question-pool">
      <p className="info">To make the questions fixed, click to <PiSelectionAllDuotone/></p>
      <div className='que-container'>
        {questionsDB.map(q => (
          <div className="que-item" key={q.Id}>
            <p className="que">{ q.question }</p>
            <div className='buttons'>
              <div onClick={() => toggleFixed(q)}>
              {isFixed(q.Id) ? (
                <PiSelectionAllFill className="qb" size={20}/>
                ) : (
                  <PiSelectionAllDuotone className="qb" size={20}/>
                  )}
              </div>
              <FaRegTrashAlt className="qb" size={20}/>
            </div>
          </div>
        ))}
      </div>
      <button className='apply-btn'>Apply Changes</button>
    </div>
  )
}