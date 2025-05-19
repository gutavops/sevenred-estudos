import './styles.css'

interface cardProps {
    text: string
}

export function Card ({text}: cardProps) {
    return (
        <div className='card'>
            {text}
        </div>
    )
}

