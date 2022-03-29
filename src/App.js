// import logo from './logo.svg';
// import './App.css';
import './styles/_main.scss';
import PasswordCheckerForm from './components/PasswordCheckerForm';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import HeroBanner from './components/HeroBanner';

function App() {
  return (
    <div className="App">
      <div className="login-form">
        <Container fluid>
          <Row>
            <Col lg={6}>
              <PasswordCheckerForm />
            </Col>
            <Col lg={6} className="p-0">
              <HeroBanner />
            </Col>
          </Row>
        </Container>
      </div>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
