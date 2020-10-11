import {
  Container,
  ListGroup,
  ListGroupItem,
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Jumbotron,
} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  storeInSessionStorage,
  getFromSessionStorage,
} from '../actions/localStorageHelpers';

export default function Home({ libraries }) {
  const router = useRouter();
  const [value, setValue] = useState('');

  useEffect(() => {
    const storedValue = getFromSessionStorage('searched');
    if (!value) {
      if (storedValue) {
        setValue(storedValue);
      }
    }
  }, []);

  const controlSearchValue = (e) => {
    setValue(e.target.value);
    storeInSessionStorage('searched', e.target.value);
  };

  const sortArrayObjects = (a, b) => {
    let x = a.name.toLowerCase();
    let y = b.name.toLowerCase();
    if (x < y) return -1;
    if (x > y) return 1;
    return 0;
  };

  const sortedArray = libraries.results.sort(function (a, b) {
    sortArrayObjects(a, b);
  });

  const matchedLibraries = sortedArray.filter(
    (lib) => lib.name.toUpperCase().indexOf(value.toUpperCase()) > -1
  );

  return (
    <Container className="mt-5">
      <Jumbotron>
        <Form onSubmit={(e) => e.preventDefault()}>
          <FormGroup>
            <FormLabel htmlFor="search-in-libs" srOnly>
              {' '}
              Search Libraries{' '}
            </FormLabel>
            <FormControl
              style={{ paddingBottom: '12px' }}
              size="lg"
              color="secondary"
              id="search-in-libs"
              placeholder="search a library name"
              value={value}
              autoFocus
              onChange={(e) => controlSearchValue(e)}
            />
          </FormGroup>
        </Form>
      </Jumbotron>
      <ListGroup>
        {matchedLibraries.map((lib) => (
          <ListGroupItem
            key={lib.name}
            onClick={() => router.push(`lib/${lib.name}`)}
          >
            {lib.name}
          </ListGroupItem>
        ))}
      </ListGroup>
    </Container>
  );
}

export async function getStaticProps() {
  const res = await fetch('https://api.cdnjs.com/libraries/');
  if (!res.ok) {
    return console.log(res.statusText);
  }

  const jsonData = await res.json();

  return {
    props: {
      libraries: jsonData,
    },
  };
}
