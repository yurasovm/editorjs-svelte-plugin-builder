<svelte:options tag={null} />

<script>
	let text = 'text';
	let store = null;
	export const setStore = initedStore => store = initedStore;
</script>

{#if store != null }
	<label><input type=checkbox bind:checked={ $store.settings.allowDelete }> Allow del</label>
{:else}
	<div>No store</div>
{/if}