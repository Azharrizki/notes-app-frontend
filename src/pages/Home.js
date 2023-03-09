import React from 'react';
import { Redirect } from 'react-router-dom';
import PageLayout from '../layouts/PageLayout';
import NotesList from '../components/NotesList';
import Container from '../components/ui/Container';
import { useSelector } from 'react-redux';

const HomePage = () => {
  const isLoggedIn = useSelector(state => state.user.isLoggedIn)

  return (
    <>
      {isLoggedIn ? (
        <PageLayout>
          <Container>
            <NotesList>Notes List</NotesList>
          </Container>
        </PageLayout>

      ) : (
        <Redirect to={"/login"} />
      )}
    </>
  );
};

export default HomePage;
