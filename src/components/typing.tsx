import { TypeAnimation } from "react-type-animation";

export default function TypingHome() {
    return (
        <TypeAnimation 
        sequence={[
            'Belajar React Query + NextJS',
            1000,
            ''
        ]}
        wrapper="span"
        repeat={Infinity}

        />
    )
}