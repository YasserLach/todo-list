<template>
    <div class="flex justify-between px-4 sm:px-14 py-10 items-center bg-gray-100 drop-shadow-lg bg-cover">
        <h1 class="text-4xl">BLOC Note</h1>
        <p class="text-lg cursor-pointer" @click="logout">Log Out</p>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';
export default {
    setup () {
    
        const router = useRouter()


        const logout = async ()=>{

            await fetch('http://localhost:4000/logout',{
                method: 'POST',
                headers : {'Content-Type':'applicaation/json'},
                credentials: 'include'
            }).then(()=>{
             router.push('/')
            })


        }


        return {logout}
    }
}
</script>

