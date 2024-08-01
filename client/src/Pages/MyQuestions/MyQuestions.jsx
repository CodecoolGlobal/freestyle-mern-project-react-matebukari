import { useEffect, useState } from "react";
import MyQuestionsTable from "../../Components/MyQuestionsTable/MyQuestionsTable";
import "./myQuestions.css";
import { useParams } from "react-router-dom";

export default function MyQuestions () {
  const [myQuestions, setMyQuestions] = useState(null)
  const { id } = useParams();
  
  useEffect(() => {
    const fetchQuestions = async (id) => {
      const res = await fetch(`/api/questions-by-user/${id}`);
      const data = await res.json();
      return data;
    };
    
    const getQuestions = async () => {
      const response = await fetchQuestions(id);
      setMyQuestions(response);
    };
    
    getQuestions();
  }, []);
  
  console.log(myQuestions)
  
  return (
    <div className={"my-question-table"}>
    { myQuestions !== null ? (
    <MyQuestionsTable questions={myQuestions}/>
    ) : (
      <h1> loading </h1>
    )}
    </div>
  )
}