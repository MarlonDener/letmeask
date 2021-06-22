import "../styles/Button.scss";
import { ButtonHTMLAttributes} from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = (props: ButtonProps) => {
    return(
        <button className="button" {...props}/>
    );
}
