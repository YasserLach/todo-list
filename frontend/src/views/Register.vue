<template>
    <div class="h-screen flex justify-center items-center bg-[url('https://zellige.info/zellige/zellige_Meknes.jpg')] ">
        <div class="bg-white  rounded-lg  md:w-2/5 md:h-4/5  drop-shadow-2xl flex items-center">
            <div class="pt-11 pb-8" >
                <p class="text-3xl text-center font-bold">Bloc Note</p>
                <p class="text-slate-400 mt-11 text-center">Sign up to add your TODO list.</p>

                <div class="flex justify-center">
                    <form class="grid " @submit.prevent="submitUser">
                        <input type="text" placeholder="First Name..." required class="text-sm pl-2 border-solid border-2 h-8 mt-12  rounded-md mr-20 ml-20" v-model="user.first_name"/>
                        <input type="text" placeholder="Last Name..." required class="text-sm pl-2  border-solid border-2 h-8 mt-2 rounded-md mr-20 ml-20" v-model="user.last_name"/>
                        <input type="email" placeholder="Email..."  required class="text-sm pl-2  border-solid border-2 h-8 8 mt-2 rounded-md mr-20 ml-20" v-model="user.email"/>
                        <input type="password" placeholder="Password"  required class="text-sm pl-2  border-solid border-2 h-8 8 mt-2 rounded-md mr-20 ml-20" v-model="user.password"/>
                        <p v-if="msg" class="mt-2 font-bold text-red-700 text-center">{{ msg }}</p>
                        <p class="text-xs text-slate-400 mt-4 pl-20 pr-20">Les personnes qui utilisent notre service ont pu importer vos coordonnées sur Instagram. En savoir plus</p>
                        <p class="text-xs text-slate-400 mt-4 pl-20 pr-20" >En vous inscrivant, vous acceptez nos Conditions générales, notre Politique de confidentialité et notre Politique d’utilisation des cookies.</p>
                        
                        <div class="flex justify-center mt-10">
                            <button class="rounded-full bg-sky-600 w-24 text-lg text-white h-10">Register</button>
                        </div>
                       <div class="flex justify-center pt-2" @click="cancel">
                        <p class="text-sm text-slate-400 cursor-pointer">Cancel</p>
                       </div>
                    </form>
            
                </div>

            </div>
        </div>
    </div>
</template>



<script>
import { reactive,ref } from 'vue';
import { useRouter } from 'vue-router';
export default {
    setup () {
        
        const router = useRouter()

        const msg = ref(null)

        const user = reactive({
            first_name:'',
            last_name:'',
            email:'',
            password:''
        })

        
        const submitUser =async ()=>{

            if(user.password.length<6){
                msg.value = 'Must be >6 characters long.'
            }
                else {
                await fetch('http://localhost:4000/users',{
                    method:'POST',
                    headers:{'Content-Type':'application/json'},
                    body: JSON.stringify(user)
                })
             router.push('/login')
            }
        }

        const cancel = ()=>{
            router.push('/')
        }

        return {user,submitUser,msg,cancel}
    }
}
</script>

<style lang="scss" scoped>

</style>