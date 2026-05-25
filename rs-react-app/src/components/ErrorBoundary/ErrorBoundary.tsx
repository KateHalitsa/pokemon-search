import { Component, type ReactNode } from 'react';
import * as React from 'react';
import errorImg from '../../assets/error-img.jpg'
import './ErrorBoundary.css';


type Props = {
  children: ReactNode;
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
          <h2>Something went wrong</h2>
          <p>Please reload the page</p>
          <img src={errorImg}></img>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary