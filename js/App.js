let EndGame_Count = 0; // for count the maching card to stop the game
let Steps_Count = 0; // calculate steps number
const moves = document.querySelector('.score-panel .moves');
let movesCounter = document.createElement('span');
const distribution_card = document.querySelectorAll('.card');
const startagain = document.querySelector('.restart');
let card_src = [];
let card_index = [];
let time = 0;
let numOfStar = 0;
let cards=[];
let clicked_srcs = [];
let open_cards = [];


function Start_Game ()
{
  const pictures = [ "img/Camel.png","img/Falcon.png","img/Horse.png", "img/Ladybird.png","img/Lion.png",
  "img/Octopus.png","img/Tiger-Butterfly.png","img/Crab.png", "img/Camel.png",
  "img/Falcon.png","img/Horse.png","img/Ladybird.png", "img/Lion.png","img/Octopus.png",
  "img/Tiger-Butterfly.png", "img/Crab.png"];
  Steps_Count = 0;
  EndGame_Count = 0;
  cards = shuffle (pictures);

  for(let i=0; i <cards.length; i++) //fill the cards
  {
    let card = document.createElement('img');
    card.src= cards[i];
    distribution_card[i].appendChild(card);
  }

  const player_click = document.querySelectorAll('.card img');
  for(let i=0; i < player_click.length; i++)
   {
    player_click[i].addEventListener("click", function()
    {
      time = performance.now();
      player_click[i].setAttribute('style','opacity: 1;');
      Steps_Count ++;
      let  hold_click = [] ;
      MoveNumber(Steps_Count);
      stars(Steps_Count);
      hold_click = player_click[i];
      let id = i;
      clicked_srcs = clicked_srcs.concat(hold_click);
      Hold_Info(hold_click, id);
      });
    }

    function Hold_Info (hold_click,id)
    {
      card_src= card_src.concat(hold_click);
      card_index=card_index.concat(id);
      if (card_src.length == 2)
        { Match(card_src,card_index);}
    }

  startagain.addEventListener('click', function()
  {
    restart();
  });
    return ;
}

function shuffle (array)
{
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function Match (card_src, card_index)
{
  if (card_index[0] == card_index[1] )
  {
    card_src[0].style.cssText= 'opacity: 0;';
    card_src[1].style.cssText= 'opacity: 0;';
    card_src.length=0;
    card_index.length=0;
  }

  else if ((card_index[0] != card_index[1]) && (card_src[0].src == card_src[1].src) ) {
    card_src[0].style.cssText= 'opacity: 1;';
    card_src[1].style.cssText= 'opacity: 1;';
  if ((open_cards.includes(card_index[0])) && (open_cards.includes(card_index[1])))
  {
  // Steps_Count =  Steps_Count - 2;
  // MoveNumber(Steps_Count);
    EndGame_Count = EndGame_Count ;
    console.log(EndGame_Count);
  }
  else {
    EndGame_Count ++;
    open_cards = open_cards.concat(card_index[0]);
    open_cards = open_cards.concat(card_index[1]);}
    card_src.length=0;
    card_index.length=0;
    EndGame(Steps_Count,EndGame_Count,time);
  }

  else if (card_src[0].src != card_src[1].src)
  {
    setTimeout( notMatch ,500);
    function notMatch ()
    {
      card_src[0].style.cssText= 'opacity:0 ;';
      card_src[1].style.cssText= 'opacity:0 ;';
      card_src.length = 0;
      card_index.length=0;
    }
    }
}

function restart()
{
  Steps_Count = 0;
  EndGame_Count = 0;
  open_cards.length = 0;
  card_src.length = 0;
  card_index.length=0;
  cards.length = 0;
  for (let i=0; i<distribution_card.length; i++)
  {
    distribution_card[i].removeChild(distribution_card[i].lastElementChild);
  }

  MoveNumber(Steps_Count);
  for (let i=0 ; i< clicked_srcs.length; i++)
  {
    clicked_srcs[i].setAttribute('style','opacity: 0;');
  }
  clicked_srcs.length=0;
  Start_Game();
}


function MoveNumber(Steps_Count)
{
  movesCounter.textContent = Steps_Count;
  moves.appendChild(movesCounter);
}

function stars (Steps_Count)
{
  const star = document.querySelectorAll('.stars li');
  for(let i=0; i< star.length ; i++)
  {
    if (Steps_Count <=20)
    { star[i].setAttribute('style','display: inline-block;');
      numOfStar = 3;
    }
  else if (Steps_Count<=25)
    {
      star[0].setAttribute('style','display: inline-block;');
      star[1].setAttribute('style','display: inline-block;');
      star[2].setAttribute('style','display: none;');
      numOfStar = 2;
    }
  else
   {
      star[0].setAttribute('style','display: inline-block;');
      star[1].setAttribute('style','display: none;');
      star[2].setAttribute('style','display: none;');
      numOfStar = 1;
    }
  }
}

function EndGame (Steps_Count,EndGame_Count,time )
{
  const container = document.querySelector('.container');
  const _cong = document.querySelector('.cong');
  const First_cong =document.createElement('h1');
  const Thir_cong =document.createElement('h3');
  let Sec_cong =document.createElement('h3');
  let button =document.createElement('button');
  let Time2 = performance.now();
  let TimeEnd = Time2-time;
  let TimeEnd1 = TimeEnd.toFixed(2);

  if  ( EndGame_Count == 8 )
  {
    container.setAttribute('style','display:none');
    First_cong.textContent = " Congratulation You Did it !!!";
    Sec_cong.textContent = `with ${Steps_Count} Moves and  ${numOfStar} star in ${TimeEnd1} s/ms`;
    Thir_cong.textContent = " do you want to play again ? ";
    button.textContent = "Start";
    button.addEventListener('click', function ()
    {
      button.setAttribute ('style','background-color: #4CAF50; color: white; text-align: center; display: inline-block; font-size: 16px; cursor: pointer;');
      container.setAttribute('style','display:flex');
      Steps_Count = 0;
      EndGame_Count = 0;
      open_cards.length = 0;
      MoveNumber(Steps_Count);
      _cong.removeChild(First_cong);
      _cong.removeChild(Sec_cong);
      _cong.removeChild(Thir_cong);
      _cong.removeChild(button);
      restart();
  });
  _cong.appendChild(First_cong);
  _cong.appendChild(Sec_cong);
  _cong.appendChild(Thir_cong);
  _cong.appendChild(button);
  }
}

Start_Game ();
