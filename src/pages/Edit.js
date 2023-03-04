import React from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../layouts/PageLayout';
import EditNoteForm from '../components/EditNoteForm';
import Container from '../components/ui/Container';
import { HomeLink, Title } from '../components/ui/HomeLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const EditPage = () => {
  return (
    <PageLayout>
      <Container>
        <HomeLink>
          <Title>
            <FontAwesomeIcon icon={faArrowLeft} /> &nbsp; <Link to={"/"}>Back</Link>
          </Title>
        </HomeLink>
        <EditNoteForm />
      </Container>
    </PageLayout>
  );
};

export default EditPage;
