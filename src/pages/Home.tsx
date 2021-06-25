import { useHistory } from "react-router-dom";
import ilustrationImg from "../assets/images/ilustraImg.svg";
import logoImg from "../assets/images/logo.svg";
import googleIconImg from "../assets/images/google-icon.svg";
import { Button } from "../components/Button";
import "../styles/auth.scss";
import { useAuth } from "../hooks/useAuth";
import { FormEvent, useState } from "react";
import { database } from "../services/firebase";

export const Home = () => {
  //History is a function for navigate without ahref
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  //state armazena o código da sala
  const [roomCode, setRoomCode] = useState("");

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }
    history.push("/rooms/new");
  }

  //FLUXO PARA ENTRAR EM UMA SALA

  async function handleJoinrRoom(event: FormEvent) {
    event.preventDefault();
    if (roomCode.trim() === "") {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert("Room does not exists");
      return;
    }
    if (roomRef.val().endedAt) {
      alert("This room does not exist");
      return;
    }
    history.push(`/rooms/${roomCode}`);
  }

  return (
    <div id="page-auth">
      <aside>
        <img
          src={ilustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie sals de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>

      <main>
        <div className="main-content">
          <img src={logoImg} alt="TheBestQuestion" />
          <button className="create-row" onClick={handleCreateRoom}>
            <img src={googleIconImg} alt="logo do google" />
            Crie sua sala com o Google
          </button>

          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinrRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={(event) => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">Entra na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
};
