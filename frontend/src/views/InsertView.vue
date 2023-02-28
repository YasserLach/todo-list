<template>
    <div class=" h-screen grid bg-gray-100">
        <div class=" m-auto  w-9/12 bg-gray-50 drop-shadow-2xl rounded-xl">
            <div class="sm:grid sm:grid-cols-2 sm:gap-4 sm:items-center">
                <div class="">
                    <h1 class="text-center text-3xl font-bold text-sky-600">Bloc Note</h1>
                    <p class="text-center text-lg pt-7 pl-5">Avec Bloc Note, partagez et restez en contact avec votre TODO List.</p>
                </div>

                <div class="rounded-lg  drop-shadow-2xl">
                    <form class="grid" @submit.prevent="submitLogin">
                        <input type="text" placeholder="Title..." required class="text-sm pl-2 border-solid border-2 h-10 mt-12  rounded-md mr-20 ml-20 " v-model="data.title"/>
                        <textarea type="text" placeholder="Snippet..." required class="text-sm pl-2  border-solid border-2 h-10 mt-2 rounded-md mr-20 ml-20" v-model="data.snippet"></textarea>
                        <textarea   type="text" placeholder="Body..." required class="text-sm pl-2  border-solid border-2 h-10 mt-2 rounded-md mr-20 ml-20" v-model="data.body"></textarea>
                            <button class="bg-sky-600 text-white rounded-md mr-20 ml-20 mt-6 h-10 text-lg font-bold">Insert</button>
                            <div class="border-2 mr-20 ml-20 mt-5"> </div>
                            <div class="flex justify-center pt-2" >
                        <p class="text-md font-bold text-slate-400 cursor-pointer mb-8" @click="cancelInsert" >Cancel</p>
                       </div>
                    </form>
                </div>

            </div>
        </div>
    </div>
</template>


<script>
import { onMounted ,ref,reactive } from 'vue';
import { useRouter } from 'vue-router';

export default {


    setup () {
        
        const router = useRouter()
        const user = ref({})

        const data = reactive({
            title:'',
            snippet:'',
            body:'',
            idp: null 
        })


        onMounted(async()=>{
            try {
                const response =  await fetch('http://localhost:4000/user',{
                headers:{'Content-Type':'application/json'},
                credentials: 'include'
            })
            const  content = await response.json();
            user.value = {
                first_name: content[0].first_name,
                idp: content[0].idp
            }
            data.idp = user.value.idp
            console.log(user.value.idp)
            
            }catch {
                console.log('error404!!!')
            }

        })

     
        const submitLogin = async() =>{
           await fetch('http://localhost:4000/todo',{
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                credentials : 'include',
                body: JSON.stringify(data)
            }).then(()=> {
                console.log(data.idp)
                router.push('/home')
            })
          
        }





        const cancelInsert = ()=>{
            router.push({name : 'Home'})
        
        }

        return {cancelInsert,data,submitLogin}
    }
}
</script>

<style lang="scss" scoped>

</style>