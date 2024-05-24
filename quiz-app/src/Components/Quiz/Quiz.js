import React, { useRef, useState } from 'react'
import './quiz.css'
import {data} from '../../Assests/data' 

const Quiz = () => {


    let [index,setIndex] = useState(0);
    let [array,setArray] = useState(data[index]);
    let[status,setStatus] = useState(false);
    let[score,setScore]=useState(0);
    let[result,setResult] = useState(false);


    let option1 = useRef(null);
    let option2 = useRef(null);
    let option3 = useRef(null);
    let option4 = useRef(null);

    let option_array = [option1,option2,option3,option4];

    const checkAns = (e,ans) => {

        if(status === false ){

            if(array.ans === ans){
                e.target.classList.add('correct');
                setStatus(true);
                setScore(prev =>prev+1);
            }else{
                e.target.classList.add('incorrect');
                setStatus(true);

                option_array[array.ans-1].current.classList.add('correct');
    
            }
        }
        
    }

    const next =()=>{
            if(status===true){
                if(index===data.length-1){
                    setResult(true);
                    return 0;
                }
                setIndex(++index);
                setArray(data[index]);
                setStatus(false);
                option_array.map((opt)=>{
                    opt.current.classList.remove('incorrect');
                    opt.current.classList.remove('correct');
                    return null;
                })
            }
    }

    const reset = ()=>{
        setIndex(0);
        setArray(data[0]);
        setScore(0);
        setStatus(false);
        setResult(false);
    }
    
  return (
    <div className='container'>

      <h1>Quiz App</h1>
      <hr />
      {
         result?<>
        <h2>You Scored {score} out of {data.length}</h2>
        <button onClick={reset}>Reset</button>

        </> : <>

         <h2>{index+1}. {array.question}</h2>
        <ul>
        < li ref={option1} onClick={(e) => {checkAns(e,1)}}>{array.option1}</ li>
        < li ref={option2} onClick={(e) => {checkAns(e,2)}}>{array.option2}</ li>
        < li ref={option3} onClick={(e) => {checkAns(e,3)}}>{array.option3}</ li>
        < li ref={option4} onClick={(e) => {checkAns(e,4)}}>{array.option4}</ li>
        </ul>
        <button onClick={next}>Next</button>
        <div className='index'>{index+1} of {data.length} questions</div>
      
      </> }
 
    </div>
  )
}

export default Quiz
