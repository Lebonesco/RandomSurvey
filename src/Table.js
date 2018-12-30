import React, { Component } from 'react';
import { Header, Table, Icon, Button, Modal } from 'semantic-ui-react';
import { Form } from 'formsy-semantic-ui-react';
const questions = [
	{type: "radio", score: 6, question: "what is the capital of the US?", 
	answer: "Washington D.C.", options: ["LA", "Seattle", "D.C.", "New York"]},
	{type: "radio", score: 3, question: "what is the capital of the US?", 
	answer: "Washington D.C.", options: ["LA", "Seattle", "D.C.", "New York"]},
	{type: "radio", score: 3, question: "what is the capital of the US?", 
	answer: "Washington D.C.", options: ["LA", "Seattle", "D.C.", "New York"]},
	{type: "radio", score: 3, question: "what is the capital of the US?", 
	answer: "Washington D.C.", options: ["LA", "Seattle", "D.C.", "New York"]}
]

// question table
class QuestionTable extends Component {
	constructor(props) {
		super(props);
		this.state = {data: []}

		this.handleValidSubmit = this.handleValidSubmit.bind(this);
	}

	componentDidMount() {
		let questions = this.props.fetchQuestionList();

		questions()
		.then((data) => {
			this.setState({ data });
		});
	}

	handleDelete(id) {
		this.props.deleteQuestion(id);
		window.location.reload();
	}

	handleValidSubmit(formData) {
		const {
			question,
			answers,
			answer,
			score
		} = formData;
		this.props.createQuestion({
			question: question,
			answers: answers,
			answer: answer,
			score: score,
		});
		window.location.reload();
	}

	render() {
		let generateRows = (questions) => {
			return (
				questions.map((question, i) => {
					return (
						<Table.Row key={i}>
							<Table.Cell>{question.question}</Table.Cell>
							<Table.Cell>{question.answer}</Table.Cell>
							<Table.Cell>{question.answers.join()}</Table.Cell>
							<Table.Cell>{question.score}</Table.Cell>
							<Table.Cell selectable onClick={() => this.handleDelete(question._id)}>
								<Icon color="red" size="large" name="remove"/>
							</Table.Cell>
						</Table.Row>
					);
				})
			)
		}

		return (
			<div>
				<Header>Questions: {this.state.data.length}</Header>
				<Table celled striped color="blue">
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>Question</Table.HeaderCell>
							<Table.HeaderCell>Answer</Table.HeaderCell>
							<Table.HeaderCell>Options</Table.HeaderCell>
							<Table.HeaderCell>Score</Table.HeaderCell>
							<Table.HeaderCell>Remove</Table.HeaderCell>
						</Table.Row>
					</Table.Header>

					<Table.Body>
						{ generateRows(this.state.data) }
					</Table.Body>

					<Table.Footer fullWidth>
						<Table.Row>
							<Table.HeaderCell colSpan='6'>
								<Modal trigger={<Button floated='right' icon labelPosition='left' color="green" size='small'>
													<Icon name='file' /> Add Question
												</Button>}>
									<Modal.Header>Create Question</Modal.Header>
									<Modal.Content>
										<Form
											onValidSubmit={ this.handleValidSubmit }
											ref={ref => this.form = ref}
										>
											<Form.Input 
												fluid
												required
												name='question'
												label="Question" 
												placeholder="What day is it?" />
											<Form.Input 
												fluid 
												required
												name='answer'
												label="Answer" 
												placeholder="idk..." />
											<Form.Input 
												fluid
												required 
												name='answers'
												label="Answers" 
												placeholder="answer1, answer2, ..."/>
											<Form.Input 
												fluid
												required 
												name='score'
												label="Score" 
												placeholder="ei: 5" />
											<Form.Button>Submit</Form.Button>
										</Form>
									</Modal.Content>
								</Modal>
							</Table.HeaderCell>
						</Table.Row>
					</Table.Footer>
				</Table>
			</div>
		);
	}
}

export default QuestionTable;