import { useEffect } from 'react';
import { useRef } from 'react';
import useHttp from '../../hooks/use-http';
import { addComment } from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';

import classes from './NewCommentForm.module.css';

const NewCommentForm = (props) => {
  const { sendRequest, error, status } = useHttp(addComment)
  const commentTextRef = useRef();
  const {onAddedComment} = props
  const {quoteId} = props;

  useEffect(() => {

    if (!error && status==='completed') {
      onAddedComment()
    }

  }, [status, error, onAddedComment])

  const submitFormHandler = (event) => {
    event.preventDefault();

    sendRequest({commentData: {text: commentTextRef.current.value}, quoteId: quoteId})
    // optional: Could validate here

    commentTextRef.current.value = ''
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {status === 'pending' && (
        <div className='centered'>
          <LoadingSpinner />
        </div>
      )}
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor='comment'>Your Comment</label>
        <textarea id='comment' rows='5' ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className='btn'>Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
