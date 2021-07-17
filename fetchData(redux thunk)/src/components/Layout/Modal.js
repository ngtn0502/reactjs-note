import React from 'react';
import { useDispatch } from 'react-redux';
import { SHOW_MODAL } from '../redux/actions/cart.actions.js';
import styles from './Modal.module.css';

function Modal() {
  const dispatch = useDispatch();
  return (
    <>
      <main className={styles.modal}>
        <div
          className={styles.backdrop}
          onClick={() => {
            dispatch({
              type: SHOW_MODAL,
            });
          }}
        ></div>
        <div className={styles.modal2}>
          <h1>Modal</h1>
          <button
            onClick={() => {
              dispatch({
                type: SHOW_MODAL,
              });
            }}
          >
            Exit
          </button>
        </div>
      </main>
    </>
  );
}

export default Modal;
