import React from "react";

// react plugins that creates an input with a date picker
import Datetime from "react-datetime";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

// core components

const LandingPageHeader = () => {
  const [from, setFrom] = React.useState(false);
  const [to, setTo] = React.useState(false);
  const [passengers, setPassengers] = React.useState(false);
  // const [departure, setDeparture] = new Date();

  return (
    <div className="page-header">
      <div
        className="page-header-image"
        style={{
          backgroundImage: "url(" + require("assets/img/bg6.jpg") + ")"
        }}
      ></div>
      <Container>
        <Row>
          <Card className="card-signup" data-background-color="blue">
            <Form action="" className="form" method="">
              <CardHeader className="text-center" />                  
              <CardBody>
                <InputGroup
                  className={
                    "no-border" + (from ? " input-group-focus" : "")
                  }
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="now-ui-icons location_pin"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="From..."
                    type="text"
                    onFocus={() => setFrom(true)}
                    onBlur={() => setFrom(false)}
                  ></Input>
                </InputGroup>
                <InputGroup
                  className={
                    "no-border" + (to ? " input-group-focus" : "")
                  }
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="now-ui-icons location_pin"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="To..."
                    type="text"
                    onFocus={() => setTo(true)}
                    onBlur={() => setTo(false)}
                  ></Input>
                </InputGroup>
                <InputGroup className="no-border">
                  <Container>
                    <Row id="bla">
                      <Col md="6">
                        <Datetime
                          timeFormat={false}
                          inputProps={{ 
                            placeholder: "Departure",
                          }}
                        />
                      </Col>
                      <Col md="6">
                        <Datetime
                          timeFormat={false}
                          inputProps={{ 
                            placeholder: "Return",
                          }}
                        />
                      </Col>
                    </Row>
                  </Container>               
                </InputGroup>                
                <InputGroup
                  className={
                    "no-border" + (passengers ? " input-group-focus" : "")
                  }
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="now-ui-icons users_single-02"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Passangers..."
                    type="number"
                    min="1"
                    onFocus={() => setPassengers(true)}
                    onBlur={() => setPassengers(false)}
                  ></Input>
                </InputGroup>
              </CardBody>
              <CardFooter className="text-center">
                <Button
                  className="btn-neutral btn-round"
                  color="info"
                  onClick={e => e.preventDefault()}
                  size="lg"
                >
                  Search
                </Button>
              </CardFooter>
            </Form>
          </Card>
        </Row>
      </Container>
    </div>
  );
}

export default LandingPageHeader;