import { useState } from 'react'
import './PollCard.css'

export type PollOption = {
    id: string
    label: string
    votes: number
}

export type Poll = {
    id: string
    question: string
    options: PollOption[]
}

const DEFAULT_POLL: Poll = {
    id: 'demo-poll',
    question: 'Which feature should we build next?',
    options: [
        { id: 'opt-1', label: 'Dark mode', votes: 4 },
        { id: 'opt-2', label: 'Mobile app', votes: 7 },
        { id: 'opt-3', label: 'Email digests', votes: 2 },
    ],
}

type PollCardProps = {
    poll?: Poll
}

function PollCard({ poll: initialPoll = DEFAULT_POLL }: PollCardProps) {
    const [poll, setPoll] = useState<Poll>(initialPoll)

    const totalVotes = poll.options.reduce((sum, option) => sum + option.votes, 0)

    function handleVote(optionId: string) {
        setPoll((prev) => ({
            ...prev, //keeps id and question untouched
            options: prev.options.map((option) =>
                option.id === optionId ? { ...option, votes: option.votes + 1 }
                    : option
            ),
        }))
    }

    return (
        <div className="poll-card">
            <h3>{poll.question}</h3>
            <div className="poll-options">
                {poll.options.map((option) => {
                    const percentage = totalVotes === 0 ? 0 : Math.round((option.votes / totalVotes) * 100)
                    return (
                        <button
                            key={option.id}
                            type="button"
                            className="poll-option"
                            onClick={() => handleVote(option.id)}
                        >
                            <div className="poll-option-row">
                                <span>{option.label}</span>
                                <span>{percentage}%</span>
                            </div>
                            <div className="poll-bar-track">
                                <div className="poll-bar-fill" style={{ width: `${percentage}%` }} />
                            </div>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default PollCard
