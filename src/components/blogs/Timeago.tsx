import { parseISO, formatDistanceToNow } from 'date-fns';

export type TimePropTypes = {
    timestamp: string,
}

const TimeAgo = ({ timestamp }:TimePropTypes) => {
    let timeAgo = ''
    if (timestamp) {
        const date = parseISO(timestamp)
        const timePeriod = formatDistanceToNow(date)
        timeAgo = `${timePeriod} ago`
    }

    return (
        <span title={timestamp}>
            &nbsp; <i>{timeAgo}</i>
        </span>
    )
}
export default TimeAgo