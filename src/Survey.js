import React, { Component } from 'react';
import {hot} from "react-hot-loader";
import { Header, Icon, Button, Segment, Label } from 'semantic-ui-react';
import { Form } from 'formsy-semantic-ui-react';
import { 
	submitSurvey, 
	getSurvey } from './Actions.js'

class Survey extends React.Component {
    constructor(props) {
      super(props);
      this.state = { questions: [] }

      this.handleValidSubmit = this.handleValidSubmit.bind(this);
    }

    componentDidMount() {
      let questions = getSurvey();
  
      questions()
      .then((questions) => {
        this.setState({ questions });
      });
    }
    
    handleValidSubmit(formData) {
      const {
        fname,
        lname,
        email,
        score
      } = formData;
      submitSurvey({
        fname: fname,
        lname: lname,
        email: email,
        score: score,
      });
      window.location.reload();
    }

    render() {
      let genOptions = (answers) => {
        return answers[0].split(",").map((answer, i) => {
          return {key: i, value: answer, text: answer}
        })
      }

      let generateQuestions = (questions) => {
        return questions.map((question, i) => {
          return (
            <Form.Dropdown
              key={i}
              selection
              label={question.question}
              name={i.toString()}
              required
              errorLabel={ <Label color="red" pointing/> }
              options={ genOptions(question.answers) }
            />
          )
        })
      }

        return (
          <div>
            <Header as='h1' textAlign='center' color='blue'>
              <Icon name="file" />
                <Header.Content>Super Cool Survey</Header.Content> 
              </Header>
            <Segment color='blue' raised vertical textAlign='center'>
            <Form
							onValidSubmit={ this.handleValidSubmit }
						>
              { generateQuestions(this.state.questions) }
						  <Form.Button color='green'>Submit</Form.Button>
            </Form>
            </Segment>
          </div>
        )
    }
}

export default hot(module)(Survey);