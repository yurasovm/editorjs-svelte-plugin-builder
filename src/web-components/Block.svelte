<svelte:options tag={null} />

<script>
	let isShowForm = false;
	let text = '';
	let store = null;
	export const setStore = initedStore => store = initedStore;

	function hideForm() {
		isShowForm = false;
		text = '';
	}

	function showFormHandler() {
		isShowForm = true;
	}

	function hideFormHandler() {
		hideForm()
	}

	function addItemHandler() {
		const newItems = [...$store.items, { text }];
		store.set( {...$store, items : newItems } );
		hideForm();
	}

	function delItem( item ) {
		if ( !confirm( `Delete item "${ item.text }"?`) )
			return;

		const newItems = $store.items.filter( it => it !== item );
		store.set( {...$store, items : newItems } );
	}
</script>

{#if store != null }
	{#if !isShowForm}
		<button class="cdx-button" on:click="{ showFormHandler }" type="button">Add item</button>
	{:else}
		<div class="cdx-block">
			<input on:keydown|stopPropagation class="cdx-input" type="text" bind:value="{ text }">
		</div>

		<div class="cdx-block">
			<button class="cdx-button" disabled="{ text.length == 0 }" type="button" on:click="{ addItemHandler }">Add</button>
			<button class="cdx-button" type="button" on:click="{ hideFormHandler }">Cancel</button>
		</div>
	{/if}

	<hr>

	{#each $store.items as item, idx}
		<div class="cdx-block">
			{#if $store.settings.allowDelete == true }
				<button class="cdx-button" type="button" on:click="{ () => delItem( item ) }">Del</button>
			{/if}

			{ idx + 1 }. { item.text }
		</div>
	{/each}
{:else}
	<div>No store</div>
{/if}

<style>
.cdx-block {
	padding: 0.4em 0;
}

.cdx-input {
	border: 1px solid rgba(201,201,204,.48);
	-webkit-box-shadow: inset 0 1px 2px 0 rgba(35,44,72,.06);
	box-shadow: inset 0 1px 2px 0 rgba(35,44,72,.06);
	border-radius: 3px;
	padding: 10px 12px;
	outline: none;
	width: 100%;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
}

.cdx-button {
	padding: 13px;
	border-radius: 3px;
	border: 1px solid rgba(201,201,204,.48);
	font-size: 14.9px;
	background: #fff;
	-webkit-box-shadow: 0 2px 2px 0 rgba(18,30,57,.04);
	box-shadow: 0 2px 2px 0 rgba(18,30,57,.04);
	color: #707684;
	text-align: center;
	cursor: pointer;
}

.cdx-button:disabled {
	color: #b0b3bb;
}
</style>