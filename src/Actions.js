import axios from 'axios';

const SERVER = 'http://localhost:8080';
// fetch questions
function fetchQuestionList() {
  const url = `${SERVER}/api/question`;
  return () => fetch(url)
    .then(res => res.json());
}

// add question
const createQuestion = (payload) => {
  const url = `${SERVER}/api/question`;
  axios.post(url, payload)
    .then(res => res)
    .catch((err) => {
      console.log(err);
      return err;
    });
};

// delete question
// must specify data in axios 'delete'
const deleteQuestion = (payload) => {
  const url = `${SERVER}/api/question`;
  console.log('deleting question: ', payload);
  axios.delete(url, { data: { id: payload } })
    .then(res => res)
    .catch((err) => {
      console.log(err);
      return err;
    });
};

// get survey

// save survey

// get survey results

export {
  fetchQuestionList,
  createQuestion,
  deleteQuestion,
};
