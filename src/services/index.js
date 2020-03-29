import axios from 'axios'
// instanca axios-a za potrebe Fipugram backenda
let Service = axios.create({
 baseURL: 'http://localhost:3000/',
 timeout: 1000

})
// naš objekt za sve pozive koji se dotiču `Post`ova




//zadatak 303
 let Posts = {
   async getAll(searchTerm) {
      searchTerm = searchTerm.split(' ')
console.log( "ispis 1", searchTerm)
    let promises = searchTerm.map( a => {return Service.get(`posts?title=${a}`)})
console.log("ispis 2", promises)
      let response = await Promise.all(promises);
      let vrati = [];
    let tem = response.forEach( a => {
            return  a.data.forEach( doc => {
                let tem = {id: doc.id, 
                           url: doc.source, 
                           email: doc.createdBy, 
                           title: doc.title, 
                           posted_at: Number(doc.postedAt)}
               vrati [doc.id] = tem
          });
      });
     
      console.log("ispis 3", vrati)
let lista= Object.values (vrati)
console.log("ispis 4", lista)
return lista;

   }
   
 }


export { Service, Posts } 