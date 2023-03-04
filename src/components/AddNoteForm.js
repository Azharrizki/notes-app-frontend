import React, { useState } from 'react';
import { Form, FormGroup, Input, TextArea, FormButtonGroup } from './ui/Form';
import Button from './ui/Button';
import Message from './ui/Message';
import { useDispatch } from 'react-redux';
import { addNewNote, statusReset } from '../features/notes/notesSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';

const InfoWrapper = (props) => {
  const { status } = props;

  if (status !== null) {
    if (status === false) {
      return <Message type="error" text="Title harus diisi" />;
    }
    return <Message type="success" text="Data berhasil disimpan" />;
  }
  return <></>;
};

const AddNoteForm = () => {
  const [state, setState] = useState({ title: '', note: '' });
  const [isSuccess, setIsSuccess] = useState(null);
  const dispatch = useDispatch()

  const handleTitleChange = (e) => {
    setState({ ...state, title: e.target.value });
  };

  const handleNoteChange = (e) => {
    setState({ ...state, note: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const actionResult = await dispatch(addNewNote(state));
      const result = unwrapResult(actionResult);
      if (result) {
        setIsSuccess(true);
      } else {
        setIsSuccess(true)
      }
    } catch (err) {
      console.error('terjadi kesalahan: ', err);
      setIsSuccess(false)
    } finally {
      dispatch(statusReset())
    }

    // const requestOptions = {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(state)
    // };
    // async function submitData() {
    //   const response = await fetch(`${process.env.REACT_APP_API_URL}/note`, requestOptions);
    //   if (response.ok) {
    //     setIsSuccess(true);
    //   } else {
    //     setIsSuccess(false);
    //   }
    // }
    // submitData();

  };

  const { title, note } = state;

  return (
    <>
      <InfoWrapper status={isSuccess} />
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Input placeholder='Title' type="text" name="title" value={title} onChange={handleTitleChange} />
        </FormGroup>
        <FormGroup>
          <TextArea name="note" placeholder='Your content goes here' rows="12" value={note} onChange={handleNoteChange} />
        </FormGroup>
        <FormButtonGroup type='submit'>
          <Button>
            <FontAwesomeIcon icon={faSave} /> &nbsp; Save
          </Button>
        </FormButtonGroup>
      </Form>
    </>
  );
};

export default AddNoteForm;
