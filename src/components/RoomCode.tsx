import copyImg from "../assets/images/copy.svg";
import "../styles/RoomCode.scss";

type RoomCodeProps = {
  code: string;
};

export function RoomCode(props: RoomCodeProps) {
  function copyRoomCodeToClick() {
    navigator.clipboard.writeText(props.code);
  }

  return (
    <button className="room-code" onClick={copyRoomCodeToClick}>
      <div>
        <img src={copyImg} alt="Copy run code" />
      </div>
      <span>Sala {props.code}</span>
    </button>
  );
}
