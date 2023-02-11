import ReactDOM from 'react-dom';
import type { NextPage } from 'next';

type Props = {
  children: React.ReactNode;
  selector: string;
};

const Portal: NextPage<Props> = ({ children, selector }) => {
  const element =
    typeof window !== 'undefined' && document.querySelector(selector);
  return element && children ? ReactDOM.createPortal(children, element) : null;
};

export default Portal;
