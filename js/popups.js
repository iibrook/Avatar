//Start BasisUI
var BasisUI = {};
BasisUI.extend = function (destination, source) {
    for (var property in source) {
        if (destination[property]) {
            continue;
        }
        destination[property] = source[property];
    }
    return destination;
};
BasisUI.clone = function (matrix) {
    if (typeof (matrix) == "function") {
        return new matrix();
    }
    else if (typeof (matrix) == "object") {
        var cloning = new Object();
        for (var member in matrix) {
            switch (typeof (matrix[member])) {
                case "object" :
                    cloning[member] = clone(matrix[member]);
                    break;
                default:
                    cloning[member] = matrix[member];
            }
        }
        return cloning;
    }
    else {
        var cloning = matrix;
        return cloning;
    }
}
BasisUI.getWindowWidth = function (objWindow) {
    if (objWindow.innerWidth) {
        return Math.min(objWindow.innerWidth, objWindow.document.documentElement.clientWidth);
    }
    else {
        return objWindow.document.documentElement.clientWidth;
    }
}
BasisUI.getWindowHeight = function (objWindow) {
    if (objWindow.innerHeight) {
        return Math.min(objWindow.innerHeight, objWindow.document.documentElement.clientHeight);
    }
    else {
        return objWindow.document.documentElement.clientHeight;
    }
}
BasisUI.getDocumentScrollTop = function (objDocument) {
    return Math.max(objDocument.documentElement.scrollTop, objDocument.body.scrollTop);
}
BasisUI.getDocumentScrollLeft = function (objDocument) {
    return Math.max(objDocument.documentElement.scrollLeft, objDocument.body.scrollLeft);
}
BasisUI.getDocumentWidth = function (objDocument) {
    return objDocument.documentElement.scrollWidth;
}
BasisUI.getDocumentHeight = function (objDocument) {
    return objDocument.documentElement.scrollHeight;
}
BasisUI.maxZIndex = function (objDocument) {
    var zIndex = 0;
    var elments = objDocument.getElementsByTagName("*");
    for (var i = 0; i < elments.length; i++) {
        if (elments[i].currentStyle) {
            elementZIndex = elments[i].currentStyle.zIndex; //get z-index on IE
        } else if (window.getComputedStyle) {
            elementZIndex = window.getComputedStyle(elments[i], null).zIndex; //get z-index on Firfox, Safari and Chrome
        }
        if (elementZIndex) {
            if (zIndex < parseInt(elementZIndex)) {
                zIndex = elementZIndex;
            }
        }
    }
    return parseInt(zIndex);
}
BasisUI.BindEvent = function (element, type, listener) {
    if (window.addEventListener) {
        element.addEventListener(type, listener, false);
    }
    else if (window.attachEvent) {
        element.attachEvent( 'on' + type, listener);
    }
}
BasisUI.userAgent = navigator.userAgent.toLowerCase();
BasisUI.browser = {
    version: (BasisUI.userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1],
    safari: /webkit/.test(BasisUI.userAgent),
    opera: /opera/.test(BasisUI.userAgent),
    msie: /msie/.test(BasisUI.userAgent) && !/opera/.test(BasisUI.userAgent),
    mozilla: /mozilla/.test(BasisUI.userAgent) && !/(compatible|webkit)/.test(BasisUI.userAgent)
};
BasisUI.phoneList = new Array("2.0 MMP" , "240320", "AvantGo", "BlackBerry" , "Blazer", "Cellphone", "Danger", "DoCoMo" , "Elaine/3.0", "EudoraWeb",
                               "hiptop", "IEMobile" , "KYOCERA/WX310K", "LG/U990", "MIDP-2.0" , "MMEF20", "MOT-V", "NetFront" , "Newt", "Nintendo Wii",
                               "Nitro", "Nokia" ,"Opera Mini", "Opera Mobi","Palm" , "Playstation Portable", "portalmmm" , "Proxinet", "ProxiNet",
                                                                   "SHARP-TQ-GX10", "Small" , "SonyEricsson", "Symbian", "TS21i-10" , "UP.Browser", "UP.Link", "Windows CE" , "WinWAP",
                               "iPhone", "iPod" , "Windows Phone", "HTC", "ucweb" , "Mobile", "Android");
BasisUI.isOnTouchStart = function () { return typeof (ontouchstart) != "undefined"; }
BasisUI.isiPad = function () { return BasisUI.userAgent.indexOf("ipad") >= 0; }
BasisUI.isAndroid = function () { return BasisUI.userAgent.indexOf("Android") > -1 || BasisUI.userAgent.indexOf("Silk" ) > -1; }
BasisUI.isiPhone = function () { return (navigator.platform.indexOf("iPhone") != -1) || (navigator.platform.indexOf("iPod" ) != -1); }
BasisUI.isPhone = function () {
    if (BasisUI.isOnTouchStart() && !BasisUI.isiPad()) {
        return true ;
    }
    for (var i = 0; i < BasisUI.phoneList.length; i++) {
        if (BasisUI.userAgent.indexOf(BasisUI.phoneList[i].toLowerCase()) >= 0 && BasisUI.userAgent.indexOf("ipad" ) == -1) {
            return true ;
        }
    }
    var appNameList = new Array("Microsoft Pocket Internet Explorer");
    for (var i = 0; i < appNameList.length; i++) {
        if (BasisUI.userAgent.indexOf(appNameList[i]) >= 0) {
            return true ;
        }
    }
    return false ;
}
BasisUI.isMobile = function () { return BasisUI.isOnTouchStart() || BasisUI.isPhone() || BasisUI.isAndroid(); }

//End BasisUI
//Start BasisUIList
function BasisUIList() {
    this.data = new Array();
}
BasisUIList.prototype.count = function () {
    return this .data.length;
}
BasisUIList.prototype.indexOf = function (item) {
    var index = -1;
    for (var i = this.count(); i >= 0; ) {
        if (this .data[--i] == item) {
            index = i;
            break;
        }
    }
    return index;
}
BasisUIList.prototype.contain = function (item) {
    return this .indexOf(item) == -1 ? false : true;
}
BasisUIList.prototype.add = function (item) {
    if (this .contain(item)) {
        return;
    }
    this.data.push(item);
}
BasisUIList.prototype.removeAt = function (index) {
    for (var i = index; i < this.count() - 1; i++) {
        this[i] = this [i + 1];
    }
    return this .data.pop();
}
BasisUIList.prototype.item = function (index) {
    if (index >= 0 && index <= this.count() - 1) {
        return this .data[index]
    }
}
BasisUIList.prototype.remove = function (item) {
    var index = this .indexOf(item);
    if (index != -1) {
        return this .removeAt(index);
    }
    return null ;
}
//End BasisUIList
/*******************************
Basis Common Popup Prototypes
********************************/
var BasisPopupZIndex = 6;
function BasisPopupMaxZindex(action) {
    if (action == "remove" )
        BasisPopupZIndex -= 1;
    else{
        BasisPopupZIndex += 1;
        return BasisPopupZIndex;
    }
}
//Start BasisMaskPopup
function BasisMaskPopup(param) {
    this.targetWindow = param["targetWindow" ] || window;
    this.elementKey = new Array();
    this.element = new Object();
    this.style = new Object();
    this.cssClass = new Object();

    this.elementKey.push("maskSpan" );
    this.elementKey.push("maskDiv" );
    this.element["maskSpan" ] = this.targetWindow.document.createElement( "span");
    this.element["maskDiv" ] = this.targetWindow.document.createElement( "div");
    this.element["maskDiv" ].setAttribute("class", "popups-mask");
    this.element["maskDiv" ].setAttribute("className", "popups-mask");
    this.style["maskDiv" ] = { zIndex: BasisPopupMaxZindex(), display: "block" };
}
BasisMaskPopup.prototype.setStyle = function () {
    this.element.maskDiv.style.zIndex = this .style["maskDiv"][ "zIndex"];
    this.element.maskDiv.style.display = this .style["maskDiv"][ "display"];
}

BasisMaskPopup.prototype.setSize = function () {
    this.element.maskDiv.style.width = "100%" ;
    this.element.maskDiv.style.height = Math.max(BasisUI.getWindowHeight(this.targetWindow), BasisUI.getDocumentHeight(this .targetWindow.document)) + "px";
}

BasisMaskPopup.prototype.setPosition = function () {
    this.element.maskDiv.style.left = "0px" ;
    this.element.maskDiv.style.top = "0px" ;
}
BasisMaskPopup.prototype.build = function () {
    this.element.maskSpan.appendChild(this .element.maskDiv);
    this.targetWindow.document.body.appendChild(this.element.maskSpan);
}
BasisMaskPopup.prototype.bindEvent = function () {
    var me = this ;
    BasisUI.BindEvent( this.targetWindow, "resize" , function () { me.setSize(); });
}
BasisMaskPopup.prototype.show = function () {
    this.setSize();
    this.setStyle();
    this.build();
    this.setPosition();
    this.bindEvent();
}
BasisMaskPopup.prototype.close = function () {
    if (this .element.maskSpan) {
        $( "*").find(this .element.maskSpan).remove();
    }
    BasisPopupMaxZindex( "remove");
}
//End MaskPopup
function BasisPopup(param){
     this.targetWindow=param["targetWindow" ]||window;  
     this.elementKey=new Array();
     this.config=new Object();
     this.element=new Object();
     this.callBack=new Object();
     this.cssClass=new Object();
     this.style=new Object();
     this.size=new Object();
     this.position=new Object();
     this.action=new Object();
     this.actionData = new Object();
     this.config["targetObj" ] = param.targetObj || "";
    if(param.showMask){
          this.config["showMask" ]=param.showMask;
          this.mask = new BasisMaskPopup({ targetWindow: this.targetWindow});
     }               
     this.config["title" ]=param.title;
    this.config["className" ] = param.className || "";
     this.config["content" ]=param.content;
     this.config["autoSize" ] = false;
     this.config["hasArrow" ] = param.hasArrow || false;
     this.callBack["closeCallBack" ] = param.closeCallBack;

     this.size["width" ]=param.width||300;
     this.size["height" ]=param.height||180;

     this.position["top" ]=param.top;
     this.position["left" ]=param.left;

     this.init();
}

BasisPopup.prototype.init= function(){
    this.action["hasShow" ]=false;
     this.elementKey.push("popupSpan" );
     this.elementKey.push("popupDiv" );
     this.elementKey.push("popupBorderTop" );
     this.elementKey.push("popupBorderBottom" );
     this.elementKey.push("popupContent" );

     this.elementKey.push("BasisCloseDiv" );
     this.elementKey.push("BasisReturnBtn" );
     this.elementKey.push("headerDiv" );

     this.elementKey.push("contentDiv" );
     this.element["popupSpan" ]=this.targetWindow.document.createElement( "span");
     this.element["popupDiv" ]=this.targetWindow.document.createElement( "div");
     this.element["popupDiv" ].setAttribute("class", "basis-popups" + this .config["className"]);
     this.element["popupDiv" ].setAttribute("className", "basis-popups" + this .config["className"]);

     this.element["popupBorderTop" ]=this.targetWindow.document.createElement( "div");
     this.element["popupBorderTop" ].setAttribute("class", "basis-popup-top clearfix" );
     this.element["popupBorderTop" ].setAttribute("className", "basis-popup-top clearfix" );
     this.element["popupBorderTop" ].innerHTML = "<div class=\"basis-popup-top-left\"> </div><div class=\"basis-popup-top-right\"> </div>";

     this.element["popupBorderBottom" ]=this.targetWindow.document.createElement( "div");
     this.element["popupBorderBottom" ].setAttribute("class", "basis-popup-btm clearfix" );
     this.element["popupBorderBottom" ].setAttribute("className", "basis-popup-btm clearfix" );
     this.element["popupBorderBottom" ].innerHTML = "<div class=\"basis-popup-btm-left\"> </div><div class=\"basis-popup-btm-right\"></div>";

     this.element["popupContent" ]=this.targetWindow.document.createElement( "div");
     this.element["popupContent" ].setAttribute("class", "basis-popup-content");
     this.element["popupContent" ].setAttribute("className", "basis-popup-content");

     this.element["headerDiv" ]=this.targetWindow.document.createElement( "div");
     this.element["headerDiv" ].setAttribute("class", "basis-popup-title");
     this.element["headerDiv" ].setAttribute("className", "basis-popup-title");

     this.element["BasisCloseDiv" ] = this.targetWindow.document.createElement( "div");
     this.element["BasisCloseDiv" ].setAttribute("class", "basis-close-btn");
     this.element["BasisCloseDiv" ].setAttribute("className", "basis-close-btn");
     this.element["BasisReturnBtn" ] = this.targetWindow.document.createElement( "div");
     this.element["BasisReturnBtn" ].setAttribute("class", "basis-return-btn");
     this.element["BasisReturnBtn" ].setAttribute("className", "basis-return-btn");

     this.element["contentDiv" ]=this.targetWindow.document.createElement( "div");
     this.element["contentDiv" ].setAttribute("class", "basis-iframe-content");
     this.element["contentDiv" ].setAttribute("className", "basis-iframe-content");

     this.style["popupDiv" ]={position:"absolute"};

     this.style["popupDiv" ]["zIndex"] = BasisPopupMaxZindex();

     if (this .config["hasArrow"]) {
          this.elementKey.push("popupArrow" );
          this.element["popupArrow" ] = this.targetWindow.document.createElement( "div");
          this.element["popupArrow" ].setAttribute("class", "BasisArrow");
          this.element["popupArrow" ].setAttribute("className", "BasisArrow");
     }
}

//initContent
BasisPopup.prototype.initContent= function(){}
//setStyle
BasisPopup.prototype.setStyle= function(){
     for(var i=this.elementKey.length-1;i>0;i--){
          var key=this .elementKey[i];
          if(!this .style[key]){
               continue;
          }
          for(var styleItem in this.style[key]){
               try     {
                    this.element[key].style[styleItem]=this .style[key][styleItem];
               }
               catch(e)
               {}
          }
     }
}
BasisPopup.prototype.setClass= function(){
     for(var i=this.elementKey.length-1;i>0;i--){
          var key=this .elementKey[i];
          if(!this .cssClass[key]){
               continue;
          }
          try{
               this.element[key].className=this .cssClass[key];
          }
          catch(e)
          {}
     }
}
//setSize
BasisPopup.prototype.setSize= function(){
     this.element.popupDiv.style["width" ]=(parseInt(this.size.width)) + "px";
     //this.element.popupDiv.style["height"]=this.size.height+"px";
}
//setSize with URL iframe
BasisPopup.prototype.setUrlSize= function(){
     //this.element.popupDiv.style["height"]=this.size.height+"px";
}
//reset the size of popup
BasisPopup.prototype.resetPopupSize = function (width, height) {
    if (width !="" ) {
        this.size.width = width;
        this.element["url" ].setAttribute("width", width + "px");
    }
    if (height != "" ) {
        this.size.height = height;
        this.element["url" ].setAttribute("height", height + "px");
    }
    this.setSize();
    this.setPosition();
}
//setPosition
BasisPopup.prototype.setPosition= function(){
     if(this .position.top){
          this.element.popupDiv.style["top" ]=this.position.top+ "px";
     }
     else{
          var availHeight=BasisUI.getWindowHeight(this.targetWindow);
          var scrollTop = BasisUI.getDocumentScrollTop(this.targetWindow.document);
          if (this .config["targetObj"] != "") {
               availHeight = $(this .config["targetObj"]).height();
               scrollTop = $(this.config["targetObj" ]).scrollTop();
          }
          var availTop=0;
          if(availHeight-this .size.height>0){
               availTop=(availHeight- this.size.height)/2 + scrollTop;
               this.element.popupDiv.style["top" ]=availTop+"px";
               if(this .config["showMask"]){
                    this.mask.setSize();
               }
          }else{
               availTop = 20 + scrollTop;
               this.element.popupDiv.style["top" ]=availTop+"px";
          }
     }
     if(this .position.left){
          this.element.popupDiv.style["left" ]=this.position.left+ "px";
     }
     else{
          var availWidth=BasisUI.getWindowWidth(this.targetWindow);
          var scrollLeft = BasisUI.getDocumentScrollLeft(this.targetWindow.document);
          if (this .config["targetObj"] != "") {
               availHeight = $(this .config["targetObj"]).height();
               scrollTop = $(this.config["targetObj" ]).scrollTop();
          }
          var availLeft=0;
          if(availWidth-this .size.width>0){
               availLeft=(availWidth- this.size.width)/2 + scrollLeft;
          }
          this.element.popupDiv.style["left" ]=availLeft+"px";
     }
}
//adjustPosition
BasisPopup.prototype.adjustPosition = function () {}
//build
BasisPopup.prototype.build = function () {
    this.element["popupDiv" ].appendChild(this.element[ "popupBorderTop"]);
    if (this .config["title"] != "") {
        this.element["headerDiv" ].innerHTML = this.config[ "title"];
        this.element["popupContent" ].appendChild(this.element[ "headerDiv"]);
    }
    this.element["popupContent" ].appendChild(this.element[ "contentDiv"]);
    this.element["popupContent" ].appendChild(this.element[ "BasisReturnBtn"]);
    this.element["popupContent" ].appendChild(this.element[ "BasisCloseDiv"]);
    this.element["popupDiv" ].appendChild(this.element[ "popupContent"]);

    this.element["popupSpan" ].appendChild(this.element[ "popupDiv"]);
    try {
        if (this .config["targetObj"] != "")
            $( this.config["targetObj" ]).append(this.element[ "popupSpan"]);
        else
            this.targetWindow.document.body.appendChild(this.element[ "popupSpan"]);
    }
    catch (ex) {
        //alert(this.targetWindow.document.body.innerHTML);
        //alert(ex.message);
    }
    this.element["popupDiv" ].appendChild(this.element[ "popupBorderBottom"]);

    if (this .config["hasArrow"]) {
        this.element["popupSpan" ].setAttribute("class", "BasisArrowPopup");
        this.element["popupSpan" ].setAttribute("className", "BasisArrowPopup");
        this.element["popupBorderTop" ].appendChild(this.element[ "popupArrow"]);
    }
}
//buildLoading
BasisPopup.prototype.buildLoading= function(){}
//buildContent
BasisPopup.prototype.buildContent = function () {}
//bindEvents
BasisPopup.prototype.bindEvents = function () {
    var me = this ;
    $(me.element[ "BasisReturnBtn"]).click(function () {
        me.element[ "BasisReturnBtn"].style.display = "none" ;
        me.element[ "BasisCloseDiv"].style.display = "" ;
        me.element[ "url"].setAttribute("src" , me.config["BasisReturnUrl"]);
        me.config[ "BasisReturnUrl"] = "" ;
    }) //chrome && safari click bug
    var QudsiPopupClose = function (){
        me.close();
        if (me.callBack.closeCallBack) {
            me.callBack.closeCallBack();
        }
    };
    BasisUI.BindEvent( this.element["BasisCloseDiv" ], "click", function () {
        QudsiPopupClose();
    });
    //close the popup windows whenever users click outside of them
    // if(this .config.showMask){
    //     BasisUI.BindEvent( this.mask.element["maskDiv" ], "click", function () {
    //         QudsiPopupClose();
    //     });
    // }
  
}
//bindContentEvents
BasisPopup.prototype.bindContentEvents= function(){}
//show
BasisPopup.prototype.show= function(){
     this.setStyle();
     this.setClass();
     this.setSize();
     this.setPosition();
     this.bindEvents();
     this.bindContentEvents();
     this.build();
     this.buildLoading();
     this.buildContent();
     if(this .config.showMask){
          this.mask.show();
     }
     this.action["hasShow" ]=true;
}
BasisPopup.prototype.showModalDialog= function(){
    this.show();
    this.mask.show();
}
//close
BasisPopup.prototype.close = function () {
    if (BasisUI.browser.msie && this.config[ "onFocus"] == true ) {
        $( this.element.url).remove();
    }
    if (this .config["targetObj"] != "")
        $( this.config["targetObj" ]).find(this.element.popupSpan).remove();
    else if (this.element.popupSpan) {
        $( "*").find(this .element.popupSpan).remove();
    }

    BasisPopupMaxZindex( "remove");
    if (this .config["showMask"]) {
        this.mask.close();
    }
    this.action["hasShow" ] = false;
}
//hide
BasisPopup.prototype.hide = function () {
    var me = this ;
    me.config[ "content"].parents(".basis-popups" ).css("display", "none");
    me.config[ "content"].css("display" , "none");
    //for HtmlWrapPopup
    BasisPopupMaxZindex( "remove");
    if (this .config["showMask"]) {
        $( ".popups-mask").remove();
    }
    this.action["hasShow" ] = false;
}
//BasisPopup Return Url
BasisPopup.prototype.redirect = function (returnUrl, newUrl) {
    var me = this ;
    me.config[ "BasisReturnUrl"] = returnUrl;
    me.element[ "BasisReturnBtn"].style.display = "block" ;
    me.element[ "BasisCloseDiv"].style.display = "none" ;
    me.element[ "url"].setAttribute("src" , newUrl);
}
//addCallBack
BasisPopup.prototype.addCallBack= function(elementKey,listener){
     elementKey=elementKey.toLowerCase();
     if(this .element[elementKey]){
          this.callBack[elementKey].add(listener);
     }
}
//removeCallBack
BasisPopup.prototype.removeCallBack= function(elementKey,listener){
     elementKey=elementKey.toLowerCase();
     if(this .element[elementKey]){
          this.callBack[elementKey].remove(listener);
     }
}

//Start BasisUrlPopup
function BasisUrlPopup(param){
     this.base = new BasisPopup(param);
     BasisUI.extend( this,this .base);
     this.config["autoSize" ] = true;
     this.config["onFocus" ] = true;
     this.initContent();
}
BasisUrlPopup.prototype.initContent= function(){
     this.elementKey.push("loading" );
     this.element["loading" ]=this.targetWindow.document.createElement( "div");
     this.element["loading" ].setAttribute("class", "loading-popups");
     this.element["loading" ].setAttribute("className", "loading-popups");
     this.elementKey.push("url" );
     this.element["url" ]=this.targetWindow.document.createElement( "iframe");
     this.element["url" ].setAttribute("id", "basis-popup-iframe");
     this.element["url" ].setAttribute("border", "0");
     this.element["url" ].setAttribute("frameBorder", "0");
     this.element["url" ].setAttribute("scrolling", "no");
     this.element["url" ].setAttribute("allowTransparency", "true");
     this.element["url" ].setAttribute("src", this.config["content" ]);
     this.element["url" ].setAttribute("width",( this.size.width)+"px" );
     this.element["url" ].setAttribute("class", "basis-iframe-loading");
     this.element["url" ].setAttribute("className", "basis-iframe-loading");
}
BasisUrlPopup.prototype.bindContentEvents= function(){
    var me = this ;
    BasisUI.BindEvent(me.element[ "url"],"load" ,function(){
        me.element[ "loading"].style.display = "none" ;
        me.element[ "url"].setAttribute("class" ,"");
        me.element[ "url"].setAttribute("className" ,"");
    });
     if(this .config["autoSize"]){
          BasisUI.BindEvent(me.element[ "url"],"load" ,function(){
               try{
                    var obj=me.element["url" ];
                    if (obj.contentDocument && obj.contentDocument.body.offsetHeight){
                         obj.height = obj.contentDocument.body.scrollHeight;
                         obj.width = obj.contentDocument.body.scrollWidth;
                    }
                    else{
                         obj.height = obj.Document.body.scrollHeight;
                         obj.width = obj.Document.body.scrollWidth;
                    }
                    me.setUrlSize();
                    me.size.height=obj.height;
                    me.size.width=obj.width;
                    me.setPosition();
                    me.adjustPosition();                                                               
                    var contentWindow=obj.contentWindow;
                    contentWindow.closeParent= function () {
                         me.close();
                    };
                    contentWindow.customerFunction= function () {
                         for(var i=0;i<me.callBack["url"].count();i++){
                              me.callBack["url" ].item(i)();
                         }
                    };
               } catch(e){}
          });
     }
}
BasisUrlPopup.prototype.buildLoading= function(){
     this.element["loading" ].innerHTML="<span>&nbsp;&nbsp;加载中...</span>";
     this.element["contentDiv" ].appendChild(this.element[ "loading"]);
     this.element["contentDiv" ].appendChild(this.element[ "url"]);
}
//End BasisUrlPopup
//Start BasisHasCornerUrlPopup For Wishlist AllSites Popup
function BasisHasCornerUrlPopup(param) {
    this.base = new BasisUrlPopup(param);
    BasisUI.extend( this, this .base);
    this.initContent();
}
BasisHasCornerUrlPopup.prototype.initContent = function () {
    this.elementKey.push("popupCornerLeft" );
    this.element["popupCornerLeft" ] = this.targetWindow.document.createElement( "div");
    this.element["popupCornerLeft" ].setAttribute("class", "BasisCornerLeft");
    this.element["popupCornerLeft" ].setAttribute("className", "BasisCornerLeft");
    this.elementKey.push("popupCornerRight" );
    this.element["popupCornerRight" ] = this.targetWindow.document.createElement( "div");
    this.element["popupCornerRight" ].setAttribute("class", "BasisCornerRight");
    this.element["popupCornerRight" ].setAttribute("className", "BasisCornerRight");
}
BasisHasCornerUrlPopup.prototype.buildContent = function () {
    this.element["popupSpan" ].setAttribute("class", "BasisCornerPopup");
    this.element["popupSpan" ].setAttribute("className", "BasisCornerPopup");
    this.element["popupBorderTop" ].appendChild(this.element[ "popupCornerLeft"]);
    this.element["popupBorderTop" ].appendChild(this.element[ "popupCornerRight"]);
}
BasisHasCornerUrlPopup.prototype.setSize = function () {
    this.element.popupDiv.style["width" ] = (parseInt(this.size.width)+50) + "px";
}
//End BasisHasCornerUrlPopup
//Start BasisHtmlPopup
function BasisHtmlPopup(param){
     this.base = new BasisPopup(param);
     BasisUI.extend( this,this .base);
     this.initContent();
}
BasisHtmlPopup.prototype.initContent= function(){
     this.elementKey.push("contentDiv" );
     this.element["contentDiv" ]=this.targetWindow.document.createElement( "div");
     this.element["contentDiv" ].innerHTML=this.config[ "content"];
     this.element["contentDiv" ].setAttribute("class", "basis-html-content");
     this.element["contentDiv" ].setAttribute("className", "basis-html-content");
}
//End BasisHtmlPopup
//Start BasisHtmlWrapPopup
function BasisHtmlWrapPopup(param) {
    this.base = new BasisPopup(param);
    BasisUI.extend( this, this .base);
    this.initContent();
}
BasisHtmlWrapPopup.prototype.bindEvents = function () {
    var me = this ;
    this.element["BasisReturnBtn" ].style.display = "none";
    BasisUI.BindEvent( this.element["BasisCloseDiv" ], "click", function () {
        me.hide();
        if (me.callBack.closeCallBack) {
            me.callBack.closeCallBack();
        }
    });
}
BasisHtmlWrapPopup.prototype.initContent = function () {
    this.elementKey.push("contentDiv" );
    this.element["contentDiv" ] = this.targetWindow.document.createElement( "div");
    this.config["content" ].appendTo(this.element[ "contentDiv"]);
    this.config["content" ].css("display", "block");
    this.element["contentDiv" ].setAttribute("class", "basis-html-content");
    this.element["contentDiv" ].setAttribute("className", "basis-html-content");
    $(".basis-html-content").find(".hide").removeClass("hide");
}
//End BasisHtmlWrapPopup
//Start Basis HasCornerHtmlPopup
function BasisHasCornerHtmlPopup(param) {
    this.base = new BasisHtmlPopup(param);
    BasisUI.extend( this, this .base);
    this.initContent();
}
BasisHasCornerHtmlPopup.prototype.initContent = function () {
    this.elementKey.push("popupCornerLeft" );
    this.element["popupCornerLeft" ] = this.targetWindow.document.createElement( "div");
    this.element["popupCornerLeft" ].setAttribute("class", "BasisCornerLeft");
    this.element["popupCornerLeft" ].setAttribute("className", "BasisCornerLeft");
    this.elementKey.push("popupCornerRight" );
    this.element["popupCornerRight" ] = this.targetWindow.document.createElement( "div");
    this.element["popupCornerRight" ].setAttribute("class", "BasisCornerRight");
    this.element["popupCornerRight" ].setAttribute("className", "BasisCornerRight");
}
BasisHasCornerHtmlPopup.prototype.buildContent = function () {
    this.element["popupSpan" ].setAttribute("class", "BasisCornerPopup");
    this.element["popupSpan" ].setAttribute("className", "BasisCornerPopup");
    this.element["popupBorderTop" ].appendChild(this.element[ "popupCornerLeft"]);
    this.element["popupBorderTop" ].appendChild(this.element[ "popupCornerRight"]);
}
BasisHasCornerHtmlPopup.prototype.setSize = function () {
    this.element.popupDiv.style["width" ] = (parseInt(this.size.width) + 50) + "px";
}
//End BasisHasCornerHtmlPopup
//Start ConfirmPopup
function BasisConfirmPopup(param){
    this.base = new BasisPopup(param);
    BasisUI.extend( this,this .base);
    this.initContent();
}
BasisConfirmPopup.prototype.initContent= function(){
    this.elementKey.push("tipDiv" );
    this.elementKey.push("ok" );
    this.elementKey.push("cancel" );
    this.elementKey.push("innerContentDiv" );
    this.elementKey.push("innerButtonDiv" );
    this.element["tipDiv" ]=this.targetWindow.document.createElement( "div");
    this.element["tipDiv" ].innerHTML=this.config[ "content"];
    this.element["tipDiv" ].setAttribute("class", "basis-confirm-content");
    this.element["tipDiv" ].setAttribute("className", "basis-confirm-content");
    this.element["ok" ]=this.targetWindow.document.createElement( "a");
    this.element["ok" ].setAttribute("href", "javascript:;");
    this.element["ok" ].innerHTML="确定";
    this.element["ok" ].setAttribute("class", "popups-btn-ok");
    this.element["ok" ].setAttribute("className", "popups-btn-ok");
    this.element["cancel" ]=this.targetWindow.document.createElement( "a");
    this.element["cancel" ].setAttribute("href", "javascript:;");
    this.element["cancel" ].innerHTML="取消";
    this.element["cancel" ].setAttribute("class", "popups-btn-cancel");//for firefox and safari
    this.element["cancel" ].setAttribute("className", "popups-btn-cancel");//for IE
    this.element["innerContentDiv" ]=this.targetWindow.document.createElement( "div");
    this.element["innerButtonDiv" ]=this.targetWindow.document.createElement( "div");
    this.element["innerButtonDiv" ].setAttribute("class", "popups-btns-box");
    this.element["innerButtonDiv" ].setAttribute("className", "popups-btns-box");
    this.callBack["cancel" ]=new BasisUIList();
    this.callBack["ok" ]=new BasisUIList();
}
BasisConfirmPopup.prototype.bindContentEvents= function(){
    var me=this ;
    BasisUI.BindEvent(me.element[ "ok"],"click" ,function(){
        for(var i=0;i<me.callBack["ok"].count();i++){
            me.callBack[ "ok"].item(i)();
        }
        me.close();
    });
    BasisUI.BindEvent(me.element[ "cancel"],"click" ,function(){
        for(var i=0;i<me.callBack["cancel"].count();i++){
            me.callBack[ "cancel"].item(i)();
        }
        me.close();
    });
}
BasisConfirmPopup.prototype.buildContent= function(){
    this.element["innerContentDiv" ].appendChild(this.element[ "tipDiv"]);
    this.element["innerButtonDiv" ].appendChild(this.element[ "ok"]);
    this.element["innerButtonDiv" ].appendChild(this.element[ "cancel"]);
    this.element["innerContentDiv" ].appendChild(this.element[ "innerButtonDiv"]);
    this.element["contentDiv" ].appendChild(this.element[ "innerContentDiv"]);
}
//End ConfirmPopup
//Start CountdownPopup
function CountdownPopup(param) {
    this.base = new BasisPopup(param);
    BasisUI.extend( this, this .base);
    this.config["autoClose" ] = param["autoClose"] || 0;
    this.initContent();
}
CountdownPopup.prototype.initContent = function () {
    this.elementKey.push("tipDiv" );
    this.element["tipDiv" ] = this.targetWindow.document.createElement( "div");
    this.element["tipDiv" ].innerHTML = this.config[ "content"];
    this.element["tipDiv" ].setAttribute("class", "countDownText lightRedText" );
    this.element["tipDiv" ].setAttribute("className", "countDownText lightRedText" );
}
CountdownPopup.prototype.bindContentEvents = function () {
    var me = this ;
    if (me.config["autoClose" ]) {
        setTimeout( function () { try { me.close() } catch (ex) { } }, me.config[ "autoClose"]);
    }
}
CountdownPopup.prototype.buildContent = function () {
    this.element["contentDiv" ].appendChild(this.element[ "tipDiv"]);
}
//End CountdownPopup

//Start Basis Arrow Popup
var BasisArrowPopupObj;
function BasisArrowPopupWindow(button, url, title, width, closeCallBack, showMask, isHtml,className) {
    if (BasisArrowPopupObj && BasisArrowPopupObj.action["hasShow"])
        BasisArrowPopupObj.close();

    var targetObj = $('body' );
    var className = className || "" ;
    var leftPadding = 10;
    var rightPadding = 30;
    var popupWidth = width + 23;
    var topSpace = $(button).offset().top - $(window).scrollTop() + $(button).height();
    var top = $(button).offset().top + $(button).height();
    var left = $(button).offset().left + $(button).width() - popupWidth * 0.87;
    var rightGap = (left + popupWidth) -  targetObj.width();
    if (left < leftPadding) {
        left = leftPadding;
    }
    else if (rightGap > (-rightPadding)) {
        left -= (rightGap + rightPadding);
    }
    var arrowLeft = popupWidth * 0.75;
    var param = {className:className, targetObj:targetObj, hasArrow: true, width: width, height: null, top: top, left: left, title: title, content: url, showMask: showMask, closeCallBack: closeCallBack };
    if (isHtml)
        BasisArrowPopupObj = new BasisHtmlPopup(param);
    else
        BasisArrowPopupObj = new BasisUrlPopup(param);

    BasisArrowPopupObj.element[ "popupArrow"].style.left = arrowLeft + "px" ;

    BasisArrowPopupObj.adjustPosition = function () {
        var className = BasisArrowPopupObj.config["className"].split( ' ')[0];
        var popupHeight = $(".BasisArrowPopup" ).find(".BasisPopup" + className).height();
        if (topSpace < popupHeight) {
            this.element["popupSpan" ].setAttribute("class", "BasisArrowPopup");
            this.element["popupSpan" ].setAttribute("className", "BasisArrowPopup");
            $( ".popupBorderBottom").remove(".popupArrow" );
            this.element["popupBorderTop" ].appendChild(this.element[ "popupArrow"]);
        }
        else {
            top = top - $(button).height() - popupHeight + 5;
            this.element.popupDiv.style["top" ] = top + "px";
            this.element["popupSpan" ].setAttribute("class", "BasisArrowPopup arrowDown" );
            this.element["popupSpan" ].setAttribute("className", "BasisArrowPopup arrowDown" );
            this.element["popupBorderBottom" ].appendChild(this.element[ "popupArrow"]);
            $( ".popupBorderTop").remove(".popupArrow" );
        }
    }
    BasisArrowPopupObj.size.width = width + 23;
    BasisArrowPopupObj.show();
    if (isHtml)
        BasisArrowPopupObj.adjustPosition();
}
/* Basis Common Popup Prototypes --------END
*********************************************/

/********************************************
Basis commonPopup sisters sites Objects
*********************************************/
var BasisUrlNoMarginPopup;
function BasisNoMarginPopupWindow(width, url, showMask, closeCallback, top, title, popupClass) {
    var title = title || "" ,
        popupClass = popupClass || null;
    var urlPopupPara = { width: width, height: null, top: top, left: null, title: title, content: url, showMask: showMask, language: 'en-us' , closeCallBack: closeCallback, className: popupClass };
    if (top == undefined) {
        top = null;
    }
    BasisUrlNoMarginPopup = new BasisUrlPopup(urlPopupPara);
    BasisUrlNoMarginPopup.size.width = width;
    BasisUrlNoMarginPopup.show();
}
function resetBasisUrlNoMarginWidth(width) {
    BasisUrlNoMarginPopup.size.width = width;
    BasisUrlNoMarginPopup.element[ "url"].setAttribute("width" , width + "px");
    BasisUrlNoMarginPopup.setSize();
}
function resetBasisUrlNoMarginHeight(height) {
    BasisUrlNoMarginPopup.element[ "url"].setAttribute("height" , height + "px");
    BasisUrlNoMarginPopup.size.height = height;
    BasisUrlNoMarginPopup.setPosition();
}
function resetBasisUrlNoMarginAnimationHeight(currentHeight, newHeight) {
    var t = 0, intervalsHeight = newHeight - currentHeight;
    function changeHeight() {
        BasisUrlNoMarginPopup.element[ "url"].setAttribute("height" , t * intervalsHeight / 30 + currentHeight + "px");
        BasisUrlNoMarginPopup.size.height = t * intervalsHeight / 30 + currentHeight;
        t++;
        if (t <= 30)
            setTimeout(changeHeight, 30);
    }
    changeHeight()
}
var BasisFixedSizePopup;
function BasisFixedSizePopupWindow(width, height, url, showMask, closeCallback, top, title,className) {
    var title = title || "" ;
    var urlPopupPara = { width: width, height: height, top: top, left: null, title: title, content: url, showMask: showMask, language: 'en-us' , closeCallBack: closeCallback,className: className };
    if (top == undefined) {
        top = null;
    }
    BasisFixedSizePopup = new BasisUrlPopup(urlPopupPara);
    BasisFixedSizePopup.element[ "url"].setAttribute("height" , (BasisFixedSizePopup.size.height) + "px");
    BasisFixedSizePopup.size.width = width;
    BasisFixedSizePopup.config[ "autoSize"] = false ;
    BasisFixedSizePopup.show();
}

var specialUrlPopupObj;
function specialUrlPopupWindow(width,url, showMask, top, closeCallback, title, className) {
    var title = title || "" ;
    var top = top || null ;
    var urlPopupPara = { width: width, height:null, top: top, title: title, content: url, showMask: showMask, closeCallBack: closeCallback, className: className };
    specialUrlPopupObj = new BasisUrlPopup(urlPopupPara);
    specialUrlPopupObj.size.width = width;
    specialUrlPopupObj.show();
}
function resetSpecialUrlHeight(height) {
    specialUrlPopupObj.element[ "url"].setAttribute("height" , height + "px");
    specialUrlPopupObj.size.height = height;
    specialUrlPopupObj.setPosition();
}
function specialUrlClose() {
    specialUrlPopupObj.close();
}
function fixedSizePopupClose() {
    BasisFixedSizePopup.close();
}

var BasisHtmlPopupObj;
function BasisHtmlPopupWindow(width,height, title, content, showMask, closeCallBack, top) {
    var top = top || null ;
    if(BasisHtmlPopupObj) {
        if (BasisHtmlPopupObj.action["hasShow" ]) {
            BasisHtmlPopupObj.close();
        }
        BasisHtmlPopupObj = null;
    }
    var htmlPopupPara = { width: width, height: height, top: top, left: null, title: title, content: content, showMask: showMask, language: 'en-us' , closeCallBack: closeCallBack };
    BasisHtmlPopupObj = new BasisHtmlPopup(htmlPopupPara);
    BasisHtmlPopupObj.size.width = width;
    BasisHtmlPopupObj.show();
}


var specialHtmlPopupObj
function specialHtmlPopupWindow(width, height, title, content, showMask,className, closeCallBack, top) {
    var top = top || null ;
    var htmlPopupPara = { width: width, height: height, top: top, left: null, title: title, content: content, showMask: showMask, language: 'en-us' , closeCallBack: closeCallBack, className: className };
    specialHtmlPopupObj = new BasisHtmlPopup(htmlPopupPara);
    specialHtmlPopupObj.show();
}

function specialHtmlClose() {
    specialHtmlPopupObj.close();
}


function BasisHtmlClose() {
    BasisHtmlPopupObj.close();
}

var BasisImagePopupObj;
function BasisImagePopupWindow(imageUrl, width, title,showMask,className) {
    var width = width || 300;
    var title = title || '' ;
    var imageHtml = "<img class='image-popup-content hide' src='" + imageUrl + "' />";
    var loadingHtml = "<div class='loading-popups' style='padding:50px 0;'><span><span>&nbsp;&nbsp;加载中...</span></div>";
    var htmlPopupPara = {className:className , width: width, height: null, top: null, left: null , title: title, content: loadingHtml + imageHtml, showMask: showMask, language: 'en-us' , closeCallBack: null };
    BasisImagePopupObj = new BasisHtmlPopup(htmlPopupPara);
    BasisImagePopupObj.size.width = width;
    BasisImagePopupObj.show();
    $(".basis-popups").find("img.image-popup-content" ).load(function(){
        $(".basis-popups").find(".loading-popups").hide();
        $(this).show();
        var newWidth = this.width;
        var newHeight = this.height;
        var maxWidth = 1160;
        if(newWidth>maxWidth){
            newWidth = maxWidth;
        }
        BasisImagePopupObj.size.width = newWidth + 20;
        BasisImagePopupObj.element[ "popupDiv"].setAttribute("width" , newWidth + "px");
        BasisImagePopupObj.size.height = newHeight;
        BasisImagePopupObj.element[ "popupDiv"].setAttribute("height" , newHeight + "px");
        BasisImagePopupObj.setSize();
        BasisImagePopupObj.setPosition();
    });
}
function BasisImagePopupClose(){
	BasisImagePopupObj.close();
}

var HtmlWrapPopupObj;
function HtmlWrapPopupWindow(width, height, title, content, showMask, closeCallBack, top,className) {
    var top = top || null ;
    var htmlWrapPopupPara = { width: width, height: height, top: top, left: null, title: title, content: content, showMask: showMask, language: 'en-us' , closeCallBack: closeCallBack,className:className };
    HtmlWrapPopupObj = new BasisHtmlWrapPopup(htmlWrapPopupPara);
    HtmlWrapPopupObj.size.width = width;
    HtmlWrapPopupObj.show();
}

function closeHtmlWrapPopup(closeCallback) {
    if (HtmlWrapPopupObj) {
        HtmlWrapPopupObj.hide();
    }
  
    if (closeCallback) {
        closeCallback();
    }
}

var BasisConfirmPopupObj;
function alertConfirmPopup(width, height, content, title, showMask,className, callbackFunction) {
    var confirmPopupPara = {width: width, height: height, title: title, content: content, showMask: showMask,className:className };
    BasisConfirmPopupObj = new BasisConfirmPopup(confirmPopupPara);
    BasisConfirmPopupObj.element["ok" ].setAttribute("href", "javascript:"+callbackFunction);
    BasisConfirmPopupObj.show();
}
function alertConfirmPopupClose(){
    BasisConfirmPopupObj.close();
}


//var BasisShippingBannerPopupObj;
//function BasisShippingBannerPopup(width, height, content, showMask, closeCallback) {
//    var htmlPopupPara = { className:'shippingBanner' ,width: width, height: height, top: null, left: null , title: '', content: content, showMask: showMask, closeCallBack: closeCallback };
//    BasisShippingBannerPopupObj = new BasisHtmlPopup(htmlPopupPara);
//    BasisShippingBannerPopupObj.size.width = width + 10;
//    BasisShippingBannerPopupObj.show();
//}

/*  Basis commonPopup sisters sites Objects -------END
*********************************************/

function closePopupLoading(obj) {
    $(obj).css( "top", "0" );
    $(obj).parent().find( "#loading-popups").css("display" , "none");
    $( "#popupWindowContent").css("height" , "auto");
}
function closePopupIframeLoading(obj) {
    if ($(obj).attr("src" ) != "" && $(obj).parent().find( "#loading-popups").css("display" ) == "block") {
        closePopupLoading(obj);
    }
}

var closeErrorPop;
function alertMessagePopup(message,delay){
    var delay = delay || 2000 ;
    if(!$(".alert-msg").is(":visible")){
        var alertMessage = "<p class=\"v-middle\">"+message+"</p><span class=\"v-height\"></span>"
        specialHtmlPopupWindow(260,100,"",alertMessage,false,' alert-msg','','');
        closeErrorPop = setTimeout(specialHtmlClose, delay);
    }else{
        clearTimeout(closeErrorPop);
        specialHtmlClose();
    }
}
function alertConfirm(text,title,callbackFunction){
    alertConfirmPopup(440, 220, text, title, true,' alert-confirm',callbackFunction);
}


