import { Container, Button, Badge } from 'react-bootstrap';
import { useRouter } from 'next/router';
const LibDetails = ({ libData }) => {
  const router = useRouter();

  return (
    <Container fluid className="pt-5">
      <Container className="px-5">
        <Button
          className="btn-secondary btn-sm mb-3"
          onClick={() => router.back()}
        >
          Back
        </Button>
        <div className="mb-5">
          <h1 className="display-4">{libData.name}</h1>
          <p className="font-weight-bold text-muted">v{libData.version}</p>
        </div>
        <p>
          <b>Description: </b> {libData.description}
        </p>
        <p>
          <b>Authors:</b>{' '}
          {libData.authors &&
            libData.authors.map((author) => `${author.name},`)}
        </p>
        <div className="mb-3">
          <p>
            <b>Repository </b>{' '}
            <Badge variant="info">{libData.repository.type}</Badge>
          </p>
          <code>{libData.repository.url}</code>
        </div>
        <div className="mb-3">
          <p>
            <b>Latest CDN </b>{' '}
          </p>
          <code>{libData.latest}</code>
        </div>
        {libData.homepage && (
          <div className="mb-3">
            <p>
              <b>Homepage </b>{' '}
            </p>
            <a href={libData.homepage} target="_blank">
              {libData.homepage}
            </a>
          </div>
        )}
      </Container>
    </Container>
  );
};

export async function getServerSideProps({ params }) {
  const { lib } = params;
  const res = await fetch(`https://api.cdnjs.com/libraries/${lib}`);
  if (!res.ok) {
    return console.log(res.statusText);
  }
  const jsonData = await res.json();
  return {
    props: {
      libData: jsonData,
    },
  };
}

export default LibDetails;
