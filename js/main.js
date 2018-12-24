// $(document).on("touchmove", function(e){e.preventDefault();});
// document.body.addEventListener('touchmove', function (e) {
// 			e.preventDefault(); //阻止默认的处理方式(阻止下拉滑动的效果)
// 		}, {passive: false});
var fadeTime = 500
var $width = $(window).width();
var $height = $(window).height();
var u = navigator.userAgent;
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);


var inputname = ''
$(".div").width($width).height($height);
// https://test.yuyixm.com/api/paragon/midautumn https://test.yuyixm.com/midautumn/
var requestUrl = 'http://www.meinefrau.cn:8080/'




function pageInOut(pagein, pageout) {
	$("." + pagein).show().addClass('activein active');
	(function (pageout) {
		setTimeout(function () {
			$("." + pageout).hide().removeClass('activeout activein active');
		}, 800)
	})(pageout)
}

function sign(orderNum, userName, phoneNum) {
	$.ajax({
		url: requestUrl + 'api/draw/sign',
		type: 'post',
		data: JSON.stringify({
			phoneNum: phoneNum,
			userName: userName,
			orderNum: orderNum
		}),
		contentType: "application/json;charset=UTF-8",
		dataType: 'json',
		success: function (data) {

			if (data.code == 1) {
				pageInOut('m1', 'm0')
				$('.m1 .code').text('抽奖码：' + data.data)
			} else {
				tip(data.message)
			}
		},
		error: function (data) {

		}
	})
}
function check(phoneNum) {
	$.ajax({
		url: requestUrl + 'api/draw/check',
		type: 'get',
		data: {
			phoneNum: phoneNum
		},
		dataType: 'json',
		success: function (data) {
			$('.tip-search').hide()
			if (data.code == 1) {
				if(data.data.type ==1){
					pageInOut('m2', 'm0')
					
					$('.title-success-how').text('获得一等奖！')
				} else if(data.data.type ==2){
					pageInOut('m2', 'm0')
					if(data.data.priceType ==1){
						$('.title-success-how').text('获得二等奖A套餐')
					} else if(data.data.priceType ==2){
						$('.title-success-how').text('获得二等奖B套餐')
					}
				} else if(data.data.type ==3){
					pageInOut('m2', 'm0')
					if(data.data.priceType ==1){
						$('.title-success-how').text('获得三等奖A套餐')
					} else if(data.data.priceType ==2){
						$('.title-success-how').text('获得三等奖B套餐')
					}else if(data.data.priceType ==3){
						$('.title-success-how').text('获得三等奖C套餐')
					}
				} else if(data.data.type ==0){
					pageInOut('m3', 'm0')
				} 
				
			} else {
				tip(data.message)
			}
			
			
		},
		error: function (data) {
			
		}
	})
}
$('.m0 .btn').on('click', function (event) {

	let orderNum = $('#orderNum').val()
	let phone = $('#phone').val()
	let name = $('#name').val()
	if (!orderNum) {
		tip('请输入订单号')
		return false
	}
	if (!phone) {
		tip('请输入联系方式')
		return false
	}
	if (!name) {
		tip('请输入联系人')
		return false
	}
	sign(orderNum, name, phone)

	return false
})
$('.m0 .btn-search').on('touchstart', function (event) {
	$('.tip-search').show()
	return false
})
$('.tip-search .btn-s').on('touchstart', function (event) {
	let searchNum = $('#input-search').val()
	check(searchNum)
	return false
})
$('.tip').on('click', function () {
	$('.tip').hide()
})
$('.shadow').on('touchstart', function (event) {
	$(this).parent().hide()
	return false
})
function tip(str) {
	$('.tip').show()
	$('.tip .tip-word').text(str)
}
var timer =''
$('input').on('blur',function(){
	timer =setTimeout(function(){
		document.body.scrollTop = 0
	},100)
	
})
$('input').on('focus',function(){
	if(timer){
		clearTimeout(timer)
	}
	
})

pageInOut('m0')
