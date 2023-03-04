/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Form, FormGroup, FormButtonGroup, Input, TextArea } from './ui/Form';
import Button from './ui/Button';
import Message from './ui/Message';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNote, statusReset, updateExistingNote } from '../features/notes/notesSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrashAlt } from '@fortawesome/free-solid-svg-icons';



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

const EditNoteForm = () => {
  const location = useLocation();
  const history = useHistory();
  const [isSuccess, setIsSuccess] = useState(null);
  const dispatch = useDispatch();
  const noteId = location.pathname.replace('/edit/', '');
  const currentNote = useSelector(state => state.notes.data.find(note => note._id === noteId));
  const [state, setState] = useState(currentNote)

  const handleTitleChange = (e) => {
    setState({ ...state, title: e.target.value });
  };

  const handleNoteChange = (e) => {
    setState({ ...state, note: e.target.value });
  };

  const handleSubmit = async (e) => {
    // const options = {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(state)
    // };

    // async function submitData() {
    //   const response = await fetch(`${process.env.REACT_APP_API_URL}/note/${state._id}`, options);
    //   if (response.ok) {
    //     setIsSuccess(true);
    //   } else {
    //     setIsSuccess(false);
    //   }
    // }

    // submitData();
    e.preventDefault();

    try {
      const actionResult = await dispatch(updateExistingNote(state));
      const result = unwrapResult(actionResult);
      if (result) {
        setIsSuccess(true);
      } else {
        setIsSuccess(false);
      }
    } catch (error) {
      console.error('terjadi kesalahan: ', error);;
      setIsSuccess(false);
    } finally {
      dispatch(statusReset())
    }

  };

  const handleDeleteNote = async (e) => {
    // const options = {
    //   method: 'DELETE',
    //   headers: { 'Content-Type': 'application/json' }
    // };

    // async function deleteData() {
    //   const response = await fetch(`${process.env.REACT_APP_API_URL}/note/${state._id}`, options);
    //   if (response.ok) {
    //     history.push('/');
    //   }
    // }

    // deleteData();
    e.preventDefault();

    try {
      const actionResult = await dispatch(deleteNote(state));
      const result = unwrapResult(actionResult)
      if (result) {
        setIsSuccess(true)
      } else {
        setIsSuccess(false)
      }
    } catch (err) {
      console.error('terjadi kesalahan: ', err);
      setIsSuccess(false)
    } finally {
      dispatch(statusReset());
      history.push("/")
    }
  };

  const { title, note } = state;

  return (
    <>
      <InfoWrapper status={isSuccess} />
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Input type="text" name="title" value={title} onChange={handleTitleChange} />
        </FormGroup>
        <FormGroup>
          <TextArea name="note" rows="12" value={note} onChange={handleNoteChange} />
        </FormGroup>
        <FormButtonGroup>
          <Button>
            <FontAwesomeIcon icon={faSave} /> &nbsp; Save
          </Button>
          <Button danger onClick={handleDeleteNote}>
            <FontAwesomeIcon icon={faTrashAlt} /> &nbsp; Delete
          </Button>
        </FormButtonGroup>
      </Form>
    </>
  );
};

export default EditNoteForm;
