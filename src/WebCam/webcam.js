import React, { useState } from "react";
import Webcam from "react-webcam";
import { connect } from "react-redux";
import { savePhotos } from "./redux/actions";
import "../css/common.css"

const videoConstraints = {
  width: 800,
  height: 480,
  facingMode: "user",
};

const WebcamCapture = (props) => {
  const {savePhotos, imageArray}=props;
  
  const webcamRef = React.useRef(null);


  
  const capture = () => {
    debugger;
    const imgSrc = webcamRef.current.getScreenshot();
    
    savePhotos(imgSrc);
  };

 
  React.useEffect(
    ()=>{
      navigator.mediaDevices.getUserMedia({audio:true})

    const interval = setInterval(() => {
      capture()
    }, 30000);
    return () => clearInterval(interval);
  }
  );
  return (
    <>
      <Webcam
        audio={false}
        height={480}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={1280}
        videoConstraints={videoConstraints}
      />
      
      <div className="tableDiv">
        {imageArray.length!==0?
        <table id="imgTable">
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
        {imageArray.map((item,i)=>{
          return(
            <tr>
              <td>{i+1}</td>
              <td>{item}</td>
            </tr>
          )
        })}
        </tbody>
        </table>
        :null}
      </div> 
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    imageArray: state.webReducer.imageArray,
  };
};

const mapDispatchToProps = {
    savePhotos,
};

export default connect(mapStateToProps, mapDispatchToProps)(WebcamCapture);
