/****
(c) 2011 David Lippman, except where noted

You are free to rehost this calculator and modify the code for non-commercial use.
If you are interested in rehosting or adapting this calculator for commercial use,
please contact me.   dlippman@imathas.com


***/


/****
Init
****/
var board;
var f = [];
var fgraph = [];
var setf = [];
var funcname = {y:['f','g','h','k'], r:['r','s','p','q'], xy:['x1','y1','x2','y2']};
var funcinput = {y:'x',r:'t',xy:'t'};
var lastset = {y:['x^2','3sin(x)','',''], r:['t','3sin(t)+2','',''], xy:['4sin(3t)','4sin(4t)','','']};
var colors = ['#0000ff','#00cc00','#cc00cc','#00cccc'];
var selectcolor = '#ff0000';
var fcnt = 0;
var selectedf = [];
var tracept, specpt, specptlabel;
var points=[],boxedge=[];
var drawbox;
$(document).ready(function() {
	JXG.Options.text.display = "internal"; //needed for image snapshot
	if (JXG.supportsCanvas()) {
		var testCanvas = document.createElement("canvas");
		if (!!(testCanvas.toDataURL)) {
			//JXG.Options.renderer = "canvas";
			$('#getasimg').show();
		}
	}
	
	board = JXG.JSXGraph.initBoard('jxgbox',{boundingbox:[-5,5,5,-5], axis:true, showCopyright:false});
	
	points[0] = board.create('point',[0,0], {fixed:true, visible:false, name:' '});
	points[1] = board.create('point',[0,0], {fixed:true, visible:false, name:' '});
	points[2] = board.create('point',[0,0], {fixed:true, visible:false, name:' '});
	points[3] = board.create('point',[0,0], {fixed:false, visible:false, name:' '});
	specpt = board.create('point',[0,0], {fixed:true, visible:false, name:' '});
	specptlabel = board.create('text',[0,0,' '], {visible:false});
	
	boxedge[0] = board.create('line', [points[0],points[1]], {straightFirst:false, straightLast:false, visible:false, strokeColor:'#990000'});
	boxedge[1] =  board.create('line', [points[0],points[2]], {straightFirst:false, straightLast:false, strokeColor:'#cc0000'});
	boxedge[2] =  board.create('line', [points[1],points[3]], {straightFirst:false, straightLast:false, strokeColor:'#cc0000'});
	boxedge[3] =  board.create('line', [points[2],points[3]], {straightFirst:false, straightLast:false, strokeColor:'#cc0000'});
	for (var i=0;i<4;i++) {
		boxedge[i].highlight = function() {};
		boxedge[i].nohighlight = function() {};
	}
	board.addHook(down, 'mousedown');
	board.addHook(move, 'mousemove');
	board.addHook(up, 'mouseup');
	JXG.Math.eps = 1e-10;
	
	for (var i=0;i<4;i++) {
		$("#color"+i).miniColors({
			change: function(hex, rgb) { 
				var n = $(this).attr("id").substring(5);
				colors[n] = hex;
				$("#fname"+n).css({color:hex});
			}
		});
	}
	$('#myform')[0].reset();
	$('#aboutwrapper').click(function(){$('#aboutwrapper').hide();$('#about').hide();});
	
});

snapshot = function () {
	//from http://jsxgraph.uni-bayreuth.de/~michael/jsxgraph/trunk/examples/snapshot.html
	var renderer = board.renderer,
	    i, j,
	    rendererType = board.options.renderer;

	for (j in {x: null, y: null}) {
	    for (i = 0; i < board.defaultAxes[j].defaultTicks.labels.length; i++) {
		if (board.defaultAxes[j].defaultTicks.labels[i] !== null) {
		    board.removeObject(board.defaultAxes[j].defaultTicks.labels[i]);
		}
	    }
	}

	board.removeEventHandlers();
	board.container = 'canvasbox';
	board.containerObj = document.getElementById('canvasbox');
	board.containerObj.innerHTML = '';
	board.containerObj.style.width = board.canvasWidth + 'px';
	board.containerObj.style.height = board.canvasHeight + 'px';
	board.renderer = new JXG.CanvasRenderer(board.containerObj),
	board.options.renderer = 'canvas';

	board.fullUpdate();

	var strData = board.renderer.canvasRoot.toDataURL("image/png");
	$('#imgdata').val(strData);
	$('#imagegetform').submit();
	board.containerObj.innerHTML = '';
	delete board.renderer;
	board.container = 'jxgbox';
	board.containerObj = document.getElementById('jxgbox');
	board.options.renderer = rendererType;
	board.renderer = renderer;
	//board.defaultAxes.x.defaultTicks.removeAllTicks();
	//board.defaultAxes.x.defaultTicks.labels = labels;
	board.addEventHandlers();
	board.fullUpdate();
};

function gbfadein() {
	$('#aboutwrapper').fadeTo(0,.50);
	$('#aboutwrapper').show();
	$('#about').show();
}	

function getasimg() {
	var strData = board.renderer.canvasRoot.toDataURL("image/png");
	$('#imgdata').val(strData);
	$('#imagegetform').submit();
	//window.open(strData,'_blank','width=505,height=505');
}
/***
UI Stuff
***/
var writeconsole = function(txt) {
	document.getElementById("console").innerHTML = txt;
}
var writelog = function(intxt,outtxt,ismath,point) {
	var entry = $('<div class="entry"></div>').appendTo('#log');
	var linnum = $('<div/>', {
			"id":"line"+calcoutputs.length,
			"class":"innum",
			text:calcoutputs.length+"."
	}).appendTo(entry);
	if (ismath) {
		linnum.click( function() {
				$('#calcinput').val($('#in'+$(this).attr('id').substring(4)).attr("title"));
				$("#calcinput").css({color:'#000000'});
		}).css({cursor:"pointer"});
	}
	if (ismath) {
		var eltoproc = $('<div/>', {
				"id":"in"+calcoutputs.length,
				"class":"in",
				text:"",
				title:intxt
		}).appendTo(entry);
		var tomath = intxt.replace(/(normalcdf|invnorm|binompdf|binomcdf|tcdf|invt|invT)/g,"\"$1\"");
	
		 if (AMnoMathML) eltoproc.append(AMTparseMath(tomath));
		 else if (!AMnoMathML) eltoproc.append(AMparseMath(tomath));
	} else {
		$('<div/>', {
				"id":"in"+calcoutputs.length,
				"class":"in",
				text:intxt
		}).appendTo(entry);
	}
	$('<div/>', {
			"id":"out"+calcoutputs.length,
			"class":"out",
			text:outtxt
	}).appendTo(entry);
	if (point != null) {
		calcoutputs[calcoutputs.length] = point;
	} else {
		calcoutputs[calcoutputs.length] = outtxt;
	}
	var logdiv = document.getElementById("log");
	logdiv.scrollTop = logdiv.scrollHeight;
}



/***** 
Table stuff
******/
var getTableY = function () {
	var anx,any;
	var id = this.id;
	anx = this.value;
	if (anx=="") {return;}
	for (var k=0;k<fcnt;k++) {
		$("td#"+id+"y"+k).text(Math.round(f[k](anx)*100000)/100000);
	}
}
var prepTable = function() {
	$("div#tablecont").text("");
	var tr, fcolor;
	if (fcnt==0) {return;}
	//var func = $("#tablefunc").val();
	//if (func==-1) { return;}
	var ttype = $('input:radio[name=tabletype]:checked').val();
	var tblstart = parseFloat($("input#tblxstart").val());
	var tbldx = parseFloat($("input#tbldx").val());
	var tbl = $('<table>').attr('id', 'theFuncTable');
	tr = $('<tr>').append($('<th>').text('x'));
	for (var k=0;k<fcnt;k++) {
		eltoproc = $('<th/>');
		fcolor = (curgraphmode=='xy')?2*Math.floor(setf[k]/2):setf[k];
		eltoproc.append($('<span/>', {text:funcname[curgraphmode][setf[k]]+'('+funcinput[curgraphmode]+')='}).css({color:colors[fcolor]}));
		if (AMnoMathML) eltoproc.append(AMTparseMath($("input#func"+setf[k]).val()));
		else if (!AMnoMathML) eltoproc.append(AMparseMath($("input#func"+setf[k]).val()));
		tr.append(eltoproc);
		//tr.append($('<th>').text($("input#func"+k).val()));
	}
	tbl.append($('<thead>').append(tr));
	var tbody = $('<tbody>').appendTo(tbl);
            for (var i = 0; i < 20; i++) {
            	    tr =  $('<tr>');
            	    if (ttype=='auto') {
            	    	   tr.append($('<td>').text(tblstart+i*tbldx));
            	    	   for (var k=0;k<fcnt;k++) {
            	    	   	   tr.append($('<td>').text(Math.round(100000*f[setf[k]](tblstart+i*tbldx))/100000));
            	    	   }
                    } else {
                    	   tr.append($('<td>').append($('<input type="text" />').attr('id','tblrow'+i).attr('size',4).blur(getTableY)));
            	    	   for (var k=0;k<fcnt;k++) {
            	    	   	   tr.append( $('<td>').attr('id', 'tblrow'+i+'y'+setf[k]).text(" "));
            	    	   }
                    }
                    tbody.append(tr);
            }
        $("#tablecont").append(tbl);
        $("div#tablecont").show();
}
var prepInputs = function(mode) {
	if (mode=="derivative") {
		var html = 'Find derivative at x = <input type="text" id="calcx" value="0" size="2" /> ';
	} else if (mode=="integral") {
		var html = 'Find integral from x = <input type="text" id="calcx" value="0" size="2" /> ';
		html += 'to x = <input type="text" id="calcx2" value="2" size="2" /> ';
	}
	html += '<input type="button" value="Calculate" onclick="dotblcalc()">';
	$("#calcinputs").html(html);
}
var dotblcalc = function() {
	var mode = $("#actmode").val();
	if (mode=="derivative") {
		var derivval =JXG.Math.Numerics.D(f[selectedf[0]])(parseFloat($("#calcx").val()));
		writeconsole("Derivative of "+$("input#func"+selectedf[0]).val()+" at x="+$("#calcx").val()+" is "+Math.round(10000*derivval)/10000);
		writelog("Derivative of "+$("input#func"+selectedf[0]).val()+" at x="+$("#calcx").val()+" is ",Math.round(10000*derivval)/10000,false,derivval);
	} else if (mode=="integral") {
		var intval = JXG.Math.Numerics.I([parseFloat($("#calcx").val()),parseFloat($("#calcx2").val())], f[selectedf[0]]);
		writeconsole("Integral of "+$("input#func"+selectedf[0]).val()+" on ["+$("#calcx").val()+","+$("#calcx2").val()+"] is " +Math.round(10000*intval)/10000);
		writelog("Integral of "+$("input#func"+selectedf[0]).val()+" on ["+$("#calcx").val()+","+$("#calcx2").val()+"] is "+Math.round(10000*intval)/10000,false,intval);
	}
}



/*****
Graphing stuff
*****/
var curgraphmode = 'y';
function changegraphmode() {
	var lastgraphmode = curgraphmode;
	curgraphmode = $('#graphmode').val();
	for (var i=0; i<4; i++) {
		lastset[lastgraphmode][i]=$('#func'+i).val();
	}
	var fcolor;
	for (var i=0;i<4;i++) {
		fcolor = (curgraphmode=='xy')?2*Math.floor(i/2):i;
		$('#func'+i).val(lastset[curgraphmode][i]);
		$('#fname'+i).html(funcname[curgraphmode][i]+"("+funcinput[curgraphmode]+")").css({color:colors[fcolor]});
	}
	$('#tblinput').text(funcinput[curgraphmode]);
	if (curgraphmode=='y') {
		
		$('#polardomain').hide();
		$('#paramdomain').hide();
		$('#color1').miniColors('disabled', false);
		$('#color3').miniColors('disabled', false);
	} else if (curgraphmode=='r') {
		$('#calctab').hide();
		$('#polardomain').show();
		$('#paramdomain').hide();
		$('#color1').miniColors('disabled', false);
		$('#color3').miniColors('disabled', false);
	} else if (curgraphmode=='xy') {
		$('#calctab').hide();
		$('#polardomain').hide();
		$('#paramdomain').show();
		$('#color1').miniColors('disabled', true);
		$('#color3').miniColors('disabled', true);
	}
	specpt.hideElement();
	specptlabel.hideElement();
	if (typeof tracept != 'undefined') {
		board.removeObject(tracept);
	}
	board.prepareUpdate().update().updateRenderer();
}
var plotgraph = function(mode) {
	var txt,mtxt;
	for (var i=0; i<fcnt; i++) {
		if (fgraph[setf[i]]) {
			board.removeObject(fgraph[setf[i]]);
		}
	}
	if (typeof tracept != 'undefined') {
		board.removeObject(tracept);
	}
	fcnt = 0; f.length = 0; setf.length = 0;
	var eqnhold = $('#prettyeqns');
	eqnhold.empty();
	if (curgraphmode=="y") {
		for (var i=0; i<4; i++) {
			txt = $("#func"+i).val();
			if (txt != "") {
				mtxt = mathjs(txt,'x');
				f[i] = new Function('x','with(Math) {return ('+mtxt+');}');
				fgraph[i] = board.create('functiongraph',f[i], {strokeColor:colors[i]});
				setf[setf.length] = i;
				fcnt++;
				eltoproc = $('<div/>').appendTo(eqnhold);
				eltoproc.append($('<span/>', {text:funcname['y'][i]+'(x)='}).css({color:colors[i]}));
				if (AMnoMathML) eltoproc.append(AMTparseMath(txt));
				else if (!AMnoMathML) eltoproc.append(AMparseMath(txt));
			}
			 
		}
		$('#calctab').show();
	} else if (curgraphmode=="r") {
		with (Math) var thmin = eval(mathjs($('#thmin').val()));
		with (Math) var thmax = eval(mathjs($('#thmax').val()));
		//var thmin = $('#thmin').val();
		//var thmax = $('#thmax').val();
		for (var i=0; i<4; i++) {
			txt = $("#func"+i).val();
			if (txt != "") {
				mtxt = mathjs(txt,'t');
				f[i] = new Function('t','with(Math) {return ('+mtxt+');}');
				var xfunc = new Function('t','with(Math) {return Math.cos(t)*('+mtxt+');}');
				var yfunc = new Function('t','with(Math) {return Math.sin(t)*('+mtxt+');}');
				fgraph[i] = board.create('curve',[xfunc,yfunc,thmin,thmax], {strokeColor:colors[i], curvetype:'polar'});
				setf[setf.length] = i;
				fcnt++;
				eltoproc = $('<div/>').appendTo(eqnhold);
				eltoproc.append($('<span/>', {text:funcname['r'][i]+'(t)='}).css({color:colors[i]}));
				if (AMnoMathML) eltoproc.append(AMTparseMath(txt));
				else if (!AMnoMathML) eltoproc.append(AMparseMath(txt));
			}
			 
		}
	} else if (curgraphmode=="xy") {
		with (Math) var tmin = eval(mathjs($('#tmin').val()));
		with (Math) var tmax = eval(mathjs($('#tmax').val()));
		for (var i=0; i<4; i+=2) {
			txtx = $("#func"+i).val();
			txty = $("#func"+(i+1)).val();
			if (txtx != "" && txty != "") {
				mxtxt = mathjs(txtx,'t');
				mytxt = mathjs(txty,'t');
				f[i] = new Function('t','with(Math) {return ('+mxtxt+');}');
				f[i+1] = new Function('t','with(Math) {return ('+mytxt+');}');
				fgraph[i] = board.create('curve',[f[i],f[i+1],tmin,tmax], {strokeColor:colors[i],curveType:'parameter'});
				setf[setf.length] = i;
				setf[setf.length] = i+1;
				fcnt+=2;
				eltoproc = $('<div/>').appendTo(eqnhold);
				eltoproc.append($('<span/>', {text:funcname['xy'][i]+'(t)='}).css({color:colors[i]}));
				if (AMnoMathML) eltoproc.append(AMTparseMath(txtx));
				else if (!AMnoMathML) eltoproc.append(AMparseMath(txtx));
				eltoproc.append($('<br/>'));
				eltoproc.append($('<span/>', {text:funcname['xy'][i+1]+'(t)='}).css({color:colors[i]}));
				if (AMnoMathML) eltoproc.append(AMTparseMath(txty));
				else if (!AMnoMathML) eltoproc.append(AMparseMath(txty));
			}
			 
		}
	}
	//updateTableSelect();
}
var setWindow = function() {
	board.setBoundingBox([$("#xmin").val(),$("#ymax").val(),$("#xmax").val(),$("#ymin").val()], false);
	if (curgraphmode != 'y') {
		plotgraph();
	}
}
var defaultWindow = function() {
	$("#xmin").val(-5);
	$("#xmax").val(5);
	$("#ymin").val(-5);
	$("#ymax").val(5);
	setWindow();
	
}

var startmode = function() {
	var mmode = document.getElementById("actmode").value;	
	$("#calcinputs").text("");
	selectedf.length = 0;
	if (typeof tracept != 'undefined') {
		board.removeObject(tracept);
	}
	if (mmode=="none") {
		writeconsole("");
	} else if (mmode=="intersection") {
		if (fcnt < 2) {
			writeconsole("Can't find an intersection with less than 2 curves");
			$("#actmode").val("none");
		} else if (fcnt==2) {
			selectedf = setf.slice(0);
			writeconsole("Draw a box around the intersection");
		} else {
			writeconsole("Click on the first curve you want to find the intersection of");
		}
	} else if (mmode=="intersection" || mmode=="max" || mmode=="min" || mmode=="root" ) {
		if (fcnt<1) {
			writeconsole("Need to graph a function first");
			$("#actmode").val("none");
		} else if (fcnt==1) {
			selectedf = setf.slice(0);
			writeconsole("Draw a box around the "+mmode);
		} else {
			writeconsole("Click on the curve you want to find the "+mmode+" of");
		}
	} else if (mmode=="trace") {
		if (fcnt<1) {
			writeconsole("Need to graph a function first");
			$("#actmode").val("none");
		} else {
			writeconsole("Click on the curve you want to trace");
		}
	} else if (mmode=="derivative" || mmode=="integral") {
		writeconsole("Click on the curve you want to calculate on");
	}
	for (var i=0;i<fcnt;i++) {
		fgraph[setf[i]].strokeColor(colors[setf[i]]);
	}
	
}

var down = function(e) {
    var coords = getMouseCoords(e),
	i;
    
    if(e.shiftKey)
	return;
     
     var mmode = document.getElementById("actmode").value;
     if (mmode == "none") {
     	     return;
     	     //board.do_move_origin = true;
     } else if ((mmode=="intersection" && selectedf.length==2) || ((mmode=="intersection" || mmode=="max" || mmode=="min" || mmode=="root") && selectedf.length==1)) {
     	     drawbox = true;
	     specpt.hideElement();
	     specptlabel.hideElement();
	     
	     var newpt = getMouseCoords(e).usrCoords.slice(1);
	     for (var i=0;i<4; i++) {
	     	     points[i].setPosition(JXG.COORDS_BY_USER,[newpt[0],newpt[1]]);
	     	     boxedge[i].showElement();
	     }
	     console.log(newpt);
	     console.log(points[0]);
	     board.prepareUpdate().update().updateRenderer();
     } else if (mmode=="trace") {
     	     specpt.hideElement();
	     specptlabel.hideElement();
     }
     
    // prevent accidental text selection
    if (e && e.preventDefault) {
	e.preventDefault();
    } else {
	window.event.returnValue = false;
    }
};

var move = function(e, m) {
    var mmode = document.getElementById("actmode").value;
    if(drawbox) {
        var newpt = getMouseCoords(e).usrCoords.slice(1);
        points[3].setPosition(JXG.COORDS_BY_USER,[newpt[0],newpt[1]]);
        points[2].setPosition(JXG.COORDS_BY_USER,[points[0].X(),newpt[1]]);
	points[1].setPosition(JXG.COORDS_BY_USER,[newpt[0],points[0].Y()]);
	board.prepareUpdate().update().updateRenderer();
    } else if (typeof tracept != 'undefined') {
    	    tracept.label.content.setText('('+tracept.X().toFixed(4)+','+tracept.Y().toFixed(4)+')');
    }
};

var up = function(e){
    var sx, sy, pt,offset;
    var mmode = document.getElementById("actmode").value;
    if (mmode=="none") {
    	    //board.do_move_origin = false;
    	    return;
    }
    if ((mmode=="intersection" && selectedf.length<2) || ((mmode=="intersection" || mmode=="max" || mmode=="min" || mmode=="root" || mmode=="trace" || mmode=="derivative" || mmode=="integral") && selectedf.length<1)) {
    	    var newpt = getMouseCoords(e).scrCoords.slice(1);
    	    for (var i=0; i<fcnt; i++) {
    	    	    if (fgraph[setf[i]].hasPoint(newpt[0],newpt[1])) {
    	    	    	    selectedf.push(setf[i]);
    	    	    	    fgraph[setf[i]].strokeColor(selectcolor);
    	    	    	    if (mmode=="trace") {
    	    	    	    	    var newpt = getMouseCoords(e).usrCoords.slice(1);
    	    	    	    	    tracept = board.createElement('glider', [newpt[0],newpt[1],fgraph[setf[i]]], {style:6, name:'Drag Me', showinfobox:false});
    	    	    	    	    writeconsole("Drag the point to trace the curve");
    	    	    	    	    document.getElementById("actmode").selectedIndex = 0;
    	    	    	    } else if (mmode=="intersection" && selectedf.length<2) {
    	    	    	    	    writeconsole("Now select the second curve");
    	    	    	    } else if (mmode=="derivative" || mmode=="integral") {
    	    	    	    	    writeconsole("");
    	    	    	    	    prepInputs(mmode);
    	    	    	    } else {
    	    	    	    	    writeconsole("Now draw a box around the "+mmode);
    	    	    	    }
    	    	    }
    	    }
    } else if (drawbox) {
    	    drawbox = false;
    	    for (var i=0;i<4; i++) {
	     	     boxedge[i].hideElement();
	     }
	    var minx = Math.min(points[0].X(),points[3].X());
	    var maxx = Math.max(points[0].X(),points[3].X());
	    var miny = Math.min(points[0].Y(),points[3].Y());
	    var maxy = Math.max(points[0].Y(),points[3].Y());
	    if (maxx > minx) {
	    	    if (mmode=="root") {
	    	    	    var maxitdefault = JXG.Math.Numerics.maxIterationsRoot;
	    	    	    JXG.Math.Numerics.maxIterationsRoot = 500;
	    	    	    sx = JXG.Math.Numerics.root(f[selectedf[0]], [minx,maxx]);
	    	    	    JXG.Math.Numerics.maxIterationsRoot =  maxitdefault;
	    	    	    sy = f[selectedf[0]](sx);
	    	    	    offset = [3,10];
		    } else if (mmode=="min") {
		    	    //pt = getMin(f[selectedf[0]],minx,maxx);
		    	    //sx = pt[0];
		    	    //sy = pt[1];
		    	    sx =JXG.Math.Numerics.fminbr(f[selectedf[0]],[minx,maxx]);
		    	    sy = f[selectedf[0]](sx);
		    	    offset = [0,-10];
		    } else if (mmode=="max") {
		    	    //pt = getMax(f[selectedf[0]],minx,maxx);
		    	    //sx = pt[0];
		    	    //sy = pt[1];
		    	    sx =JXG.Math.Numerics.fminbr(function(x) {return -1*f[selectedf[0]](x);},[minx,maxx]);
		    	    sy = f[selectedf[0]](sx);
		    	    offset =[0,10];
		    } else if (mmode=="intersection") {
		    	    var maxitdefault = JXG.Math.Numerics.maxIterationsRoot;
		    	    JXG.Math.Numerics.maxIterationsRoot = 500;
		    	    sx = JXG.Math.Numerics.root(function(x){return (f[selectedf[0]](x)-f[selectedf[1]](x));}, [minx,maxx]);
		    	    JXG.Math.Numerics.maxIterationsRoot = maxitdefault;
		    	    sy = f[selectedf[0]](sx);
		    	    offset = [5,10];
		    }
		    if (sx < maxx && sx > minx && sy > miny && sy < maxy ) {
			    specpt.setPosition(JXG.COORDS_BY_USER,[sx,sy]);
			    board.prepareUpdate().update().updateRenderer();
			    
			    tempcoords = new JXG.Coords(JXG.COORDS_BY_SCREEN,[specpt.coords.scrCoords[1]+offset[0],specpt.coords.scrCoords[2]-offset[1]],board);
			    specptlabel.setCoords(tempcoords.usrCoords[1],tempcoords.usrCoords[2]);
			    specptlabel.setText('('+sx.toFixed(4) + ','+sy.toFixed(4)+')');
			    specpt.showElement();
			    specptlabel.showElement();
			    writeconsole('Found '+mmode+' at ('+sx.toFixed(4) + ','+sy.toFixed(4)+')');
			    if (mmode=="intersection") {
			    	    var funcnames = $("input#func"+selectedf[0]).val() + ' and y=' + $("input#func"+selectedf[1]).val();
			    } else {
			    	   var funcnames = $("input#func"+selectedf[0]).val(); 
			    }
			    writelog('Found '+mmode+' of y=' + funcnames + ' at ','('+sx.toFixed(4) + ','+sy.toFixed(4)+')',false,[sx,sy]);
			    document.getElementById("actmode").selectedIndex = 0;
			    for (var i=0;i<fcnt;i++) {
			    	f
			    }
		    } else {
		    	    writeconsole('Couldn\'t find '+mmode+' in the region selected.  Try another region.');
		    }
	    }
    }
    
};

var getMouseCoords = function(e) {
	if (!document.all) { // not IE
	    var em = document.createEvent('MouseEvents'), i = 0;

	    if(e.targetTouches) {  // always false
		em.initMouseEvent('mousedown', true, false, this.containerObj, 0,
		    e.targetTouches[i].screenX, e.targetTouches[i].screenY,
		    e.targetTouches[i].clientX, e.targetTouches[i].clientY,
		    false, false, false, false, 0, null);
		
		e = em;
	    }
	}
	var cPos = board.getCoordsTopLeftCorner(e),
	    absPos = JXG.getPosition(e),
	    dx = absPos[0]-cPos[0],
	    dy = absPos[1]-cPos[1];

	return new JXG.Coords(JXG.COORDS_BY_SCREEN, [dx, dy], board);
};



/*****
Tabs
****/
/* 
Simple JQuery menu.
HTML structure to use:

<ul class="menu">
// This item is open at page load time
<li class="expand"><a href="#">Sub menu heading</a>
<ul>
<li><a href="http://site.com/">Link</a></li>


Copyright 2007-2010 by Marco van Hylckama Vlieg

web: http://www.i-marco.nl/weblog/
email: marco@i-marco.nl

Free to use any way you like.
*/


jQuery.fn.initMenu = function() {  
    return this.each(function(){
        $('.acitem', this).hide();
        $('li.expand > .acitem', this).show();
        $('li.expand > .acitem', this).prev().addClass('active');
        $('li a', this).click(
            function(e) {
                e.stopImmediatePropagation();
                var theElement = $(this).next();
                var parent = this.parentNode.parentNode;
                
                if(theElement.hasClass('acitem') && theElement.is(':visible')) {
                    return false;
                }
                if(theElement.hasClass('acitem') && !theElement.is(':visible')) {         
                    $('.acitem:visible', parent).first().slideUp('normal', function() {
                        $(this).prev().removeClass('active');
                    });
                    theElement.slideDown('normal', function() {
                        $(this).prev().addClass('active');
                    });
                    return false;
                }
            
        }
    );
});
};

$(document).ready(function() {$('.menu').initMenu();});


//tabs 
//from http://www.sohtanaka.com/web-design/simple-tabs-w-css-jquery/
$(document).ready(function() {

	//When page loads...
	$(".tab_content").hide(); //Hide all content
	$("ul.tabs li:first").addClass("active").show(); //Activate first tab
	$(".tab_content:first").show(); //Show first tab content

	//On Click Event
	$("ul.tabs li").click(function() {

		$("ul.tabs li").removeClass("active"); //Remove any "active" class
		$(this).addClass("active"); //Add "active" class to selected tab
		$(".tab_content").hide(); //Hide all tab content

		var activeTab = $(this).find("a").attr("href"); //Find the href attribute value to identify the active tab + content
		$(activeTab).fadeIn(); //Fade in the active ID content
		return false;
	});

});

/***
Calculator
***/                                                      
var calcoutputs = [0];
function docalcinput(doclear) {
	var str = $("#calcinput").val();
	if (str=="Type an expression, like 3*4^2") {return;}
	try {
		str = str.replace(/#(\d+)(x|y)/g,function(a,b,c){
			if (c=='x') {return "("+calcoutputs[b][0]+")";} else {return "("+calcoutputs[b][1]+")";}
		});
		str = str.replace(/#(\d+)/g,function(a,b){return "("+calcoutputs[b]+")";});
		str = str.replace(/(##|ANS)(x|y)/g,function(a,b,c){
			if (c=='x') {return "("+calcoutputs[calcoutputs.length-1][0]+")";} else {return "("+calcoutputs[calcoutputs.length-1][1]+")";}
		});
		str = str.replace(/(##|ANS)/g,"("+calcoutputs[calcoutputs.length-1]+")");
		toevalstr = ' ' + mathjs(str);
		
		var regex;
		for (var i=0;i<4;i++) {
			regex = new RegExp("([^a-z])"+funcname[curgraphmode][i]+"\\(", "g");
			toevalstr = toevalstr.replace(regex,"$1f["+i+"](");
		}
		with (Math) var res = eval(toevalstr);
	} catch(e) {
		var res = "error evaluating";
		var Pdepth = 0; var Bdepth = 0;
		  for (var i=0; i<str.length; i++) {
			if (str.charAt(i)=='(') {
				Pdepth++;
			} else if (str.charAt(i)==')') {
				Pdepth--;
			} else if (str.charAt(i)=='[') {
				Bdepth++;
			} else if (str.charAt(i)==']') {
				Bdepth--;
			}
		  }
		  
		  if (Pdepth!=0 || Bdepth!=0) {
			  res += " (unmatched parens)";
		  }
		  trg = str.match(/(sin|cos|tan|sec|csc|cot)\^/);
		  reg = new RegExp("(sqrt|ln|log|sin|cos|tan|sec|csc|cot|abs)([^\(])");
		  errstuff = str.match(reg)
		  if (trg!=null) {
			  trg = trg[1];
			  res += " [use ("+trg+"(x))^2 instead of "+trg+"^2(x)]";
		  } else if (errstuff!=null) {  
			  res += " [use function notation - "+errstuff[1]+"("+errstuff[2]+"), not "+errstuff[0]+"]";
		  }
	}
	
	writelog(str,res,true);
	
	calcbackrefcnt = 0;
	//$("#calcinput").val("Type an expression, like 3*4^2");
	//$("#calcinput").css({color:'#999999'});
	if (doclear) {
		$("#calcinput").val("");
	} else {
		$("#calcinput").val("Type an expression, like 3*4^2");
		$("#calcinput").css({color:'#999999'});
	}
}
var calcbackrefcnt = 0;
function calcinputonfocus() {
	if ($("#calcinput").val()=="Type an expression, like 3*4^2") {
		$("#calcinput").val("");
		$("#calcinput").css({color:'#000000'});
	}
	calcbackrefcnt = 0;
}
function calcinputonblur() {
	if ($("#calcinput").val()=="") {
		$("#calcinput").css({color:'#999999'});
		$("#calcinput").val("Type an expression, like 3*4^2");
	}
}
function calcinputonkeydown(e,field) {
	if (window.event) {
		var key = window.event.keyCode;
	} else if (e.which) {
		var key = e.which;
	}
	if (key==13) {
		docalcinput(true);
		return false;
	}  else {
		return true;
	}
}
function calcinputonkeyup(e,field) {
	if (window.event) {
		var key = window.event.keyCode;
	} else if (e.which) {
		var key = e.which;
	}
	if (key==38) {
		if (calcbackrefcnt < calcoutputs.length-1) {
			calcbackrefcnt++;
		}
		
		while (calcbackrefcnt <= calcoutputs.length && !$('#in'+(calcoutputs.length-calcbackrefcnt)).attr('title')) {
			calcbackrefcnt++;
		}
		if ($('#in'+(calcoutputs.length-calcbackrefcnt)).attr('title')) {
			$('#calcinput').val($('#in'+(calcoutputs.length-calcbackrefcnt)).attr('title'));
			$("#calcinput").css({color:'#000000'});
		}
		return false;
	} else if (key==40) {
		if (calcbackrefcnt>0) {
			calcbackrefcnt--;
		}
		
		while (calcbackrefcnt > 0 && !$('#in'+(calcoutputs.length-calcbackrefcnt)).attr('title')) {
			calcbackrefcnt--;
		}
		if (calcbackrefcnt==0) {
			$('#calcinput').val("");
			$("#calcinput").css({color:'#000000'});
		} else if ($('#in'+(calcoutputs.length-calcbackrefcnt)).attr('title')) {
			$('#calcinput').val($('#in'+(calcoutputs.length-calcbackrefcnt)).attr('title'));
			$("#calcinput").css({color:'#000000'});
		}
		return false;
	} else {
		return true;
	}
}
/***
Utility
***/

/***
Numerics
****/
/*function to get max.  From bcalc.net */
function getMax(fn,lowX,upX){
	var xValue = (upX + lowX)/2;
	var curMax = fn(xValue);
	var newX,newMax;
	
	var dx = (upX - lowX)/20;
	for (var i=0; i<20; i++) {
		newMax = fn(lowX+dx*i);
		if (newMax>curMax) {
			curMax = newMax;
			xValue = lowX+dx*i;
		}
	}
	
	var iters = 1000;
	var delta = (upX - lowX)/40;

	for(var k=0;k<iters;k++){
		newX = xValue + delta;
		if((newX < lowX) || (newX > upX)) break;
		newMax = fn(newX);

		if(newMax > curMax){
			xValue = newX;
			curMax = newMax;
			delta = 1.5*delta;
		} else {
			delta = -delta;
			newX = xValue + delta;
			if((newX < lowX) || (newX > upX)) break;
			newMax = fn(newX);

			if(newMax > curMax){
				xValue = newX;
				curMax = newMax;
				delta = 1.5 * delta;
			} else {
				delta = 0.5*delta;
			}
		}
		delta = Math.max(-1,Math.min(1,delta));
		if (Math.abs(delta) < 1e-7) { break;}
	}

	//check endpoints
	newMax = fn(lowX);
	if(newMax > curMax) {
		xValue = lowX;
		curMax = newMax;
	}
	newMax = fn(upX);
	if(newMax > curMax) {
		xValue = upX;
		curMax = newMax;
	}
	return [xValue,curMax];
}

/* function to obtain minimum */
function getMin(fn,lowX,upX){
	var xValue = (upX + lowX)/2;
	var curMin = fn(xValue);
	var newX,newMin;
	
	var dx = (upX - lowX)/20;
	for (var i=0; i<20; i++) {
		newMin = fn(lowX+dx*i);
		if (newMin<curMin) {
			curMin = newMin;
			xValue = lowX+dx*i;
		}
	}
	
	var iters = 1000;
	var delta = (upX - lowX)/40;


	for(var k=0;k<iters;k++){
		newX = xValue + delta;
		if((newX < lowX) || (newX > upX)) break;
		newMin = fn(newX);

		if(newMin < curMin){
			xValue = newX;
			curMin = newMin;
			delta = 1.5*delta;
		} else {
			delta = -delta;
			newX = xValue + delta;
			if((newX < lowX) || (newX > upX)) break;
			newMin = fn(newX);

			if(newMin < curMin){
				xValue = newX;
				curMin = newMin;
				delta = 1.5 * delta;
			} else {
				delta = 0.5*delta;
			}
		}
		delta = Math.max(-1,Math.min(1,delta));
		if (Math.abs(delta) < 1e-7) { break;}
	}

	//check endpoints
	newMin = fn(lowX);
	if(newMin < curMin) {
		xValue = lowX;
		curMin = newMin;
	}
	newMin = fn(upX);
	if(newMin < curMin) {
		xValue = upX;
		curMin = newMin;
	}

	return [xValue,curMin];
}

function normalcdf(a,b,mean,stdev) {
	if (mean==null) {
		mean = 0;
	} 
	if (stdev==null) {
		stdev = 1;
	}
	stdev *= 1.0;  mean *= 1.0;
	var za = (a-mean)/stdev;
	var zb = (b-mean)/stdev;
	return Math.round(1e7*(normalcdftoleft(zb) - normalcdftoleft(za)))/1e7;	
}

function normalcdftoleft(ztest) {
	var eps = 1e-12;
	var eps2 = 1e-15; 
	if (ztest < -10) {return eps;}
	if (ztest > 10) {return (1-eps);}
	var ds = 1;
	var s = 0;
	var i = 0;
	var z = Math.abs(ztest);
	var fact = 1;
	while (Math.abs(ds)>eps2) {
		ds = Math.pow(-1,i)*Math.pow(z,2.0*i+1.0)/(Math.pow(2.0,i)*fact*(2.0*i+1.0));
		s += ds;
		i++;
		fact *= i;
		if (Math.abs(s)<eps) {
			break;
		}
	}
	s *= 0.3989422804;
	if (ztest > 0) {
		var pval = .5 + s;
	} else {
		var pval = .5 - s;
	}
	if (pval < eps) {
		pval = eps;
	} else if (pval > (1-eps)) {
		pval = 1-eps;
	}
	return pval;
}
//p is area to left of x
function invnorm(p,mean,stdev) {
      if (mean==null) {
		mean = 0;
	} 
	if (stdev==null) {               
		stdev = 1;
	}
	stdev *= 1.0;  mean *= 1.0;
      var p0 = -0.322232431088;
      var p1 = -1.0;
      var p2 = -0.342242088547;
      var p3 = -0.0204231210245;
      var p4 = -0.453642210148e-4;
     var  q0 =  0.0993484626060;
      var q1 =  0.588581570495;
      var q2 =  0.531103462366;
      var q3 =  0.103537752850;
      var q4 =  0.38560700634e-2;
      var pp, xp, y;
      
   if (p < 0.5) { pp = p; }  else  {pp = 1 - p; }
   

   if (pp < 1e-12) {
      xp = 99;
   } else {
      y = Math.sqrt(Math.log(1/(pp*pp)));
      xp = y + ((((y * p4 + p3) * y + p2) * y + p1) * y + p0) / ((((y * q4 + q3) * y + q2) * y + q1) * y + q0);
   }
   if (Math.abs(xp)<1e-7) { xp=0;}
   if (p < 0.5) { return Math.round(1e7*(-1*xp*stdev + mean))/1e7; }  
   else { return  Math.round(1e7*(xp*stdev + mean))/1e7; }
}


//binompdf(N,p,x)
//Computes the probability of x successes out of N trials
//where each trial has probability p of success
function binompdf(N,p,x,noround) {
	if (noround) {
		return (nCr(N,x)*Math.pow(p,x)*Math.pow(1-p,N-x));
	} else {
		return Math.round(1e7*(nCr(N,x)*Math.pow(p,x)*Math.pow(1-p,N-x)))/1e7;
	}
}


//binomcdf(N,p,x)
//Computes the probably of &lt;=x successes out of N trials
//where each trial has probability p of success
function binomcdf(N,p,x) {
	out = 0;
	for (i=0;i<=x;i++) {
		out += binompdf(N,p,i,true);
	}
	return Math.round(1e7*out)/1e7;
}

//t, gamma and beta functions from http://www.math.ucla.edu/~tom/distributions/tDist.html
function LogGamma(Z) {
	with (Math) {
		var S=1+76.18009173/Z-86.50532033/(Z+1)+24.01409822/(Z+2)-1.231739516/(Z+3)+.00120858003/(Z+4)-.00000536382/(Z+5);
		var LG= (Z-.5)*log(Z+4.5)-(Z+4.5)+log(S*2.50662827465);
	}
	return LG;
}

function Betinc(X,A,B) {
	var A0=0;
	var B0=1;
	var A1=1;
	var B1=1;
	var M9=0;
	var A2=0;
	var C9;
	while (Math.abs((A1-A2)/A1)>1e-8) {
		A2=A1;
		C9=-(A+M9)*(A+B+M9)*X/(A+2*M9)/(A+2*M9+1);
		A0=A1+C9*A0;
		B0=B1+C9*B0;
		M9=M9+1;
		C9=M9*(B-M9)*X/(A+2*M9-1)/(A+2*M9);
		A1=A0+C9*A1;
		B1=B0+C9*B1;
		A0=A0/B1;
		B0=B0/B1;
		A1=A1/B1;
		B1=1;
	}
	return A1/A;
}

function tcdf(a,b,df) {
	return Math.round(1e7*(studenttcdf(df,b) - studenttcdf(df,a)))/1e7;
}

function studenttcdf(df,X) { //gives area to left of x
	if (X < -10) {return 1e-12;}
	if (X > 10) {return (1-1e-12);}
	
	with (Math) {
		var A=df/2;
		var S=A+.5;
		var Z=df/(df+X*X);
		var BT=exp(LogGamma(S)-LogGamma(.5)-LogGamma(A)+A*log(Z)+.5*log(1-Z));
		if (Z<(A+1)/(S+2)) {
			var betacdf=BT*Betinc(Z,A,.5)
		} else {
			var betacdf=1-BT*Betinc(1-Z,.5,A)
		}
		if (X<0) {
			var tcdfv=betacdf/2;
		} else {
			var tcdfv=1-betacdf/2;
		}
	}
	return tcdfv;
}

function invtrefine(df,p,t) {
	if (df<3) {
		var dv = 100;
	} else {
		var dv = 5;
	}
	var eps = 1e-12;
	var tdist;
	var i = 0;
	while (dv>eps) {
		tdist = studenttcdf(df,t);
		i++;
		dv = dv/2;
		if (tdist>p) {
			t = t-dv;
		} else {
			t = t+dv;
		}
	}
	if (Math.abs(t)<1e-7) { t=0;}
	return t;
}

function invt(p, df) {
	return invT(p,df);
}
function invT(p, df) {
	var guess = invnorm(p);
	return Math.round(1e7*invtrefine(df,p,guess))/1e7;
}
