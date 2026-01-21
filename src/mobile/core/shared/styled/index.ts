import { keyframes } from 'styled-components';
import { token } from '../../foundation/token';

export const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

export const shimmer = keyframes`
  100% {
    transform: translateX(100%);
  }
`;

export const fadeIn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

export const overlayFadeIn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 0.5;
  }
`;

export const scrollbar = `
  scrollbar-width: thin;
  scrollbar-color: ${token.get<string>('global.color.grey-6')} #fbfbfb;

  &::-webkit-scrollbar {
    width: ${token.get<string>('global.space.mxxxs')};
    height: ${token.get<string>('global.space.mxxxs')};
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.15);
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${token.get<string>('global.color.grey-6')};
    border-radius: ${token.get<string>('global.radius.round')};
    height: ${token.get<string>('global.space.mxxxs')};

    &:hover {
        background-color: ${token.get<string>('global.color.grey-4')};
    }
  }

  &.hide-scrollbar {
    scrollbar-width: none;

    &::-webkit-scrollbar{
      display: none;
    }
  }
`;

export const ellipsis = `
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const empty = `
  color: ${token.get<string>('global.color.grey-3')};
`;
