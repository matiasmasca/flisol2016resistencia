$(function(){if($(".js-poll").length){$(".spinner").spin({lines:15,length:30,width:10,radius:30,speed:.8,top:23,color:"#8e7aa3",zIndex:1});var a,b,c,d=$(".js-poll");d.data("allow-engines")===""?(b=d.data("builds-url"),a=function(a){a.length>0&&(clearInterval(c),window.location=a[0].path)}):(b=d.data("poll-url"),a=function(a,b,d){d.status===200&&(clearInterval(c),window.location.reload())}),c=setInterval(function(){$.get(b,a)},1e3)}});