import Axios from 'axios';
import React, { useState } from 'react'
import {useSelector} from 'react-redux'
import SingleComment from './SingleComment';

function Comment(props) {
  
  // url에서 가져온 videoId
  //const videoId = props.match.params.videoId;

  // props으로 넘긴 videoId
  const videoId = props.videoId;

  const user = useSelector(state => state.user);
  const [commentValue, setCommentValue] = useState("");

  const handleClick = (e) => {
    setCommentValue(e.currentTarget.value)
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const variables = {
        content: commentValue,
        writer: user.userData._id,
        postId: videoId
    }

    Axios.post('/api/comment/saveCommnet', variables)
      .then(response => {
        if(response.data.success){
            console.log(response.data.result);

            // videoDetailPage의 Commnet를 업데이트함
            setCommentValue("");
            props.refreshFunction(response.data.result);
        } else {
            alert('코멘트를 저장하지 못했습니다.');
        }
      })
  }

  return (
    <div>
        <br/>
        <p> Repies </p>
        <hr />

        {/* Comment Lists */}
        {props.commentLists && props.commentLists.map((comment, index) =>( 
            (!comment.responseTo && 
                <SingleComment refreshFunction={props.refreshFunction} comment={comment} postId={videoId} />
            )
        ))}

        {/* Root Comment From */}


        <form style={{display: 'flex'}} onSubmit={onSubmit}>
            <textarea
                style={{width: '100%', borderRadius: '5px'}}
                onChange={handleClick}
                value={commentValue}
                placeholder='코멘트를 작성해주세요'
            />
            <br />
            <button style={{width: '20%' , height:'52px'}} onClick={onSubmit}>Submit</button>
        </form>

    </div>
  )
}

export default Comment