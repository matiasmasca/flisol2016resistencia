(function(){var a,h,c,g,j,m,q,p,f,k,r,d,s,u,i,o,n,t,w,e,v,l=[].slice,b=[].indexOf||function(z){for(var y=0,x=this.length;y<x;y++){if(y in this&&this[y]===z){return y}}return -1};$.payment={};$.payment.fn={};$.fn.payment=function(){var x,y;y=arguments[0],x=2<=arguments.length?l.call(arguments,1):[];return $.payment.fn[y].apply(this,x)};g=/(\d{1,4})/g;$.payment.cards=c=[{type:"visaelectron",pattern:/^4(026|17500|405|508|844|91[37])/,format:g,length:[16],cvcLength:[3],luhn:true},{type:"maestro",pattern:/^(5(018|0[23]|[68])|6(39|7))/,format:g,length:[12,13,14,15,16,17,18,19],cvcLength:[3],luhn:true},{type:"forbrugsforeningen",pattern:/^600/,format:g,length:[16],cvcLength:[3],luhn:true},{type:"dankort",pattern:/^5019/,format:g,length:[16],cvcLength:[3],luhn:true},{type:"visa",pattern:/^4/,format:g,length:[13,16],cvcLength:[3],luhn:true},{type:"mastercard",pattern:/^(5[0-5]|2[2-7])/,format:g,length:[16],cvcLength:[3],luhn:true},{type:"amex",pattern:/^3[47]/,format:/(\d{1,4})(\d{1,6})?(\d{1,5})?/,length:[15],cvcLength:[3,4],luhn:true},{type:"dinersclub",pattern:/^3[0689]/,format:/(\d{1,4})(\d{1,6})?(\d{1,4})?/,length:[14],cvcLength:[3],luhn:true},{type:"discover",pattern:/^6([045]|22)/,format:g,length:[16],cvcLength:[3],luhn:true},{type:"unionpay",pattern:/^(62|88)/,format:g,length:[16,17,18,19],cvcLength:[3],luhn:false},{type:"jcb",pattern:/^35/,format:g,length:[16],cvcLength:[3],luhn:true}];a=function(z){var y,A,x;z=(z+"").replace(/\D/g,"");for(A=0,x=c.length;A<x;A++){y=c[A];if(y.pattern.test(z)){return y}}};h=function(z){var y,A,x;for(A=0,x=c.length;A<x;A++){y=c[A];if(y.type===z){return y}}};d=function(y){var D,C,B,z,A,x;B=true;z=0;C=(y+"").split("").reverse();for(A=0,x=C.length;A<x;A++){D=C[A];D=parseInt(D,10);if((B=!B)){D*=2}if(D>9){D-=9}z+=D}return z%10===0};r=function(x){var y;if((x.prop("selectionStart")!=null)&&x.prop("selectionStart")!==x.prop("selectionEnd")){return true}if((typeof document!=="undefined"&&document!==null?(y=document.selection)!=null?y.createRange:void 0:void 0)!=null){if(document.selection.createRange().text){return true}}return false};o=function(x){return setTimeout(function(){var y,z;y=$(x.currentTarget);z=y.val();z=z.replace(/\D/g,"");return y.val(z)})};u=function(x){return setTimeout(function(){var y,z;y=$(x.currentTarget);z=y.val();z=$.payment.formatCardNumber(z);return y.val(z)})};q=function(C){var x,y,E,A,z,D,B;E=String.fromCharCode(C.which);if(!/^\d+$/.test(E)){return}x=$(C.currentTarget);B=x.val();y=a(B+E);A=(B.replace(/\D/g,"")+E).length;D=16;if(y){D=y.length[y.length.length-1]}if(A>=D){return}if((x.prop("selectionStart")!=null)&&x.prop("selectionStart")!==B.length){return}if(y&&y.type==="amex"){z=/^(\d{4}|\d{4}\s\d{6})$/}else{z=/(?:^|\s)(\d{4})$/}if(z.test(B)){C.preventDefault();return setTimeout(function(){return x.val(B+" "+E)})}else{if(z.test(B+E)){C.preventDefault();return setTimeout(function(){return x.val(B+E+" ")})}}};j=function(z){var x,y;x=$(z.currentTarget);y=x.val();if(z.which!==8){return}if((x.prop("selectionStart")!=null)&&x.prop("selectionStart")!==y.length){return}if(/\d\s$/.test(y)){z.preventDefault();return setTimeout(function(){return x.val(y.replace(/\d\s$/,""))})}else{if(/\s\d?$/.test(y)){z.preventDefault();return setTimeout(function(){return x.val(y.replace(/\d$/,""))})}}};i=function(x){return setTimeout(function(){var y,z;y=$(x.currentTarget);z=y.val();z=$.payment.formatExpiry(z);return y.val(z)})};p=function(y){var x,A,z;A=String.fromCharCode(y.which);if(!/^\d+$/.test(A)){return}x=$(y.currentTarget);z=x.val()+A;if(/^\d$/.test(z)&&(z!=="0"&&z!=="1")){y.preventDefault();return setTimeout(function(){return x.val("0"+z+" / ")})}else{if(/^\d\d$/.test(z)){y.preventDefault();return setTimeout(function(){return x.val(""+z+" / ")})}}};f=function(y){var x,A,z;A=String.fromCharCode(y.which);if(!/^\d+$/.test(A)){return}x=$(y.currentTarget);z=x.val();if(/^\d\d$/.test(z)){return x.val(""+z+" / ")}};k=function(y){var x,A,z;z=String.fromCharCode(y.which);if(!(z==="/"||z===" ")){return}x=$(y.currentTarget);A=x.val();if(/^\d$/.test(A)&&A!=="0"){return x.val("0"+A+" / ")}};m=function(z){var x,y;x=$(z.currentTarget);y=x.val();if(z.which!==8){return}if((x.prop("selectionStart")!=null)&&x.prop("selectionStart")!==y.length){return}if(/\d\s\/\s$/.test(y)){z.preventDefault();return setTimeout(function(){return x.val(y.replace(/\d\s\/\s$/,""))})}};s=function(x){return setTimeout(function(){var y,z;y=$(x.currentTarget);z=y.val();z=z.replace(/\D/g,"").slice(0,4);return y.val(z)})};e=function(y){var x;if(y.metaKey||y.ctrlKey){return true}if(y.which===32){return false}if(y.which===0){return true}if(y.which<33){return true}x=String.fromCharCode(y.which);return !!/[\d\s]/.test(x)};t=function(A){var x,y,B,z;x=$(A.currentTarget);B=String.fromCharCode(A.which);if(!/^\d+$/.test(B)){return}if(r(x)){return}z=(x.val()+B).replace(/\D/g,"");y=a(z);if(y){return z.length<=y.length[y.length.length-1]}else{return z.length<=16}};w=function(z){var x,A,y;x=$(z.currentTarget);A=String.fromCharCode(z.which);if(!/^\d+$/.test(A)){return}if(r(x)){return}y=x.val()+A;y=y.replace(/\D/g,"");if(y.length>6){return false}};n=function(y){var x,A,z;x=$(y.currentTarget);A=String.fromCharCode(y.which);if(!/^\d+$/.test(A)){return}if(r(x)){return}z=x.val()+A;return z.length<=4};v=function(B){var y,A,z,x,C;y=$(B.currentTarget);C=y.val();x=$.payment.cardType(C)||"unknown";if(!y.hasClass(x)){A=(function(){var F,E,D;D=[];for(F=0,E=c.length;F<E;F++){z=c[F];D.push(z.type)}return D})();y.removeClass("unknown");y.removeClass(A.join(" "));y.addClass(x);y.toggleClass("identified",x!=="unknown");return y.trigger("payment.cardType",x)}};$.payment.fn.formatCardCVC=function(){this.on("keypress",e);this.on("keypress",n);this.on("paste",s);this.on("change",s);this.on("input",s);return this};$.payment.fn.formatCardExpiry=function(){this.on("keypress",e);this.on("keypress",w);this.on("keypress",p);this.on("keypress",k);this.on("keypress",f);this.on("keydown",m);this.on("change",i);this.on("input",i);return this};$.payment.fn.formatCardNumber=function(){this.on("keypress",e);this.on("keypress",t);this.on("keypress",q);this.on("keydown",j);this.on("keyup",v);this.on("paste",u);this.on("change",u);this.on("input",u);this.on("input",v);return this};$.payment.fn.restrictNumeric=function(){this.on("keypress",e);this.on("paste",o);this.on("change",o);this.on("input",o);return this};$.payment.fn.cardExpiryVal=function(){return $.payment.cardExpiryVal($(this).val())};$.payment.cardExpiryVal=function(A){var B,z,x,y;A=A.replace(/\s/g,"");y=A.split("/",2),B=y[0],x=y[1];if((x!=null?x.length:void 0)===2&&/^\d+$/.test(x)){z=(new Date).getFullYear();z=z.toString().slice(0,2);x=z+x}B=parseInt(B,10);x=parseInt(x,10);return{month:B,year:x}};$.payment.validateCardNumber=function(y){var x,z;y=(y+"").replace(/\s+|-/g,"");if(!/^\d+$/.test(y)){return false}x=a(y);if(!x){return false}return(z=y.length,b.call(x.length,z)>=0)&&(x.luhn===false||d(y))};$.payment.validateCardExpiry=function(B,y){var z,x,A;if(typeof B==="object"&&"month" in B){A=B,B=A.month,y=A.year}if(!(B&&y)){return false}B=$.trim(B);y=$.trim(y);if(!/^\d+$/.test(B)){return false}if(!/^\d+$/.test(y)){return false}if(!((1<=B&&B<=12))){return false}if(y.length===2){if(y<70){y="20"+y}else{y="19"+y}}if(y.length!==4){return false}x=new Date(y,B);z=new Date;x.setMonth(x.getMonth()-1);x.setMonth(x.getMonth()+1,1);return x>z};$.payment.validateCardCVC=function(y,z){var x,A;y=$.trim(y);if(!/^\d+$/.test(y)){return false}x=h(z);if(x!=null){return A=y.length,b.call(x.cvcLength,A)>=0}else{return y.length>=3&&y.length<=4}};$.payment.cardType=function(x){var y;if(!x){return null}return((y=a(x))!=null?y.type:void 0)||null};$.payment.formatCardNumber=function(z){var y,x,B,A;z=z.replace(/\D/g,"");y=a(z);if(!y){return z}B=y.length[y.length.length-1];z=z.slice(0,B);if(y.format.global){return(A=z.match(y.format))!=null?A.join(" "):void 0}else{x=y.format.exec(z);if(x==null){return}x.shift();x=$.grep(x,function(C){return C});return x.join(" ")}};$.payment.formatExpiry=function(y){var A,B,x,z;B=y.match(/^\D*(\d{1,2})(\D+)?(\d{1,4})?/);if(!B){return""}A=B[1]||"";x=B[2]||"";z=B[3]||"";if(z.length>0){x=" / "}else{if(x===" /"){A=A.substring(0,1);x=""}else{if(A.length===2||x.length>0){x=" / "}else{if(A.length===1&&(A!=="0"&&A!=="1")){A="0"+A;x=" / "}}}}return A+x+z}}).call(this);