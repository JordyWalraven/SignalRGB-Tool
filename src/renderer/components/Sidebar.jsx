/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import RefreshIcon from '@mui/icons-material/Refresh';
import CodeIcon from '@mui/icons-material/Code';
import FolderIcon from '@mui/icons-material/Folder';
import '../css/quickMenu.css';
import '../css/basicStyle.css';
import { Button } from '@mui/material';
import {
  openVSCode,
  copyEffect,
  relaunchSignalRGB,
  openDynamicFolder
} from 'renderer/Logic/ApiConnections/ActionHandlerConnection';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  function foldMenu() {
    if (collapsed) {
      document.getElementById('sideBar').style.left = '-300px';
      document.getElementById('backgroundBlur').style.opacity = '0';
      document.getElementById('backgroundBlur').style.left = '100%';
      document.getElementById('menuButton').style.left = '-1.6%';
      document.getElementById('icon').style.rotate = '-90deg';
    } else {
      document.getElementById('sideBar').style.left = '0';
      document.getElementById('backgroundBlur').style.opacity = '0.5';
      document.getElementById('backgroundBlur').style.left = '300px';
      document.getElementById('menuButton').style.left = '270px';
      document.getElementById('icon').style.rotate = '90deg';
    }
    if (collapsed) {
      setCollapsed(false);
    } else {
      setCollapsed(true);
    }
  }

  function backgroundClick() {
    if (collapsed) {
      foldMenu();
    }
  }

  function openVSCodeCallback() {
    console.log('Opening VSCode');
    openVSCode().then((e) => {
      console.log(e);
    });
  }

  function relaunchSignalRGBCallback() {
    console.log('Relaunching SignalRGB');
    relaunchSignalRGB().then((e) => {
      console.log(e);
    });
  }

  async function copyEffectCallback() {
    const input = document.createElement('input');
    input.type = 'file';

    input.onchange = (e) => {
      const file = e.target.files[0];
      console.log(file);
      copyEffect(file.path).then((filePath) => {
        console.log(filePath);
      });
    };

    input.click();
  }

  function openDynamicFolderCallback() {
    console.log('Opening dynamic folder');
    openDynamicFolder().then((e) => {
      console.log(e);
    });
  }

  return (
    <>
      <div className="quickContainer" id="sideBar">
        <br />
        <h1 className="basicHeader">Quick actions</h1>
        <br />
        <Button
          variant="contained"
          style={{ backgroundColor: '#3A4E60' }}
          onClick={openVSCodeCallback}
        >
          Open vs code
          <CodeIcon style={{ marginLeft: '10px' }} />
        </Button>
        <br />
        <br />
        <Button
          variant="contained"
          style={{ backgroundColor: '#3A4E60' }}
          onClick={relaunchSignalRGBCallback}
        >
          Relaunch SignalRGB
          <RefreshIcon style={{ marginLeft: '10px' }} />
        </Button>
        <br />
        <br />
        <Button
          variant="contained"
          style={{ backgroundColor: '#3A4E60' }}
          onClick={copyEffectCallback}
        >
          Copy effect to dynamic
          <FileCopyIcon style={{ marginLeft: '10px' }} />
        </Button>
        <br />
        <br />
        <Button
          variant="contained"
          style={{ backgroundColor: '#3A4E60' }}
          onClick={openDynamicFolderCallback}
        >
          Open dynamic folder
          <FolderIcon style={{ marginLeft: '10px' }} />
        </Button>
      </div>
      <div
        className="backgroundBlur"
        id="backgroundBlur"
        onClick={backgroundClick}
      />
      <div className="PopOutButton" id="menuButton" onClick={foldMenu}>
        <ArrowForwardIosIcon
          id="icon"
          className="Icon"
          color="white"
          fontSize="large"
        />
      </div>
    </>
  );
};

export default Sidebar;
