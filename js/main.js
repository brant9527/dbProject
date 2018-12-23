// $(document).on("touchmove", function(e){e.preventDefault();});
// document.body.addEventListener('touchmove', function (e) {
// 			e.preventDefault(); //阻止默认的处理方式(阻止下拉滑动的效果)
// 		}, {passive: false});
var fadeTime = 500
var $width = $(window).width();
var $height = $(window).height();
var numScale = $width * 0.32 * 1 / 130;
var scale = $width / 650;
var scaleH = $height / 1040;
var ismusic = true;
var isphoneplay;
var u = navigator.userAgent;
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);


var inputname = ''
$(".div").width($width).height($height);
// https://test.yuyixm.com/api/paragon/midautumn https://test.yuyixm.com/midautumn/
var requestUrl = 'http://www.meinefrau.com:8080'




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
		data: {
			phoneNum: phoneNum,
			userName: userName,
			orderNum: orderNum
		},
		dataType: 'json',
		success: function (data) {
			if (data.code == 1) {
				pageInOut('m0', 'm1')
				$('.m1 .code').text('抽奖码：' + data.data)
			} else if (data.code == 0) {
				tip('请勿重复报名')
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
			if (data.code == 1) {
				pageInOut('m3', 'm0')
			} else if (data.code == 0) {
				tip('暂未开奖')
			} else if (data.code == 2) {
				//中奖页面
				pageInOut('m2', 'm0')
			}
		},
		error: function (data) {

		}
	})
}
$('.m0 .btn').on('touchstart', function (event) {

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
	pageInOut('m1', 'm0')
	sign(orderNum, name, phone)

	return false
})
$('.m0 .btn-search').on('touchstart', function (event) {
	$('.tip-search').show()
	return false
})
$('.tip-search .btn-s').on('touchstart', function (event) {
	let searchNum = $('#searchNum').val()
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
pageInOut('m0')
