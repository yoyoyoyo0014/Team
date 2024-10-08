import ReactDOM from 'react-dom/client';
import BookDetail from './bookDetail';
import BookReview from './bookReview';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<BookDetail />
  <BookReview bookNum={1} userId={'admin123'} userIsBuy={true}></BookReview>


);