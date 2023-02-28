<template>
    <div class="">
        <NavBar />
       <div class="  flex justify-center items-center  bg-cover">
       <div class=" sm:w-10/12  mt-24  bg-cover rounded-lg bg-gray-50 drop-shadow-2xl">
        <p class="text-center text-2xl pt-8 text-sky-600 font-bold">{{ user.first_name }}'s Todo List</p>
        <p class="mt-12 ml-9  font-bold underline decoration-solid  hover:uppercase cursor-pointer text-slate-700 hover:text-sky-600" @click="navigate">Add new todo </p>
        <div class="lg:grid lg:grid-cols-2 mt-12 pb-12">

            <div class="bg-white  ml-9 mr-9 rounded-lg drop-shadow-2xl overflow-hidden grid grid-cols-2 gap-2  mt-6" v-for="list in lists" :key="list.idt" >
            <div class="">
                <img  src="../assets/wp4676588.webp"  alt="bg" class="w-full h-full bg-cov"/>
            </div>
            <div class="">
                <p class="text-center font-bold mt-4 text-lg text-sky-600">{{ list.title }}</p>
                <p class="pt-4 text-sm  text-slate-400">{{ list.snippet }} </p>
                <div class="border-2 mr-2 ml-2 mt-4"></div>
                <div class="flex justify-center items-center">
                    <div class="mt-4">
                    <p class="text-sm text-sky-600 cursor-pointer font-bold border-2 rounded-md border-sky-600 pl-4 pr-4 hover:bg-sky-600 hover:text-white">Update</p>
                    <p class="text-sm text-sky-600 font-bold cursor-pointer mt-2 border-2 rounded-md border-sky-600 pl-4 pr-4 mb-4 hover:bg-sky-600 hover:text-white" @click="deletetd(list.idt)">Delete</p>
                    </div>
                    
                </div>
            </div>
        </div>

      

        
        </div>


       </div>
       </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'
import NavBar from '../components/NavBar.vue'
import { onMounted, ref } from 'vue'


export default {
    components : {NavBar},

    setup () {
        
        
        const router = useRouter()

        const user = ref({ })

        const lists = ref([])


        // to navigate
        const navigate = ()=>{
            router.push({name: 'InsertView', params:{id:7}})
        }


      


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
            console.log(user.value)
            }catch {
                console.log('error404!!!')
            }
            try {
                const response =  await fetch(`http://localhost:4000/mylist/${user.value.idp}`,{
                headers:{'Content-Type':'application/json'},
                credentials: 'include'
            })
            const  contents = await response.json();
            
           contents.map((content)=> {
            lists.value.push({
                idt: content.idt ,
            title: content.title,
            snippet: content.snippet,
            body: content.body,
            idp: content.idp
            })

           })
          

           }catch {
                console.log('error404!!!')
         }
        })


        const deletetd =async (id)=>{

            await fetch(`http://localhost:4000/delete/${id}`,{
                method:'DELETE',
                headers: {'Content-Type':'application/json'},
                credentials: 'include',
            }).then((res)=>{
                router.go('/home')
            })
        }



        return {navigate,user,lists,deletetd}
    },
    
}
</script>

<style lang="scss" scoped>

</style>