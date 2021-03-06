var win = Titanium.UI.currentWindow;
win.title = '';


win.hideNavBar();

var view1 = Ti.UI.createView({
	width:320,
	height:366,
	bottom:0,
	borderWidth: 5,
	borderColor:'#000',
	backgroundImage:'holes/hole1.png',
});
var l1 = Ti.UI.createLabel({
	text:'',
	color:'#fff',
	width:'auto',
	height:'auto',
	top:0,
	zIndex:1
});
view1.add(l1);

var view2 = Ti.UI.createView({
	width:216,
	height:370,
	bottom:0,
	backgroundImage:'holes/hole2.jpeg',
	zIndex:1
});
var l2 = Ti.UI.createLabel({
	text:'Hole 2',
	color:'#fff',
	width:'auto',
	height:'auto',
	top:0
});
view2.add(l2);

var view3 = Ti.UI.createView({
	width:216,
	height:370,
	bottom:0,
	backgroundImage:'holes/hole3.jpeg',
});
var l3 = Ti.UI.createLabel({
	text:'Hole 3',
	color:'#fff',
	width:'auto',
	height:'auto',
	top:0
});
view3.add(l3);

var view4 = Ti.UI.createView({
	width:216,
	height:370,
	bottom:0,
	backgroundImage:'holes/hole4.jpeg',
});
var l4 = Ti.UI.createLabel({
	text:'Hole 4',
	color:'#fff',
	width:'auto',
	height:'auto',
	top:0
});
view4.add(l4);


var scrollView = Titanium.UI.createScrollableView({
	views:[view1,view2,view3,view4],
	showPagingControl:false,
	pagingControlHeight:30,
	maxZoomScale:2.0,
	currentPage:1
});

win.add(scrollView);

var i=1;
var activeView = view1;

scrollView.addEventListener('scroll', function(e)
{
	activeView = e.view;  // the object handle to the view that is about to become visible
	i = e.currentPage;
	Titanium.API.info("scroll called - current index " + i + ' active view ' + activeView);
});
scrollView.addEventListener('click', function(e)
{
	Ti.API.info('ScrollView received click event, source = ' + e.source);
});
scrollView.addEventListener('touchend', function(e)
{
	Ti.API.info('ScrollView received touchend event, source = ' + e.source);
});



// move scroll view left
var left = Titanium.UI.createButton({
	backgroundImage:'images/navbar_back.png',
	left:2,
	top:2,
	width:87,
	height:40,
});
left.addEventListener('click', function(e)
{
	if (i === 0){ return; }
	i--;
	scrollView.scrollToView(i);
});

// move scroll view right
var right = Titanium.UI.createButton({
	backgroundImage:'images/navbar_next.png',
	right:2,
	top:2,
	width:87,
	height:40,
});
right.addEventListener('click', function(e)
{
	if (i === (scrollView.views.length-1)){ return; }
	i++;
	scrollView.scrollToView(scrollView.views[i]);
});



var toolbar = Titanium.UI.createView({
	backgroundImage:'images/navbar_bg.png',
	height: 66,
	left: 0,
	right: 0,
	top:0,
	zIndex:-1
});

win.add(toolbar);
toolbar.add(right);
toolbar.add(left);


//
// ODD SHAPED WINDOWS
//
var t = Titanium.UI.create2DMatrix();
t= t.rotate(90);
var menuWin = Titanium.UI.createWindow({
	backgroundImage:'images/menubox.png',
	height:300,
	width:300,
	top:32,
	right:10,
	anchorPoint:{x:1,y:0},
	transform:t,
	opacity:0
});

var t2 = Titanium.UI.create2DMatrix();

var navButton = Titanium.UI.createButton({
	title:'Cheat!',
	bottom: 0,
	left:0,
	height:30,
	width: 70,
});
var visible = false;
navButton.addEventListener('click', function()
{
	if (!visible)
	{
		menuWin.open();
		menuWin.animate({transform:t2,opacity:1,duration:800});
		visible=true;
	}
	else
	{
		var t = Titanium.UI.create2DMatrix();
		t= t.rotate(-90);
		menuWin.animate({transform:t,opacity:0,duration:800}, function()
		{
			menuWin.close();
		});
		visible=false;
	}
});

win.add(navButton);