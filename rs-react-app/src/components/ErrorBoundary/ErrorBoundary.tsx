import { Component, type ReactNode } from 'react';
import * as React from 'react';
import errorImg from '../../assets/error-img.jpg'
import './ErrorBoundary.css';
import Image from 'next/image';

type Props = {
  children: ReactNode;
  title: string;
  message: string;
};

type State = {
  hasError: boolean;
};
class ErrorBoundary extends Component<Props, State> {
  constructor(props:Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Application error:', error, info);
  }

  render() {
    if (this.state.hasError) {
       return (
        <div className='error-message'>
         <h2>{this.props.title}</h2>
          <p>{this.props.message}</p>
      <Image
        src={errorImg}
        alt="Application error"
      /> 
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary