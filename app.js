import songs from "./array.js";
import express from "express";
import bodyparser from "body-parser";
import mongoose from "mongoose";

const app = express();
var i=1;

app.set('view engine', 'ejs');

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/spotifyDB");

const playListSchema = {
  name: String,
  no : Number
};

const PL= mongoose.model("Playlist", playListSchema);


app.get("/",function(req,res){
  PL.find(function(err,foundPL){
    //console.log("hehe");
    for(var a=0;a<foundPL.length-1;a++){
      for(var b=0;b<foundPL.length-a-1;b++){
        if(foundPL[b].no > foundPL[b+1].no){
          var temp = foundPL[b];
          foundPL[b]=foundPL[b+1];
          foundPL[b+1]=temp;
        }
      }
    }
    console.log(foundPL);
    var y=foundPL.length;
    var searchedPL = [];

    searchedPL.push(foundPL[y-1],foundPL[y-2],foundPL[y-3],foundPL[y-4]);
    res.render("home", {Recentlyplayed : searchedPL});
  });

});




let reqsongs = [];

app.get("/:customName", function(req,res){
  let requestedPlaylist = req.params.customName;
  for(var x=0; x<songs.length;x++){
    if(songs[x][0].playlist === requestedPlaylist){
      reqsongs = songs[x];
    }
  }
   const aPL =PL.findOne({name : requestedPlaylist},function(err,foundPL){
     if(foundPL){
       PL.updateOne({name : requestedPlaylist},{no :i},function(err1){
         if(err){
           console.log(err1);
         }
       });
         //console.log("updated");
        // console.log(i);
        i++;
     }
     else{
       const newPL = PL({
         name : requestedPlaylist,
         no : i,
       })
       //console.log("saved");
       newPL.save();
       //console.log(i);
      i++;
     }
   });
  res.render("playlist",{playList : requestedPlaylist ,songs : reqsongs});
});




app.post("/",function(req,res){
  var str = req.body.requestedPlaylist;
  var requestedPlaylist = str.charAt(0).toUpperCase() + str.slice(1);
  res.redirect("/" + requestedPlaylist);
});


app.listen(3000);
