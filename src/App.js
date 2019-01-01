import React, { Component } from "react";
import { 
	fetchQuestionList, 
	deleteQuestion,
	createQuestion } from './Actions.js'
import Table from './Table.js'
import {hot} from "react-hot-loader";
import "./App.css";

class App extends Component {
	render() {
		return(
			<div className="App">
				<Table 
					fetchQuestionList={fetchQuestionList}
					deleteQuestion={deleteQuestion}
					createQuestion={createQuestion}
				/>
			</div>
		);
	}
}

// export default hot(module)(App);
export default App;