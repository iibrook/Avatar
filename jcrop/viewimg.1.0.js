/**
 * 实现方式 firefox || chrome || safari HTML5 API IE || 7 || 8 || 9 filter IE6 src
 * 
 */
(function($) {

	/**
	 * 系统使用的常量
	 */
	var CONSTANT = {
		HTML5 : "html5",
		FILTER : "filter",
		BASE : "base",
		IMG_ERROR : "图片不合法",
		IMG_SUCCESS : "图片通过"
	};

	$.fn.viewimg = function() {

		var privateFn = {
			/**
			 * 初始化 绑定各类事件
			 * @param options
			 */
			init : function(options) {
				var $this = $(this);
				var _this = this;

				$.fn.viewimg.options = $
						.extend({}, $.fn.viewimg.options, options);

				// 绑定事件
				$this.bind("change", function(e) {

                    var options = $.fn.viewimg.options;
					// 清空对象
                    options.targetDiv.html("");
                    options.targetDiv.parent().addClass("preview-loading");
					var isImg = privateFn.ckImg($.fn.viewimg.options.allowTypes,
							_this.value);
					if (isImg == CONSTANT.IMG_ERROR) {
                           privateFn.errorControl(options,CONSTANT.IMG_ERROR);
					} else if (isImg == CONSTANT.IMG_SUCCESS) {
						var fn = privateFn.ckSupport();
						fn(_this);
					}
				});
			},


			/**
			 * 检测浏览器支持情况
			 * 
			 * @param path
			 * @returns fn
			 */
			ckSupport : function(path) {
				var supportRes = publicFn.suportHTML5();
				if (supportRes == CONSTANT.HTML5)
					return privateFn.fileRead;
				else if (supportRes == CONSTANT.FILTER)
					return privateFn.filterRead;
				else if (supportRes == CONSTANT.BASE)
					return privateFn.baseRead;

			},

			/**
			 * 检测后缀名是否图片格式
			 * 
			 * @param allowTypes
			 * @param imgSrc
			 * @returns null
			 */
			ckImg : function(allowTypes, imgSrc) {
				var i = 0;
				var regext = "";
				var ext = imgSrc.substring(imgSrc.lastIndexOf("."));
				// //console.log(ext);
				for (; i < allowTypes.length; i++) {
					if (ext == allowTypes[i]) {
						return CONSTANT.IMG_SUCCESS;
					}
				}
				return CONSTANT.IMG_ERROR;
			},

            errorControl : function(options,message){
                //传统打印
                if(!options.error){
                    alertMessagePopup(message);
                    setTimeout("window.location.reload()",1000);
                }
                //回调函数
                else if (typeof (options.error) == "function"){
                    $.fn.viewimg.options.error(message);
                }
                //输出指定dom
                else{
                    options.error.html(message);

                }
            },

			/**
			 * HTML5 FileAPI 读取显示
			 * 
			 * @param dom
			 */
			fileRead : function(dom) {
				var fileList;
				var options = $.fn.viewimg.options;
				fileList = dom.files;

				for ( var i = 0; i < fileList.length; i++) {
					var file = fileList[i];
					var reader = new FileReader();
					reader.readAsDataURL(file);

					// 读取初始化事件
					reader.onload = function(e) {
						var img = new Image();
						img.src = e.target.result;
						img.total = e.total;
						img.onload = function() {
							// 图片处理
							privateFn.loadImg(img, CONSTANT.HTML5);
							img = null;
						}
					};
					reader.onprogress = function() {
					}
				}
			},

			/**
			 * IE7,8,9 滤镜来显示
			 * 
			 * @param dom
			 */
			filterRead : function(dom) {
				var options = $.fn.viewimg.options;
				dom.select();
				dom.blur();// 解决IE9下document.selection拒绝访问的错误
				var imgSrc = document.selection.createRange().text;
				privateFn.loadImg(imgSrc, CONSTANT.FILTER);
				document.selection.empty();
			},

			/**
			 * IE6 显示
			 * 
			 * @param dom
			 */
			baseRead : function(dom) {
				var imgSrc = dom.value;
				var $img = $("<img src='" + imgSrc + "'/>");
				privateFn.loadImg($img, CONSTANT.BASE);
			},

			/**
			 * 加载图片
			 * @param $imgAuto
			 * @param browserType
			 */
			loadImg : function(img, browserType) {
				var options = $.fn.viewimg.options;
				if (browserType == CONSTANT.HTML5) {
					options.targetDiv.append(img);
					privateFn.imgZoom(options.targetDiv.find("img"),
							CONSTANT.HTML5);
				} else if (browserType == CONSTANT.FILTER) {
					var $container = options.targetDiv;
					// 获得图片原始尺寸
					$container.append('<img class="viewimg-size" src="../../images/space.gif"/>');
					var $imgAuto = $(".viewimg-size");
                    $imgAuto[0].style.display = "none";
                    $imgAuto[0].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=img)";
                    $imgAuto[0].filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = img;
                    $imgAuto[1].style.display = "none";
                    $imgAuto[1].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=img)";
                    $imgAuto[1].filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = img;
                    $imgAuto[2].style.display = "none";
                    $imgAuto[2].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=img)";
                    $imgAuto[2].filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = img;
                    $imgAuto[3].style.display = "none";
                    $imgAuto[3].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=img)";
                    $imgAuto[3].filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = img;
					// 延迟加载图片
					setTimeout(function() {
						var width = $imgAuto.width();
						var height = $imgAuto.height();
						 console.log(width);
						 console.log(height);
						privateFn.imgZoom($imgAuto, CONSTANT.FILTER, img);
					}, options.ie_delay);

				} else if (browserType == CONSTANT.BASE) {
					options.targetDiv.append(img);
					privateFn.imgZoom(img, CONSTANT.BASE);
				}
			},

			/**
			 * 图片显示方式
			 * @param img
			 * @param browserType
			 * @param src
			 */
			imgZoom : function($img, browserType, src) {
				var options = $.fn.viewimg.options;
				// 支持html5浏览器下
				if (browserType == CONSTANT.HTML5) {
					// 完全
					if (options.sizingMethod == "img") {
						$img.show();
					}
					// 比例
					else if (options.sizingMethod == "scale") {
						publicFn.imgScale($img, options.targetDiv);
					}
					// 拉伸
					else if (options.sizingMethod == "stretch") {
						// 拉伸 code......
					}
				}
				// ie 7 8 9下
				else if (browserType == CONSTANT.FILTER) {
					// 完全显示
					if (options.sizingMethod == "img") {
						$img.show();
					}
					// 拉伸适应容器
					else if (options.sizingMethod == "stretch") {
						// $img[0].style.filter =
						// "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
					}
					// 保持比例适应容器
					else if (options.sizingMethod == "scale") {
						publicFn.imgScale($img, options.targetDiv, src);
					}
				}

				// ie 6 下
				else if (browserType == CONSTANT.BASE) {
					// 完全显示
					if (options.sizingMethod == "img") {
						$img.show();
					}
					// 拉伸适应容器
					else if (options.sizingMethod == "stretch") {
						$img.show();
					}
					// 保持比例适应容器
					else if (options.sizingMethod == "scale") {
						publicFn.imgScale($img, options.targetDiv);
					}
				}
				// 显示
				options.targetDiv.show();
			}
		};

		var method = arguments[0];
		var array;
		if (publicFn[method]) {
			method = publicFn[method];
			array = Array.prototype.slice.call(arguments, 1);
		} else if (typeof (method) == 'object' || !method) {
			method = privateFn.init;
			array = new Array(arguments[0]);
		} else {
			$.error('Method ' + method + ' does not exist on jQuery.viewimg');
			return this;
		}
		return this.each(function() {
			method.apply(this, array);
		});

	};

	// 公共方法
	var publicFn = {
		suportHTML5 : function() {
			if (window.File && window.FileReader && window.FileList
					&& window.Blob) {
				return CONSTANT.HTML5;
			} else if (typeof document.body.style.maxHeight === "undefined") {
				return CONSTANT.BASE;
			} else {
				return CONSTANT.FILTER;
			}
		},
		imgScale : function($img, $container, src) {
            $img.parent().parent().removeClass("preview-loading");
            $img.show();
            if($img.width()<300&&$img.height()<300){
                resetImgSize($img);
            }else{
                cutImage($("#avatarPrototype>img"),300,300);
                cutImage($("#avatarPreviewBig>img"),160,160);
                cutImage($("#avatarPreviewNormal>img"),100,100);
                cutImage($("#avatarPreviewSmall>img"),50,50);
            }
            $('#avatarPrototype').removeData();
            $("#opa").remove();
            $("#selectArea").remove();
            $(".jcrop-holder").css({
                width:$("#avatarPrototype").width(),
                height:$("#avatarPrototype").height(),
                margin:0
            });
            $(".jcrop-tracker").css({
                width:$("#avatarPrototype").width(),
                height:$("#avatarPrototype").height()
            });
            $("#sliderBlock").css({left:0});
            $("#scale").val(0);
            $('#offsetX1').val(0);
            $('#offsetX2').val(100);
            $('#offsetY1').val(0);
            $('#offsetY2').val(100);
            if(($img.width()>300 || $img.height()>300)&&navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/7./i)=="7."){
                $("#cropForm").ajaxSubmit({
                    target: '#output',
                    success: saveIE7CallBack,
                    url: golbalRootUrl + "/portrait/save",
                    type: 'POST',
                    dataType: 'json',
                    clearForm: false,
                    resetForm: false,
                    timeout: 60000,
                    error: function () {
                        alertMessagePopup("编辑头像失败");
                    }
                });
                function saveIE7CallBack(responseText) {
                    if (responseText.status) {
                        $("#memberZoomPortrait").attr("src", responseText.imageUrl);
                        alertMessagePopup("上传头像成功");
                        window.location.reload();
                    }
                }
            }
			if (src) {
                $img[0].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
                $img[0].filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = src;
                $img[1].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
                $img[1].filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = src;
                $img[2].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
                $img[2].filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = src;
                $img[3].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
                $img[3].filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = src;
			}
                $('#avatarPrototype').Jcrop({
                    setSelect: [0, 0, 100, 100],
                    onChange: showPreview,
                    onSelect: showPreview,
                    bgFade: true,
                    bgColor: "#000",
                    aspectRatio: 1,
                    bgOpacity: .5,
                    minSize: [100, 100],
                    minSelect: [50, 50],
                    onRelease:function(){
                        resetAvatar();
                    }
                });
		}
	};
	// 暴露默认设置
	$.fn.viewimg.options = {
		error : "",
		targetDiv : "", // 显示预览图片的位置
		allowTypes : [ ".jpg", ".png", ".bmp", ".gif", ".jpeg" ], // 允许上传图片类型
		sizingMethod : "scale", // 图片展示方式
		// img 显示图片原始尺寸
		// stretch 拉伸适应容器
		// scale 比例适应外层容器
		ie_delay : 3000
	// 针对IE 78 的问题 图片过大的 需要延迟执行
	};

})(jQuery);