/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use('worldcomputer');

// Search for documents in the current collection.
db.getCollection('Heart').aggregate([

    {
      $group: {
        _id: { firstName: "$firstName", lastName: "$lastName" },
        count: { $sum: 1 },
        docs: { $push: "$_id" }
      }
    },
    {
      $match: {
        count: { $gt: 1 } // Finding documents with count greater than 1 (duplicates)
      }
    },    {
        $addFields: {
          collectionName: { $literal: "Heart" } // Adding the collection name as a field
        }
      }
  ])

  db.getCollection('Mind').aggregate([

    {
      $group: {
        _id: { firstName: "$firstName", lastName: "$lastName" },
        count: { $sum: 1 },
        docs: { $push: "$_id" }
      }
    },
    {
      $match: {
        count: { $gt: 1 } // Finding documents with count greater than 1 (duplicates)
      }
    },
    {
        $addFields: {
          collectionName: { $literal: "Mind" } // Adding the collection name as a field
        }
      }
  ])

  db.getCollection('Spirit').aggregate([

    {
      $group: {
        _id: { firstName: "$firstName", lastName: "$lastName" },
        count: { $sum: 1 },
        docs: { $push: "$_id" }
      }
    },
    {
      $match: {
        count: { $gt: 1 } // Finding documents with count greater than 1 (duplicates)
      }
    },
    {
        $addFields: {
          collectionName: { $literal: "Spirit" } // Adding the collection name as a field
        }
      }
  ])

  db.getCollection('Soul').aggregate([

    {
      $group: {
        _id: { firstName: "$firstName", lastName: "$lastName" },
        count: { $sum: 1 },
        docs: { $push: "$_id" }
      }
    },
    {
      $match: {
        count: { $gt: 1 } // Finding documents with count greater than 1 (duplicates)
      }
    },
    {
        $addFields: {
          collectionName: { $literal: "Soul" } // Adding the collection name as a field
        }
      }
  ])

  db.getCollection('Body').aggregate([
 
    {
      $group: {
        _id: { firstName: "$firstName", lastName: "$lastName" },
        count: { $sum: 1 },
        docs: { $push: "$_id" }
      }
    },
    {
      $match: {
        count: { $gt: 1 } // Finding documents with count greater than 1 (duplicates)
      }
    },
    {
        $addFields: {
          collectionName: { $literal: "Body" } // Adding the collection name as a field
        }
      }
  ])
