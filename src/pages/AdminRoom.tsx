import { database } from "../services/firebase";
import { useHistory, useParams } from "react-router-dom";

import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
import { Question } from "../components/Question";
import { Footer } from "../components/Footer";

import answerImg from "../assets/images/answer.svg";
import logoImg from "../assets/images/logo.svg";
import deleteImg from "../assets/images/delete.svg";
import checkImg from "../assets/images/check.svg";

import { useRoom } from "../hooks/useRoom";

import "../styles/Room.scss";

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  //const { user } = useAuth();
  //Get parameter ID Room
  const params = useParams<RoomParams>();
  //const [newQuestion, setNewQuestion] = useState("");
  const roomId = params.id;

  const history = useHistory();

  const { title, questions } = useRoom(roomId);

  //FINISHED ROOM

  async function EndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });

    history.push("/");
  }

  //DELETE QUESTION IN FIREBASE HERE
  async function deleteQuestion(questionId: string) {
    if (window.confirm("Você tem certeza que deseja excluir essa pergunta ?")) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }
  async function handleMarkedQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }

  async function handleQuestionIsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="TheBestQuestions" />
          <div>
            <div className="buttonAndId">
              <RoomCode code={roomId} />
              <Button isOutlined={true} onClick={EndRoom}>
                Encerrar sala
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} perguntas</span>}
        </div>

        <div className="question-list">
          {questions.map((question) => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                <div className="align-button">
                  {!question.isAnswered && (
                    <>
                      <button
                        type="button"
                        onClick={() => handleQuestionIsAnswered(question.id)}
                      >
                        <img src={checkImg} alt="Marcar como respondida" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMarkedQuestion(question.id)}
                      >
                        <img src={answerImg} alt="Destacar pergunta" />
                      </button>
                    </>
                  )}
                  <button
                    type="button"
                    onClick={() => deleteQuestion(question.id)}
                  >
                    <img src={deleteImg} alt="Remover pergunta" />
                  </button>
                </div>
              </Question>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}
