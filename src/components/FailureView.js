import React from "react";
import "./FailureView.css";

const FailureView = ({ onRetry }) => (
  <div className="failure-view-container">
    <p className="failure-message">Something went wrong. Please try again.</p>
    <button className="retry-btn" onClick={onRetry}>
      Try Again
    </button>
  </div>
);

export default FailureView;
