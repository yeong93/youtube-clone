import Axios from 'axios'
import React, { useEffect, useState } from 'react'

function Subscribe(props) {

  const [SubscribeNumber, setSubscribeNumber] = useState('');
  const [Subscribed, setSubscribed] = useState('');
  useEffect(()=>{
    let variable = {userTo: props.userTo}

    // 구독자 수 정보 가져오기
    Axios.post('/api/subscribe/subscribeNumber', variable)
     .then(response => {
        if(response.data.success){
            setSubscribeNumber(response.data.SubscribeNumber);
        } else {
            alert('구독자 수 정보를 받아오지 못했습니다.');
        }
     })

     // 내가 구독한지 정보 가져오기
     let subscribedVariable = {userTo: props.userTo, userFrom: localStorage.getItem('userId')}

     Axios.post('/api/subscribe/subscribed', subscribedVariable)
       .then(response => {
        if(response.data.success){
            setSubscribed(response.data.subscribed);
        } else {
            alert('정보를 받아오지 못했습니다.');
        }
       })

  },[])

  const onclick = () => {
    
  }


  return (
    <div>
        <button
          style={{backgroundColor: `${ Subscribed ? '#AAAA' : '#CC0000'}`, borderRadius: '4px',
                 color: 'white', padding: '10px 16px',        
                 fontWeight: '500', fontSize: '1rem', textTransform: 'uppsercase'
          }}
          onClick={onclick}
        >
           {SubscribeNumber} {Subscribed ? 'Subscribed' : 'Subscribe'}
        </button>
    </div>
  )
}

export default Subscribe