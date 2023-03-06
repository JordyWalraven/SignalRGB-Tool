/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import FileSelectionPage from 'renderer/components/SVGComponents/FileSelectionPage';

const SVGPage = () => {
  const [fileSelected, setFileSelected] = useState(false);
  return (
    <>
      <FileSelectionPage />
    </>
  );
};

export default SVGPage;
