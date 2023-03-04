import React from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../layouts/PageLayout';
import NotesList from '../components/NotesList';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';

const HomePage = () => {
  return (
    <PageLayout>
      <Container>
        <NotesList>Notes List</NotesList>
      </Container>
    </PageLayout>
  );
};

export default HomePage;
