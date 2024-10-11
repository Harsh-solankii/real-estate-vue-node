<template>
    <div>
        payment component
        {{ $route.params.id }}

        <form @submit.prevent="handle">
            <br>
            <v-text-field type="number" id="donation" v-model="amount" required />
            
            Amount is :{{ amount }}
            
            <br>
            <v-btn type="submit">Pay now!</v-btn>
        </form>
        <div v-if="message">
      <p>{{ message }}</p>
    </div>
    </div>
</template>

<script setup>
import { ref,onMounted } from 'vue';
import { fetchdata } from '@/helpers/fetch';
import { loadStripe } from '@stripe/stripe-js';

 

onMounted(async()=>{
    stripe.value = await loadStripe('pk_test_51PcomURo9DirKrSx9XAyMGJGTvOA84W3g4a3wJf4UZf5iCH6h3k9qlzWMmTq8v7vrZoyjYr0A9Pouj0UWUpl5wW800h21MR0Ti');
})

const amount = ref(0);

const stripe = ref(null);
const message = ref('');

const handle = async() => {
      try {
        const session = await fetchdata('/create-checkout-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ amount: amount.value }),
        });
        const { error } = await stripe.value.redirectToCheckout({
          sessionId: session.id,
        });
        if (error) {
          message.value = error.message;
        }
      } catch (error) {
        message.value = error.message;
      }
    }


</script>

<style scoped>

</style>