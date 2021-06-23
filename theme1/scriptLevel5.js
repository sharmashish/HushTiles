
var game = document.getElementById('game');
var set = [];
var prev = 0;
var score = 0;
var times = 0;
var width = 1;
var time = 0;
var gameisover = false;
var totalTimeSecs = 12; // 60 Sec Game
var timer = setInterval(function () {
  var per = Math.round((width / totalTimeSecs) * 100);
  time++;
  document.getElementById('timer').style.width = per + '%';
  width++;
}, 1000);

var timerout = setTimeout(function () {
  gameOver();
}, totalTimeSecs * 1000);

function genSet() {
  var htmCode = '';
  var blackID = Math.trunc(Math.random() * 3);
  if (prev == blackID) {
    blackID = Math.round(Math.random() * blackID);
  }
  prev = blackID;
  var tileWidth = (($('#mobileDisplay').width()) / 4) - 1;
  for (var i = 0; i < 4; i++) {
    if (i == blackID) {
      htmCode += '<div style="width:' + tileWidth + 'px;" class="tile black"></div>';
    } else {
      htmCode += '<div style="width:' + tileWidth + 'px;" class="tile"></div>';
    }
  }
  return htmCode;
}

$(window).load(function () {
  var height = $('#mobileDisplay').height() / 4;
  bottom = 0;
  for (var i = 0; i < 5; i++)
    if (i == 0) {
      $('#game').html($('#game').html() + '<div class="set current" style="bottom:' + bottom + 'px;height:' + height + 'px;">' + genSet() + '</div>');
      bottom += height;
    } else if (i == 4) {
      $('#game').html($('#game').html() + '<div class="set last" style="bottom:' + bottom + 'px;height:' + height + 'px;">' + genSet() + '</div>');
    }
    else {
      $('#game').html($('#game').html() + '<div class="set" style="bottom:' + bottom + 'px;height:' + height + 'px;">' + genSet() + '</div>');
      bottom += height;
    }

  // alert("Press OK Button to Start Game")

  $('.current div').click(function clicked() {
    if ($(this).hasClass('black')) {
      if (gameisover === false) {
        $(this).css("background", "rgb(170,170,170)");
        $('.last').html(genSet());
        var pos = $('.current');
        var currHtm = pos.html();
        if (times > 0) {
          pos.prev().html(currHtm);
          var next1 = pos.next().html();
          var next2 = pos.next().next().html();
          var next3 = pos.next().next().next().html();
          pos.html(next1);
          pos.next().html(next2);
          pos.next().next().html(next3);
        }
        times++;
        if (times == 1) {
          pos.removeClass('current').next().addClass('current');
        }
        $('.current div').each(function () {
          this.onclick = clicked;
        });
        score++;
        $('#score').text(score);

        if (score ==35) {
          alert("Level 5 Completed");
          document.getElementById("demo").innerHTML = "Hello";
        }
      }
    } else {
      gameisover = true;
      clearInterval(timer);
      setTimeout(gameOver, 1500);
      $(this).addClass('red');
    }
  });
});
function gameOver() {
  clearInterval(timer);
  clearTimeout(timerout);
  var num = score / time;
  if (isNaN(num)) { num = 0; }
  $('#mobileDisplay').css('background-image', 'linear-gradient(to right top, #bc2c9d, #a040a5, #844ca7, #6953a3, #52579b, #3f61a1, #2a6ba3, #1673a3, #0087b0, #009bb7, #00aeb7, #00c0b3').css('color', 'white');
  // background-image: linear-gradient(to right top, #d16ba5, #be6caf, #a86eb6, #8f70ba, #7572ba, #617fc7, #478bd0, #2097d6, #00b2e7, #00ccf1, #00e6f4, #3bfff2);
  $('#game').html('<center><h1 style="margin-top:100px;">Game Over</h1><h3>Score : ' + score.toFixed(0) + ' tiles </h3><button class="button button-block btn-info" onclick="location.reload();">Play Again</button> <button class="button button-block btn-info href="levels.html">Goto Levels</button> <button class="button button-block btn-info href="theme.html">Goto Themes</button> </center>');
}

$('document').ready(function () {
  $('#play').click(function () {
    var audio = {};
    audio["walk"] = new Audio();
    audio["walk"].src = "http://www.rangde.org/static/bell-ring-01.mp3"
    // audio["walk"].src = "https://gaana.com/song/chaar-kadam"
    audio["walk"].addEventListener('load', function () {
      audio["walk"].play();
    });
  });
});