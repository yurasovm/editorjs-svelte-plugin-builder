import TestModule from '../src/main';

const $text = document.querySelector('#text');
const $getData = document.querySelector('#btnGetData');
const $setData = document.querySelector('#btnSetData');

const editor = new EditorJS({
	holder: 'editorjs',
	onChange: getData,
	onReady: readyHandler,
	placeholder: 'Hello',
	tools: {
		test: TestModule,
	},
});

function readyHandler() {
	$getData.onclick = getData;
	$setData.onclick = setData;
}

function getData() {
	editor.save().then((outputData) => {
		$text.value = JSON.stringify( outputData, null, '  ' );
	}).catch((error) => {
		console.log('Saving failed: ', error)
	});
}

function setData() {
	try {
		editor.blocks.render( JSON.parse( $text.value ) );
	} catch (error) {
		console.log( error );
	}
}