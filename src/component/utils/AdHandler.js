
const ads = [
    'https://www.youtube.com/embed/5jvQTztjPE4',
    'https://www.youtube.com/embed/KuZVPqowuok',
    'https://www.youtube.com/embed/E62zt55Hrhw',
    'https://www.youtube.com/embed/oArICfOt2Ms',
    'https://www.youtube.com/embed/JUtPRf5StFw',
]

export const getRandomImage = () =>{
    const randomNumber = Math.floor(Math.random() * ads.length);
    return ads[randomNumber]
}