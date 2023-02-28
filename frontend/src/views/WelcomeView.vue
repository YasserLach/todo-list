<template>
    <div class=" h-screen flex ">
        <div class="lg:h-3/5  lg:w-3/5 m-auto sm:grid sm:grid-cols-2 bg-gray-50 rounded-lg  drop-shadow-2xl ">


           <div  class="flex justify-center items-center">
            <div class="pr-9 pl-9">
                <h1 class="text-center text-xl font-bold">BLOC NOTE</h1>
                <p class="mt-7">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
               <div class="flex justify-center items-center">
                <div class="grid mt-7 mb-4">
                <button class="border-solid border border-white text-base text-white  rounded-full font-bold bg-sky-600 w-32 h-8 mt-2"
                 @click="registerRoute"       >
                Sign Up
            </button>
                <button class="border-solid border border-white text-base text-white  rounded-full font-bold bg-sky-600 w-32 h-8 mt-2"
                @click="loginRoute"    
                >Login
             </button>
                </div> 
               </div>
            </div>
           </div>


           <div class="rounded-r-lg overflow-hidden">
            <img class="w-full h-full object-cover " src="../assets/background.jpg" alt="bg" />
           </div>
        </div>
    </div>
</template>




<script>
import { useRouter } from 'vue-router';
export default {

    setup () {
    
    const router = useRouter()    

    //  Register page redirection   
    const registerRoute = ()=>{
        router.push('/register')
    }
    //  Login page redirection
    const loginRoute = ()=>{
        router.push('/login')
    }

        return {registerRoute,loginRoute}
    }
}
</script>

<style lang="scss" scoped>

</style>