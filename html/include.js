top.wads.writeGeneric=function(str) {
	if (typeof str === 'object') {
		if(str) {
			if (str instanceof Array) {
				for(var j=0; j<str.length; j++) {
					document.writeln(str[j]);
				}
	        }
	    }
    }
	else {
		document.write(str);
	}
};

top.wads.addToContentsGeneric=function(str, content) {
	if (typeof str === 'object') {
        if (str) {
			if (str instanceof Array) {
				for(var j=0; j<str.length; j++) {
					content+=str[j];
				}
            }
        }
    }
	else {
		content+=str;
	}
};

top.wads.randomGeneric=function(str) {
	if (typeof str === 'object') {
        if (str) {
			if (str instanceof Array) {
				var output_array=new Array(str.length);
				for(var j=0; j<str.length; j++) {
					output_array[j]=str[j].replace(/\[wads_random\]/gi, Math.floor(Math.random()*99999999));
				}
				return output_array;
            }
        }
    }
    // chaîne
	else {
		return str.replace(/\[wads_random\]/gi, Math.floor(Math.random()*99999999));
	}
};

top.wads.isCallMaster=1;

top.wads.callMasterize=function(str) {
	var output=str.replace(/\[wads_call_master\]/gi, top.wads.isCallMaster);
	top.wads.isCallMaster=0;
	return output;
};

(function(window){
	var DOMLoaded=function(callback)
	{
		readyBound=false;
		DOMLoaded.isReady=false;
		if(typeof callback=='function'){
			DOMReadyCallback=callback;
		}
		bindReady();
	},
	document=window.document,
	readyBound=false,
	DOMReadyCallback=function(){},
	DOMContentLoaded;DOMLoaded.isReady=false;
	var DOMReady=function(){
		if(!DOMLoaded.isReady){
			if(!document.body){
				setTimeout(DOMReady,13);
				return;
			}
			DOMLoaded.isReady=true;
			DOMReadyCallback();
		}
	};
	var bindReady=function(){
		if(readyBound){
			return;
		}
		readyBound=true;
		if(document.readyState==="complete"){
			DOMReady();
		}
		if(document.addEventListener){
			document.addEventListener("DOMContentLoaded",DOMContentLoaded,false);
			window.addEventListener("load",DOMContentLoaded,false);
		}
		else if(document.attachEvent){
			document.attachEvent("onreadystatechange",DOMContentLoaded);
			window.attachEvent("onload",DOMContentLoaded);
			var toplevel=false;
			try{
				toplevel=window.frameElement==null;
			}
			catch(e){}
			if(document.documentElement.doScroll&&toplevel){
				doScrollCheck();
			}
		}
	};
	var doScrollCheck=function(){
		if(DOMLoaded.isReady){
			return;
		}
		try{
			document.documentElement.doScroll("left");
		}
		catch(error){
			setTimeout(doScrollCheck,1);
			return;
		}
		DOMReady();
	};
	if(document.addEventListener){
		DOMContentLoaded=function(){
			document.removeEventListener("DOMContentLoaded",DOMContentLoaded,false);
			DOMReady();
		};
	}
	else if(document.attachEvent){
		DOMContentLoaded=function(){
			if(document.readyState==="complete"){
				document.detachEvent("onreadystatechange",DOMContentLoaded);DOMReady();
			}
		};
	};
	top.wads.addLoadEvent=DOMLoaded;
})
(window);

top.wads.codeFlash=function(url, width, height, wmode, target, clicktag, id_suffix, arr_flashvars){
	var id='wads_creative_' + id_suffix;
	var str_clicktags='clicktag=' + encodeURIComponent(clicktag) + '&amp;clickTag=' + encodeURIComponent(clicktag) + '&amp;clickTAG=' + encodeURIComponent(clicktag);
	var output='<object width="' + width + '" height="' + height + '" id="' + id + '" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"><param value="always" name="allowScriptAccess"><param value="' + url + '" name="movie"><param value="' + str_clicktags + '&amp;target=_blank" name="flashvars"><param value="high" name="quality"><param value="' + wmode + '" name="wmode"><embed width="' + width + '" height="' + height + '" pluginspage="http://www.adobe.com/go/getflashplayer" type="application/x-shockwave-flash" allowscriptaccess="always" wmode="' + wmode + '" quality="high" swliveconnect="true" flashvars="' + str_clicktags + '&amp;target=' + target + '" src="' + url + '" name="' + id + '"></object>';
	return output;
};

top.wads.positions=[];
top.wads.display=function(positionName) {
	top.document.getElementById('wads_po_' + positionName).innerHTML=wads.positions[positionName];
};
top.wads.sendToPosition=function(positionName, adScript) {
	if(top.document.getElementById('wads_po_' + positionName)) {
		top.wads.clean(top.document.getElementById('wads_po_' + positionName));
		var iframe = top.document.createElement('iframe');
		iframe.id = 'wads_fif_' + positionName;
		iframe.style.cssText = "width:0px;height:0px;border:none;overflow:hidden;";
		iframe.marginWidth = iframe.marginHeight = iframe.frameBorder = iframe.width = iframe.height = 0;
		iframe.src='about:blank';
		iframe.allowTransparency=true;
		top.document.getElementById('wads_po_' + positionName).appendChild(iframe);
		ifrm = top.document.getElementById('wads_fif_' + positionName);
		ifrm = (ifrm.contentWindow) ? ifrm.contentWindow : (ifrm.contentDocument.document) ? ifrm.contentDocument.document : ifrm.contentDocument;
		var positionNameSlashes="\\\'" + positionName + "\\\'";
		var html = '<html><body onload="if (parent.wads.iframeOnload) setTimeout(\'parent.wads.iframeOnload(window, document, ' + positionNameSlashes + ')\', 100);">';
		html += '<scr'+'ipt>inFIF=true; FIFresizeOnLoad=true; function resizeIframe(width, height) { parent.wads.iframeResize(\'' + positionName + '\', width, height); } </scr'+'ipt>';
		html += adScript;
		html += '</body></html>';
		ifrm.document.write(html);
		ifrm.document.close();
	}
};
top.wads.clean=function(obj) {
	while (obj.childNodes.length > 0) {
		var child = obj.childNodes[0];
		var id = child.id;
		if (id.indexOf('wads_iframe')>0) {
			iframe = child;
			iframe.src = "about:blank";
		}
		if (id)
			child.id = "";
		if (child.childNodes.length > 0)
			RemoveChildren(child);
		obj.removeChild(child);
	}
};
top.wads.iframeOnload=function(win, docu, positionName) {
	if(win.FIFresizeOnLoad) {
		top.document.getElementById('wads_po_' + positionName).style.width=win.document.getElementsByTagName("body")[0].scrollWidth + 'px';
		top.document.getElementById('wads_po_' + positionName).style.height=win.document.getElementsByTagName("body")[0].scrollHeight + 'px';
		top.document.getElementById('wads_fif_' + positionName).style.width=win.document.getElementsByTagName("body")[0].scrollWidth + 'px';
		top.document.getElementById('wads_fif_' + positionName).style.height=win.document.getElementsByTagName("body")[0].scrollHeight + 'px';
	}
};
top.wads.iframeResize=function(positionName, width, height) {
	top.document.getElementById('wads_fif_' + positionName).style.width=width + 'px';
	top.document.getElementById('wads_fif_' + positionName).style.height=height + 'px';
};

top.wads.loadAsync(top.document, top.wads.wadsUrl + '/' + top.wads.wadsSitePage + '/r' + top.wads.getRandom() + '/' + top.wadsQuery');