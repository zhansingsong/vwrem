!(function(win, division, MAX_WIDTH, MIN_WIDTH) {
  division = division || 10;
  MAX_WIDTH = MAX_WIDTH || 1200;
  MIN_WIDTH = MIN_WIDTH || 320;
  // make sure that checkVUnit is only called once.
  var checkVwUnit = function() {
    var foolElement = document.createElement('div');
    foolElement.style.width = '10vw';
    var docElement = document.documentElement;
    docElement.appendChild(foolElement);
    var compStyle = parseInt(
      (win.getComputedStyle
        ? getComputedStyle(foolElement, null)
        : foolElement.currentStyle
      ).width,
      10
    );
    win.__is_vw__ = parseInt(win.innerWidth / 10, 10) === compStyle;
    docElement.removeChild(foolElement);
  };
  checkVwUnit();

  var fontSize;
  var fitCB = function() {
    var innerWidth = win.innerWidth;
    if (innerWidth > MAX_WIDTH) {
      fontSize = MAX_WIDTH / division + 'px';
    } else if (innerWidth < MIN_WIDTH) {
      fontSize = MIN_WIDTH / division + 'px';
    } else {
      fontSize = win.__is_vw__ ? '10vw' : innerWidth / division + 'px';
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
})(window);
