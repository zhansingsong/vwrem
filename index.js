!(function(win) {
  // configurations
  var RWD = false;
  var BASE_WIDTH = 1080;
  var DIVISION = 10;
  var MAX_WIDTH = 1080;
  var MIN_WIDTH = 320;
  // make sure that checkVUnit is only called once.
  var docElement = document.documentElement;
  var checkVwUnit = function() {
    var foolElement = document.createElement('div');
    foolElement.style.width = '10vw';
    docElement.appendChild(foolElement);
    var compStyle = parseInt(
      (win.getComputedStyle ? getComputedStyle(foolElement, null) : foolElement.currentStyle).width,
      10
    );
    win.__is_vw__ = parseInt(win.innerWidth / 10, 10) === compStyle;
    docElement.removeChild(foolElement);
  };
  checkVwUnit();

  var dpr = win.devicePixelRatio || 1;
  function setFit() {
    var screenHeight = screen.height;
    var winHeight = window.innerHeight;
    if (winHeight / screenHeight <= 0.8) {
      docElement.classList.add('notfullscreen');
      win.__is_not_full_screen__ = true;
    }
  }
  
  setFit();
  var fontSize;
  var fitCB = function() {
    if (RWD) {
      fontSize = BASE_WIDTH / DIVISION / 3 + 'px';
      docElement.classList.add('rwd');
    } else {
      var innerWidth = win.innerWidth;
      if (innerWidth > MAX_WIDTH) {
        fontSize = MAX_WIDTH / DIVISION + 'px';
      } else if (innerWidth < MIN_WIDTH) {
        fontSize = MIN_WIDTH / DIVISION + 'px';
      } else {
        fontSize = win.__is_vw__ ? DIVISION + 'vw' : innerWidth / DIVISION + 'px';
      }
    }
    document.documentElement.style.fontSize = fontSize;
  };
  var throttle = function(fn, delay) {
    var timer;
    return function() {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      timer = setTimeout(fn, delay);
    };
  };
  fitCB();
  win.addEventListener('resize', throttle(fitCB, 100), false);
  win.addEventListener('pageshow', function(event) {
    if (event.persisted) {
      fitCB();
    }
  });
  // detect 0.5px supports
  if (dpr >= 2) {
    var fakeBody = document.createElement('body');
    var testElement = document.createElement('div');
    testElement.style.border = '.5px solid transparent';
    fakeBody.appendChild(testElement);
    docElement.appendChild(fakeBody);
    if (testElement.offsetHeight === 1) {
      docElement.classList.add('hairlines');
    }
    docElement.removeChild(fakeBody);
  }
})(window);
