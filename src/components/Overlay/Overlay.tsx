import axios from 'axios';

import React from 'react';

import styled from 'styled-components';

import OverlayMenu from '~/components/Overlay/OverlayMenu';

import OverlayNavbar from '~/components/Overlay/OverlayNavbar';

import OverlaySidebar from '~/components/Overlay/OverlaySidebar';

import OverlayZoom from '~/components/Overlay/OverlayZoom';

import theme from '~/theme';

const FixedDiv = styled.div`
  pointer-events: none;
  position: fixed;
  top: ${theme.variables.overlayGutter};
  bottom: ${theme.variables.overlayGutter};
  left: ${theme.variables.overlayGutter};
  right: ${theme.variables.overlayGutter};
  z-index: ${theme.layers.overlay};
  user-select: none;
`;

const TopDiv = styled.div`
  position: absolute;
  top: 50;
  left: 50;
  bottom: 50;
  right: 50;

  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${theme.variables.overlayGutter};
`;

const LeftDiv = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: ${theme.variables.sidebarWidth};

  ${theme.medias.gteSmall} {
    top: calc(${theme.variables.topNavbarHeight} + ${theme.variables.overlayGutter});
  }
`;

const BottomRightDiv = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
`;

export default function Overlay({ object }: any) {
  const saveCanvasState = async () => {
    // const canvasState = getCanvasState();

    try {
      await axios.post('https://sketch-s4dw.onrender.com/api/v1/draw/draw', { object });
      console.log('Canvas state saved successfully.');
    } catch (error) {
      console.error('Error saving canvas state:', error);
    }
  };
  return (
    <FixedDiv>
      <TopDiv>
        <OverlayNavbar {...{ object }} />
        {/* <OverlayMenu /> */}
      </TopDiv>
      <BottomRightDiv>
        <OverlayZoom />
      </BottomRightDiv>
      <LeftDiv>
        <OverlaySidebar />
      </LeftDiv>
    </FixedDiv>
  );
}
