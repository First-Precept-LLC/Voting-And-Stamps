import mongoose from "mongoose";
const {Matrix, solve} = require('ml-matrix');
const admin_usernames = []; //Either fill with admins, or remove


const stampy_id = "stampy";


export class Utilities {

    static DB_PATH;

    static __instance;
    static db;
    static client;
    

    static users;
    static ids;
    //indices of users and scores for each trust graph.
    static indices;
    static scores;
    //MongoDB collections
    static UserVotes;
    static Predictions;
    static Resolutions;
    static ProposalTags;
    static Values;


    static get_instance () {
        if(! Utilities.__instance) {
            new Utilities();
        }
        return Utilities.__instance;
    }

    constructor() {
      if(Utilities.__instance != null) {
          throw "This class is a singleton!"
      } else {
          Utilities.db = mongoose.connection;
          console.log("goose!");
          console.log(mongoose.connection);
          Utilities.__instance = this;
      }

    }

    static async init() {
        Utilities.db = mongoose.connection;
        console.log("goose!");
        console.log(mongoose.connection);
        Utilities.UserVotes = Utilities.db.collection("uservotes");
		    Utilities.Predictions = Utilities.db.collection("predictions");
        Utilities.Resolutions = Utilities.db.collection("resolutions");
        Utilities.ProposalTags = Utilities.db.collection("proposaltags");
        Utilities.Values = Utilities.db.collection("values");
        Utilities.scores = {};
        Utilities.indices = {};
    }

    static async clearVotes() {
        await Utilities.UserVotes.deleteMany({});
    }

    //update the ids list and indices based on changes to the users.

    static async update_ids_list() {
        if (Utilities.users) {
          Utilities.ids = Utilities.users.sort();
        }
		    console.log(Utilities.ids);
        let graphs = await Utilities.get_graphs()
        for(let i = 0; i < graphs.length; i++) {
            Utilities.indices[graphs[i]] = {0: 0};
        }
        if (Utilities.ids) {
		    for(let i = 0; i < Utilities.ids.length; i++) {
                let userid = Utilities.ids[i];
                for (let i = 0; i < graphs.length; i++) {
                  Utilities.indices[graphs[i]][userid] = Utilities.ids.indexOf(userid);
                }
          }
        }
    }

    static index_dammit(user, collection) {
		
		let targetIndex = Utilities.indices[collection];
    if (! targetIndex) {
      targetIndex = [];
    }
		
        //get an index into the scores array from whatever you get.
        if (user in targetIndex) {
            //maybe we got a valid ID?
            return targetIndex[user];
        } else if (user.toString() in targetIndex) {
            return targetIndex[user.toString()];
        }
        //Maybe we got a User or Member object that has an ID?
        let uid = user.id ? user.id : null;
        console.log(uid);
        console.log(targetIndex);
        if (uid) {
            return this.index_dammit(uid, collection);
        }

        return null;
    }

    //Get the score of a user from the scores array.
    static get_user_score(user, collection) {
        let userIndex = this.index_dammit(user, collection);
        if (userIndex) {
          console.log(Utilities.scores);
          let res = Utilities.scores[collection][userIndex];
          console.log("Aha!");
          return res;
        }
        return 0.0;
    }
    //Add a vote for a piece of content.
    static async update_vote(userwallet, user_name, voted_for, voted_for_target, target_type, vote_quantity, collection) {
		    let targetTable = Utilities.UserVotes;
        let insertedObj = {
            user: Utilities.db.collection("users").findOne({username: userwallet}),
            sourceName: user_name,
            votedFor: voted_for,
            target: voted_for_target,
            targetType: target_type,
            votecount: vote_quantity,
            graph: collection			
        };
        console.log(insertedObj);
        await targetTable.insertOne(insertedObj);
    }

  //Find all the votes a user has made.
  static async get_votes_by_user(userwallet, collection){
		let targetTable = Utilities.UserVotes;
    let allUserVotes = await targetTable.find({user: userwallet, graph: collection}).toArray();
    let total = 0;
    for (let i = 0; i < allUserVotes.length; i++) {
        total += allUserVotes[i].votecount;
    }
    return total;
  }

  //Find all the votes a user has received.
  static async get_votes_for_user(userwallet, collection){
		let targetTable = Utilities.UserVotes;
    let allUserVotes = await targetTable.find({votedFor: userwallet, graph: collection}).toArray();
    let total = 0;
    for (let i = 0; i < allUserVotes.length; i++) {
        total += allUserVotes[i].votecount;
    }
    return total;
  }


  //Find all the votes a piece of content has received.
  static async get_votes_by_target(target, collection){
		let targetTable = Utilities.UserVotes;
    let allUserVotes = await targetTable.find({target: target, graph: collection}).toArray();
    let total = 0;
    for (let i = 0; i < allUserVotes.length; i++) {
        total += allUserVotes[i].votecount;
    }
    return total;
  }
  //Get the total votes for a provided trust graph.
  static async get_total_votes(collection){
    console.log("Total votes for " + collection);
		let targetTable = Utilities.UserVotes;
    let allUserVotes = await targetTable.find({graph: collection}).toArray();
    let total = 0;
    for (let i = 0; i < allUserVotes.length; i++) {
        total += allUserVotes[i].votecount;
    }
    console.log(total)
    return total;
  }
  //Get every vote for a provided trust graph.
  static async get_all_user_votes(collection){
		let targetTable = Utilities.UserVotes;
    return await targetTable.find({graph: collection}).toArray();
  }
  //Get the users that have interacted through votes with a given trust graph, whether by giving or receiving a vote.
  static async get_users(collection) {
      let targetTable = Utilities.UserVotes;
      let users = [] as any;
      let allUserVotes = await targetTable.find({graph: collection}).toArray();
      for (let i = 0; i < allUserVotes.length; i++) {
          if(! users.includes(allUserVotes[i].user) && allUserVotes[i].user.toString() != {}.toString() ) {
              users.push(allUserVotes[i].user);
          }
          if(! users.includes(allUserVotes[i].votedFor && allUserVotes[i].votedFor.toString() != {}.toString() )) {
              users.push(allUserVotes[i].votedFor);
          }
      }
      return [...new Set(users)];
  }
  //Get every trust graph.
  static async get_graphs() {
    let targetTable = Utilities.UserVotes;
    return targetTable.distinct("graph", {});
  }
  //Get every content type.
  static async get_content_types() {
    let targetTable = Utilities.UserVotes;
    return targetTable.distinct("targetType", {});
  }
  //Get resolutions for a piece of content.
  static async get_resolutions_by_target(target, collection){
		let targetTable = Utilities.Resolutions;
    let allResolutions = await targetTable.find({targetId: target, graph: collection}).toArray();
    return allResolutions;
  }
  //Get predictions for a piece of content.
  static async get_predictors_by_target(target, collection){
		let targetTable = Utilities.Predictions;
    let allPredictions = await targetTable.find({contentId: target, collection: collection}).toArray();
    return allPredictions.map(prediction => prediction.user);
  }
  //Get the resolving users for a piece of content. If the empty list is returned, all users are counted as resolving users.
  static async get_resolving_user_ids(target, targetType) {
		let targetTable = Utilities.db.collection("contents");
    let targetProposal = (await targetTable.find({_id: target, contentType: targetType}).toArray())[0];
    if (! targetProposal.resolvingUsers) {
      return [];
    } else {
      return targetProposal.resolvingUsers.split(",");
    }
  }
  //Get all pieces of content with some tag.
  static async get_content_by_tag(tag) {
    let targetTable = Utilities.ProposalTags;
    let targetTags = await targetTable.find({tagName: tag}).toArray();
    return targetTags.map(tag => tag.id);
  }
  //Get the amount of times a tag has been applied to a piece of content.
  static async get_tag_count(tag, id) {
    let targetTable = Utilities.ProposalTags;
    let targetTags = await targetTable.find({tagName: tag, id: id}).toArray();
    return targetTags.length;
  }
  //get a user's prediction of a piece of content.
  static async get_prediction(user, id) {
    let targetTable = Utilities.Predictions;
    let finalPredictions = await targetTable.find({user: user, contentId: id}).toArray();
    return finalPredictions[0];
  }
	//Get the average impact of a piece of content.
  //Use resolutions if any exist, otherwise use predictions.
  static async get_average_impact_by_target(id, graph) {
		let all_impact_votes = await Utilities.Predictions.find({contentId: id, graph: graph}).toArray();
    let all_impact_resolutions = await Utilities.Resolutions.find({contentId: id, graph: graph}).toArray();
    if (all_impact_resolutions.length > 0) {
      all_impact_votes = all_impact_resolutions;
    }
    console.log(all_impact_votes);
		let total = 0;
		if (all_impact_votes.length < 1) {
			return 0;
		}
		for (let i = 0; i < all_impact_votes.length; i++) {
            total += all_impact_votes[i].score;
        }
        return total/all_impact_votes.length;
	}
	//Get the average impact of a user, using all pieces of content they have created.
	static async get_average_impact_by_user(userwallet, graph) {
    let user_content = await Utilities.db.collection("contents").find({creator: userwallet}).toArray();
    console.log(user_content);
    
		let total = 0;
		if (user_content.length < 1) {
			return 0;
		}
		for (let i = 0; i < user_content.length; i++) {
			total += await this.get_average_impact_by_target(user_content[i]._id, graph);
		}
		return total/user_content.length;
	}
  //Get the start set for a value or trust graph. If no start set is specified, default to the value's creator.
  static async get_start_set(name) {
    let values = await Utilities.Values.find({name: name}).toArray();
    if (values.length < 1) {
      return [];
    } else if (! values[0].startSet) {
      return [values[0].creator];
    } else {
      return values[0].startSet.split(",");
    }
  }

  //get the range of numbers of votes for all pieces of content on a given trust graph. Used for normalization.
  static async get_vote_range(graph) {
    let targetTable = Utilities.UserVotes;
    let allUserVotes = await targetTable.find({graph: graph}).toArray();
    let min = 99999;
    let max = -99999;
    for (let i = 0; i < allUserVotes.length; i++) {
      let count = allUserVotes[i].votecount;
      if (count > max) {
        max = count;
      }

      if (count < min) {
        min = count;
      }

    }

    return [min, max];

  }

  //
  static async get_prediction_range(graph) {
    let targetTable = Utilities.Predictions;
    let allResolutions = await targetTable.find({graph: graph}).toArray();
    let min = 99999;
    let max = -99999;
    for (let i = 0; i < allResolutions.length; i++) {
      let count = allResolutions[i].score;
      if (count > max) {
        max = count;
      }

      if (count < min) {
        min = count;
      }
    }
  }

  static async get_resolution_range(graph) {
    let targetTable = Utilities.Resolutions;
    let allResolutions = await targetTable.find({graph: graph}).toArray();
    let min = 99999;
    let max = -99999;
    for (let i = 0; i < allResolutions.length; i++) {
      let count = allResolutions[i].score;
      if (count > max) {
        max = count;
      }

      if (count < min) {
        min = count;
      }
    }
  }
	

}

export class StampsModule {
    utils: any;
    //Strengths of votes.
    red_stamp_value: number;
    gold_stamp_value: number;
    half_red_stamp_value: number;
    half_gold_stamp_value: number;
    zero_stamp_value: number;

    user_karma: number;
    total_votes: any;
    total_temperature_votes: any;
    total_capital_votes: any;
    graphs: any;
    toString() {
        return "Stamps module";
    }

    constructor() {
      Utilities.get_instance();
      this.utils = Utilities;
      this.red_stamp_value = 1;
      this.gold_stamp_value = this.red_stamp_value * 5;
      this.half_red_stamp_value = .5;
      this.half_gold_stamp_value = 2.5;
      this.zero_stamp_value = 0;
      this.user_karma = 1.0; 
    }

    async init() {
      await this.utils.init();
      this.graphs = await this.utils.get_graphs();
      this.total_votes = {}
      for (let i = 0; i < this.graphs.length; i++) {
          this.total_votes[this.graphs[i]] = await this.utils.get_total_votes(this.graphs[i]);
          await this.calculate_stamps(this.graphs[i]);
      }
    }

    reset_stamps() {
      console.log("WIPING STAMP RECORDS");
      this.utils.clearVotes()
      this.utils.update_vote('alice', 'alice_name', 'bob', 'seed_transaction', null, 7, "time", "transaction"); //Generate start set IDs and replace these
      this.utils.update_vote('alphonse', 'alphonse_name', 'barry', 'seed_transaction', null, 7, "temperature", "transaction"); //Generate start set IDs and replace these
      this.utils.update_vote('paul', 'paul_name', 'carl', 'seed_transaction', null, 7, "capital", "transaction"); //Generate start set IDs and replace these
    }

    //Process a vote.
    async update_vote(stamp_type, from_id, from_name, to_id, to_target, target_type, collection, negative=false, recalculate=true){
        if (to_id == stampy_id) {
            //votes for stampy do nothing
            return false;
        }
        if(to_id == from_id) {
            //votes for yourself do nothing
            return false;
        }

        let vote_strength = 0;

        if (stamp_type == "stamp") {
            vote_strength = this.red_stamp_value;
        } else if (stamp_type == "goldstamp") {
            vote_strength = this.gold_stamp_value;
        } else if (stamp_type == "halfstamp") {
			    vote_strength = this.half_red_stamp_value
		    } else if (stamp_type == "halfgoldstamp") {
		 	    vote_strength = this.half_gold_stamp_value;
		    }

        if (negative) {
            vote_strength = -vote_strength;
        }
		
        this.total_votes[collection] += vote_strength;
        await this.utils.update_vote(from_id, from_name, to_id, to_target, vote_strength, collection, target_type);
        let allUsers = [] as any;
        for (let i = 0; i < this.graphs.length; i++) {
            let users = await this.utils.get_users(this.graphs[i]);
            allUsers = [...new Set([...allUsers, ...users])];
        }
        this.utils.users = allUsers;
        await this.utils.update_ids_list();
        if (recalculate) {
            this.calculate_stamps(collection);
        }
        return true;
    }


    //Calculate the stamps each user has, given all the votes thus far.
    async calculate_stamps(collection) {
      //set up and solve the system of linear equations
      console.log("RECALCULATING STAMP SCORES for " + collection);
      let allUsers = [] as any;
      for (let i = 0; i < this.graphs.length; i++) {
          let users = await this.utils.get_users(this.graphs[i]);
          allUsers = [...new Set([...allUsers, ...users])];
      }



		  this.utils.users = allUsers;
      await this.utils.update_ids_list();
		

      let targetIndex = this.utils.indices[collection];
      let user_count = Object.keys(targetIndex).length - 1;



      let users_matrix = Matrix.zeros(user_count, user_count);

      let votes = await this.utils.get_all_user_votes(collection);



      for(let i = 0; i < votes.length; i++) {
        let from_id = votes[i]['user']; //This may change depending on the database implementation and what objects returned from the database look like
        let to_id = votes[i]['votedFor'];
        let votes_for_user = votes[i]['votecount'];
        let from_id_index = targetIndex[from_id];
        let toi = targetIndex[to_id];
        

        let total_votes_by_user = await this.utils.get_votes_by_user(from_id, collection);
        
        if(collection == "Truth") {
          console.log("Truly!");
          console.log(from_id_index);
          console.log(toi);
          console.log(total_votes_by_user);
          console.log(this.user_karma);
        }

        if (total_votes_by_user != 0) {
            let score = (this.user_karma * votes_for_user) / total_votes_by_user;
            users_matrix.set(toi, from_id_index, users_matrix.get(toi, from_id_index) + score); 
        }



      }

      for (let i = 0; i < user_count; i++) {
        users_matrix.set(i, i, -1.0);
      }


      let start_set = await this.utils.get_start_set(collection);

      let start_indices = [] as any;

      if (start_set.length == 0) {
        start_indices.push(0);
      } else {
        for (let i = 0; i < start_set.length; i++) {
          if (start_set[i] in targetIndex) {
            start_indices.push(targetIndex[start_set[i]]);
          }
        }
        if (start_indices.length == 0) {
          start_indices.push(0);
        }
      }

      for (let i = 0; i < start_indices.length; i++) {
        users_matrix.set(start_indices[i], start_indices[i], 1.0);
      }

      console.log("Matrix!");
      console.log(users_matrix);

      let user_count_matrix = Matrix.zeros(user_count, 1);
      for (let i = 0; i < start_indices.length; i++) {
        user_count_matrix.set(start_indices[i], 0, 1.0); //TODO: Is this the right dimension to use?
      }
	    this.utils.scores[collection] = solve(users_matrix, user_count_matrix).to1DArray();
		  console.log(this.utils.scores);
        //this.print_all_scores(collection);
        //done
    }

    async get_user_scores(collection) {
        let message = "Here are the users and how many stamps they're worth:\n";
        this.utils.users = await this.utils.get_users();
        for (let i = 0; i < this.utils.users.length; i++) {
            let user_id = this.utils.users[i];
            let name = "<@" + String(user_id) + ">"; //Format as necessary
            let stamps = this.get_user_stamps(user_id, collection);
            message += name + ": \t" + String(stamps) + "\n";
        }
        return message;
    }

    async print_all_scores(collection) {
        let total_stamps = 0;
        this.utils.users = await this.utils.get_users();
        for (let i = 0; i < this.utils.users.length; i++) {
            let user_id = this.utils.users[i];
            let name = "<@" + String(user_id) + ">"; //Format as necessary
            let stamps = this.get_user_stamps(user_id, collection);
            total_stamps += stamps;
            console.log(name + "\t" + String(stamps));
        }
        console.log("Total votes:" + String(this.total_votes));
        console.log("Total stamps:" + String(total_stamps));
    }

    //Get the stamps a user has regarding a particular trust graph.
    get_user_stamps(user, collection) {
      console.log("start getting stamps for " + String(user)+ ", collection=" + collection);
		  if (!user) {
			  return 0;
		  }
      let index = this.utils.index_dammit(user, collection);
      console.log("get_user_stamps for " + String(user)+ ", index=" + String(index) + ", collection=" + collection);
      let stamps = 0.0; //Maybe readd nonzero predicate when seed users are figured out?
      if (!collection || (!index && index != 0) ) {
        return stamps;
      }
			stamps = this.utils.scores[collection][index] * this.total_votes[collection];
	

			console.log(this.utils.scores[collection][index]);
		  console.log(this.utils.scores);
      console.log(this.total_votes);
      console.log(stamps);
      console.log("done!");
      return stamps;
    }

    /*load_votes_from_csv(collection, filename="stamps.csv") {
        let rl = readline.createInterface({
            input : f.createReadStream(File),
            output : process.stdout,
            terminal: false
        });
        let headerSkipped = false;
        rl.on('line', function (line) {
            if (! headerSkipped) {
                headerSkipped = true;
            } else {
                let line_contents = line.split(",");
                let msg_id =line_contents[0];
                let react_type = line_contents[1];
                let from_id = line_contents[2];
                let to_id = line_contents[3];
                this.update_vote(react_type, from_id, to_id, collection, false, false);
            }
        });
        this.calculate_stamps(collection);
    }*/

    static user_is_admin(username) {
        for(let i = 0; i < admin_usernames.length; i++) {
            if (username == admin_usernames[i]) {
                return true;
            }
            return false;
        }
    } 

}
