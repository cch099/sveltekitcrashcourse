<script>
    import {pokemon} from '../stores/pokestore';
    import PokemanCard from '../components/pokemanCard.svelte';
    import Spinner from '../Spinner.svelte';
    import { flip } from 'svelte/animate';


    let searchTerm = "";
    let filteredPokemon = [];

    $: {
        if (searchTerm) {
            filteredPokemon = $pokemon.filter(pokeman => pokeman.name.toLowerCase().includes(searchTerm.toLowerCase()));
        } else {
            filteredPokemon = [...$pokemon];
        }
    }
</script>

<svelte:head>
    <title>Svelte Kit Pokedex</title>
</svelte:head>
<h1 class="text-4xl text-center my-8 uppercase">Welcome to SvelteKit</h1>

<input class="w-full rounded-md text-lg p-4 border-2 border-gray-200" 
    type="text" bind:value={searchTerm} placeholder="Search Pokemon" />
<div class="py-4 grid gap-4 md:grid-cols-2 grid-cols-1" >
    {#if filteredPokemon} 
        {#each filteredPokemon as pokeman (pokeman)}
            <div animate:flip={{ duration: 500 }}>
                <PokemanCard pokeman={pokeman} />
            </div>
        {:else}
        <img
            alt="snap"
            src="https://i.insider.com/5ae3327e19ee8657008b45f6?width=750&format=jpeg&auto=webp"
        />
        {/each}
    {:else}
    <article>
      <Spinner />
    </article>
  {/if}
</div>