import { useEffect, useState } from "react";
import { deleteQuestionDB, getQuestions } from "../../api";
import { useSelector } from "react-redux";
// import { questions } from '../../utils/questions.js'
import { PiSelectionAllDuotone, PiSelectionAllFill } from "react-icons/pi";
import { FaRegTrashAlt } from 'react-icons/fa';

import './QuestionPool.css'
import ArcelikG2 from "../Loading/ArcelikLoading";

export const QuestionPool = () => {
  const [originals, setOriginals] = useState([]);
  const [questionsDB, setQuestionsDB] = useState([]);
  const [fixedQuestions, setFixedQuestions] = useState([]);
  const {accessToken}  = useSelector(state => state.user)

  const isFixed = (id) => fixedQuestions.find(q => q.QuestionID === id)
  const toggleFixed = (q) => setFixedQuestions(prev => isFixed(q.QuestionID) ? prev.filter(que => que.QuestionID !== q.QuestionID) : [...prev, q])
  const resetChanges = () => setFixedQuestions([])
  
  const deleteItem = async(q) => {
    try {
      await deleteQuestionDB(accessToken, q.QuestionID)
      const newArr = [...questionsDB]
      const filtered = newArr.filter(que => que.QuestionID !== q.QuestionID)
      setQuestionsDB(filtered)
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const ques = await getQuestions(accessToken);
        setOriginals(ques)
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
      {/* <p className="info">To make the questions fixed, click to <PiSelectionAllDuotone/></p> */}
      <div className='que-container'>
        {questionsDB.length !== 0 ? (
          questionsDB.map(q => (
            <div className="que-item" key={q.QuestionID}>
              <p className="que">{ q.QuestionText }</p>
              <div className='buttons'>
              <p className="type">{ q.QuestionType }</p>
                {/* <div onClick={() => toggleFixed(q)}>
                  {isFixed(q.QuestionID) ? (
                    <PiSelectionAllFill className="qb fill" size={20}/>
                    ) : (
                    <PiSelectionAllDuotone className="qb blank" size={20}/>
                  )}
                </div> */}
                <FaRegTrashAlt onClick={() => deleteItem(q)} className="qb delete" size={20}/>
              </div>
            </div>
          ))
        ) : (
          <ArcelikG2 />
        )}
      </div>
      {/* <div className='btnss'>
        <button className='action-btn reset' onClick={resetChanges}>Reset</button>
        <button className='action-btn apply'>Apply Changes</button>
      </div> */}
    </div>
  )
}