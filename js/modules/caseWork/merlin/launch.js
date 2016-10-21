/* MNSure Script Engine | (c) Lucas Shanley | https://raw.githubusercontent.com/lpshanley/MNSure-Script-Engine/master/LICENSE */
_engine.module.define('caseWork/merlin/launch',function( input ){

	let config = {
		title: ''
	};

	$.each(input,function(k,v){
		config[k] = input[k];
	});

	let uniqueID = _engine.advanced.generateId();

	/* Shaded Backdrop
	***************************************************/
		var backDrop = _engine.ui.dom.createElement({ 
			type: 'div', 
			id: uniqueID, 
			styles:'height: 100vh;width: 100vw;background-color: rgba(0,0,0,.25);z-index: 900;position: absolute;top: 0;left: 0;'
		});

	/* Modal Wrapper Element
	***************************************************/
		var wrapperDiv = _engine.ui.dom.createElement({ 
			type: 'div', 
			id:'merlinModal-'+uniqueID, 
			classes: 'dijitDialog', 
			styles:'height: 50vh;width: 60vw;background-color: #fff;position: absolute;z-index: 1000;top: 25vh;left: 20vw;box-shadow: 0 1px 2px rgba(0,0,0,.15);'
		});

	/* Title Bar Elements
	***************************************************/
		var titleBar = _engine.ui.dom.createElement({ 
			type: 'div', 
			id:'merlinTitleBar-'+uniqueID, 
			styles:'height: 21px;width: 100%;', 
			classes:'dijitDialogTitleBar'
		});

		var titleBarText = _engine.ui.dom.createElement({ 
			content: config.title, 
			type: 'span', 
			classes:'dijitDialogTitle'
		});

		var titleBarCloseButton = _engine.ui.dom.createElement({ 
			id:"titleBarCloseButton", 
			type: 'span', 
			classes:'dijitDialogCloseIcon'
		});

	/* Left Content Wrapper
	***************************************************/
		var leftContent = _engine.ui.dom.createElement({ 
			type: 'div', 
			styles:'width: 30%;height: calc(100% - 21px);float:left;'
		});

		var leftContentContainer = _engine.ui.dom.createElement({ 
			type: 'div', 
			id:'merlinTaskBinder'
		});

	/* Modal Body Wrapper
	***************************************************/
		var bodyContent = _engine.ui.dom.createElement({ 
			type: 'div', 
			styles:'width: 70%;height: calc(100% - 21px);float:right;background-color:#f1f1f1;border-left: 1px solid rgba(0,0,0,.2);box-sizing: border-box;'
		});

		var bodyContentContainer = _engine.ui.dom.createElement({ 
			type: 'div', 
			id:'merlinTaskBoard', 
			styles:'margin: 1% 3%;width: 100%;height: 100%;'
		});

	/* Apply Backdrop To Screen
	***************************************************/
		$('body').append( backDrop );

	/* Build Title Bar
	***************************************************/
		$( titleBar ).append( titleBarText );
		$( titleBar ).append( titleBarCloseButton );

	/* Build Left Content
	***************************************************/
		$( leftContent ).append( leftContentContainer );

	/* Build Body Content
	***************************************************/
		$( bodyContent ).append( bodyContentContainer );

	/* Add Cores To Modal
	***************************************************/
		$( wrapperDiv ).append( titleBar );

		$( wrapperDiv ).append( leftContent );

		$( wrapperDiv ).append( bodyContent );

	/* Launch Modal
	***************************************************/
		$( curam.util.getTopmostWindow().document.body ).append( wrapperDiv );

	/* Enable Modal Resizing and Dragging
	***************************************************/
		$('[data-merlin-id="merlinModal-'+uniqueID+'"]').draggable({ handle: '[data-merlin-id="merlinTitleBar-'+uniqueID+'"]' });
		$('[data-merlin-id="merlinModal-'+uniqueID+'"]').resizable();

	/* Setup Modal Actions 
	***************************************************/
		// Closeout Modal
		_engine.caseWork.merlin.setupAction({
			item: '[data-merlin-id="titleBarCloseButton"]',
			trigger: 'click',
			action: function(){_engine.caseWork.merlin.destroy( uniqueID )}
		});

});