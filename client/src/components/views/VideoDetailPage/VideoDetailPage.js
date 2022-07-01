import React, { useEffect, useState } from 'react'
import {Row, Col, List, Avatar} from 'antd';
import Axios from 'axios';
import SideVideo from './Sections/SideVideo';
import Subscribe from './Sections/Subscribe';
import Comment from './Sections/Comment';

function VideoDetailPage(props) {

    const videoId = props.match.params.videoId;
    // console.log('videoDetailPage :: ',videoId);
    
    const [VideoDetail, setVideoDetail] = useState([]);
    const [Comments, setComments] = useState([]);
    
    const variable = {
        videoId: videoId,
    }

    
    // useEffect(() => {
    // console.log('variable' , variable);
    // Axios.post('/api/video/getVideoDetail', variable)
    //     .then(response => {
    //         if(response.data.success){
    //             console.log(response.data.videoDetail);
    //             setVideoDetail(response.data.videoDetail)
    //         } else {
    //             alert('비디오 정보를 가져오기를 실패했습니다.')
    //         }
    //     })

    
    // Axios.post('/api/comment/getComments', variable)
    //   .then(response => {
    //     if(response.data.success){
    //       setComments(response.data.comments);
    //       console.log('reply info', response.data.comments);
    //     }else{
    //       alert('코멘트 정보를 가져오는것을 실패하였습니다.');
    //     }
    //   })
    // },[])
    useEffect(() => {
      Axios.post("/api/video/getVideoDetail", variable).then((res) => {
        if (res.data.success) {
          setVideoDetail(res.data.videoDetail);
        } else {
          alert("Failed to get video Infos");
        }
      });

      Axios.post("/api/comment/getComments", variable).then((response) => {
        if (response.data.success) {
          console.log("response.data.comments", response.data.comments);
          setComments(response.data.comments);
        } else {
          alert("Failed to get video Info");
        }
      });
    }, []);
  
    const refreshFunction = (newComment) => {
      setComments(Comments.concat(newComment))
    }

    if (VideoDetail.writer) {

        // 본인의 글인 경우 subscribe button unvisible
        const subscribeButton =  VideoDetail.writer._id !== localStorage.getItem('userId') && <Subscribe userTo={VideoDetail.writer._id} userFrom={localStorage.getItem('userId')} />

        return (
          <Row gutter={[16,16]}>
            <Col lg={18} xs={24}>
              <div
                className="postPage"
                style={{width: "100%", padding: "3rem 4em"}}
              >
                <video
                  style={{width: "100%"}}
                  src={`http://localhost:5000/${VideoDetail.filePath}`}
                  controls
                ></video>
    
                <List.Item
                  actions={[subscribeButton]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={VideoDetail.writer.image} />}
                    title={VideoDetail.writer.name}
                    description={VideoDetail.description}
                  />
                  {/* <div></div> */}
                </List.Item>
                {/* comments */}
                <Comment refreshFunction={refreshFunction} commentLists={Comments}  postId={videoId} />

              </div>
            </Col>

            <Col lg={6} xs={24}>    
                <SideVideo/>
            </Col>
          </Row>
        );

      } else {
        return <div>Loading...</div>;
      }
  
}

export default VideoDetailPage