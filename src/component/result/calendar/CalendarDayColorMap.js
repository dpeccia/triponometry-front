var dayColor = {
    0 : '#FFADAD',
    1 : '#FFD6A5',
    2 : '#FDFFB6',
    3 : '#CAFFBF',
    4 : '#9BF6FF',
    5 : '#A0C4FF',
    6 : '#BDB2FF',
    7 : '#FFC6FF',
    8 : '#FFFFFC',
}

export default function getEventBackgroundColor(dayNumber){
    return dayColor[dayNumber];
}