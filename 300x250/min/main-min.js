function isWhitelisted(){var e=navigator.userAgent;e.indexOf("MSIE")>0&&(e.indexOf("10")>0||e.indexOf("11")>0?showBackup=!1:(showBackup=!0,document.getElementById("backup").src="backup.jpg"))}function init(){isWhitelisted(),gallery=config.module.gallery.photos,Enabler.getUserZipCode()?(userZip=Enabler.getUserZipCode(),prePreload()):prePreload()}function prePreload(){preload([getURL(config.intro),getURL(config.header.image),getURL(config.module.bg)],adStart)}function adStart(){Enabler.addEventListener(studio.events.StudioEvent.EXIT,function(){videoTabActive&&toggleVideo(0)}),Enabler.loadModule(studio.module.ModuleId.VIDEO),document.getElementById("header").onclick=buttonHandler,document.getElementById("backup").onclick=buttonHandler,document.getElementById("header_gallery").onclick=buttonHandler,document.getElementById("header_video").onclick=buttonHandler,document.getElementById("video_cta").onclick=buttonHandler,document.getElementById("mod_gallery").onclick=buttonHandler,document.getElementById("mod_locator").onclick=buttonHandler,document.getElementById("zip_field").onclick=buttonHandler,document.getElementById("zip_field2").onclick=buttonHandler,document.getElementById("btn_zip").onclick=buttonHandler,document.getElementById("btn_zip2").onclick=buttonHandler,document.getElementById("btn_prev").onclick=buttonHandler,document.getElementById("btn_next").onclick=buttonHandler,document.getElementById("close_gallery").onclick=buttonHandler,document.getElementById("close_locator").onclick=buttonHandler,document.getElementById("close_video").onclick=buttonHandler,document.getElementById("toggleList").onclick=buttonHandler,document.getElementById("toggleMap").onclick=buttonHandler,document.getElementById("video_button").addEventListener("click",function(){Enabler.exit("Watch More Exit")},!1),document.getElementById("container").style.opacity=1,document.getElementById("backup").src=getURL(config.intro),document.getElementById("header").src=getURL(config.header.image),document.getElementById("tab_gallerybg").src=getURL(config.module.bg),document.getElementById("tab_videobg").src=getURL(config.module.bg),document.getElementById("tab_locatorbg").src=getURL(config.module.bg),document.getElementById("tab_locatorimg").src=getURL("https://maps.googleapis.com/maps/api/staticmap?center="+userZip+"&zoom=8&size=300x232"),document.getElementById("btn_zip").src=getURL(config.module.locator.button),document.getElementById("btn_zip2").src=getURL(config.module.locator.button),document.getElementById("gallery_posterimg").src=getURL(config.module.gallery.poster),document.getElementById("locator_posterimg").src=getURL("https://maps.googleapis.com/maps/api/staticmap?center="+userZip+"&zoom=8&size=143x85"),document.getElementById("video_smallposter").src=getURL(config.module.video.poster.small),showBackup?(toggleSpinner(0),document.getElementById("backup").src="backup.jpg"):(setTimeout(function(){removeClass(document.getElementById("header"),"start"),removeClass(document.getElementById("subcontainer"),"start")},1e3),toggleSpinner(0),setVideo(),peeked=0,setTimeout(triggerAP,3e3))}function triggerAP(){document.getElementById("loader").style.backgroundColor="rgba(0, 0, 0, 0.4)",peeked>=2||(autoPeek(document.getElementById("mod_locator"),"active",2e3),autoPeek(document.getElementById("mod_gallery"),"active",100),setTimeout(triggerAP,6e3),peeked++)}function autoPeek(e,t,o){var l=e.getElementsByClassName("animate")[0];setTimeout(function(){addClass(l,t),setTimeout(function(){video.ismobile||removeClass(l,t)},1e3)},o)}function buttonHandler(e){switch(e.currentTarget.id){case"video_cta":toggleVideo(1),Enabler.counter("Open Video Module",!0);break;case"mod_gallery":toggleGallery(1),Enabler.counter("Open Gallery Module",!0);break;case"mod_locator":toggleLocator(1),Enabler.counter("Open Locator Module",!0);break;case"close_locator":toggleLocator(0),Enabler.counter("Close Locator Module",!0);break;case"close_gallery":toggleGallery(0),Enabler.counter("Close Gallery Module",!0);break;case"close_video":toggleVideo(0),Enabler.counter("Close Video Module",!0);break;case"btn_prev":currentSlide>0&&activeButtons&&(addClass(document.getElementById("btn_prev"),"disabled"),addClass(document.getElementById("btn_next"),"disabled"),toggleSpinner(1),preload([getURL(config.module.gallery.photos[currentSlide-1][0])],function(){toggleSpinner(0),loadSlide(currentSlide-1)}),Enabler.counter("Previous Slide",!0));break;case"btn_next":currentSlide<gallery.length-1&&activeButtons&&(addClass(document.getElementById("btn_prev"),"disabled"),addClass(document.getElementById("btn_next"),"disabled"),toggleSpinner(1),preload([getURL(config.module.gallery.photos[currentSlide+1][0])],function(){toggleSpinner(0),loadSlide(currentSlide+1)}),Enabler.counter("Next Slide",!0));break;case"zip_field":"ZIP code"==document.getElementById("zip_field").value&&(document.getElementById("zip_field").value=""),addClass(document.getElementById("zip_field"),"zip_active");break;case"zip_field2":"ZIP code"==document.getElementById("zip_field2").value&&(document.getElementById("zip_field2").value=""),addClass(document.getElementById("zip_field2"),"zip_active");break;case"btn_zip":document.getElementById("zip_field").value.length&&"ZIP code"!=document.getElementById("zip_field").value&&(userZip=document.getElementById("zip_field").value,document.getElementById("zip_field2").value=document.getElementById("zip_field").value,addClass(document.getElementById("zip_field2"),"zip_active"),loadLocationList());break;case"btn_zip2":document.getElementById("zip_field2").value.length&&"ZIP code"!=document.getElementById("zip_field2").value&&(userZip=document.getElementById("zip_field2").value,loadLocationList());break;case"toggleList":toggleSecondaryLocator(2);break;case"toggleMap":toggleSecondaryLocator(1);break;case"backup":Enabler.exit("Background");break;default:Enabler.exitOverride("Header",config.header.exit)}}function loadmap(e,t){map?t&&t():gmap.locate.find(e,function(e){zipCenter=e,document.getElementById("map_locations").innerHTML="",gmap.init({id:"map_locations",zoom:8,center:e},t)})}function toggleLocator(e){var t=document.getElementsByClassName("close_tab_locator"),o=new google.maps.LatLng(40.7127837,-74.00594130000002),l=8;map=new google.maps.Map(document.getElementById("map_locations"),{center:o,zoom:l,mapTypeControl:!1,streetViewControl:!1,mapTypeId:google.maps.MapTypeId.ROADMAP}),google.maps.event.addListener(map,"tilesloaded",function(e){isMapCreated||(geocoder=new google.maps.Geocoder),isMapCreated=!0});for(var n=0;n<t.length;n++)t[n].style.color=config.module.close_color_locator;e?(addClass(document.getElementById("tab_locator"),"tabactive"),toggleSecondaryLocator(0)):removeClass(document.getElementById("tab_locator"),"tabactive")}function toggleSecondaryLocator(e){switch(e){case 1:document.getElementById("secondary_content").style.visibility="visible",document.getElementById("locator_bgscreen").style.opacity=0,document.getElementById("map_listings").style.visibility="hidden",document.getElementById("map_listings").style.overflow="hidden",document.getElementById("map_locations").style.visibility="visible";break;case 2:document.getElementById("secondary_content").style.visibility="visible",document.getElementById("locator_bgscreen").style.opacity=0,document.getElementById("map_listings").style.visibility="visible",document.getElementById("map_listings").style.overflow="auto",document.getElementById("map_locations").style.visibility="hidden";break;default:document.getElementById("secondary_content").style.visibility="hidden",document.getElementById("locator_bgscreen").style.opacity=1,document.getElementById("map_listings").style.overflow="hidden",document.getElementById("map_listings").style.visibility="hidden",document.getElementById("map_locations").style.visibility="hidden"}}function loadLocationList(e){locations=[],toggleSpinner(1),geocoder.geocode({address:userZip},function(e,t){if(t==google.maps.GeocoderStatus.OK){var o=e[0].geometry.location,l=o[Object.keys(o)[0]],n=o[Object.keys(o)[1]],d="ST_INTERSECTS(faddress,CIRCLE(LATLNG("+l+","+n+"),32000))",i=30,a=new XMLHttpRequest,c="https://www.googleapis.com/fusiontables/v1/query?sql=SELECT%20name%2Cfaddress%2Clat%2Clng%2Czip%20FROM%201XtOyb3e3z2Sno7f4Xk9IpQ5tX_nZMOmzFKayS7YX%20WHERE%20"+d+"&key="+ftkey;a.onload=function(){if(200===a.status)if(toggleSpinner(0),JSON.parse(a.response).rows){document.getElementById("map_listings").innerHTML="",gmap.marker.clear();var t=document.getElementById("map_listings"),o=document.createElement("div");o.style.top=0,o.style.zIndex=90,o.style.backgroundColor="#FFF",o.id="locationList";var l=JSON.parse(a.responseText).rows;l.forEach(function(t){gmap.getDistance(e[0].geometry.location,new google.maps.LatLng(t[2],t[3]),function(e){isNaN(e)?t[5]=100:t[5]=e}),++d});var n=l.length;n>40&&(n=40),l=l.sort(function(e,t){return e[5]-t[5]});for(var d=0;n>d;d++){var i={};i.id=d,i.name=l[d][0],i.address=l[d][1],i.lat=l[d][2],i.lng=l[d][3],i.loc=null,locations.push(i);var c=document.createElement("div");c.className="btn cell",c.id="location"+i.id,c.onclick=findMarker;var r=document.createElement("div");r.className="name",r.innerHTML=i.name;var s=document.createElement("div");if(s.className="address",s.innerHTML=i.address,c.appendChild(r),c.appendChild(s),o.appendChild(c),"number"==typeof i.lat&&"number"==typeof i.lng){var m=new google.maps.LatLng(i.lat,i.lng);locations[i.id].loc=m,locations[i.id].info='<div style="overflow: hidden !important; line-height: 18px;"><b>'+i.name+"</b><br>"+i.address+"</div>",gmap.marker.add(locations[i.id]),console.log(gmap.marker.list),gmap.fit()}else gmap.locate.find(i.address,function(e,t){locations[i.id].loc=e,locations[i.id].info=t,gmap.marker.add(locations[i.id])},'<div style="overflow: hidden !important;"><b>'+i.name+"</b><br>"+i.address+"</div>")}gmap.fitBound(gmap.marker.list.markers),t.appendChild(o),toggleSecondaryLocator(2)}else alert("No locations at zipcode "+userZip);else trace("-- fail"),trace(a)},a.open("GET",c,!0),a.send()}else toggleSpinner(0),alert("Please enter a valid Zip Code")})}function findMarker(e){var t=locations[Number(e.currentTarget.id.substring(8))];t.loc?(gmap.center(t.loc,!0),gmap.zoom(15)):gmap.locate.find(t.address,function(e){var t={loc:e};gmap.center(t.loc,!0),gmap.zoom(15)}),toggleSecondaryLocator(1)}function toggleGallery(e){e?(toggleSpinner(1),preload([getURL(config.module.gallery.photos[0][0])],function(){toggleSpinner(0),addClass(document.getElementById("tab_gallery"),"tabactive"),loadSlide(0,!0)})):(removeClass(document.getElementById("tab_gallery"),"tabactive"),setTimeout(function(){document.getElementById("slides").innerHTML=""},500))}function toggleVideo(e){e?videoTabActive||(videoTabActive=!0,document.getElementById("video_title").innerHTML=config.module.video.title,document.getElementById("video_info").innerHTML=config.module.video.description,video.ismobile?video.play():(video.obliterate(),video.init("video_bigcontainer"),video.load(getURL(config.module.video.files),getURL(config.module.video.poster.big))),addClass(document.getElementById("tab_video"),"tabactive")):videoTabActive&&(videoTabActive=!1,removeClass(document.getElementById("tab_video"),"tabactive"),video.ismobile?video.stop():(video.obliterate(),toggleVideoSmallPoster(1),video.init("video_smallcontainer"),video.load(getURL(config.module.video.files),getURL(config.module.video.poster.big))))}function setVideo(){video.userAgent(),video.dom.template.bigplay=function(){video.dom.bigplay=document.createElement("span"),video.dom.bigplay.className="fa fa-play-circle-o",video.dom.bigplay.style.color=video.colors.play_pause,video.dom.bigplay.style.fontSize="50px",video.trace("using new play")},video.debug=!0,video.uniquereplay=!1,video.ismobile?video.autoplay=!1:video.autoplay=!0,video.callback.ready=function(){videoTabActive?studio.video.Reporter.attach("MAIN_VIDEO",video.proxy):studio.video.Reporter.attach("PREVIEW_VIDEO",video.proxy)},video.callback.ended=function(){videoTabActive||video.ismobile||toggleVideoSmallPoster(1)},video.callback.play=function(){!videoTabActive&&video.autoplay&&(video.mute(),toggleVideoSmallPoster(0))},video.callback.progress=function(){videoTabActive||(document.getElementById("v_controls").style.opacity=0,video.playhead>=13&&(video.stop(),toggleVideoSmallPoster(1)))},video.ismobile?video.init("video_bigcontainer"):video.init("video_smallcontainer"),video.load(getURL(config.module.video.files),getURL(config.module.video.poster.big))}function toggleVideoSmallPoster(e){e?document.getElementById("video_smallposter").style.opacity=1:document.getElementById("video_smallposter").style.opacity=0}function toggleSpinner(e){e?(document.getElementById("loader").style.visibility="visible",addClass(document.getElementById("loader"),"loader_active")):(removeClass(document.getElementById("loader"),"loader_active"),setTimeout(function(){document.getElementById("loader").style.visibility="hidden"},500))}function loadSlide(e,t){if(activeButtons=!1,e!=currentSlide||t){var o,l;o=e>currentSlide?"slide_left":"slide_right",t?(o=null,addClass(document.getElementById("btn_prev"),"disabled")):l=document.getElementById("slide_"+currentSlide),currentSlide=e;var n=document.getElementById("slides"),d=document.createElement("div");d.id="slide_"+currentSlide,d.className="slide abs animate",d.style.backgroundImage="url("+getURL(config.module.bg)+")",d.style.backgroundPosition="0 -68px";var i=document.createElement("img");i.src=getURL(config.module.gallery.photos[currentSlide][0]),d.appendChild(i);var a=document.createElement("div");a.innerHTML="slide "+(currentSlide+1)+"/"+config.module.gallery.photos.length,a.className="text_slide abs",d.appendChild(a);var c=document.createElement("div");c.className="slide_infowrapper abs",d.appendChild(c);var r=document.createElement("div");r.className="text_title rel lato",r.innerHTML=config.module.gallery.photos[currentSlide][1],c.appendChild(r);var s=document.createElement("div");s.className="text_info rel lato",s.innerHTML=config.module.gallery.photos[currentSlide][2],c.appendChild(s);var m=document.createElement("div");void 0!=config.module.gallery.photos[currentSlide][3]&&(m.className="text_attr rel lato",m.innerHTML=config.module.gallery.photos[currentSlide][3],c.appendChild(m)),slides.appendChild(d),setTimeout(function(){l&&addClass(l,o)},100),setTimeout(function(){removeClass(document.getElementById("btn_prev"),"disabled"),removeClass(document.getElementById("btn_next"),"disabled"),l&&(removeClass(l,"forcetop"),l.parentNode.removeChild(l)),addClass(d,"forcetop"),0===currentSlide&&addClass(document.getElementById("btn_prev"),"disabled"),currentSlide===gallery.length-1&&addClass(document.getElementById("btn_next"),"disabled"),activeButtons=!0},500)}}function autoGallery(){config.module.gallery.photos&&(galleryTimer=setTimeout(function(){clearTimeout(galleryTimer),preload([config.module.gallery.photos[gIndex][0]],function(){var e=document.createElement("img");e.className="abs animate mslide",e.style.opacity=0,e.src=config.module.gallery.photos[gIndex][0],e.style.width=document.getElementById("mod_gallery").offsetWidth+"px",document.getElementById("mini-slideshow").appendChild(e),e.style.top=(e.offsetHeight-document.getElementById("mod_gallery").offsetHeight)/2*-1+"px",setTimeout(function(){e.style.opacity=1},50),gIndex++,galleryLen>gIndex?setTimeout(autoGallery,800):setTimeout(function(){document.getElementById("mini-slideshow").style.opacity=0,setTimeout(function(){document.getElementById("mini-slideshow").parentNode.removeChild(document.getElementById("mini-slideshow"))},1e3)},3e3)})},3e3))}var gallery=[],currentSlide=0,version="1.0",videoTabActive=!1,activeButtons=!0,userZip="10011",peeked,locations,zipCenter,ftkey="AIzaSyBKfcRw7dvJxKshWy9qFpSQwt53l4eW1Dk",showBackup=!1,isMapCreated=!1,circleRef=new google.maps.Circle,galleryTimer,gIndex=0,galleryLen;galleryLen=config.module.gallery.photos.length<3?config.module.gallery.photos.length:3;