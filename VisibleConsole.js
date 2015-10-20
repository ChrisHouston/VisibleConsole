(function() {

	function css(el, cssObj) {
		for (var n in cssObj) {
			el.style[n] = cssObj[n];	
		}
	}

	var panelOpen = true;
	var consoleLog = console.log;

	var div = document.createElement("div");
	css(div, {
		zIndex:9999999,
		height:"200px",
		width:"100%",
		bottom:0,
		left:0,
		fontFamily:'"Andale Mono", Consolas, monospace',
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
	
	var closeButton = document.createElement("div");
	css(closeButton, {
		top: "-22px",
		right: "22px",
		position:"absolute",
		padding:"11px",
		color:"#000000",
		height:"44px",
		width:"44px"
	});
	var closeButtonIcon = document.createElement("div");
	css(closeButtonIcon, {
		marginTop: "11px",
		marginLeft: "11px",
		height: "22px",
		width: "22px",
		borderRadius: "30px",
		textAlign: "center",
		lineHeight: "22px",
		backgroundColor:"#ffffff"
	});
	closeButtonIcon.innerHTML="v";
	closeButton.appendChild(closeButtonIcon);
	div.appendChild(closeButton);
	closeButton.addEventListener("click", function() {
		if (panelOpen) {
			panelOpen = false;
			css(closeButton, {
				top:"-25px"
			});
			div.style.bottom = "-200px";
			closeButtonIcon.innerHTML="^";
		} else {
			panelOpen = true;
			css(closeButton, {
				top:"-22px"
			});
			div.style.bottom = 0;
			closeButtonIcon.innerHTML="v";
		}
	});

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