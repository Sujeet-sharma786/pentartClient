import React from "react";
import Axios from "axios";

import fileDownload from "js-file-download";

const DownloadControle = () => {
  const Download = () => {
    Axios({
      url: "https://server-2-s0sk.onrender.com/download",
      method: "GET",
      responseType: "blob",
    }).then((resp) => {
      console.log(resp);
      fileDownload(resp.data, "downloaded.png");
    });
  };

  return (
    <div>
      <button
        onClick={(e) => {
          Download(e);
        }}
        type="button"
      >
        Download
      </button>
    </div>
  );
};

export default DownloadControle;
