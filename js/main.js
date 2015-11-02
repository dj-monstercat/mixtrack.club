var mobileSupport = (function() {
  var width = window.innerWidth,
      site_desc = document.getElementById("site-desc");
  if(width < 641) site_desc.removeAttribute("class");
})();
