let randomColors = [
    '#480f82',
    '#46315c',
    '#462766',
    '#323e78',
    '#2f3553',
    '#1d233f',
    '#6471ae',
    '#435091db',
    '#296987',
    '#005d89',
    '#44705c',
    '#123b28',
    '#452c2c',
    '#605520',
    '#3c6030',
    '#BA8F95',
    '#897c80',
    '#2E86AB',
    '#643173',
    '#7D5BA6',
    '#6B4E71',
    '#53687E',
    '#294c60',
    '#133c55',
    '#59a5d8',
    '#8d91c7',
    '#574ae2',
    '#34648d',
    '#273039',
    '#5E771B',
    '#ab6512',
    '#11515C',
    '#595774',
    '#595774',
    '#3E4A5A',
    '#9B665D',
    '#391319',
    '#598896',
    '#673A42',
    '#1A1E29',
    '#4B5F4E',
    '#2D1F2D',
    '#822C4B'

];


let getRandomBackgroundColor = ()=> {
    let r = Math.floor(Math.random()*randomColors.length);
    document.body.style.backgroundColor = randomColors[r];
}

export default getRandomBackgroundColor;
