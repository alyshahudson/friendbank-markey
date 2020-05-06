import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Redirect } from './Nav';

const Layout = styled.div`
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
  width: 100%;
  min-height: 100vh;

  @media ${({ theme }) => theme.media.desktop} {
    flex-direction: row;
    justify-content: flex-start;
  }
`;

const ContentPanel = styled.main`
  display: flex;
  flex-direction: row;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  border-top: 4px solid ${({ theme }) => theme.colors.red};
  padding: 24px 16px;

  @media ${({ theme }) => theme.media.desktop} {
    width: 40%;
    height: 100vh;
    overflow-y: scroll;
    overflow-x: visible;
    justify-content: center;
    padding: 32px 24px;
  }
`;

const ContentPanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: visible;

  @media ${({ theme }) => theme.media.desktop} {
    width: 100%;
    max-width: 500px;
    padding-top: 24px; 
    margin-top: 70px;
    overflow-y: scroll;
  }
`;

const MediaPanel = styled.div`
  display: block;
  width: 100%;
  height: 40vh;
  position: relative;

  @media ${({ theme }) => theme.media.tablet} {
    height: 60vh;
  }

  @media ${({ theme }) => theme.media.desktop} {
    width: 60%;
    height: 100vh;
  }
`;

const MediaPanelShadow = styled.div`
  display: block;
  width: 100%;
  height: 50px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: ${({ theme }) => theme.zIndexes.navShadow};
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 100%);
`;

const MediaImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const GlobalNavOverride = createGlobalStyle`
  ${Redirect} {
    color: ${({ theme }) => theme.colors.white};
  }
`;

export default function SplitScreen(props) {
  const { children, media } = props;

  return (
    <Layout>
      <GlobalNavOverride />
      <ContentPanel>
        <ContentPanelContainer>
          {children}
        </ContentPanelContainer>
      </ContentPanel>
      <MediaPanel>
        <MediaPanelShadow />
        {media && media.type === 'image' && (
          <MediaImage src={media.source} alt={media.alt} />
        )}
      </MediaPanel>
    </Layout>
  );
}