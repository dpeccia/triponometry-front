var dayColor = {
    1 : '#FFADAD',
    2 : '#FFD6A5',
    3 : '#FDFFB6',
    4 : '#CAFFBF',
    5 : '#9BF6FF',
    6 : '#A0C4FF',
    7 : '#BDB2FF',
    8 : '#FFC6FF',
    9 : '#FFFFFC',
}

export default function getEventBackgroundColor(dayNumber) {
    return dayColor[dayNumber];
}