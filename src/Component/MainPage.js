import React, { useState, useRef } from "react";
import plus from "../image/plus.svg";
import l2 from "../image/l2.gif";
// import "./Main.css";

const Main = () => {
  const [fileDetails, setFileDetails] = useState({ mime_type: null, data: null });
  const [uploadedImage, setUploadedImage] = useState(null);
  const [apiResponse, setApiResponse] = useState("");
  const [outputVisible, setOutputVisible] = useState(false);
  const [loading, setLoading] = useState(false); // State for loading indicator

  const uploadFileInput = useRef(null);

  const api_url =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyA67vgG_GF1dZN4JgfLNY3IdUVOnmA3nlQ";

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const base64data = e.target.result.split(",")[1];
      setFileDetails({ mime_type: file.type, data: base64data });
      setUploadedImage(e.target.result); // Store the uploaded image
    };

    reader.readAsDataURL(file);
  };

  const handleImageClick = () => {
    if (uploadFileInput.current) {
      uploadFileInput.current.click();
    }
  };

  const generateResponse = async () => {
    if (!fileDetails.mime_type || !fileDetails.data) {
      alert("Please upload an image first!");
      return;
    }

    // Show loading indicator
    setLoading(true);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: "Solve the Mathematical Problems with proper steps" },
              {
                inline_data: {
                  mime_type: fileDetails.mime_type,
                  data: fileDetails.data,
                },
              },
            ],
          },
        ],
      }),
    };

    try {
      const response = await fetch(api_url, requestOptions);
      const data = await response.json();

      console.log("API Response:", data);

      const candidates = data?.candidates?.[0];
      const parts = candidates?.content?.parts;

      if (parts?.[0]?.text) {
        const apiResponseText = parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
        setApiResponse(apiResponseText);
        setOutputVisible(true); // Make the .outputBox visible
      } else {
        throw new Error("Unexpected API response structure.");
      }
    } catch (error) {
      console.error("Error fetching API response:", error);
      setApiResponse("There was an error processing your request. Please try again.");
      setOutputVisible(true); // Make the .outputBox visible even in case of error
    } finally {
      // Hide loading indicator after the response
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>
          I'm Your <span className="highlight">Digital Math Instructor</span>
        </h1>
      </header>

      <div className="upload-section">
        <div className="inner-upload-image" onClick={handleImageClick}>
          <input
            type="file"
            id="upload-file"
            className="upload-input"
            ref={uploadFileInput}
            onChange={handleFileChange}
          />
          {uploadedImage ? (
            <img
              src={uploadedImage}
              alt="Uploaded"
              id="image"
              style={{
                display: "block", // Ensure the image is displayed as block
              }}
            />
          ) : (
            <>
              <img src={plus} alt="Plus Icon" id="icon" />
              <span>Upload Image</span>
            </>
          )}
        </div>

        <button className="btn" id="btn" onClick={generateResponse}>
          Answer
        </button>
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <img src={l2} id="load" width="80px" alt="Loading..." />
        </div>
      )}

      <div className="outputBox" style={{ display: outputVisible ? "block" : "none" }}>
        {apiResponse}
        <pre id="text">{apiResponse}</pre>
      </div>
    </div>
  );
};

export default Main;
  