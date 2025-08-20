import React from 'react'
import NotFoundBlock from '../components/NotFound' 
import Header from '../components/Header';

export default function NotFound() {
  React.useEffect(() => {
    document.title = '404 Not Found';
  }, []);
  return (
    <div>
      <meta name="robots" content="noindex" />
      <Header/>
      <NotFoundBlock/>
    </div>
  )
}