/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import FileSelectionPage from 'renderer/components/SVGComponents/FileSelectionPage';
import SVGPreviewerPage from 'renderer/components/SVGComponents/SVGPreviewerPage';

const SVGPage = () => {
  const [fileSelected, setFileSelected] = useState(false);

  const [finalSVGArray, setFinalSVGArray] = useState(null);

  useEffect(() => {
    if (finalSVGArray !== null) {
      setFileSelected(true);
    }
  }, [finalSVGArray]);

  return (
    <>
      {fileSelected ? (
        <SVGPreviewerPage finalResult={finalSVGArray} />
      ) : (
        <FileSelectionPage setSVGArray={setFinalSVGArray} />
      )}
    </>
  );
};

export default SVGPage;
