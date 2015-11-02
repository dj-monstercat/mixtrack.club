var mobileSupport = (function(width, site_desc) {
  if(width < 641) site_desc.removeAttribute("class");
})(window.innerWidth, document.getElementById("site-desc"));
