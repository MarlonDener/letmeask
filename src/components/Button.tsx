import "../styles/Button.scss";
import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
};

export const Button = ({ isOutlined = false, ...props }: ButtonProps) => {
  return (
    <button className={`button ${isOutlined ? "outlined" : ""}`} {...props} />
  );
};
