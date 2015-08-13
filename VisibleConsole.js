(function() {

	function css(el, cssObj) {
		for (var n in cssObj) {
			el.style[n] = cssObj[n];	
		}
	}

	var consoleLog = console.log;

	var div = document.createElement("div");
	css(div, {
		zIndex:9999999,
		height:"200px",
		width:"100%",
		bottom:0,
		left:0,
		fontFamily:'"Lucida Console", Monaco, monospace',
		fontSize:'12px',
		position:"fixed",
		lineHeight:"15px",
		background:"rgba(200,200,200,0.25)"
	});
	div.id="VisibleConsole";
	document.body.appendChild(div);

	var updates = document.createElement("div");
	css(updates, {
		overflow:"auto",
		padding:"5px 10px 5px 10px",
		height:"200px",
		width:"50%",
		top:0,
		left:0,
		position:"absolute"
	});
	div.appendChild(updates);

	var scroller = document.createElement("div");
	css(scroller, {
		overflow:"auto",
		padding:"0px 10px 5px 10px",
		height:"200px",
		width:"50%",
		top:0,
		left:"50%",
		position:"absolute"
	});
	div.appendChild(scroller);

	var updateDivs = [];

	console.log = function() {
		consoleLog.apply(this, arguments);
		var o = [],i,chk,nam;
		if (arguments[0]) {
			chk = arguments[0].toString().substr(0,5);
			nam = arguments[0].toString().substr(5);
		}
		if (chk == "incr_" || chk == "stat_") {
			if (!updateDivs[arguments[0]]) {
				var d = document.createElement("div");
				css(d, {
					padding:"5px",
					margin:"2px",
					display:"inline-block",
					background:"rgba(255,255,255,0.5)"
				});
				d.inc=0;
				updates.appendChild(d);
				updateDivs[arguments[0]] = d;
			}
			for (i=1;i<arguments.length;i++) {
				if (arguments[i]) {
					o.push(arguments[i].toString());
				} else {
					o.push(arguments[i]);
				}
			}
			o = o.join(" ");
			var inc="";
			if (chk=="incr_") {
				inc = "["+(updateDivs[arguments[0]].inc++)+"] ";
			}
			updateDivs[arguments[0]].innerHTML = "<b>"+nam+":</b> "+inc+o;

		} else {
			for (i=0;i<arguments.length;i++) {
				if (arguments[i]) {
					o.push(arguments[i].toString());
				} else {
					o.push(arguments[i]);
				}
			}
			o = o.join(" ");
			scroller.innerHTML+="<br>"+o;
			scroller.scrollTop = scroller.scrollHeight;
		}
	};

	window.onerror = function() {  //message, url, lineNumber
		console.log("ERROR:", arguments[0], arguments[1], "line:", arguments[2]);
		return false;
	};

})();