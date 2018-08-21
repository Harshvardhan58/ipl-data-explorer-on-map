const mongoose =  require('mongoose');
const { Schema } = mongoose;
const matchSchema = new Schema({
    id:String,
    season:String,
    city:String,	
    date:String,
    team1:String,
    team2:String,
    toss_winner:String,
    toss_decision:String,
    result:String,
    dl_applied:String,
    winner:String,
    win_by_runs:String,
    win_by_wickets:String,
    player_of_match:String,
    venue:String,
    umpire1:String,
    umpire2:String
});

mongoose.model('matches',matchSchema);