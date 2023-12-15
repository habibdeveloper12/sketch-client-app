import { ActionIcon, Tooltip } from '@mantine/core';

import axios from 'axios';

import { useRouter } from 'next/router';

import React, { type ReactNode, useState } from 'react';

import { BsSquare, BsCircle, BsImageFill } from 'react-icons/bs';

import { FaMousePointer } from 'react-icons/fa';

import { HiPencil } from 'react-icons/hi';

import { RiImageLine } from 'react-icons/ri';

import { RxText } from 'react-icons/rx';

import styled from 'styled-components';
import type { UserMode } from '~/config/types';
import useActiveObjectId from '~/store/useActiveObjectId';
import useUserMode from '~/store/useUserMode';
import theme from '~/theme';

const Nav = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.variables.overlayItemsGutter};
`;

const Div = styled.div`
  pointer-events: auto;
  background: var(--color-bgPrimary);
  border-radius: 0.25rem;
  padding: 0.3rem;
  overflow: hidden;
  display: flex;
  align-items: center;
  border: 0.0625rem solid var(--color-borderPrimary);
`;

const Ul = styled.ul`
  width: 100%;
  height: 100%;
  list-style: none;
  padding: 0;
  display: grid;
  grid-gap: 0.15rem;
  align-items: center;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  & > li {
    width: 100%;
    height: 100%;
  }
`;

interface UserModeButton {
  mode: UserMode;
  label: string;
  icon: ReactNode;
}

const userModeButtonsPrimary: UserModeButton[] = [
  {
    mode: 'select',
    label: 'Select mode',
    icon: <FaMousePointer />,
  },
];

const userModeButtonsSecondary: UserModeButton[] = [
  {
    mode: 'free-draw',
    label: 'Draw',
    icon: <HiPencil />,
  },
  {
    mode: 'rectangle',
    label: 'Rectangle',
    icon: <BsSquare />,
  },
  {
    mode: 'ellipse',
    label: 'Ellipse',
    icon: <BsCircle />,
  },
  {
    mode: 'text',
    label: 'Text',
    icon: <RxText />,
  },
  {
    mode: 'icon',
    label: 'Icon',
    icon: <RiImageLine />,
  },
  {
    mode: 'image',
    label: 'Image',
    icon: <BsImageFill />,
  },
];

export default function OverlayNavbar({ object }: any) {
  const [name, setName] = useState('');
  const setActiveObjectId = useActiveObjectId((state) => state.setActiveObjectId);
  const router = useRouter();
  const userMode = useUserMode((state) => state.userMode);
  const setUserMode = useUserMode((state) => state.setUserMode);
  const saveCanvasState = async () => {
    // const canvasState = getCanvasState();
    console.log('dfd');
    try {
      await axios.post('https://sketch-s4dw.onrender.com/api/v1/draw', { name, object });
      console.log('Canvas state saved successfully.');
    } catch (error) {
      console.error('Error saving canvas state:', error);
    }
  };
  const goHome = () => {
    router.push('/');
  };
  const renderUserModeButtons = (buttons: UserModeButton[]) => (
    <Div>
      <Ul style={{ gridTemplateColumns: `repeat(${buttons.length}, minmax(0, 1fr))` }}>
        {buttons.map(({ mode, label, icon }) => {
          const isActive = userMode === mode;
          return (
            <li key={mode}>
              <Tooltip
                position="bottom-start"
                label={`${label}${label.endsWith('mode') ? '' : ' tool'}${isActive ? ` (active)` : ''}`}
                offset={16}
              >
                <ActionIcon
                  color="dark"
                  variant={isActive ? 'black' : 'dark'}
                  size="lg"
                  onClick={() => {
                    setUserMode(mode);
                    setActiveObjectId(null);
                  }}
                >
                  {icon}
                </ActionIcon>
              </Tooltip>
            </li>
          );
        })}
      </Ul>
    </Div>
  );
  const renderSaveButtons = () => (
    <Div>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        name="name"
        placeholder="Sketch Name"
        className="input input-bordered input-white mt-2 w-full max-w-xs"
      />
      <div onClick={saveCanvasState} className=" z-100 ml-2 flex justify-center items-center bg-transparent p-0 m-0">
        <button className="btn btn-primary mt-3 ">SAVE</button>
      </div>
      <div onClick={goHome} className=" z-100 ml-4 flex justify-center items-center bg-transparent p-0 m-0">
        <button className="btn btn-primary mt-3 ">Go Home</button>
      </div>
    </Div>
  );

  return (
    <Nav>
      {renderUserModeButtons(userModeButtonsPrimary)}
      {renderUserModeButtons(userModeButtonsSecondary)}
      {renderSaveButtons()}
    </Nav>
  );
}
