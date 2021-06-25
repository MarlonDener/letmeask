import { useHistory, useParams } from "react-router-dom";
import logoImg from "../assets/images/logo.svg";
import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
//import { useAuth } from "../hooks/useAuth";
//import { database } from "../services/firebase";
import { Question } from "../components/Question";
import "../styles/Room.scss";
import { useRoom } from "../hooks/useRoom";

import deleteImg from "../assets/images/delete.svg";
import { database } from "../services/firebase";

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
              >
                <button
                  type="button"
                  onClick={() => deleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="Remover pergunta" />
                </button>
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
}
