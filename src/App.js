import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import { callAPI } from "./Service";

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function App() {
  console.log("app");
  const [imageSrc, setImageSrc] = useState("");
  const uploadingIdRef = useRef();

  const uploadFile = useCallback(async () => {
    try {
      const res = await axios({
        method: "post",
        url: "https://api.cloudconvert.com/v2/jobs",
        headers: {
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMTNhOTFlNDI5MjkzZmEyNmI3Mjg1MTcyYjFkYjU0ZmQ2MGFmMTJiODY2MzM1OTBkZWZhZjk0OWMwZTg1ZGUwYmIwNjNhZjFiYmQ2OGQyOTUiLCJpYXQiOjE2ODAxODU5OTQuNDE2Njg2LCJuYmYiOjE2ODAxODU5OTQuNDE2Njg3LCJleHAiOjQ4MzU4NTk1OTQuNDA4NzM1LCJzdWIiOiI2MjgwMTk3NCIsInNjb3BlcyI6WyJ1c2VyLnJlYWQiLCJ1c2VyLndyaXRlIiwidGFzay5yZWFkIiwidGFzay53cml0ZSIsIndlYmhvb2sucmVhZCIsIndlYmhvb2sud3JpdGUiLCJwcmVzZXQucmVhZCIsInByZXNldC53cml0ZSJdfQ.oP70nN1iF40MvuLGSoOPMugEegoDLxcRtVaiJdTFIWoieBsjcr5Pglp18Pk1vOd52qb9AS9N4zWSTt-xo7-V7eAgKmgL6AFUsQnS1-BFU6mfI1bxlM36QPvDF0aviIKDbg0ah-2Wow8UTM2CpGN6ZgqVdnFUXVOztCc063D6jXGNSCi9LpO-LEQcQHPm-9dixJmEA1dmHrp8a-czWTO06ikM3IqtpsjJWtcLa_KfU0YYrv6ZeM8j8qZXUTS3Bkn4zLNsxFUxQxGC3NMBuBR6z0Onw85rX1dwm_sxOuDa0Ghsl4Qbr18bnxNO_SGcMYZOMxvP5r6jzQMAYVz-MmqXnbc1LvxsdRTFejyekqQZ-aQ_dGJDHsyhVIc1r2Z_jnU2nSHAcmg-VpY26dJcRQsGJW164pFP9F4zxy4K4dyu_LgL_kJROpQP_WiGPsgpndHlJilrLnTqO5l3wprHLq5VKSv1wjBKk8nCpTWmbcvx59TQSXNpkIyJOmrMfP32Pw0bSzRWQvX2Zn2rHRjqCS_TQCxw8ukylLtelbafMPkrIJ9obw0Jk-F61uPNbpxfhSixhBZhbkhDoWSWy_TcqNNEuC7488Wx3TKOxO8V03M8r_tlxWHQUnRUeB6xikB99uB1KIYq-oGYuECJJ7NXCW2IjoZTcnbkDrL2CsbFCgo0VLQ`,
          "Content-Type": "application/json",
        },
        data: {
          tasks: {
            "import-my-file": {
              operation: "import/url",
              url: "https://res.cloudinary.com/dqwvikbse/image/upload/v1679284884/kjdq3qfl7iv9ik9jauow.png",
            },
            "convert-my-file": {
              operation: "convert",
              input: "import-my-file",
              output_format: "webp",
            },
            "export-my-file": {
              operation: "export/url",
              input: "convert-my-file",
            },
          },
        },
      });
      console.log("RES: ", res);
      if (res.status >= 200 && res.status < 400) {
        const getRes = await axios({
          method: "get",
          url: `https://sync.api.cloudconvert.com/v2/jobs/${res.data.data.id}`,
          headers: {
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMTNhOTFlNDI5MjkzZmEyNmI3Mjg1MTcyYjFkYjU0ZmQ2MGFmMTJiODY2MzM1OTBkZWZhZjk0OWMwZTg1ZGUwYmIwNjNhZjFiYmQ2OGQyOTUiLCJpYXQiOjE2ODAxODU5OTQuNDE2Njg2LCJuYmYiOjE2ODAxODU5OTQuNDE2Njg3LCJleHAiOjQ4MzU4NTk1OTQuNDA4NzM1LCJzdWIiOiI2MjgwMTk3NCIsInNjb3BlcyI6WyJ1c2VyLnJlYWQiLCJ1c2VyLndyaXRlIiwidGFzay5yZWFkIiwidGFzay53cml0ZSIsIndlYmhvb2sucmVhZCIsIndlYmhvb2sud3JpdGUiLCJwcmVzZXQucmVhZCIsInByZXNldC53cml0ZSJdfQ.oP70nN1iF40MvuLGSoOPMugEegoDLxcRtVaiJdTFIWoieBsjcr5Pglp18Pk1vOd52qb9AS9N4zWSTt-xo7-V7eAgKmgL6AFUsQnS1-BFU6mfI1bxlM36QPvDF0aviIKDbg0ah-2Wow8UTM2CpGN6ZgqVdnFUXVOztCc063D6jXGNSCi9LpO-LEQcQHPm-9dixJmEA1dmHrp8a-czWTO06ikM3IqtpsjJWtcLa_KfU0YYrv6ZeM8j8qZXUTS3Bkn4zLNsxFUxQxGC3NMBuBR6z0Onw85rX1dwm_sxOuDa0Ghsl4Qbr18bnxNO_SGcMYZOMxvP5r6jzQMAYVz-MmqXnbc1LvxsdRTFejyekqQZ-aQ_dGJDHsyhVIc1r2Z_jnU2nSHAcmg-VpY26dJcRQsGJW164pFP9F4zxy4K4dyu_LgL_kJROpQP_WiGPsgpndHlJilrLnTqO5l3wprHLq5VKSv1wjBKk8nCpTWmbcvx59TQSXNpkIyJOmrMfP32Pw0bSzRWQvX2Zn2rHRjqCS_TQCxw8ukylLtelbafMPkrIJ9obw0Jk-F61uPNbpxfhSixhBZhbkhDoWSWy_TcqNNEuC7488Wx3TKOxO8V03M8r_tlxWHQUnRUeB6xikB99uB1KIYq-oGYuECJJ7NXCW2IjoZTcnbkDrL2CsbFCgo0VLQ`,
            "Content-Type": "application/json",
          },
        });
        console.log(getRes);
        if (getRes.status === 200) {
          const downloadRes = await axios({
            headers: {
              Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMTNhOTFlNDI5MjkzZmEyNmI3Mjg1MTcyYjFkYjU0ZmQ2MGFmMTJiODY2MzM1OTBkZWZhZjk0OWMwZTg1ZGUwYmIwNjNhZjFiYmQ2OGQyOTUiLCJpYXQiOjE2ODAxODU5OTQuNDE2Njg2LCJuYmYiOjE2ODAxODU5OTQuNDE2Njg3LCJleHAiOjQ4MzU4NTk1OTQuNDA4NzM1LCJzdWIiOiI2MjgwMTk3NCIsInNjb3BlcyI6WyJ1c2VyLnJlYWQiLCJ1c2VyLndyaXRlIiwidGFzay5yZWFkIiwidGFzay53cml0ZSIsIndlYmhvb2sucmVhZCIsIndlYmhvb2sud3JpdGUiLCJwcmVzZXQucmVhZCIsInByZXNldC53cml0ZSJdfQ.oP70nN1iF40MvuLGSoOPMugEegoDLxcRtVaiJdTFIWoieBsjcr5Pglp18Pk1vOd52qb9AS9N4zWSTt-xo7-V7eAgKmgL6AFUsQnS1-BFU6mfI1bxlM36QPvDF0aviIKDbg0ah-2Wow8UTM2CpGN6ZgqVdnFUXVOztCc063D6jXGNSCi9LpO-LEQcQHPm-9dixJmEA1dmHrp8a-czWTO06ikM3IqtpsjJWtcLa_KfU0YYrv6ZeM8j8qZXUTS3Bkn4zLNsxFUxQxGC3NMBuBR6z0Onw85rX1dwm_sxOuDa0Ghsl4Qbr18bnxNO_SGcMYZOMxvP5r6jzQMAYVz-MmqXnbc1LvxsdRTFejyekqQZ-aQ_dGJDHsyhVIc1r2Z_jnU2nSHAcmg-VpY26dJcRQsGJW164pFP9F4zxy4K4dyu_LgL_kJROpQP_WiGPsgpndHlJilrLnTqO5l3wprHLq5VKSv1wjBKk8nCpTWmbcvx59TQSXNpkIyJOmrMfP32Pw0bSzRWQvX2Zn2rHRjqCS_TQCxw8ukylLtelbafMPkrIJ9obw0Jk-F61uPNbpxfhSixhBZhbkhDoWSWy_TcqNNEuC7488Wx3TKOxO8V03M8r_tlxWHQUnRUeB6xikB99uB1KIYq-oGYuECJJ7NXCW2IjoZTcnbkDrL2CsbFCgo0VLQ`,
              "Content-Type": "application/json",
            },
            url: `https://sync.api.cloudconvert.com/v2/jobs/${getRes.data.data.id}?redirect=true`,
            method: "get",
          });
          console.log(downloadRes);
        }
      }
      return res.data;
    } catch (err) {
      console.error("Have an error once call api: ", err);
    }
  }, []);

  return (
    <div className="App">
      <div>
        <img src={`data:image/webp;base64,${imageSrc}`} alt="test"></img>
        <input name="test-file" type={"file"} id="input-file" />
        <button onClick={uploadFile}>Upload</button>
      </div>
    </div>
  );
}

export default App;
