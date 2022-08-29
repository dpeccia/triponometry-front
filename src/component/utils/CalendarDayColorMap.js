var dayColor = {
    0 : '#c0afea', 
    1 : '#ffeb84',
    2 : '#dbd9e1',
    3 : '#98cef4',
    4 : '#f58b8b',
    5 : '#c0e767',
    6 : '#e9b47d',
}

export default function getEventBackgroundColor(dayNumber){
    return dayColor[dayNumber];
}