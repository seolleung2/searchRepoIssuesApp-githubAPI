import React, { FunctionComponent, PropsWithChildren } from 'react';
import styled from '@emotion/styled';

type Props = {
  title: string;
  type?: string;
  onClose: () => void;
};

const Modal: FunctionComponent<PropsWithChildren<Props>> = ({
  children,
  title,
  type = 'info',
  onClose,
}) => {
  return (
    <BackdropWrapper>
      <ModalContent type={type}>
        <div className="modalHeader">
          <span>{title || '모달'}</span>
          <button className="closeButton" onClick={onClose}>
            X
          </button>
        </div>
        <div className="modalContent">{children}</div>
        <div className="modalFooter">
          <button type="button" onClick={onClose}>
            닫기
          </button>
        </div>
      </ModalContent>
    </BackdropWrapper>
  );
};

export default Modal;

const BackdropWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 30;
  background-color: rgba(0, 0, 0, 0.75);
`;

const ModalContent = styled.div<{ type: string }>`
  position: fixed;
  top: 24vh;
  left: 5%;
  width: 90%;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  z-index: 30;
  animation: slide-down 300ms ease-out forwards;

  .modalHeader {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 36px;
    background: ${({ type }) => (type === 'warning' ? '#FF4800' : '#000000')};
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    color: white;
    font-size: 16px;
    font-weight: semibold;

    .closeButton {
      position: absolute;
      right: 0;
      font-size: 20px;
      width: 2rem;
    }
    .closeButton:hover {
      font-size: 24px;
    }
  }

  .modalContent {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 140px;
    padding: 1rem;
    font-size: 0.9rem;
  }

  .modalFooter {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    background-color: #efefef;
    height: 48px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    font-size: 16px;
    color: white;

    button {
      width: 4.5rem;
      padding: 4px 0;
      border-radius: 4px;
      font-size: 14px;
      background-color: #444444;
      opacity: 0.8;
    }

    button:hover {
      opacity: 1;
    }
  }

  @media (min-width: 768px) {
    width: 30rem;
    left: calc(50% - 15rem);
  }

  @keyframes slide-down {
    from {
      opacity: 0;
      transform: translateY(-3rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
