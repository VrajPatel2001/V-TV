const express = require('express');
const isUser = require('../middleware/isUser');
const router = express.Router();
const movieModel = require("../model/Movies");
// const data = require("../movieData");

// const movies = data.getAllmovies();
// const tvShows = data.getAllTvShows();

router.get("/movies",(req,res)=>
{
movieModel.find()
    .then((items)=>{
    const movies = new Array;
    let length=0;
    for(var i in items)
    {
    length++;
    }
    for(let i=0;i<length;i++)
    {
        if(items[i].type=='movie')
        {movies.push(items[i]);}
    }

    const tvShows = new Array;
     length=0;
    for(var i in items)
    {
    length++;
    }
    for(let i=0;i<length;i++)
    {
        if(items[i].type=='tv')
        {tvShows.push(items[i]);}
    }
  

    
    res.render("MoviesAndTv/movie",{title:"Movies And TV-shows",movies,tvShows});
})
.catch(err=>console.log(`Error happened when inserting in the database: ${err}`));

});






router.get("/description/:id",(req,res)=>
{
    
   let id = req.params.id;
   movieModel.findById(id)
   .then((movie)=>{

    let isUser = 0;
    if(req.session.userInfo == null)
    {
        console.log("if");
        isUser= 1;
    }
    else if(req.session.userInfo.type == "user"){
        console.log("else if");

        console.log(`${req.session.userInfo.type=="user"}`)
        isUser= 1;
    }
    else{
        console.log("else");

        isUser=0;
    }
    
    res.render("MoviesAndTv/description",{title:"Description",movie,isUser});
   })
   .catch(err=>console.log(`Error happened when inserting in the database: ${err}`));

})


module.exports=router;