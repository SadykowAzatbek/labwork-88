import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import {randomUUID} from "crypto";
import Post from "./models/Post";
import Comment from "./models/Comment";

const dropCollection = async (db: mongoose.Connection, collectionName: string) => {
  try {
    await db.dropCollection(collectionName);
  } catch (err) {
    console.log(`Collection ${collectionName} was missing, skipping drop...`);
  }
};

const run = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;

 const collections = ['posts', 'users', 'comments'];

 for (const collectionName of collections) {
   await dropCollection(db, collectionName);
 }

  const [user1, user2] = await User.create(
    {
      username: 'Anna',
      password: '1234',
      token: randomUUID(),
    },
    {
      username: 'John',
      password: '12345',
      token: randomUUID(),
    },
  );

 const [post1, post2, post3, post4] = await Post.create(
   {
     user: user1,
     title: 'Blue sky',
     description: 'This is description',
     image: 'images/06a2f81a-4841-44b9-9e4b-a9dc2c861819.jpeg',
     datetime: new Date(),
   },
   {
     user: user1,
     title: 'Car',
     description: 'This is description',
     image: 'images/4bc0b301-36e0-440c-9c31-fcd05c5a381c.jpeg',
     datetime: new Date(),
   },
   {
     user: user2,
     title: 'Buttons',
     description: 'This is description',
     image: 'images/44d2a0ce-e9bd-4e01-81d9-03342261dc5c.jpeg',
     datetime: new Date(),
   },
   {
     user: user2,
     title: 'Country',
     description: 'This is description country',
     image: 'images/ea96afd6-8ad0-4a15-a8dc-8a4859ef45ed.jpeg',
     datetime: new Date(),
   },
 );

 await Comment.create(
   {
     user: user1,
     post: post1,
     textComment: 'Hello, world!'
   },
   {
     user: user1,
     post: post1,
     textComment: 'Goodbye!'
   },
   {
     user: user1,
     post: post1,
     textComment: 'White'
   },
   {
     user: user1,
     post: post1,
     textComment: 'This tea is really sweet'
   },

   {
     user: user1,
     post: post2,
     textComment: 'Hello, world!'
   },
   {
     user: user1,
     post: post2,
     textComment: 'Goodbye!'
   },
   {
     user: user1,
     post: post2,
     textComment: 'White'
   },
   {
     user: user1,
     post: post2,
     textComment: 'This tea is really sweet'
   },

   {
     user: user2,
     post: post1,
     textComment: 'Hello, world!'
   },
   {
     user: user2,
     post: post1,
     textComment: 'Goodbye!'
   },
   {
     user: user2,
     post: post1,
     textComment: 'White'
   },
   {
     user: user2,
     post: post1,
     textComment: 'This tea is really sweet'
   },

   {
     user: user2,
     post: post2,
     textComment: 'In the heart of the bustling city,'
   },
   {
     user: user2,
     post: post2,
     textComment: ' inviting patrons to indulge in moments of solitude or engage in lively conversations!'
   },
   {
     user: user2,
     post: post2,
     textComment: 'Outside, the city pulses with energy, but within these walls'
   },
   {
     user: user2,
     post: post2,
     textComment: 'This tea is really sweet'
   },
   {
     user: user2,
     post: post3,
     textComment: 'In the heart of the bustling city,'
   },
   {
     user: user2,
     post: post3,
     textComment: ' inviting patrons to indulge in moments of solitude or engage in lively conversations!'
   },
   {
     user: user2,
     post: post3,
     textComment: 'Outside, the city pulses with energy, but within these walls'
   },
   {
     user: user2,
     post: post3,
     textComment: 'This tea is really sweet'
   },
   {
     user: user1,
     post: post2,
     textComment: 'In the heart of the bustling city,'
   },
   {
     user: user1,
     post: post3,
     textComment: ' inviting patrons to indulge in moments of solitude or engage in lively conversations!'
   },
   {
     user: user1,
     post: post3,
     textComment: 'Outside, the city pulses with energy, but within these walls'
   },
   {
     user: user1,
     post: post3,
     textComment: 'This tea is really sweet'
   },
   {
     user: user2,
     post: post4,
     textComment: 'In the heart of the bustling city,'
   },
   {
     user: user2,
     post: post4,
     textComment: ' inviting patrons to indulge in moments of solitude or engage in lively conversations!'
   },
   {
     user: user2,
     post: post4,
     textComment: 'Outside, the city pulses with energy, but within these walls'
   },
   {
     user: user2,
     post: post4,
     textComment: 'This tea is really sweet'
   },
   {
     user: user2,
     post: post4,
     textComment: 'In the heart of the bustling city,'
   },
   {
     user: user1,
     post: post4,
     textComment: ' inviting patrons to indulge in moments of solitude or engage in lively conversations!'
   },
   {
     user: user1,
     post: post4,
     textComment: 'Outside, the city pulses with energy, but within these walls'
   },
   {
     user: user1,
     post: post4,
     textComment: 'This tea is really sweet'
   }
 );
};


void run();