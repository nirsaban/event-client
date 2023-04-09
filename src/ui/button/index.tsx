import { MouseEventHandler } from "react"

type UIButtonProps = {
    text : string,
    handleClick : MouseEventHandler<HTMLButtonElement>
}

export const UIButton = ({text , handleClick} : UIButtonProps) : JSX.Element=> {

    return (
        <button onClick = {handleClick}>{text}</button>
    )

}
