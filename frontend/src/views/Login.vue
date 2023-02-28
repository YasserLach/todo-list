<template>
    <div class=" h-screen grid">
        <div class=" m-auto h-4/6 w-9/12">
            <div class="sm:grid sm:grid-cols-2 sm:gap-4 sm:items-center">

                <div class="">
                    <h1 class="text-center text-3xl font-bold text-sky-600">Bloc Note</h1>
                    <p class="text-center text-lg pt-7 pl-5">Avec Bloc Note, partagez et restez en contact avec votre TODO List.</p>
                </div>

                <div class="rounded-lg  drop-shadow-2xl">
                    <form class="grid" @submit.prevent="submitLogin">
                        <input type="email" placeholder="Email..." required class="text-sm pl-2 border-solid border-2 h-10 mt-12  rounded-md mr-20 ml-20" v-model="data.email"/>
                        <input type="password" placeholder="Password..." required class="text-sm pl-2  border-solid border-2 h-10 mt-2 rounded-md mr-20 ml-20" v-model="data.password"/>
                            <button class="bg-sky-600 text-white rounded-md mr-20 ml-20 mt-6 h-10 text-lg font-bold">Login</button>
                            <div class="border-2 mr-20 ml-20 mt-5"> </div>
                            <div class="flex justify-center pt-2" >
                        <p class="text-md font-bold text-slate-400 cursor-pointer" @click="canceLogin">Cancel</p>
                       </div>
                    </form>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { reactive } from 'vue';

export default {
    setup () {
        
        const router = useRouter()

        const data = reactive({
            email:'',
            password:''
        })


        
        const submitLogin =async ()=> {
            await fetch('http://localhost:4000/login',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                credentials:'include',
                body:JSON.stringify(data)
            }).then((res)=>{
                    if(res.ok ) {
                        router.push('/home')
                    }
                
            })
        }



        
        const canceLogin = ()=>{
            router.push('/')
        }

        return {canceLogin,data,submitLogin}
    }
}
</script>

<style lang="scss" scoped>

</style>