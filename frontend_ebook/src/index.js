import ReactDOM from 'react-dom/client';
import BookDetail from './bookDetail';
import BookReview from './bookReview';
import BookSearch from './bookSearch';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<BookDetail />
  //<BookReview bookNum={1}  userIsBuy={true}></BookReview>
  <BookSearch></BookSearch>
);  