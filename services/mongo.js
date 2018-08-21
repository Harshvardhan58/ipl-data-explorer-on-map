const mongoose = require('mongoose');
const Matches = mongoose.model('matches');
module.exports = {
    save:function(data){
        new Matches({
            id:data[0],
            season:data[1],
            city:data[2],	
            date:data[3],
            team1:data[4],
            team2:data[5],
            toss_winner:data[6],
            toss_decision:data[7],
            result:data[8],
            dl_applied:data[9],
            winner:data[10],
            win_by_runs:data[11],
            win_by_wickets:data[12],
            player_of_match:data[13],
            venue:data[14],
            umpire1:data[15],
            umpire2:data[16]
        }).save();
    },
    get_all_seasons: async function(){
        return await Matches.find().distinct('season',function(err,res){
            return JSON.stringify(res);     
        });
    },
    get_all_dates_season:async function(season){

        return await Matches.find({season:season}).distinct('date',function(err,res){
            return JSON.stringify(res);
        });
        
    },
    get_map_data:async function(date){
        return await Matches.find({date:date},function(err,res){
            return JSON.stringify(res);
        });
         
    }
}