var moduleUI = (function(moduleUI, $, undefined){

	// 전역 객체
	moduleUI.globalObj = {
		blackBG : "<div class='blackBG'></div>"
	};
	
	// GNB 영역 열기
	moduleUI.gnbShow = function(){
		this.init = function(){
			this.gnb = ".gnb";
			this.container = ".container";
			this.openBtn = ".gnbOpen";
			this.closeBtn = ".gnbClose";
			this.speed =  400;
			this.scHeight = $(window).height();
			this.blackBG = "<div class='blackBG'></div>";
			this.initEvent();
		};
		this.initEvent = function(){
			var that = this;
			$(this.openBtn).on("click", function(e){
				e.preventDefault();
				that.open();
			});
			$(this.closeBtn).on("click", function(e){
				e.preventDefault();
				that.close();
			});
			$("body").on("touchend", ".blackBG", function(){ that.close(); });
		};
		this.open = function(){
			var that = this;
			$("body").css({overflow:"hidden"});
			console.log(this.speed)
			$(this.gnb).css({display:"block", minHeight:this.scHeight}).stop().animate({right:0},this.speed, function(){
				$(that.container).css({position:"fixed",left:0,top:0});
			});
			$(".wrapper").append( this.blackBG );
		};
		this.close = function(){
			var that = this;
			$(this.gnb).stop().animate({right:-148},this.speed, function(){
				$(this).css({display:"none"});
				$("body").css({overflow:"auto"});
			});
			$(this.container).css({position:"relative",left:0,top:0});
			$(".blackBG").remove();
		};
		this.init();
	};

	// 하단 게임정보 영역 열기
	moduleUI.gameMenu = function(){
		this.init = function(){
			this.menu = ".gameMenu ul li";
			this.contents = ".gameInfoArea";
			this.closeBtn = ".closeGame";
			this.conHeight = null;
			this.initEvent();
			this.initBottom();
		};
		this.initEvent = function(){
			var that = this;
			$(this.menu).on("touchend", function(e){ 
				e.preventDefault(); that.activeMenu( $(this), $(this).attr("data-name") ); 
			});
			$(this.closeBtn).on("touchend", function(e){
				e.preventDefault(); that.showContents(null, false); 
			});
		};
		this.initBottom = function(){
			this.conHeight = $(this.contents).outerHeight();
			$(this.contents).css({bottom : -( this.conHeight+24) });
		};
		this.activeMenu = function( item, data ){
			$(this.menu).removeClass("on");
			item.addClass("on");
			this.showContents( data , true );
		};
		this.showContents = function( data, state ){
			if (state ) {
				$(this.contents).css({bottom : 50});
				$(this.contents).find("> .info > div").removeClass("on");
				$(this.contents).find("> .info > #" + data).addClass("on");
			}else{
				$(this.menu).removeClass("on");
				$(this.contents).css({bottom : -(this.conHeight + 40) });
			}
		};
		this.init();
	};

	// 팀설명 더보기
	moduleUI.teamMore = function(){
		this.init = function(){
			this.more = ".teamMore span";
			this.teamdis = ".teamdis";
			this.initEvent();
		};
		this.initEvent = function(){
			var that = this;
			$(this.more).on("touchend", function(){
				that.teamShow();
			});
		};
		this.teamShow = function(){
			if( !$(this.teamdis).hasClass("on") ){
				$(this.teamdis).addClass("on");
				$(this.more).text("접기").css({textDecoration : "underline"});
			}else{
				$(this.teamdis).removeClass("on");
				$(this.more).text("더보기").css({textDecoration : "underline"});
			}
		};
		this.init();
	};

	// 승패리포트 팀선택 팝업
	moduleUI.report = function(){
		this.init = function(){
			this.team = ".reportArea > a";
			this.pop = ".layerpop";
			this.close = ".closeBtn";
			this.teamList = ".selectTeam ul li";
			this.currentTeam = null;
			this.blackBG = "<div class='blackBG'></div>";
			this.initEvent();
		};
		this.initEvent = function(){
			var that = this;
			$(this.team).on("touchend", function(e){
				e.preventDefault();that.openPop( $(this) );
			});
			$(this.close).on("touchend", function(e){
				e.preventDefault();that.closePop();
			});
			$(this.teamList).on("touchend", function(e){
				e.preventDefault();that.selectTeam( $(this) );
			});
			$("body").on("touchend", ".blackBG", function(){ that.closePop(); });
		};
		this.selectTeam = function( item ){
			var selectImg = item.find("img").attr("src");
			this.currentTeam.find("img").attr( "src", selectImg );
			this.closePop();
		};
		this.openPop = function( item ){
			this.currentTeam = item;
			$(this.pop).css({ display : "block" });
			$(".wrapper").append( this.blackBG );
		};
		this.closePop = function(){
			$(this.pop).css({ display : "none" });
			$(".blackBG").remove();
		};
		this.init();
	};

	// 설정페이지 옵션활성화 표시
	moduleUI.settingActive = function(){
		this.init = function(){
			this.selectPush = ".pushList em";
			this.active = null;
			this.initEvent();
		};
		this.initEvent = function(){
			var that = this;
			$(this.selectPush).on("click", function(e){
				e.stopPropagation();
				that.activeState( $(this) );
			});
		}
		this.activeState = function( item ){
			if( item.children().is(":checked") ){
				item.parent().addClass("on");
			}else{
				item.parent().removeClass("on");
			}
		};
		this.init();
	};

	// 스크롤 테이블 높이값 주기
	moduleUI.tableHeight = function( selecter ){
		this.init = function( selecter ){
			this.tHeight = $(selecter).outerHeight();
			$(selecter).parents(".scrollTable").outerHeight( this.tHeight );
		} 
		this.init( selecter );
	};

	return moduleUI;

})(window.moduleUI || {}, jQuery);

$(window).on("load", function(){
	var gnb = new moduleUI.gnbShow();
	var gameMenu = new moduleUI.gameMenu();
});
