import logo from "./logo.svg";
import "./App.css";
import { useEffect, useRef } from "react";
import image from "./App2.jpeg";
import vision from "react-cloud-vision-api";

vision.init({ auth: "AIzaSyAVGWa5DCz5fIIc6Mv69BLTW8t83_C08ZQ" });

function App() {
  const profile = useRef();

  const p = (baseImg) => {
    return new vision.Request({
      image: new vision.Image({
        base64: baseImg,
      }),
      features: [new vision.Feature("FACE_DETECTION")],
    });
  };

  const upload = (e) => {
    const imgFile = e.target.files[0];
    console.log(imgFile);
    const reader = new FileReader();

    reader.onloadend = function () {
      let request = p(reader.result);

      vision.annotate(request).then(
        (res) => {
          let prediction = 0;

          //one single face on the image
          if (res.responses[0].hasOwnProperty("faceAnnotations"))
            if (res.responses[0].faceAnnotations.length == 1) prediction = 1;

          console.log(prediction);
        },
        (e) => {
          console.log("Error: ", e);
        }
      );
    };

    reader.readAsDataURL(imgFile);
  };

  return (
    <div className="App">
      <input
        style={{ height: "50%" }}
        ref={profile}
        type="file"
        onChange={upload}
        alt=""
      />
    </div>
  );
}

export default App;
