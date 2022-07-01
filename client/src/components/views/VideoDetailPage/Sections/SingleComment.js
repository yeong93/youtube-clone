import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Comment, Avatar, Button, Input } from 'antd';
import Axios from 'axios';

// const {TextArea} = Input;

function SingleComment(props) {
  console.log('singlecomment', props.comment);
  const user = useSelector(state => state.user);
  const [OpenReply, setOpenReply] = useState(false);
  const [CommentValue, setCommentValue] = useState("");
  
  const onClickReplyOpen = () => {
    setOpenReply(!OpenReply)
  }

  const onHandleChange = (e) => {
    setCommentValue(e.currentTarget.CommentValue);
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const variables = {
        content: CommentValue,
        writer: user.userData._id,
        postId: props.postId,
        responseTo: props.comment._id
    }

    Axios.post('/api/comment/saveCommnet', onSubmit)
      .then(response => {
        if(response.data.success){
            console.log(response.data.result);
            setCommentValue("");
            props.refreshFunction(response.data.result);
        } else {
            alert('코멘트를 저장하지 못했습니다.');
        }
      })

  }

  const actions = [
    <span onClick={onClickReplyOpen} key="comment-basic-reply-to"> Reply to</span>
  ]

  return (
    <div>
        <Comment
            actions={actions}
            author={props.comment.writer.name}
            avatar={<Avatar src={props.comment.writer.image} alt="이미지"/>}
            content={<p>{props.comment.content}</p>}
        />

        {OpenReply &&
            <form style={{display: 'flex'}}  onSubmit={onSubmit}>
                <textarea
                    style={{width: '100%', borderRadius: '5px'}}
                    onChange={onHandleChange}
                    value={CommentValue}
                    placeholder='코멘트를 작성해주세요'
                />
                <br />
                <button style={{width: '20%' , height:'52px'}} onClick={onSubmit}>Submit</button>
            </form>
        }




    </div>
  )
}

export default SingleComment